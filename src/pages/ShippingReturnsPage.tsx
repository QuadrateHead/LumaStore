import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

const sections = [
  { id: 'shipping', label: 'Shipping options' },
  { id: 'returns', label: 'Return policy' },
  { id: 'how-to', label: 'How to return' },
  { id: 'refunds', label: 'Refund rules' },
  { id: 'damaged', label: 'Damaged items' },
] as const

const returnSteps = [
  <>
    <strong className='text-text'>Start a return.</strong> Open Order history in your account and choose Return on the order.
  </>,
  <>
    <strong className='text-text'>Print the label.</strong> We email a prepaid label for orders shipped within your country.
  </>,
  <>
    <strong className='text-text'>Send it back.</strong> Pack the item securely and drop it off with the carrier.
  </>,
  <>
    <strong className='text-text'>Get your refund.</strong> We refund to your original payment method within 5–7 business days of receiving it.
  </>,
]

export function ShippingReturnsPage() {
  useEffect(() => {
    document.title = 'Shipping and Returns — LumaStore'
  }, [])

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header />

      <main>
        <div className='mx-auto max-w-[1180px] px-6 pb-16 pt-7'>
          <div className='mb-[18px] text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            {' / Shipping and returns'}
          </div>

          <div className='mb-10 max-w-[64ch]'>
            <h1 className='mb-3 text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] max-[860px]:text-[28px]'>
              Shipping and returns
            </h1>
            <p className='text-base text-text-muted'>
              Free standard shipping on orders over $100, and 30 days to change your mind.
            </p>
          </div>

          <div className='grid items-start gap-9 max-[860px]:grid-cols-1 min-[861px]:grid-cols-[200px_minmax(0,1fr)]'>
            <nav
              aria-label='Shipping and returns sections'
              className='sticky top-[88px] flex flex-col gap-0.5 max-[860px]:static max-[860px]:flex-row max-[860px]:flex-wrap max-[860px]:gap-1.5'
            >
              {sections.map(({ id, label }) => (
                <a
                  href={`#${id}`}
                  key={id}
                  className='rounded-[9px] px-3 py-[9px] text-sm font-bold text-text-muted hover:text-text max-[860px]:border max-[860px]:border-border max-[860px]:bg-surface'
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className='min-w-0'>
              <section id='shipping' className='mb-11 scroll-mt-[88px]'>
                <h2 className='mb-[14px] text-xl font-extrabold tracking-[-0.02em]'>Shipping options</h2>
                <div className='mb-[14px] overflow-x-auto rounded-[var(--radius)] border border-border bg-surface'>
                  <table className='w-full min-w-[560px] border-collapse text-sm'>
                    <thead className='bg-surface-2 text-[13px] font-bold text-text-muted'>
                      <tr>
                        <th scope='col' className='border-b border-border px-[18px] py-[14px] text-left'>Method</th>
                        <th scope='col' className='border-b border-border px-[18px] py-[14px] text-left'>Delivery time</th>
                        <th scope='col' className='border-b border-border px-[18px] py-[14px] text-left'>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border-b border-border px-[18px] py-[14px]'>Standard delivery</td>
                        <td className='border-b border-border px-[18px] py-[14px]'>3–5 business days</td>
                        <td className='border-b border-border px-[18px] py-[14px]'>Free over $100, otherwise $9.99</td>
                      </tr>
                      <tr>
                        <td className='border-b border-border px-[18px] py-[14px]'>Express delivery</td>
                        <td className='border-b border-border px-[18px] py-[14px]'>1–2 business days</td>
                        <td className='border-b border-border px-[18px] py-[14px]'>$14.99</td>
                      </tr>
                      <tr>
                        <td className='px-[18px] py-[14px]'>Pickup point</td>
                        <td className='px-[18px] py-[14px]'>2–3 business days</td>
                        <td className='px-[18px] py-[14px]'>$4.99</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='max-w-[68ch] text-[15px] text-text-muted'>
                  <p>
                    Orders placed before 14:00 CET on a business day ship the same day. You&apos;ll get a tracking number by email once your order leaves our warehouse.
                  </p>
                </div>
              </section>

              <section id='returns' className='mb-11 scroll-mt-[88px]'>
                <h2 className='mb-[14px] text-xl font-extrabold tracking-[-0.02em]'>Return policy</h2>
                <div className='max-w-[68ch] text-[15px] text-text-muted'>
                  <p>
                    You can return any item within 30 days of delivery. Items must be unused, in original packaging, and include all accessories. Opened headphones and wearables are accepted if they&apos;re in like-new condition.
                  </p>
                </div>
              </section>

              <section id='how-to' className='mb-11 scroll-mt-[88px]'>
                <h2 className='mb-[14px] text-xl font-extrabold tracking-[-0.02em]'>How to return an item</h2>
                <ol className='flex max-w-[68ch] flex-col gap-4'>
                  {returnSteps.map((step, index) => (
                    <li key={index} className='flex gap-[14px] text-[15px] text-text-muted'>
                      <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-extrabold text-on-primary'>
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section id='refunds' className='mb-11 scroll-mt-[88px]'>
                <h2 className='mb-[14px] text-xl font-extrabold tracking-[-0.02em]'>Refund rules</h2>
                <div className='max-w-[68ch] text-[15px] text-text-muted'>
                  <p>
                    Refunds cover the item price and standard shipping. Express and pickup fees are not refunded unless the return is due to our error. Discounts applied with a coupon reduce the refund by the same amount. Gift orders are refunded as store credit.
                  </p>
                </div>
              </section>

              <section id='damaged' className='mb-11 scroll-mt-[88px]'>
                <h2 className='mb-[14px] text-xl font-extrabold tracking-[-0.02em]'>Damaged or wrong item</h2>
                <div className='max-w-[68ch] rounded-[9px] border-l-[3px] border-accent bg-surface-2 px-[18px] py-4 text-sm text-text-muted'>
                  <strong className='text-text'>Contact us within 7 days of delivery.</strong>{' '}
                  Email support@lumastore.com with your order number and photos of the item and packaging. We&apos;ll send a replacement or a full refund, including shipping, and cover the return cost.
                </div>
              </section>

              <div className='mt-2 flex flex-wrap items-center justify-between gap-5 rounded-[20px] bg-primary px-11 py-10 text-on-primary max-[860px]:px-6 max-[860px]:py-7'>
                <h2 className='max-w-[30ch] text-2xl font-extrabold tracking-[-0.02em]'>
                  Still have a question about your order?
                </h2>
                <Link
                  to='/contact'
                  className='inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius)] bg-accent px-[22px] py-3 text-sm font-bold leading-[1.6] text-on-accent hover:brightness-105'
                >
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} activeLink='Shipping and returns' />
    </div>
  )
}
