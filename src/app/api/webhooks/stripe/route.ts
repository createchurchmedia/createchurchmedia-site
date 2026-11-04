import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Stripe webhook. Emails Emily when a monthly subscriber signs up or cancels,
 * or when an annual one-time payment succeeds or fails. Emails each new client a
 * welcome note with their billing portal link, and every paying client their
 * invoice (invoice.paid covers both plans, including monthly renewals). Sent via
 * Resend, using the same RESEND_API_KEY already set in Vercel for the wait
 * list and contact forms.
 *
 * ENV VARS EMILY NEEDS TO SET IN VERCEL:
 * - STRIPE_WEBHOOK_SECRET — after adding the endpoint below in the Stripe
 *   dashboard, Stripe generates a "Signing secret" (starts with whsec_).
 *   Copy that into Vercel. Requests without a valid signature are rejected.
 * - STRIPE_SECRET_KEY — already required by /api/checkout. Used here to look up the customer's email, since
 *   the subscription event payload only carries the customer id.
 * - RESEND_API_KEY — already set for the wait list; reused here.
 *
 * SETUP EMILY STILL NEEDS TO DO IN STRIPE:
 * Dashboard -> Developers -> Webhooks -> Add endpoint ->
 * https://createchurchmedia.com/api/webhooks/stripe
 * Select events: customer.subscription.created, customer.subscription.deleted,
 * checkout.session.completed, checkout.session.async_payment_succeeded,
 * checkout.session.async_payment_failed, invoice.paid
 */

type StripeEvent = {
  id: string
  type: string
  data: {
    object: {
      customer?: string
      // Present on Checkout Session events, which is how the annual plan reports.
      mode?: string
      payment_status?: string
      customer_details?: { email?: string | null } | null
      // Present on invoice events.
      customer_email?: string | null
      hosted_invoice_url?: string | null
      number?: string | null
      amount_paid?: number
    }
  }
}

const SIGNATURE_TOLERANCE_SECONDS = 300

function verifySignature(payload: string, header: string, secret: string): boolean {
  const parts = Object.fromEntries(
    header.split(',').map((part) => {
      const [key, value] = part.split('=')
      return [key, value]
    }),
  )
  const timestamp = parts.t
  const signature = parts.v1
  if (!timestamp || !signature) return false

  const age = Math.abs(Date.now() / 1000 - Number(timestamp))
  if (!Number.isFinite(age) || age > SIGNATURE_TOLERANCE_SECONDS) return false

  const expected = createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`)
    .digest('hex')

  const expectedBuf = Buffer.from(expected, 'hex')
  const signatureBuf = Buffer.from(signature, 'hex')
  if (expectedBuf.length !== signatureBuf.length) return false

  return timingSafeEqual(expectedBuf, signatureBuf)
}

async function lookupCustomerEmail(customerId: string, secretKey: string): Promise<string> {
  try {
    const res = await fetch(`https://api.stripe.com/v1/customers/${encodeURIComponent(customerId)}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    })
    const data = (await res.json()) as { email?: string }
    return res.ok && data.email ? data.email : customerId
  } catch {
    return customerId
  }
}

async function sendEmail(
  to: string,
  subject: string,
  text: string,
  idempotencyKey?: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const from =
    process.env.WAITLIST_FROM || `Create Church Media <noreply@${siteConfig.domain}>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        // Stripe retries webhooks, so a retried event must not email twice.
        ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
      },
      body: JSON.stringify({ from, to: [to], reply_to: siteConfig.email, subject, text }),
    })
    if (!res.ok) console.error(`Stripe webhook email failed: ${res.status} (${subject})`)
  } catch {
    // Best-effort. A failed notification email should not fail the webhook.
    console.error(`Stripe webhook email failed to send (${subject})`)
  }
}

function notifyEmily(subject: string, text: string): Promise<void> {
  return sendEmail(process.env.WAITLIST_TO || siteConfig.email, subject, text)
}

// Sent once to each new client. The portal link is Stripe's login page, which
// emails a one-time code, so it is safe to share and works without a password.
function sendWelcomeEmail(to: string, eventId: string): Promise<void> {
  return sendEmail(
    to,
    'Welcome to Create Church Media',
    [
      "Thank you for choosing Create Church Media. I'm honored to design for your church, and I'll be in touch soon to get you set up.",
      `Your billing portal is here:\n${siteConfig.billingPortalUrl}`,
      'Enter this email address and Stripe will send you a one-time code to sign in. There you can view your invoices and billing details.',
      'Any questions, just reply to this email.',
      `${siteConfig.designer}\n${siteConfig.brand}`,
    ].join('\n\n'),
    `welcome-${eventId}`,
  )
}

export async function POST(req: Request): Promise<NextResponse> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const secretKey = process.env.STRIPE_SECRET_KEY
  const signatureHeader = req.headers.get('stripe-signature')

  if (!webhookSecret || !signatureHeader) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const payload = await req.text()

  if (!verifySignature(payload, signatureHeader, webhookSecret)) {
    return NextResponse.json({ ok: false, error: 'invalid_signature' }, { status: 400 })
  }

  let event: StripeEvent
  try {
    event = JSON.parse(payload) as StripeEvent
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_payload' }, { status: 400 })
  }

  const object = event.data?.object
  const customerId = object?.customer

  if (event.type === 'invoice.paid') {
    const amount = object?.amount_paid ?? 0
    if (object?.customer_email && object.hosted_invoice_url && amount > 0) {
      const dollars = (amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      await sendEmail(
        object.customer_email,
        `Your ${siteConfig.brand} invoice${object.number ? ` ${object.number}` : ''}`,
        [
          `Thank you for your payment of ${dollars}.`,
          `View or download your invoice here:\n${object.hosted_invoice_url}`,
          `You can see all of your invoices in your billing portal:\n${siteConfig.billingPortalUrl}`,
          `${siteConfig.designer}\n${siteConfig.brand}`,
        ].join('\n\n'),
        `invoice-${event.id}`,
      )
    }
    return NextResponse.json({ ok: true })
  }

  // The annual plan is a one-time payment, so it never fires subscription events.
  // Bank payments settle later: "completed" arrives unpaid, then an async event.
  if (object?.mode === 'payment') {
    const buyer = object.customer_details?.email || customerId || 'A church'
    const paid =
      (event.type === 'checkout.session.completed' && object.payment_status === 'paid') ||
      event.type === 'checkout.session.async_payment_succeeded'

    if (paid) {
      if (object.customer_details?.email) {
        await sendWelcomeEmail(object.customer_details.email, event.id)
      }
      await notifyEmily(
        '[CCM] New annual plan',
        `New annual plan: ${buyer} just paid $${siteConfig.pricing.annual.toLocaleString()} for the 12-month CCM annual plan.`,
      )
    } else if (event.type === 'checkout.session.async_payment_failed') {
      await notifyEmily(
        '[CCM] Annual plan payment failed',
        `Annual plan payment failed: the bank payment from ${buyer} did not go through.`,
      )
    }
    return NextResponse.json({ ok: true })
  }

  if (event.type === 'customer.subscription.created' && customerId) {
    const email = secretKey ? await lookupCustomerEmail(customerId, secretKey) : customerId
    if (email.includes('@')) await sendWelcomeEmail(email, event.id)
    await notifyEmily(
      '[CCM] New subscriber',
      `New subscriber: ${email} just signed up for the CCM Monthly Subscription.`,
    )
  } else if (event.type === 'customer.subscription.deleted' && customerId) {
    const email = secretKey ? await lookupCustomerEmail(customerId, secretKey) : customerId
    await notifyEmily(
      '[CCM] Subscriber canceled',
      `Subscriber canceled: ${email} has canceled the CCM Monthly Subscription.`,
    )
  }

  return NextResponse.json({ ok: true })
}
