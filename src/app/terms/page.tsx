import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { siteConfig } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    'The Create Church Media monthly and annual subscription agreements: what each plan includes and how billing, cancellation, and refunds work.',
  path: '/terms',
})

const LAST_UPDATED = 'November 4, 2026'

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow="Terms" title="Terms of Service.">
        <p>Each plan has its own agreement. Last updated {LAST_UPDATED}.</p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <FadeIn className="mx-auto max-w-3xl">
          <div className="prose-blog">
            <p>
              Create Church Media is a d/b/a of Church Create Media Group LLC.
              The monthly plan and the annual plan have different terms, so
              please read the agreement for the plan you choose. If anything
              is unclear, email Emily at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{' '}
              before you subscribe.
            </p>
            <ul>
              <li>
                <a href="#monthly">Monthly plan</a>: month to month, $
                {siteConfig.pricing.monthly} per month.{' '}
                <a href={siteConfig.agreements.monthly}>
                  Monthly Subscription Agreement (PDF)
                </a>
              </li>
              <li>
                <a href="#annual">Annual plan</a>: fixed 12-month term, $
                {siteConfig.pricing.annual.toLocaleString()} as one payment.{' '}
                <a href={siteConfig.agreements.annual}>
                  Annual Subscription Agreement (PDF)
                </a>
              </li>
            </ul>

            <h2 id="monthly">Monthly plan: Month-to-Month Subscription Agreement</h2>
            <p>
              This is the text of the{' '}
              <a href={siteConfig.agreements.monthly}>
                Monthly Subscription Agreement (PDF)
              </a>
              .
            </p>
            <p>
              This Agreement is between Church Create Media Group LLC, an
              Indiana limited liability company d/b/a Create Church Media
              (&ldquo;Designer&rdquo;), and the church named below
              (&ldquo;Client&rdquo;).
            </p>

            <h3>1. Services</h3>
            <p>
              Designer shall provide graphic design for one church: sermon
              series, announcements, social graphics, logos and branding, youth
              and kids, signage, mailers, and print. Unlimited requests and
              revisions, one queue, in order, rush first. Not unlimited projects
              at once. If volume exceeds what one designer can complete for the
              fee, Designer may cap active projects. Excluded: video, websites,
              weekly sermon or ProPresenter slides, and booklets over four
              pages. Longer items are templates only.
            </p>

            <h3>2. Turnaround</h3>
            <p>
              Seven (7) days. Designer may take a same-day rush when
              practicable. Same-day is not guaranteed.
            </p>

            <h3>3. Term and Fee</h3>
            <p>
              Month to month from the Start Date. Fee: $697.00 per month, billed
              at createchurchmedia.com/subscribe (monthly plan). Either Party may
              end the subscription by email notice, and Client shall also cancel
              through the billing portal, effective at the end of the month
              already paid. That month is not refundable. Access continues
              through the last day of that month.
            </p>

            <h3>4. Non-Payment and Cause</h3>
            <p>
              If a payment fails, services shall pause until it clears. Designer
              may terminate for non-payment or material breach. Amounts paid are
              not refundable.
            </p>

            <h3>5. Ownership</h3>
            <p>
              Client shall own the finished work. Designer may display it in
              Designer&rsquo;s portfolio and marketing.
            </p>

            <h3>6. Warranty and Indemnity</h3>
            <p>
              Client warrants it has all rights in the photos, music, lyrics,
              scripture translations, logos, and text it provides, and that
              Designer&rsquo;s use as directed will not infringe any right.
              Client shall indemnify Designer from any claim arising from those
              materials or Client&rsquo;s instructions.
            </p>

            <h3>7. Approval</h3>
            <p>
              Client shall proofread spelling, names, dates, times, and addresses
              before print. After Client approves a design, Designer has no
              liability for print errors or reprint costs. Print, postage, stock,
              and font licenses are extra, paid by Client.
            </p>

            <h3>8. Limitation of Liability</h3>
            <p>
              DESIGNER&rsquo;S TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID IN
              THE TWELVE (12) MONTHS BEFORE THE CLAIM. NEITHER PARTY SHALL BE
              LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, INCLUDING LOST ATTENDANCE OR CONTRIBUTIONS.
            </p>

            <h3>9. General</h3>
            <p>
              Indiana law governs. Exclusive venue: Hamilton County, Indiana
              courts. Electronic signatures valid under Ind. Code &sect; 26-2-8.
              Designer is an independent contractor. Notices by email to{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> and
              Client&rsquo;s email above. Entire agreement. Amendments signed by
              both Parties. If one part fails, the rest stands. Failure to
              enforce is not a waiver. Counterparts, including electronic,
              permitted.
            </p>

            <h2 id="annual">Annual plan: Annual Subscription Agreement</h2>
            <p>
              This is the text of the{' '}
              <a href={siteConfig.agreements.annual}>
                Annual Subscription Agreement (PDF)
              </a>
              .
            </p>
            <p>
              This Agreement is between Church Create Media Group LLC, an
              Indiana limited liability company d/b/a Create Church Media
              (&ldquo;Designer&rdquo;), and the church named below
              (&ldquo;Client&rdquo;).
            </p>

            <h3>1. Services</h3>
            <p>
              Designer shall provide graphic design for one church: sermon
              series, announcements, social graphics, logos and branding, youth
              and kids, signage, mailers, and print. Unlimited requests and
              revisions, one queue, in order, rush first. Not unlimited projects
              at once. If volume exceeds what one designer can complete for the
              fee, Designer may cap active projects. Excluded: video, websites,
              weekly sermon or ProPresenter slides, and booklets over four
              pages. Longer items are templates only.
            </p>

            <h3>2. Turnaround</h3>
            <p>
              Seven (7) days. Designer may take a same-day rush when
              practicable. Same-day is not guaranteed.
            </p>

            <h3>3. Term and Fee</h3>
            <p>
              Twelve (12) months from the Start Date. Fee: $6,690.00, paid once
              in full at createchurchmedia.com/subscribe (annual plan) before
              services begin. Not refundable. Neither Party may end this
              Agreement early except under Section 4. Client may stop sending
              requests. Access continues through the last day of the term.
            </p>

            <h3>4. Non-Payment and Cause</h3>
            <p>
              If payment is not received, services shall not start or shall pause
              until it clears. Designer may terminate for non-payment or material
              breach. No refund.
            </p>

            <h3>5. Ownership</h3>
            <p>
              Client shall own the finished work. Designer may display it in
              Designer&rsquo;s portfolio and marketing.
            </p>

            <h3>6. Warranty and Indemnity</h3>
            <p>
              Client warrants it has all rights in the photos, music, lyrics,
              scripture translations, logos, and text it provides, and that
              Designer&rsquo;s use as directed will not infringe any right.
              Client shall indemnify Designer from any claim arising from those
              materials or Client&rsquo;s instructions.
            </p>

            <h3>7. Approval</h3>
            <p>
              Client shall proofread spelling, names, dates, times, and addresses
              before print. After Client approves a design, Designer has no
              liability for print errors or reprint costs. Print, postage, stock,
              and font licenses are extra, paid by Client.
            </p>

            <h3>8. Limitation of Liability</h3>
            <p>
              DESIGNER&rsquo;S TOTAL LIABILITY SHALL NOT EXCEED THE FEE PAID
              UNDER THIS AGREEMENT. NEITHER PARTY SHALL BE LIABLE FOR INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
              LOST ATTENDANCE OR CONTRIBUTIONS.
            </p>

            <h3>9. General</h3>
            <p>
              Indiana law governs. Exclusive venue: Hamilton County, Indiana
              courts. Electronic signatures valid under Ind. Code &sect; 26-2-8.
              Designer is an independent contractor. Notices by email to{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> and
              Client&rsquo;s email above. Entire agreement. Amendments signed by
              both Parties. If one part fails, the rest stands. Failure to
              enforce is not a waiver. Counterparts, including electronic,
              permitted.
            </p>

            <h2>Questions</h2>
            <p>
              Email Emily directly at{' '}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{' '}
              with any question about your subscription, billing, or these terms.
            </p>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
