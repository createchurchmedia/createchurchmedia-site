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
              This summarizes the{' '}
              <a href={siteConfig.agreements.annual}>
                Annual Subscription Agreement (PDF)
              </a>
              , which is the entire agreement for your annual term and controls
              over this page.
            </p>

            <h3>What&rsquo;s included</h3>
            <p>
              Unlimited graphic design for your church: sermon series,
              announcement graphics, social media, logos and branding, youth and
              kids ministry materials, and signage, mailers, and print. You get
              unlimited requests, unlimited revisions, and source files with
              every project. Every request goes to Emily directly, so you work
              with the same designer every time.
            </p>
            <p>
              This subscription is strictly graphic design. It does not include
              video production or editing, or website design or coding. It also
              does not include weekly sermon notes or presentation slides, such
              as PowerPoint or ProPresenter scripture and sermon slides.
              Booklet-style projects are limited to four pages or fewer. For
              larger booklets, manuals, and annual reports, Emily can provide a
              few templates for your team to build from, but she is unable to
              design the full document with your content and text. These projects
              require a significant amount of time and fall outside the scope of
              the subscription.
            </p>

            <h3>How &ldquo;unlimited&rdquo; works</h3>
            <p>
              Unlimited means unlimited requests and revisions inside a single
              shared queue with one designer. Requests are handled in the order
              they arrive, and flagged rush work goes first. We keep working on
              each project together until you are happy with the finished result.
            </p>
            <p>
              Unlimited does not promise unlimited simultaneous projects. If the
              number of projects requested grows beyond what one designer can
              realistically complete, such as a large number of projects at once,
              Emily reserves the right to limit your active projects to a
              reasonable amount. Emily will determine that amount based on the
              fee received and the time it takes one person to design the
              projects.
            </p>

            <h3>Planning ahead and rush requests</h3>
            <p>
              Standard turnaround for projects is seven days, and your team will
              strive to give at least one week of notice on projects. This is not
              always possible, and Emily understands that. Same-day turnaround is
              possible depending on Emily&rsquo;s availability, but it is not
              guaranteed. If rush requests become a regular occurrence, Emily may
              talk with you about creating more room in turnaround times.
            </p>

            <h3>Sending requests</h3>
            <p>
              Send requests however works best for your team: email with the
              project title in the subject line, or a shared platform such as
              Basecamp. Requests can come from one point person or from several
              department heads, whichever your church prefers.
            </p>

            <h3>Term</h3>
            <p>
              The annual plan is a fixed 12-month term. It does not renew. When
              the term ends, your church is welcome to sign up for another year at
              that time. Pricing for a new term is set when you sign up.
            </p>

            <h3>Price and payment</h3>
            <p>
              The annual plan is ${siteConfig.pricing.annual.toLocaleString()},
              billed as one payment. It is a one-time charge, not a recurring
              subscription. This 12-month prepay saves $1,674 compared with the
              monthly plan of ${siteConfig.pricing.monthly} per month.
            </p>

            <h3>No refunds</h3>
            <p>
              The annual fee is paid in full at the start of the term and is not
              refundable. The annual plan cannot be canceled early by either
              party, except as described under Failed payments and ending for
              cause. You are welcome to stop using Emily&rsquo;s services at any
              point, but no refund is issued for the remaining months. You keep
              full access to your subscription through the end of the 12-month
              term.
            </p>

            <h3>Failed payments and ending for cause</h3>
            <p>
              If a payment fails or is not received, all work pauses immediately
              and resumes once the payment is resolved. Emily may end the
              agreement for cause, including unresolved non-payment or a serious
              breach of the agreement. If Emily ends it for cause, no refund is
              issued.
            </p>

            <h3>Your materials</h3>
            <p>
              Your church promises that it has the rights and permission to use
              every photo, logo, font, and piece of text it sends to Emily, and
              that using them in your designs does not violate anyone else&rsquo;s
              rights. Please confirm this before sending materials.
            </p>

            <h3>Proofreading and print</h3>
            <p>
              Your church should carefully proofread every design before it goes
              to print, including spelling, names, dates, times, and addresses.
              Once you approve a design, Emily is not responsible for errors in
              the printed result, including any reprinting costs.
            </p>

            <h3>File ownership</h3>
            <p>
              Everything designed for you belongs to you: final files, source
              files, and brand assets. If we ever part ways, you keep everything
              already delivered.
            </p>

            <h3>Fair use</h3>
            <p>
              This subscription is built around one designer working through one
              queue for a reasonable number of churches. If usage is clearly
              outside normal use for a single church&rsquo;s design needs, Emily
              may pause new requests or talk with you about a different
              arrangement.
            </p>

            <h3>General terms</h3>
            <p>
              The agreement is governed by the laws of the State of Indiana.
              Changes must be in writing and signed by both parties. If any part
              cannot be enforced, the rest stays in effect. If either party does
              not enforce a term at some point, that does not waive the term.
              Electronic signatures and signed copies count as originals.
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
