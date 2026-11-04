import { NextResponse } from 'next/server'

import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Daily Vercel cron (see vercel.json). Emails Emily about 30 days before an annual
 * plan's 12-month term ends. The annual plan is a one-time payment, so Stripe has
 * no renewal event for it. This finds annual payments made 335 days ago instead.
 *
 * The window is one whole UTC day, so each payment matches on exactly one run.
 * Requires CRON_SECRET in Vercel, which Vercel sends as a Bearer token.
 */

const DAY_SECONDS = 86_400
const DAYS_AFTER_PAYMENT = 335

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

async function emailEmily(session: CheckoutSession, apiKey: string): Promise<boolean> {
  const client = session.customer_details?.email || 'An annual client'
  const paid = new Date(session.created * 1000)
  const ends = new Date(paid)
  ends.setUTCFullYear(ends.getUTCFullYear() + 1)

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
      subject: `[CCM] Annual plan ending: ${client}`,
      text: [
        `The 12-month annual plan for ${client} ends around ${formatDate(ends)}, about 30 days from now.`,
        'It does not renew on its own, so this is a good time to reach out about another year.',
        `This date is based on their payment on ${formatDate(paid)}. The start date on their signed agreement is the official one.`,
      ].join('\n\n'),
    }),
  })
  if (!res.ok) console.error(`Annual reminder email failed: ${res.status} (${session.id})`)
  return res.ok
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
  const start = today - DAYS_AFTER_PAYMENT * DAY_SECONDS

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
  if (!res.ok) {
    console.error(`Annual reminder Stripe lookup failed: ${res.status}`)
    return NextResponse.json({ error: 'Stripe lookup failed' }, { status: 502 })
  }

  const { data } = (await res.json()) as { data: CheckoutSession[] }
  const annual = data.filter(
    (session) =>
      session.payment_status === 'paid' &&
      session.line_items?.data?.some((item) => item.price?.id === siteConfig.annualPriceId),
  )

  const results = await Promise.all(annual.map((session) => emailEmily(session, resendKey)))
  const sent = results.filter(Boolean).length
  return NextResponse.json({ matched: annual.length, sent }, { status: sent === annual.length ? 200 : 500 })
}
