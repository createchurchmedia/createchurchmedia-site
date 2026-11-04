import { NextResponse } from 'next/server'

import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// The Stripe Prices for the two plans (live mode). Not secrets, safe to keep in
// source. Monthly is recurring. Annual is a one-time charge for a fixed 12-month
// term, so it can never renew.
const PRICE_IDS = {
  monthly: 'price_1UO1JvFv2iaRvQLlMhP0Juqb', // $697/month
  annual: siteConfig.annualPriceId, // $6,690 one-time, about 20% off monthly
} as const

type Plan = keyof typeof PRICE_IDS

/**
 * Starts a Stripe Checkout session for the chosen plan and sends the
 * browser straight to Stripe's hosted checkout page. A plain
 * <a href="/api/checkout"> (or ?plan=annual) works with no client JS required.
 *
 * The buyer must tick a required checkbox agreeing to the plan's agreement, and
 * Stripe records that on the session. Stripe needs a terms of service URL in the
 * Dashboard (Settings -> Public details) for this to work.
 *
 * allow_promotion_codes lets a monthly subscriber enter a Stripe promo code
 * (CCM697 still exists in Stripe but is no longer advertised). Annual is already the discounted tier, so promo codes are not
 * offered there.
 *
 * Requires STRIPE_SECRET_KEY in the environment. That key is never
 * committed to the repo; it lives only in Vercel project env vars.
 */
export async function GET(req: Request): Promise<NextResponse> {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const origin = new URL(req.url).origin
  const planParam = new URL(req.url).searchParams.get('plan')
  const plan: Plan = planParam === 'annual' ? 'annual' : 'monthly'

  const params = new URLSearchParams()
  params.set('mode', plan === 'annual' ? 'payment' : 'subscription')
  params.set('line_items[0][price]', PRICE_IDS[plan])
  params.set('line_items[0][quantity]', '1')
  if (plan === 'monthly') {
    params.set('allow_promotion_codes', 'true')
  } else {
    // Payment mode skips creating a Customer unless asked. Keep one so an annual
    // church has a record in Stripe and can sign in to the billing portal.
    params.set('customer_creation', 'always')
    // One-time payments only get an invoice when asked. Subscriptions always do.
    params.set('invoice_creation[enabled]', 'true')
  }
  params.set('consent_collection[terms_of_service]', 'required')
  params.set(
    'custom_text[terms_of_service_acceptance][message]',
    `I agree to the [${plan === 'annual' ? 'Annual' : 'Monthly'} Subscription Agreement](${siteConfig.url}${siteConfig.agreements[plan]}).`,
  )
  params.set('success_url', `${origin}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`)
  params.set('cancel_url', `${origin}/subscribe`)

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const data = (await res.json()) as { url?: string }

    if (!res.ok || !data.url) {
      return NextResponse.json({ ok: false, error: 'stripe_error' }, { status: 502 })
    }

    return NextResponse.redirect(data.url, { status: 303 })
  } catch {
    return NextResponse.json({ ok: false, error: 'stripe_error' }, { status: 502 })
  }
}
