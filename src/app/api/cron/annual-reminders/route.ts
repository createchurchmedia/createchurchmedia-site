import { NextResponse } from 'next/server'

import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Daily Vercel cron (see vercel.json). Emails Emily about 30 days before a prepaid
 * plan's term ends: the 12-month annual plan and the 6-month plan. Both are one-time
 * payments, so Stripe has no renewal event for them. This finds payments made the
 * right number of days ago instead (335 for annual, 153 for 6-month).
 *
 * The window is one whole UTC day, so each payment matches on exactly one run.
 * Requires CRON_SECRET in Vercel, which Vercel sends as a Bearer token.
 */

const DAY_SECONDS = 86_400

const PLANS = [
  { priceId: siteConfig.annualPriceId, name: 'annual', months: 12, daysAfterPayment: 335 },
  { priceId: siteConfig.sixMonthPriceId, name: '6-month', months: 6, daysAfterPayment: 153 },
] as const

type Plan = (typeof PLANS)[number]

type CheckoutSession = {
  id: string
  created: number
  payment_status: string
  customer_details?: { email?: string | null } | null
  line_items?: { data?: { price?: { id?: string } | null }[] } | null
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    dateStyle: 'long',
    timeZone: 'America/Indiana/Indianapolis',
  })
}

async function emailEmily(session: CheckoutSession, plan: Plan, apiKey: string): Promise<boolean> {
  const client = session.customer_details?.email || `A ${plan.name} client`
  const paid = new Date(session.created * 1000)
  const ends = new Date(paid)
  ends.setUTCMonth(ends.getUTCMonth() + plan.months)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `annual-term-${session.id}`,
    },
    body: JSON.stringify({
      from: process.env.WAITLIST_FROM || `Create Church Media <noreply@${siteConfig.domain}>`,
      to: [process.env.WAITLIST_TO || siteConfig.email],
      reply_to: siteConfig.email,
      subject: `[CCM] ${plan.name === 'annual' ? 'Annual' : '6-month'} plan ending: ${client}`,
      text: [
        `The ${plan.months}-month ${plan.name} plan for ${client} ends around ${formatDate(ends)}, about 30 days from now.`,
        `It does not renew on its own, so this is a good time to reach out about another term.`,
        `This date is based on their payment on ${formatDate(paid)}. The start date on their signed agreement is the official one.`,
      ].join('\n\n'),
    }),
  })
  if (!res.ok) console.error(`Term reminder email failed: ${res.status} (${session.id})`)
  return res.ok
}

async function findPayments(plan: Plan, today: number, secretKey: string): Promise<CheckoutSession[]> {
  const start = today - plan.daysAfterPayment * DAY_SECONDS
  const params = new URLSearchParams({
    status: 'complete',
    limit: '100',
    'created[gte]': String(start),
    'created[lt]': String(start + DAY_SECONDS),
    'expand[]': 'data.line_items',
  })
  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions?${params}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  })
  if (!res.ok) throw new Error(`Stripe lookup failed: ${res.status}`)

  const { data } = (await res.json()) as { data: CheckoutSession[] }
  return data.filter(
    (session) =>
      session.payment_status === 'paid' &&
      session.line_items?.data?.some((item) => item.price?.id === plan.priceId),
  )
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  const resendKey = process.env.RESEND_API_KEY
  if (!secretKey || !resendKey) {
    return NextResponse.json({ error: 'Missing configuration' }, { status: 500 })
  }

  const today = Math.floor(Date.now() / 1000 / DAY_SECONDS) * DAY_SECONDS

  let matches: { session: CheckoutSession; plan: Plan }[]
  try {
    const found = await Promise.all(PLANS.map((plan) => findPayments(plan, today, secretKey)))
    matches = found.flatMap((sessions, i) => sessions.map((session) => ({ session, plan: PLANS[i] })))
  } catch (error) {
    console.error(`Term reminder ${(error as Error).message}`)
    return NextResponse.json({ error: 'Stripe lookup failed' }, { status: 502 })
  }

  const results = await Promise.all(
    matches.map(({ session, plan }) => emailEmily(session, plan, resendKey)),
  )
  const sent = results.filter(Boolean).length
  return NextResponse.json(
    { matched: matches.length, sent },
    { status: sent === matches.length ? 200 : 500 },
  )
}
