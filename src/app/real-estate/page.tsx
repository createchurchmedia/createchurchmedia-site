import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { EmilyAvatar } from '@/components/EmilyAvatar'
import {
  PortfolioCategories,
  type PortfolioCategory,
} from '@/components/PortfolioGallery'
import { FaqJsonLd, RealEstateServiceJsonLd } from '@/components/JsonLd'
import { siteConfig } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Graphic design for real estate agents',
  description:
    'Graphic design for real estate agents at a flat $697 a month. Listing graphics, signs, a media kit and post-closing follow-up pieces, designed and handed off ready to use.',
  path: '/real-estate',
})

// This page is a direct traffic destination for agents, so the call to action
// is a plain email to Emily. The site-wide wait-list modal asks for a church
// website domain and is worded for churches, so it stays off this page.
const EMAIL_HREF = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  'Real estate design subscription',
)}`

const SAMPLES: PortfolioCategory[] = [
  {
    key: 'real-estate',
    title: 'Sample work',
    description:
      'A new construction guide, a listing carousel, a listing presentation, two yard signs and a social kit, all designed to read as one brand.',
    aspectClass: 'aspect-square',
    items: [
      {
        src: '/real-estate/agent-social-kit-showcase.webp',
        alt: 'Six-post Instagram agent social kit in black and yellow, with listing, team and open house posts',
        category: 'Social kit',
      },
      {
        src: '/real-estate/listing-carousel-showcase.webp',
        alt: 'Six-post Instagram listing carousel in olive green and cream, from a just listed cover to property details and price',
        category: 'Listing carousel',
      },
      {
        src: '/real-estate/listing-presentation.webp',
        alt: 'Listing presentation cover with an agent portrait, a handwritten sold over a shingled house, and the title The Ultimate Guide to Selling Your Home',
        category: 'Listing presentation',
      },
      {
        src: '/real-estate/new-construction.webp',
        alt: 'New construction guide cover for a sample agent brand, with a modern white house and pool under a serif headline',
        category: 'Buyer guide',
      },
      {
        src: '/real-estate/yard-sign-1.webp',
        alt: 'Dark for sale yard sign with a monogram, agent headshot, phone number and website, mocked up in front of a white brick house',
        category: 'Yard sign',
      },
      {
        src: '/real-estate/yard-sign-2.webp',
        alt: 'White for sale yard sign with a cutout agent portrait, name, phone number and email, mocked up in front of a white brick house',
        category: 'Yard sign',
      },
    ],
  },
]

// The three pieces agents ask about first, per the 2026-10-12 planning call:
// a media kit, follow-up after closing, and one consistent brand everywhere.
const FEATURES = [
  {
    title: 'A media kit.',
    body:
      'One link with your headshot, logo, colors and bio. When you sponsor an event, the organizer gets your brand right on the flyer, the website and the socials.',
  },
  {
    title: 'Follow-up after closing.',
    body:
      'Six month check-ins, one year houseversary cards and seasonal notes with your branding on them, ready to send to the clients who already closed with you.',
  },
  {
    title: 'One brand everywhere.',
    body:
      'The same headshot, logo and colors on your signs, your socials and your listings, so the people who met you once can find you again.',
  },
]

const PLAN_BULLETS = [
  'One designer.',
  'One active project at a time.',
  'As many projects a month as you can handle.',
  'Design and handoff.',
]

type ServiceGroup = { label: string; items: string[] }

const SERVICES: ServiceGroup[] = [
  {
    label: 'Listings',
    items: [
      'Just listed and just sold posts for every platform',
      'Open house graphics with the date, time and address',
      'Property flyers and brochures, print ready',
      'Feature sheets that walk buyers through the home',
      'Listing carousels that tour the property slide by slide',
      'Coming soon and price improvement posts',
      'New construction guides and builder collateral',
    ],
  },
  {
    label: 'Sellers',
    items: [
      'Pre-listing packets that arrive before you do',
      'Listing presentations built around how you sell',
      'Seller guides from listing day to closing day',
      'Comparative market analysis layouts for your numbers',
      'Net sheet templates you fill in per property',
    ],
  },
  {
    label: 'Buyers',
    items: [
      'Buyer guides from the first showing to the keys',
      'First time buyer explainers for every step',
      'Financing and closing cost explainers in plain words',
      'Neighborhood and community guides for the areas you serve',
      'Relocation packets for buyers moving in from out of town',
    ],
  },
  {
    label: 'Signs',
    items: [
      'Directional arrows, where your state and city allow them',
      'Open house signs sized for the generic wood A-frame',
      'Listing signs in the same brand kit as the rest',
      'Sold signs for the day the deal closes',
    ],
  },
  {
    label: 'Print',
    items: [
      'Business cards that match the sign in the yard',
      'Door hangers for the streets you farm',
      'Postcards and mailers sized for EDDM',
      'Car magnets that match the rest of your brand',
      'Event banners and table displays',
    ],
  },
  {
    label: 'Social',
    items: [
      'Carousel templates, fun and light or value add',
      'Current and seasonal content templates for the month ahead',
      'Testimonial and review graphics from your clients',
      'Instagram highlight covers in your brand',
      'Short form video covers and end cards',
      'Email newsletter templates you reuse every month',
    ],
  },
  {
    label: 'Brand',
    items: [
      'Media kit with your headshot, logo, colors and bio',
      'Logo and wordmark for your personal brand',
      'Full brand kit with colors, type and usage rules',
      'Matching profile photos and cover banners for every platform',
      'Email signatures for you and your team',
      'Website and listing page banners',
    ],
  },
  {
    label: 'Follow-up',
    items: [
      'Six month check-in cards for past clients',
      'One year houseversary cards',
      'Seasonal notes with your branding on them',
      'Closing congratulations pieces',
      'Client appreciation and event invitations',
    ],
  },
  {
    label: 'Team',
    items: [
      'Team branding for every agent on the roster',
      'Recruiting graphics for the agents you want to hire',
      'Agent announcement posts for new hires',
    ],
  },
]

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'What does unlimited mean?',
    answer:
      'One active project at a time, and as many projects in a month as you can handle. When one is handed off, send the next.',
  },
  {
    question: 'What is included?',
    answer:
      'Design and handoff. Emily designs the piece and sends you the finished files, ready to print or post. Posting, captions and account management stay with you.',
  },
  {
    question: 'Who does the work?',
    answer: 'Emily. Every project goes to her directly.',
  },
  {
    question: 'What is a media kit?',
    answer:
      'One link or PDF with your headshot, logo, colors and a short bio. When you sponsor an event or get featured, you send the link and your brand shows up correctly on their flyer, website and socials.',
  },
  {
    question: 'What are follow-up pieces?',
    answer:
      'Branded check-ins for the clients who already closed with you. A six month note, a one year houseversary card, a seasonal hello. You pick the moments and we design the pieces.',
  },
]

export default function RealEstatePage() {
  return (
    <>
      <RealEstateServiceJsonLd />
      <FaqJsonLd faqs={FAQS} />

      <PageIntro
        eyebrow="Real estate design subscription"
        title="Graphic design for real estate agents, done for you."
      >
        <p>
          A flat $697 a month. Send Emily what you need, go back to your
          showings, and get the finished files back ready to use. One project
          at a time, as many as you can handle each month.
        </p>
        <div className="mt-10">
          <Button href={EMAIL_HREF} variant="solid">
            Email Emily to get started
          </Button>
        </div>
      </PageIntro>

      {/* Sample work */}
      <section aria-label="Sample work">
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <PortfolioCategories categories={SAMPLES} />
          <FadeIn className="mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-base font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
            >
              See the full portfolio
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </FadeIn>
        </Container>
      </section>

      {/* The offer */}
      <section aria-label="The offer">
        <SectionIntro
          eyebrow="The offer"
          title="One designer. One flat fee. Your time back."
          className="mt-24 sm:mt-32 lg:mt-40"
        >
          <p>
            The agents busy enough to need design help have the least time to
            make it themselves. Emily designs it for you on a flat $697 a
            month and hands off the finished files.
          </p>
        </SectionIntro>

        <Container className="mt-16">
          <FadeInStagger faster>
            <ul role="list" className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <FadeIn as="li" key={feature.title}>
                  <Border className="pt-8">
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-neutral-950">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-neutral-600">
                      {feature.body}
                    </p>
                  </Border>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
      </section>

      {/* Pricing */}
      <section aria-label="Pricing">
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            <FadeIn className="relative flex flex-col rounded-3xl bg-neutral-950 p-10 text-white shadow-xl ring-1 ring-neutral-900">
              <p className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-cta)]">
                Monthly
              </p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl font-semibold tracking-tight">
                  ${siteConfig.pricing.monthly}
                </span>
                <span className="text-base text-neutral-300">/ month</span>
              </p>
              <p className="mt-4 text-base text-neutral-300">
                One flat fee for the design work. You send the request and get
                the finished files back.
              </p>
              <ul role="list" className="mt-8 space-y-3 text-base">
                {PLAN_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-block size-2 rounded-full bg-[var(--color-cta)]"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <Button
                  href={EMAIL_HREF}
                  variant="solid"
                  tone="dark"
                  className="w-full"
                >
                  Email Emily to get started
                </Button>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="flex items-center gap-4">
                <EmilyAvatar size={72} />
                <p className="max-w-sm text-base text-neutral-600">
                  You are working directly with Emily. One designer, end to
                  end.
                </p>
              </div>

              <Border className="mt-10 pt-10">
                <h2 className="font-display text-base font-semibold text-neutral-950">
                  What is included
                </h2>
                <p className="mt-6 text-base text-neutral-600">
                  Design and handoff. Emily designs the piece and sends you
                  the finished files, ready to print or post. Posting,
                  captions and account management stay with you.
                </p>
              </Border>

              <Border className="mt-10 pt-10">
                <h2 className="font-display text-base font-semibold text-neutral-950">
                  Questions first?
                </h2>
                <p className="mt-6 text-base text-neutral-600">
                  Reach Emily directly at{' '}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2"
                  >
                    {siteConfig.email}
                  </a>
                  .
                </p>
              </Border>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section aria-label="What we design">
        <SectionIntro
          eyebrow="What we design"
          title="Everything an agent needs designed, one project at a time."
          className="mt-24 sm:mt-32 lg:mt-40"
        >
          <p>
            Scan for what you need this week. Send it over and go back to
            work.
          </p>
        </SectionIntro>

        <Container className="mt-16">
          <FadeInStagger faster>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((group) => (
                <FadeIn key={group.label}>
                  <Border className="pt-6">
                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-neutral-950">
                      {group.label}
                    </h3>
                    <ul role="list" className="mt-4 divide-y divide-neutral-200">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="py-3 text-base leading-7 text-neutral-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Border>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>
        </Container>
      </section>

      {/* FAQ */}
      <section aria-label="Frequently asked questions">
        <SectionIntro
          eyebrow="FAQ"
          title="The questions agents ask first."
          className="mt-24 sm:mt-32 lg:mt-40"
        />
        <Container className="mt-16">
          <FadeIn>
            <dl className="divide-y divide-neutral-200">
              {FAQS.map((faq) => (
                <div
                  key={faq.question}
                  className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-12"
                >
                  <dt className="lg:col-span-5 font-display text-lg font-semibold tracking-tight text-neutral-950">
                    {faq.question}
                  </dt>
                  <dd className="lg:col-span-7 text-base leading-7 text-neutral-700">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </Container>
      </section>

      {/* Closing call to action. Mirrors ContactBlock, with an email button in
          place of the church wait-list modal. */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl text-balance">
                  Ready when you are.
                </h2>
                <div className="mt-6 text-xl text-neutral-300">
                  <p>
                    Email Emily with your name, your brokerage and the first
                    thing you need designed.
                  </p>
                </div>
                <div className="mt-10">
                  <Button href={EMAIL_HREF} variant="solid" tone="dark">
                    Email Emily
                  </Button>
                </div>
              </div>

              <FadeIn scaleIn className="hidden lg:block lg:justify-self-end">
                <EmilyAvatar size={300} className="ring-2 ring-white/15" />
              </FadeIn>
            </div>

            <Border className="mt-16 pt-10" invert>
              <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 text-sm">
                <div>
                  <dt className="font-display font-semibold uppercase tracking-wider text-white/70">
                    Email
                  </dt>
                  <dd className="mt-3">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-white hover:text-[var(--color-cta)]"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-display font-semibold uppercase tracking-wider text-white/70">
                    Based in
                  </dt>
                  <dd className="mt-3 text-white">
                    {siteConfig.city}, {siteConfig.state}
                  </dd>
                </div>
              </dl>
            </Border>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
