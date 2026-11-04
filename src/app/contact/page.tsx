import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { PageIntro } from '@/components/PageIntro'
import { SignUpButton } from '@/components/sign-up/SignUpButton'
import { EmilyPortrait } from '@/components/EmilyAvatar'
import { siteConfig } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Talk to Emily',
  description:
    'Share your church name and email, and Emily will reach out to schedule an appointment.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Talk to Emily.">
        <p>
          Share your church name and email, and Emily will reach out to schedule an appointment.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-3xl bg-neutral-50 p-8 ring-1 ring-inset ring-neutral-900/5">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
                Get started
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Tell Emily who you are and where to reach you. It takes about
                thirty seconds, and she follows up personally by email to
                schedule an appointment.
              </p>
              <div className="mt-8">
                <SignUpButton source="contact-page" />
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-10 max-w-md">
              <EmilyPortrait width={440} />
              <div className="mt-5 rounded-2xl bg-neutral-50 p-5 ring-1 ring-inset ring-neutral-900/5">
                <p className="text-base text-neutral-700">
                  This is who reads every signup. Emily will reach out personally
                  by email to schedule an appointment.
                </p>
              </div>
            </div>

            <h2 className="font-display text-base font-semibold text-neutral-950">
              How it works
            </h2>
            <p className="mt-6 text-base text-neutral-600">
              After you reach out, Emily emails you personally to schedule an
              appointment and talk through your church, your design needs, and
              what onboarding looks like. No automated sequences, no
              sales calls you did not ask for.
            </p>

            <Border className="mt-10 pt-10">
              <h2 className="font-display text-base font-semibold text-neutral-950">
                Prefer email?
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                You can also reach Emily directly at{' '}
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
                >
                  {siteConfig.email}
                </Link>
                .
              </p>
            </Border>

            <Border className="mt-10 pt-10">
              <h2 className="font-display text-base font-semibold text-neutral-950">
                The offer
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                Unlimited church graphic design on a flat ${siteConfig.pricing.monthly} per
                month subscription. One designer, unlimited requests and
                revisions, and the finished work is yours.
              </p>
            </Border>
          </FadeIn>
        </div>
      </Container>
    </>
  )
}
