import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

const faqGroups = [
  {
    id: 'delivery',
    title: 'Delivery',
    description: 'Shipping times, tracking, and delivery options.',
    questions: [
      {
        question: 'How long does delivery take?',
        answer:
          'Standard delivery takes 3–5 business days, express 1–2 business days, and pickup point 2–3 business days. Delivery time starts once your order ships, which is usually within one business day of ordering.',
      },
      {
        question: 'How can I track my order?',
        answer:
          "Sign in, open Account, then Order history, and select View details on the order. You'll also get a tracking link by email once the order ships.",
      },
      {
        question: 'Do you ship internationally?',
        answer:
          "We currently ship within the countries listed at checkout. If your country isn't listed, contact us and we'll let you know if it can be arranged.",
      },
    ],
  },
  {
    id: 'returns',
    title: 'Returns',
    description: 'Return windows, refunds, and damaged items.',
    questions: [
      {
        question: 'Can I return a product?',
        answer:
          'Yes. You have 30 days from delivery to return unused items in their original packaging. See the Shipping and returns page for the full steps.',
      },
      {
        question: 'When will I get my refund?',
        answer:
          'We refund to your original payment method within 5–7 business days after the returned item reaches our warehouse.',
      },
      {
        question: 'What if my item arrived damaged?',
        answer:
          "Email support@lumastore.com within 7 days of delivery with your order number and photos of the item and packaging. We'll send a replacement or a full refund, including shipping.",
      },
    ],
  },
  {
    id: 'payment',
    title: 'Coupons & payment',
    description: 'Discount codes and accepted payment methods.',
    questions: [
      {
        question: 'How do coupons work?',
        answer:
          'Enter your code in the coupon box on the cart page and select Apply. One coupon can be used per order. Try WELCOME10 for 10% off your first order, or FREESHIP for free shipping.',
      },
      {
        question: 'What payment methods are accepted?',
        answer:
          'We accept Visa, Mastercard, and American Express. Payments are encrypted, and we never store your full card number.',
      },
      {
        question: 'Why was my coupon rejected?',
        answer:
          "The code may have expired, already been used, or not met the order's minimum amount. Check the terms shown next to the code, or contact us if it still looks wrong.",
      },
    ],
  },
  {
    id: 'products',
    title: 'Products',
    description: 'Warranty, stock, and product details.',
    questions: [
      {
        question: 'Do products come with a warranty?',
        answer:
          'Most products include a manufacturer warranty of 1–2 years. The exact length is listed under Specifications on each product page.',
      },
      {
        question: 'What if an item is out of stock?',
        answer:
          "Add it to your wishlist and select Notify me. We'll email you as soon as it's back in stock.",
      },
    ],
  },
  {
    id: 'account',
    title: 'Account',
    description: 'Signing in, orders, and your profile.',
    questions: [
      {
        question: 'Do I need an account to place an order?',
        answer:
          'No, you can check out as a guest. Creating an account lets you track orders, save addresses, and build a wishlist.',
      },
      {
        question: 'How do I reset my password?',
        answer:
          "Select Forgot password on the sign-in page and enter your email. We'll send a link to set a new password.",
      },
    ],
  },
] as const

export function FaqPage() {
  useEffect(() => {
    document.title = 'FAQ — LumaStore'
  }, [])

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header />

      <main>
        <div className='mx-auto max-w-[1180px] px-6 pb-16 pt-7'>
          <div className='mb-[18px] text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            {' / FAQ'}
          </div>

          <div className='mb-10 max-w-[64ch]'>
            <h1 className='mb-3 text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] text-text max-[860px]:text-[28px]'>
              Frequently asked questions
            </h1>
            <p className='text-base text-text-muted'>
              Quick answers about delivery, returns, coupons, and payment. Can&apos;t find yours? Contact us and we&apos;ll help.
            </p>
          </div>

          <div className='grid grid-cols-[200px_minmax(0,1fr)] items-start gap-9 max-[860px]:grid-cols-1'>
            <nav
              aria-label='FAQ topics'
              className='sticky top-[88px] flex flex-col gap-0.5 max-[860px]:static max-[860px]:flex-row max-[860px]:flex-wrap max-[860px]:gap-1.5'
            >
              {faqGroups.map(({ id, title }) => (
                <a
                  href={`#${id}`}
                  key={id}
                  className='rounded-[9px] px-3 py-[9px] text-sm font-bold text-text-muted hover:text-text'
                >
                  {title}
                </a>
              ))}
            </nav>

            <div>
              {faqGroups.map(({ id, title, description, questions }) => (
                <section
                  id={id}
                  key={id}
                  className='mb-10 scroll-mt-[88px]'
                >
                  <h2 className='mb-1.5 text-[19px] font-extrabold tracking-[-0.02em]'>{title}</h2>
                  <p className='mb-3.5 text-[13px] text-text-muted'>{description}</p>

                  {questions.map(({ question, answer }, index) => (
                    <details
                      key={question}
                      open={id === 'delivery' && index === 0}
                      className={[
                        'group border-b border-border py-4',
                        id === 'delivery' && index === 0 ? 'border-t' : '',
                      ].join(' ')}
                    >
                      <summary className='flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-bold marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden'>
                        {question}
                        <span className='shrink-0 text-xl leading-none text-primary transition-transform duration-150 group-open:rotate-45'>+</span>
                      </summary>
                      <p className='mt-2.5 max-w-[68ch] text-sm text-text-muted'>{answer}</p>
                    </details>
                  ))}
                </section>
              ))}

              <div className='mt-2 flex flex-wrap items-center justify-between gap-5 rounded-[20px] bg-primary px-[44px] py-10 text-on-primary max-[860px]:px-6 max-[860px]:py-7'>
                <h3 className='max-w-[30ch] text-2xl font-extrabold tracking-[-0.02em]'>Didn&apos;t find your answer?</h3>
                <Link
                  to='/contact'
                  className='inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius)] bg-accent px-[22px] py-3 text-sm font-bold leading-[1.6] text-on-accent transition-colors duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} activeLink='FAQ' />
    </div>
  )
}
