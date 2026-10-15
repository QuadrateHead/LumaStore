import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Button, Icon } from '../elements'
import type { IconName } from '../elements'

type WishlistItem = {
  id: number
  brand: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: string
  icon: IconName
  stock: number
}

type WishlistSort = 'recent' | 'price-asc' | 'price-desc' | 'rating'

const startingItems: WishlistItem[] = [
  { id: 1, brand: 'Sony', name: 'WH-1000XM5 headphones', price: 349, originalPrice: 399, rating: 4.8, reviews: '1,204', icon: 'headphones', stock: 14 },
  { id: 2, brand: 'LumaStore', name: '27″ 4K monitor', price: 329, rating: 4.5, reviews: '167', icon: 'monitor', stock: 6 },
  { id: 3, brand: 'LumaStore', name: 'Standing desk converter', price: 179, rating: 4.7, reviews: '211', icon: 'desk', stock: 9 },
  { id: 4, brand: 'Keychron', name: 'K2 mechanical keyboard', price: 129, rating: 4.7, reviews: '398', icon: 'keyboard', stock: 3 },
  { id: 5, brand: 'Samsung', name: 'Galaxy Watch 6', price: 249, rating: 4.6, reviews: '512', icon: 'watch', stock: 0 },
]

export function WishlistPage() {
  const [items, setItems] = useState(startingItems)
  const [sort, setSort] = useState<WishlistSort>('recent')
  const [cartCount, setCartCount] = useState(2)
  const [toastMessage, setToastMessage] = useState('')
  const toastTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    document.title = 'Wishlist — LumaStore'
    return () => {
      if (toastTimer.current !== undefined) window.clearTimeout(toastTimer.current)
    }
  }, [])

  const showToast = (message: string) => {
    setToastMessage(message)
    if (toastTimer.current !== undefined) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastMessage(''), 2200)
  }

  const sortedItems = [...items]
  if (sort === 'price-asc') sortedItems.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') sortedItems.sort((a, b) => b.price - a.price)
  if (sort === 'rating') sortedItems.sort((a, b) => b.rating - a.rating)

  const moveAllToCart = () => {
    const availableItems = items.filter((item) => item.stock > 0)
    setItems((currentItems) => currentItems.filter((item) => item.stock === 0))
    setCartCount((currentCount) => currentCount + availableItems.length)
    showToast(`${availableItems.length} ${availableItems.length === 1 ? 'item' : 'items'} moved to cart`)
  }

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header accountName='Jordan Casey' cartCount={cartCount} wishlistCount={items.length} />

      <main>
        <div className='mx-auto max-w-[1180px] px-6 pb-16 pt-7'>
          <div className='mb-[18px] text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            {' / Wishlist'}
          </div>

          <div className='mb-6 flex flex-wrap items-end justify-between gap-4'>
            <div>
              <h1 className='mb-1 text-[28px] font-extrabold tracking-[-0.02em]'>Wishlist</h1>
              <div className='text-[13px] text-text-muted' aria-live='polite'>
                {items.length} saved {items.length === 1 ? 'item' : 'items'}
              </div>
            </div>
            {items.length > 0 ? (
              <div className='flex flex-wrap items-center gap-2.5'>
                <select
                  aria-label='Sort wishlist'
                  value={sort}
                  onChange={(event) => setSort(event.target.value as WishlistSort)}
                  className='rounded-[9px] border border-border bg-surface px-3 py-[9px] text-[13px] text-text'
                >
                  <option value='recent'>Recently added</option>
                  <option value='price-asc'>Price: Low to High</option>
                  <option value='price-desc'>Price: High to Low</option>
                  <option value='rating'>Best rated</option>
                </select>
                <Button
                  size='sm'
                  onClick={moveAllToCart}
                  disabled={!items.some((item) => item.stock > 0)}
                  className='disabled:cursor-not-allowed disabled:opacity-55'
                >
                  Move all to cart
                </Button>
              </div>
            ) : null}
          </div>

          {items.length > 0 ? (
            <div className='grid grid-cols-4 gap-5 max-[1000px]:grid-cols-3 max-[860px]:grid-cols-2 max-[480px]:gap-3'>
              {sortedItems.map((item) => {
                const outOfStock = item.stock === 0
                const discount = item.originalPrice
                  ? Math.round((1 - item.price / item.originalPrice) * 100)
                  : 0

                return (
                  <article
                    key={item.id}
                    className='flex flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-surface'
                  >
                    <div className='relative flex h-[150px] items-center justify-center bg-surface-2 text-text-muted'>
                      {outOfStock ? (
                        <span className='absolute left-2.5 top-2.5 rounded-[7px] border border-border bg-surface px-2 py-[3px] text-[11px] font-bold text-text-muted'>
                          Out of stock
                        </span>
                      ) : discount > 0 ? (
                        <span className='absolute left-2.5 top-2.5 rounded-[7px] bg-accent px-2 py-[3px] text-[11px] font-bold text-on-accent'>
                          -{discount}%
                        </span>
                      ) : null}
                      <Icon
                        name={item.icon}
                        className={['h-[34px] w-[34px]', outOfStock ? 'opacity-45' : ''].join(' ')}
                      />
                      <button
                        type='button'
                        aria-label={`Remove ${item.name} from wishlist`}
                        onClick={() => {
                          setItems((currentItems) => currentItems.filter((currentItem) => currentItem.id !== item.id))
                          showToast('Removed from wishlist')
                        }}
                        className='absolute right-2.5 top-2.5 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-text-muted hover:border-danger hover:text-danger'
                      >
                        <span aria-hidden='true' className='text-base leading-none'>×</span>
                      </button>
                    </div>
                    <div className='flex flex-1 flex-col p-[14px] px-4 pb-4'>
                      <div className='mb-0.5 text-[11px] text-text-muted'>{item.brand}</div>
                      <div className='mb-1.5 text-sm font-bold'>{item.name}</div>
                      <div className='mb-2 flex items-center gap-1 text-xs text-text-muted'>
                        <Icon name='star' className='h-3 w-3 text-accent' />
                        {item.rating.toFixed(1)} ({item.reviews})
                      </div>
                      <div className='mb-1 text-base font-extrabold'>
                        ${item.price}
                        {item.originalPrice ? (
                          <small className='ml-1 text-xs font-medium text-text-muted line-through'>
                            ${item.originalPrice}
                          </small>
                        ) : null}
                      </div>
                      <div className={['mb-3 text-xs', outOfStock ? 'text-danger' : 'text-success'].join(' ')}>
                        {outOfStock
                          ? 'Currently unavailable'
                          : item.stock <= 5
                            ? `Only ${item.stock} left`
                            : 'In stock'}
                      </div>
                      <Button
                        variant={outOfStock ? 'ghost' : 'primary'}
                        size='sm'
                        className='mt-auto w-full'
                        onClick={() => {
                          if (outOfStock) {
                            showToast("We'll email you when it's back")
                            return
                          }
                          setItems((currentItems) => currentItems.filter((currentItem) => currentItem.id !== item.id))
                          setCartCount((currentCount) => currentCount + 1)
                          showToast('Moved to cart')
                        }}
                      >
                        {outOfStock ? 'Notify me' : 'Move to cart'}
                      </Button>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <section className='flex flex-col items-center gap-[14px] rounded-[var(--radius)] border border-border bg-surface px-5 py-16 text-center'>
              <Icon name='heart' className='h-11 w-11 text-text-muted' />
              <h2 className='text-xl font-extrabold tracking-[-0.02em]'>Your wishlist is empty</h2>
              <p className='max-w-[38ch] text-sm text-text-muted'>
                Tap the heart on any product to save it here for later.
              </p>
              <Link
                to='/products'
                className='inline-flex items-center justify-center rounded-[var(--radius)] bg-primary px-[22px] py-3 text-sm font-bold text-on-primary hover:bg-primary-hover'
              >
                Browse products
              </Link>
            </section>
          )}
        </div>
      </main>

      <Footer showNewsletter={false} />

      <div
        role='status'
        aria-live='polite'
        className={[
          'fixed bottom-[calc(24px+env(safe-area-inset-bottom,0px))] left-1/2 z-20 rounded-full bg-text px-[18px] py-[11px] text-[13px] font-bold text-bg transition duration-200',
          toastMessage ? '-translate-x-1/2 translate-y-0 opacity-100' : 'pointer-events-none -translate-x-1/2 translate-y-5 opacity-0',
        ].join(' ')}
      >
        {toastMessage}
      </div>
    </div>
  )
}
