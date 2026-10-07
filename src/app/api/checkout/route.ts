import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// The recurring Prices for the CCM subscription, created in Stripe (live
// mode). Not secrets, safe to keep in source.
const PRICE_IDS = {
  monthly: 'price_1UO1JvFv2iaRvQLlMhP0Juqb', // $697/month
  annual: 'price_1UO1M6Fv2iaRvQLluJTT1fMp', // $6,690/year, about 20% off monthly
} as const

type Plan = keyof typeof PRICE_IDS

/**
 * Starts a Stripe Checkout session for the CCM subscription and sends the
 * browser straight to Stripe's hosted checkout page. A plain
 * <a href="/api/checkout"> (or ?plan=annual) works with no client JS required.
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
  params.set('mode', 'subscription')
  params.set('line_items[0][price]', PRICE_IDS[plan])
  params.set('line_items[0][quantity]', '1')
  if (plan === 'monthly') {
    params.set('allow_promotion_codes', 'true')
  }
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
