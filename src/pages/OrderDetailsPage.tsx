import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Button, Icon } from '../elements'

const orderId = 'LUMA-10482'
const trackingNumber = 'TRK-7741-2093-8826'

const orderSteps = [
  { label: 'Pending', date: 'Mar 12', state: 'done' },
  { label: 'Paid', date: 'Mar 12', state: 'done' },
  { label: 'Processing', date: 'Mar 13', state: 'done' },
  { label: 'Shipped', date: 'Mar 14', state: 'current' },
  { label: 'Delivered', date: 'Est. Mar 18–20', state: 'upcoming' },
] as const

export function OrderDetailsPage() {
  const { id } = useParams()
  const [cartCount, setCartCount] = useState(2)
  const [hasReordered, setHasReordered] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState('')

  useEffect(() => {
    document.title = id === orderId ? `Order #${orderId} — LumaStore` : 'Order not found — LumaStore'
  }, [id])

  if (id !== orderId) {
    return (
      <div className='min-h-screen leading-[1.6]'>
        <Header accountName='Jordan Casey' />
        <main className='mx-auto max-w-295 px-6 pb-16 pt-7'>
          <h1 className='mb-2 text-[28px] font-extrabold tracking-[-0.02em]'>Order not found</h1>
          <p className='mb-5 text-sm text-text-muted'>We couldn't find that order.</p>
          <Link to='/account' className='font-bold text-primary hover:underline'>Back to your account</Link>
        </main>
        <Footer showNewsletter={false} />
      </div>
    )
  }

  const reorder = () => {
    setCartCount((count) => count + 1)
    setHasReordered(true)
  }

  const copyTrackingNumber = async () => {
    try {
      await navigator.clipboard.writeText(trackingNumber)
      setCopyFeedback('Copied ✓')
    } catch {
      setCopyFeedback('Unable to copy number')
    }

    window.setTimeout(() => setCopyFeedback(''), 1800)
  }

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header accountName='Jordan Casey' cartCount={cartCount} />

      <main>
        <div className='mx-auto max-w-295 px-6 pb-16 pt-7'>
          <div className='mb-4.5 text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            {' / '}
            <Link to='/account' className='hover:text-primary'>Account</Link>
            {' / '}
            <Link to='/account' className='hover:text-primary'>Orders</Link>
            {' / #'}{orderId}
          </div>

          <div className='mb-7 flex flex-wrap items-start justify-between gap-4'>
            <div>
              <h1 className='mb-1 flex flex-wrap items-center gap-3 text-[28px] font-extrabold tracking-[-0.02em]'>
                Order #{orderId}
                <span className='inline-block whitespace-nowrap rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-bold text-primary'>
                  Shipped
                </span>
              </h1>
              <div className='text-[13px] text-text-muted'>Placed March 12, 2026</div>
            </div>
            <div className='flex flex-wrap gap-2.5'>
              <Button variant='ghost' size='sm' onClick={() => window.print()}>Download invoice</Button>
              <Button size='sm' onClick={reorder} disabled={hasReordered}>
                {hasReordered ? 'Added to cart ✓' : 'Reorder'}
              </Button>
            </div>
          </div>

          <div className='grid items-start gap-9 min-[861px]:grid-cols-[minmax(0,1fr)_340px]'>
            <div>
              <section className='mb-5 rounded-(--radius) border border-border bg-surface p-6'>
                <h2 className='mb-4.5 text-base font-bold'>Order status</h2>
                <ol aria-label='Order status timeline' className='flex list-none p-0 max-[860px]:flex-col max-[860px]:gap-4.5'>
                  {orderSteps.map(({ label, date, state }) => (
                    <li
                      key={label}
                      aria-current={state === 'current' ? 'step' : undefined}
                      className={[
                        'relative flex-1 text-center text-[13px] before:absolute before:-left-1/2 before:top-3.25 before:h-0.5 before:w-full before:bg-border first:before:hidden max-[860px]:flex max-[860px]:items-center max-[860px]:gap-3 max-[860px]:text-left max-[860px]:before:hidden',
                        state !== 'upcoming' ? 'before:bg-primary' : '',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'relative z-1 mx-auto mb-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-border text-on-primary max-[860px]:mx-0 max-[860px]:mb-0',
                          state === 'done' ? 'border-primary bg-primary' : '',
                          state === 'current' ? 'border-primary bg-surface shadow-[0_0_0_4px_rgba(79,70,229,0.18)]' : '',
                          state === 'upcoming' ? 'bg-surface-2' : '',
                        ].join(' ')}
                      >
                        {state === 'done' ? <Icon name='check' className='h-3.5 w-3.5 stroke-[2.4]' /> : null}
                      </span>
                      <span className='flex flex-col'>
                        <strong className={state === 'upcoming' ? 'text-text-muted' : 'text-text'}>{label}</strong>
                        <span className='text-xs text-text-muted'>{date}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <div className='mt-5.5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4.5 text-[13px]'>
                  <div>
                    <span className='block text-xs text-text-muted'>Tracking number</span>
                    <strong className='text-sm'>{trackingNumber}</strong>
                  </div>
                  <div className='flex flex-col items-end gap-1'>
                    <Button variant='ghost' size='sm' onClick={copyTrackingNumber}>
                      {copyFeedback || 'Copy number'}
                    </Button>
                    {copyFeedback === 'Unable to copy number' ? (
                      <span role='status' className='text-xs text-danger'>{copyFeedback}</span>
                    ) : null}
                  </div>
                </div>
              </section>

              <section className='mb-5 rounded-(--radius) border border-border bg-surface p-6'>
                <h2 className='mb-4.5 text-base font-bold'>Items in this order</h2>
                <div className='flex items-center gap-4 border-b border-border py-3.5 first:pt-0 last:border-b-0 last:pb-0'>
                  <div className='flex h-18 w-18 shrink-0 items-center justify-center rounded-[9px] bg-surface-2 text-text-muted'>
                    <Icon name='headphones' className='h-7 w-7' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <div className='text-sm font-bold'>Sony WH-1000XM5 Wireless Headphones</div>
                    <div className='text-xs text-text-muted'>Color: Black · Qty 1 · $349.00 each</div>
                  </div>
                  <div className='shrink-0 text-[15px] font-extrabold'>$349.00</div>
                </div>
              </section>
            </div>

            <aside>
              <section className='mb-5 rounded-(--radius) border border-border bg-surface p-6'>
                <h2 className='mb-4.5 text-base font-bold'>Summary</h2>
                <div className='mb-4.5 text-[13px] text-text-muted'>
                  <h3 className='mb-1.5 text-[13px] text-text'>Shipping address</h3>
                  Jordan Casey<br />
                  Bulevar Mihajla Pupina 10<br />
                  Novi Beograd, 11070, Serbia
                </div>
                <div className='mb-4.5 text-[13px] text-text-muted'>
                  <h3 className='mb-1.5 text-[13px] text-text'>Delivery method</h3>
                  Standard delivery, 3–5 business days
                </div>
                <div className='mb-4.5 text-[13px] text-text-muted'>
                  <h3 className='mb-1.5 text-[13px] text-text'>Payment method</h3>
                  Visa ending in 4242
                </div>
                <div className='mt-4.5 flex flex-col gap-2.5 border-t border-border pt-4.5 text-[13px] text-text-muted'>
                  <div className='flex justify-between'><span>Subtotal</span><span>$349.00</span></div>
                  <div className='flex justify-between text-success'><span>Discount (WELCOME10)</span><span>-$34.90</span></div>
                  <div className='flex justify-between'><span>Shipping</span><span>Free</span></div>
                  <div className='flex justify-between'><span>Tax</span><span>$27.92</span></div>
                  <div className='flex justify-between border-t border-border pt-3.5 text-[17px] font-extrabold text-text'>
                    <span>Total</span><span>$342.02</span>
                  </div>
                </div>
              </section>
              <p className='text-[13px] text-text-muted'>
                Something wrong with this order? <Link to='/contact' className='font-bold text-primary'>Contact support</Link>
                {' or read our '}
                <Link to='/shipping-returns' className='font-bold text-primary'>returns policy</Link>.
              </p>
            </aside>
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} />
    </div>
  )
}
