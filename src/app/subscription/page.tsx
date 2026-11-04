import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { Border } from '@/components/Border'
import { EmilyAvatar } from '@/components/EmilyAvatar'
import { ContactBlock } from '@/components/ContactBlock'
import { FaqJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Subscription',
  description:
    'One flat fee. Unlimited graphic design for churches. $697 a month or $6,690 annual prepay. Same designer, same access, same turn around times.',
  path: '/subscription',
})

const PLAN_BULLETS = [
  'One designer.',
  'Unlimited requests.',
  'Unlimited revisions.',
  'Same-day rush when possible.',
  'Source files included.',
]

const CATEGORIES = [
  {
    title: 'Sermon series',
    body:
      'Sermon series packages, all sizes included, custom built around your message and your church brand.',
  },
  {
    title: 'Announcements',
    body:
      'Weekly screen graphics for everything happening at your church. Events, baptisms, conferences, you name it. All sizes offered for every platform.',
  },
  {
    title: 'Logos and branding',
    body:
      'Church logos, color palettes, sub-brands for Youth, Kids, Women, Men, Missions, and more. Full brand identity built to last.',
  },
  {
    title: 'Social media',
    body:
      'Social media graphics and story templates. On-brand across every platform.',
  },
  {
    title: 'Youth and Kids',
    body:
      'Bright, on-brand graphics for your kids and youth ministries. Camp shirts, summer series, parent handouts, hallway signage.',
  },
  {
    title: 'Signage, mailers and print',
    body:
      'Lobby signs, exterior banners, large-format prints, business cards. Print-ready files formatted for your printer.',
  },
]

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'What does "unlimited" actually mean?',
    answer:
      'Unlimited requests and unlimited revisions at one flat price, inside a single shared queue with one designer. Requests are handled in the order they arrive, and flagged rush work goes first. We work together until you are completely happy with the finished project. Unlimited does not promise unlimited simultaneous projects. If the number of projects grows beyond what one designer can realistically complete, I reserve the right to limit your active projects to a reasonable amount.',
  },
  {
    question: 'How fast is turnaround?',
    answer:
      'Standard turnaround is one full week (seven days), and I ask your team to strive to give at least one week of notice. I understand that is not always possible. Flag the urgency and I will do my best to accommodate a same-day rush, though same-day cannot be guaranteed.',
  },
  {
    question: 'What is not included?',
    answer:
      'This subscription is strictly graphic design. It does not include video production or editing, website design or coding, or weekly sermon notes or presentation slides, such as PowerPoint or ProPresenter scripture and sermon slides. Booklet-style projects are limited to four pages or fewer. For larger booklets, manuals, and annual reports, I can provide a few templates for your team to build from, but I am unable to design the full document with your content and text.',
  },
  {
    question: 'Is there a contract?',
    answer:
      'The monthly plan is month to month, with no long-term contract. The annual plan is a fixed 12-month term, paid upfront as one payment, and saves you $1,674. It does not renew automatically. When the term ends, your church is welcome to sign up for another year, and pricing for a new term is set when you sign up.',
  },
  {
    question: 'Can I cancel or get a refund?',
    answer:
      'On the monthly plan you can cancel any time. Canceling stops future billing, does not refund the current billing period, and you keep access through the end of it. The annual fee is paid in full at the start of the term and is not refundable, and the annual plan cannot be canceled early except as described in the terms. You are welcome to stop using my services at any point, but no refund is issued for the remaining months, and you keep full access through the end of the 12-month term.',
  },
  {
    question: 'What if I have a slow month?',
    answer:
      'Usually churches have slower months and busier months, around holidays or big events. I have found that it generally ends up balancing out by the end of the year.',
  },
  {
    question: 'What about file ownership?',
    answer:
      'You own everything I design for you. Final files, source files, brand assets. If we ever part ways, you keep everything already delivered.',
  },
  {
    question: 'Will I work with the same designer every time?',
    answer:
      'Yes. Every project comes to Emily directly. Same designer, same access, same turnaround every time.',
  },
  {
    question: 'Do you do websites?',
    answer:
      'Website design and coding are not part of the subscription. I’ll happily make sure your site graphics are on-brand, and I work with a few church-friendly web developers I can refer you to if you need a full rebuild.',
  },
  {
    question: 'How do I send requests?',
    answer:
      'However works for your team. Some churches already have platforms in place like Basecamp, and if so, I am happy to jump on your team threads. Most churches just email me, putting the title of the project in the Email Subject, making it easy to go back and find projects conversations. I will match your rhythm and flow.',
  },
  {
    question: 'Can anyone on our staff request a project from Emily, or does she prefer one point-person to communicate through?',
    answer:
      'I have worked both ways depending on the preference of the church. I am happy to communicate with all your department heads on their individual design needs, or filter through one point-person if that is easier for your staff.',
  },
]

function PriceCard({
  header,
  price,
  period,
  tagline,
  checkoutHref,
  featured = false,
}: {
  header: string
  price: string
  period: string
  tagline: string
  checkoutHref: string
  featured?: boolean
}) {
  return (
    <FadeIn
      className={
        featured
          ? 'relative flex flex-col rounded-3xl bg-neutral-950 p-10 text-white shadow-xl ring-1 ring-neutral-900'
          : 'relative flex flex-col rounded-3xl bg-white p-10 text-neutral-950 shadow-sm ring-1 ring-neutral-200'
      }
    >
      {featured && (
        <div
          aria-label="Save 20%"
          className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-cta)] shadow-lg"
        >
          <span className="text-center text-xs font-bold leading-tight text-neutral-950">
            Save
            <br />
            20%
          </span>
        </div>
      )}
      <p
        className={
          featured
            ? 'font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-cta)]'
            : 'font-display text-sm font-semibold uppercase tracking-wider text-neutral-500'
        }
      >
        {header}
      </p>
      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-5xl font-semibold tracking-tight">
          {price}
        </span>
        <span className={featured ? 'text-base text-neutral-300' : 'text-base text-neutral-500'}>
          / {period}
        </span>
      </p>
      <p className={featured ? 'mt-4 text-base text-neutral-300' : 'mt-4 text-base text-neutral-600'}>
        {tagline}
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
        <a
          href={checkoutHref}
          className={
            featured
              ? 'block w-full rounded-md bg-[var(--color-cta)] px-6 py-4 text-center text-sm font-semibold text-neutral-950 transition hover:brightness-110'
              : 'block w-full rounded-md bg-neutral-950 px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-neutral-800'
          }
        >
          {featured ? 'Subscribe annually' : 'Subscribe monthly'}
        </a>
      </div>
    </FadeIn>
  )
}

export default function SubscriptionPage() {
  return (
    <>
      <ServiceJsonLd />
      <FaqJsonLd faqs={FAQS} />

      <PageIntro eyebrow="Subscription" title="One flat fee.">
        <p className="text-2xl text-neutral-700">Everything your church needs designed.</p>
        <p className="mt-4">
          A flat subscription, monthly or annual, with a standard one-week turnaround and same-day rush when possible. One designer who answers her own messages. Revisions are part of the deal.
        </p>
      </PageIntro>

      {/* Pricing cards */}
      <section aria-label="Subscription pricing">
      <Container className="mt-16 sm:mt-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <PriceCard
            header="Monthly"
            price="$697"
            period="month"
            tagline="Pay month to month. Cancel any time. Every file is yours to keep."
            checkoutHref="/api/checkout"
          />
          <PriceCard
            header="Annual prepay"
            price="$6,690"
            period="year"
            tagline="Pay for the year and save $1,674. A fixed 12-month term that does not renew automatically. The annual fee is not refundable."
            checkoutHref="/api/checkout?plan=annual"
            featured
          />
        </div>

        <FadeIn className="mt-10 flex items-center justify-center gap-4">
          <EmilyAvatar size={56} />
          <p className="max-w-sm text-base text-neutral-600">
            You&rsquo;re paying Emily directly. One designer, end to end.{' '}
            <Link href="/terms" className="font-semibold text-neutral-950 underline underline-offset-4 decoration-[var(--color-cta)] hover:decoration-2">
              Read the full terms.
            </Link>
          </p>
        </FadeIn>
      </Container>
      </section>

      {/* Categories */}
      <section aria-label="What's included">
      <SectionIntro
        eyebrow="Categories"
        title="Many categories, all under one subscription."
        className="mt-24 sm:mt-32 lg:mt-40"
      />
      <Container className="mt-16">
        <FadeInStagger faster>
          <ul role="list" className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <FadeIn as="li" key={cat.title}>
                <Border className="pt-6">
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-neutral-950">
                    {cat.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-neutral-600">{cat.body}</p>
                </Border>
              </FadeIn>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
      </section>

      {/* FAQ */}
      <section aria-label="Frequently asked questions">
      <SectionIntro
        eyebrow="FAQ"
        title="The questions I hear most."
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

      <ContactBlock heading="Join the wait list.">
        <p>
          Emily takes on a small number of new churches each quarter. Drop your church name and email on the wait list and she will reach out personally by email when a spot opens.
        </p>
      </ContactBlock>
    </>
  )
}
