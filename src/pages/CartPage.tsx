import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Button, Icon, ProductCard } from '../elements'
import type { IconName } from '../elements'

type CartProduct = {
  id: string
  name: string
  variant: string
  unitPrice: number
  quantity: number
  maxQuantity: number
  imageIcon: IconName
}

const initialItems: CartProduct[] = [
  {
    id: 'keyboard',
    name: 'Keychron K2 Mechanical Keyboard',
    variant: 'Layout: US ANSI',
    unitPrice: 129,
    quantity: 1,
    maxQuantity: 20,
    imageIcon: 'keyboard',
  },
  {
    id: 'mouse',
    name: 'Logitech MX Master 3S Mouse',
    variant: 'Color: Graphite',
    unitPrice: 76,
    quantity: 2,
    maxQuantity: 10,
    imageIcon: 'mouse',
  },
]

const suggestedProducts = [
  { name: 'USB-C hub, 7-in-1', price: '$45', imageIcon: 'monitor' as IconName },
  { name: 'Adjustable laptop stand', price: '$34', imageIcon: 'shipping' as IconName },
  { name: 'Extended mouse pad XL', price: '$19', imageIcon: 'mouse' as IconName },
  { name: 'Cable organizer kit', price: '$12', imageIcon: 'package' as IconName },
]

const formatCurrency = (value: number) => `$${value.toFixed(2)}`

export function CartPage() {
  const [items, setItems] = useState<CartProduct[]>(initialItems)
  const [coupon, setCoupon] = useState('')
  const [couponState, setCouponState] = useState<'ok' | 'err' | null>(null)
  const [couponMessage, setCouponMessage] = useState('')

  useEffect(() => {
    document.title = 'Your Cart — LumaStore'
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const discount = couponState === 'ok' ? subtotal * 0.1 : 0
  const shipping = items.length === 0 ? 0 : subtotal >= 100 ? 0 : 9.99
  const tax = Math.max(subtotal - discount, 0) * 0.08
  const total = subtotal - discount + shipping + tax
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  const updateQuantity = (id: string, delta: number) => {
    setItems((current) =>
      current
        .map((item) => {
          if (item.id !== id) {
            return item
          }

          const nextQuantity = Math.min(item.maxQuantity, Math.max(1, item.quantity + delta))
          return { ...item, quantity: nextQuantity }
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const applyCoupon = () => {
    const normalized = coupon.trim().toUpperCase()

    if (normalized === 'SAVE10') {
      setCouponState('ok')
      setCouponMessage('Coupon applied — 10% off')
      return
    }

    setCouponState('err')
    setCouponMessage('Invalid coupon code')
  }

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header />

      <main>
        <div className='mx-auto max-w-[1180px] px-6 pb-16 pt-7'>
          <div className='mb-[18px] text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            <span> / Cart</span>
          </div>

          <div className='mb-6 flex items-baseline justify-between gap-4'>
            <h1 className='text-[28px] font-extrabold tracking-[-0.02em]'>Your cart</h1>
            <div className='text-[13px] text-text-muted'>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </div>
          </div>

          {items.length === 0 ? (
            <div className='flex flex-col items-center justify-center gap-3 rounded-[var(--radius)] border border-border bg-surface p-14 text-center'>
              <Icon name='cart' className='h-11 w-11 text-text-muted' />
              <p className='text-[14px] text-text-muted'>Your cart is empty.</p>
              <Link to='/products'>
                <Button variant='primary' size='sm'>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className='grid items-start gap-9 min-[861px]:grid-cols-[minmax(0,1fr)_340px]'>
              <div className='flex flex-col gap-[14px]'>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center gap-4 rounded-[var(--radius)] border border-border bg-surface p-4'
                  >
                    <div className='flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[9px] bg-surface-2 text-text-muted'>
                      <Icon name={item.imageIcon} className='h-7 w-7' />
                    </div>

                    <div className='min-w-0 flex-1'>
                      <div className='text-sm font-bold'>{item.name}</div>
                      <div className='mt-1 text-[12px] text-text-muted'> {item.variant} </div>
                      <div className='mt-2 text-[12px] text-text-muted'>
                        {formatCurrency(item.unitPrice)} each
                      </div>

                      <div className='mt-3 flex w-fit items-center overflow-hidden rounded-[9px] border border-border'>
                        <button
                          type='button'
                          aria-label={`Decrease quantity for ${item.name}`}
                          onClick={() => updateQuantity(item.id, -1)}
                          className='h-8 w-8 cursor-pointer bg-transparent text-base font-bold text-text hover:bg-surface-2'
                        >
                          −
                        </button>
                        <span className='w-[28px] text-center text-[13px] font-bold'>{item.quantity}</span>
                        <button
                          type='button'
                          aria-label={`Increase quantity for ${item.name}`}
                          onClick={() => updateQuantity(item.id, 1)}
                          className='h-8 w-8 cursor-pointer bg-transparent text-base font-bold text-text hover:bg-surface-2'
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className='w-[74px] shrink-0 text-right text-[15px] font-extrabold'>
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </div>

                    <button
                      type='button'
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.id)}
                      className='shrink-0 cursor-pointer rounded-[var(--radius)] p-1.5 text-text-muted transition-colors hover:text-danger'
                    >
                      <Icon name='trash' className='h-[18px] w-[18px] cursor-pointer' />
                    </button>
                  </div>
                ))}
              </div>

              <aside className='rounded-[var(--radius)] border border-border bg-surface p-5 min-[861px]:sticky min-[861px]:top-[88px]'>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                    placeholder='Coupon code'
                    className='flex-1 rounded-[9px] border border-border bg-surface-2 px-3 py-2 text-[13px] text-text outline-none'
                  />
                  <Button variant='ghost' size='sm' onClick={applyCoupon}>Apply</Button>
                </div>

                {couponState ? (
                  <div className={['mt-2 text-[12px]', couponState === 'ok' ? 'text-success' : 'text-danger'].join(' ')}>
                    {couponMessage}
                  </div>
                ) : null}

                <div className='mt-5 space-y-[10px] text-[13px] text-text-muted'>
                  <div className='flex items-center justify-between'>
                    <span>Subtotal</span>
                    <span className='text-text'>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className='flex items-center justify-between text-success'>
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Shipping</span>
                    <span className='text-text'>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Tax</span>
                    <span className='text-text'>{formatCurrency(tax)}</span>
                  </div>
                </div>

                <div className='mt-4 flex items-center justify-between border-t border-border pt-4 text-[17px] font-extrabold'>
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                <Button className='mt-4 w-full'>Checkout</Button>
                <Link to='/products' className='mt-3 block text-center text-[13px] font-bold text-primary'>
                  Continue shopping
                </Link>
              </aside>
            </div>
          )}

          <section className='mt-14'>
            <div className='mb-6 flex items-end justify-between'>
              <h2 className='text-[22px] font-extrabold tracking-[-0.02em]'>Complete your setup</h2>
            </div>

            <div className='grid grid-cols-4 gap-5 max-[860px]:grid-cols-2'>
              {suggestedProducts.map(({ name, price, imageIcon }) => (
                <ProductCard
                  key={name}
                  name={name}
                  price={price}
                  imageIcon={imageIcon}
                  showWishlist={false}
                  imageHeight={120}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
