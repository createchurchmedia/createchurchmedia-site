import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { siteConfig } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    'What the Create Church Media subscription includes and how billing, cancellation, and refunds work on the monthly and annual plans.',
  path: '/terms',
})

const LAST_UPDATED = 'November 4, 2026'

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow="Terms" title="Terms of Service.">
        <p>Straightforward terms for a straightforward subscription. Last updated {LAST_UPDATED}.</p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <FadeIn className="mx-auto max-w-3xl">
          <div className="prose-blog">
            <p>
              These are the terms for the monthly and annual subscriptions
              from Church Create Media Group LLC, doing business as Create
              Church Media. If your church has signed an Annual Subscription
              Agreement, that signed agreement is the entire agreement for
              your annual term and controls over this page. If anything here
              is unclear, email Emily at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{' '}
              before you subscribe and she will walk you through it.
            </p>

            <h2>What the subscription includes</h2>
            <p>
              The subscription is unlimited graphic design for your church:
              sermon series, announcement graphics, social media, logos and
              branding, youth and kids ministry materials, and signage,
              mailers, and print. You get unlimited requests, unlimited
              revisions, same-day rush when needed (see Planning ahead and
              rush requests below), and source files with every project.
              Every request goes to Emily directly, so you work with the same
              designer every time.
            </p>

            <h2>What the subscription does not include</h2>
            <p>
              This subscription is strictly graphic design. It does not
              include video production or editing, or website design or
              coding. It also does not include weekly sermon notes or
              presentation slides, such as PowerPoint or ProPresenter
              scripture and sermon slides.
            </p>
            <p>
              Booklet-style projects are limited to four pages or fewer. For
              larger booklets, manuals, and annual reports, Emily can provide
              a few templates for your team to build from, but she is unable
              to design the full document with your content and text. These
              projects require a significant amount of time and fall outside
              the scope of the subscription.
            </p>

            <h2>How &ldquo;unlimited&rdquo; works</h2>
            <p>
              &ldquo;Unlimited&rdquo; means unlimited requests and revisions
              inside a single shared queue with one designer. Requests are
              handled in the order they arrive, and flagged rush work goes
              first. We keep working on each project together until you are
              happy with the finished result.
            </p>
            <p>
              Unlimited does not promise unlimited simultaneous projects. If
              the number of projects requested grows beyond what one designer
              can realistically complete, such as a large number of projects
              at once, Emily reserves the right to limit your active projects
              to a reasonable amount. Emily will determine that amount based
              on the fee received and the time it takes one person to design
              the projects.
            </p>

            <h2>Planning ahead and rush requests</h2>
            <p>
              Standard turnaround for projects is one full week (seven days),
              and your team will strive to give at least one week of notice on
              projects. This is not always possible, and Emily understands
              that. Same-day rush requests are accommodated when possible.
              Flag the urgency and Emily will do her best, though a same-day
              turnaround cannot be guaranteed. If rush requests become a
              regular occurrence, Emily may talk with you about creating more
              room in turnaround times.
            </p>

            <h2>Sending requests</h2>
            <p>
              Send requests however works best for your team: email with the
              project title in the subject line, or a shared platform such as
              Basecamp. Requests can come from one point person or from
              several department heads, whichever your church prefers.
            </p>

            <h2>Monthly plan</h2>
            <p>
              The monthly plan is ${siteConfig.pricing.monthly} per month, billed
              through Stripe. Billing starts on the day you subscribe and
              renews on that same date each month until you cancel. It is
              month-to-month, with no long-term contract. You can cancel at
              any time through the subscriber portal (linked from the
              subscribe page) or by emailing Emily.
            </p>
            <p>
              Canceling stops future billing. It does not refund the current
              billing period, and we do not offer refunds for completed months
              of service. You keep access through the end of the period you
              already paid for. If something about your experience did not
              meet expectations, email Emily first. She would rather make it
              right than have you leave unhappy.
            </p>

            <h2>Annual plan</h2>
            <p>
              The annual plan is ${siteConfig.pricing.annual.toLocaleString()},
              billed as one payment. It is a one-time charge, not a recurring
              subscription. This 12-month prepay saves $1,674 compared with the
              monthly plan of ${siteConfig.pricing.monthly} per month.
            </p>
            <p>
              The annual plan is a fixed 12-month term. It does not renew
              automatically. When the term ends, your church is welcome to sign
              up for another year at that time. Pricing for a new term is set
              when you sign up.
            </p>

            <h2>Annual plan: no refunds</h2>
            <p>
              The annual fee is paid in full at the start of the term and is
              not refundable. The annual plan cannot be canceled early by
              either party, except as described under Failed payments and
              ending for cause. You are welcome to stop using Emily&rsquo;s
              services at any point, but no refund is issued for the remaining
              months. You keep full access to your subscription through the end
              of the 12-month term.
            </p>

            <h2>Failed payments and ending for cause</h2>
            <p>
              If a payment fails or is not received, all work pauses
              immediately and resumes once the payment is resolved. Emily may
              end your subscription for cause, including unresolved non-payment
              or a serious breach of these terms. If Emily ends your
              subscription for cause, no refund is issued.
            </p>

            <h2>Your materials</h2>
            <p>
              Your church promises that it has the rights and permission to
              use every photo, logo, font, and piece of text it sends to Emily,
              and that using them in your designs does not violate anyone
              else&rsquo;s rights. Please confirm this before sending materials.
            </p>

            <h2>Proofreading and print</h2>
            <p>
              Your church should carefully proofread every design before it
              goes to print, including spelling, names, dates, times, and
              addresses. Once you approve a design, Emily is not responsible
              for errors in the printed result, including any reprinting costs.
            </p>

            <h2>File ownership</h2>
            <p>
              Everything designed for you belongs to you: final files, source
              files, and brand assets. If we ever part ways, you keep
              everything already delivered.
            </p>

            <h2>Fair use</h2>
            <p>
              This subscription is built around one designer working through
              one queue for a reasonable number of churches. If usage is
              clearly outside normal use for a single church&rsquo;s design
              needs, Emily may pause new requests or talk with you about a
              different arrangement.
            </p>

            <h2>General terms</h2>
            <p>
              These terms are governed by the laws of the State of Indiana. If
              any part of these terms cannot be enforced, the rest stays in
              effect. If either party does not enforce a term at some point,
              that does not waive the term.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              If these terms change in a meaningful way, we will update the
              date at the top of this page and, for active subscribers, send a
              heads up by email. Changes to a signed Annual Subscription
              Agreement must be in writing and signed by both parties.
            </p>

            <h2>Questions</h2>
            <p>
              Email Emily directly at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{' '}
              with any question about your subscription, billing, or these
              terms.
            </p>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
