import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Icon, IconButton, ProductCard } from '../elements'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

type TabKey = 'desc' | 'specs' | 'rev' | 'faq'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'desc', label: 'Description' },
  { key: 'specs', label: 'Specifications' },
  { key: 'rev', label: 'Reviews' },
  { key: 'faq', label: 'FAQ' },
]

const specs = [
  ['Battery life', '30 hours'],
  ['Weight', '250g'],
  ['Bluetooth', '5.2'],
  ['Noise cancellation', 'Yes'],
  ['Warranty', '2 years'],
]

const reviews = [
  {
    quote:
      'The noise cancellation is no joke — my open-plan office basically disappears the moment these go on.',
    author: 'Sam O.',
    meta: 'Verified purchase',
    filled: 5,
  },
  {
    quote:
      'Battery life easily gets me through a full work week. A little snug out of the box but breaks in fast.',
    author: 'Priya M.',
    meta: 'Verified purchase',
    filled: 4,
  },
]

const relatedProducts = [
  { name: 'Portable charger', price: '$39' },
  { name: '4K webcam', price: '$69' },
  { name: 'Desk lamp', price: '$59' },
  { name: 'Mechanical keyboard', price: '$129' },
]

const productImageIndexes = [0, 1, 2, 3]

const colorOptions = [
  { label: 'Black', value: '#18181B' },
  { label: 'Silver', value: '#C4C4C8' },
  { label: 'Blue', value: '#3B4A6B' },
]

export function ProductPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('desc')
  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('Black')
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity((currentQuantity) => Math.min(14, currentQuantity + 1))
  const decrementQuantity = () => setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header />

      <main>
        <div className='mx-auto max-w-[1180px] px-6 py-8'>
          <div className='mb-6 text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            {' / '}
            <Link to='/products' className='hover:text-primary'>Audio</Link>
            {' / Sony WH-1000XM5'}
          </div>

          <div className='grid grid-cols-2 items-start gap-12 max-[860px]:grid-cols-1'>
            <div>
              <div
                role='img'
                aria-label={`Product image ${activeImage + 1} of ${productImageIndexes.length}`}
                className='mb-3 flex h-[380px] items-center justify-center rounded-[var(--radius)] border border-border bg-surface-2 text-text-muted'
              >
                <Icon name='headphones' className='h-16 w-16' />
              </div>

              <div className='flex gap-2.5'>
                {productImageIndexes.map((imageIndex) => (
                  <button
                    key={imageIndex}
                    type='button'
                    aria-label={`View product image ${imageIndex + 1}`}
                    aria-pressed={activeImage === imageIndex}
                    onClick={() => setActiveImage(imageIndex)}
                    className={[
                      'flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border bg-surface-2 text-text-muted',
                      activeImage === imageIndex ? 'border-primary' : 'border-border',
                    ]
                      .join(' ')
                      .trim()}
                  >
                    <Icon name='headphones' className='h-6 w-6' />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className='mb-1 text-[13px] text-text-muted'>Sony</div>
              <h1 className='mb-1 text-[28px] font-bold'>WH-1000XM5 Wireless Headphones</h1>

              <div className='mb-4 flex items-center gap-1.5 text-[13px] text-text-muted'>
                <Icon name='star' className='h-3.5 w-3.5 text-accent' />
                <span>4.8 · 1,204 reviews</span>
              </div>

              <div className='mb-4 flex items-baseline gap-2.5'>
                <span className='text-[30px] font-extrabold'>$349</span>
                <span className='text-[15px] text-text-muted line-through'>$399</span>
                <span className='rounded-[7px] bg-accent px-2 py-[3px] text-[11px] font-bold text-on-accent'>-13%</span>
              </div>

              <p className='mb-5 max-w-[52ch] text-sm leading-[1.6] text-text-muted'>
                Industry-leading noise cancellation meets all-day comfort. Precision-tuned 30mm drivers and adaptive ambient sound control keep studio-quality audio with you from the desk to the commute.
              </p>

              <div className='mb-6 flex items-center gap-2 text-sm leading-[1.6]'>
                <span className='h-2 w-2 rounded-full bg-success' />
                <span>In stock — 14 available</span>
              </div>

              <div className='mb-[22px]'>
                <strong className='mb-2.5 block text-[13px]'>Color: {selectedColor}</strong>
                <div className='flex gap-2.5'>
                  {colorOptions.map((color) => (
                    <button
                      key={color.label}
                      type='button'
                      aria-label={color.label}
                      aria-pressed={selectedColor === color.label}
                      onClick={() => setSelectedColor(color.label)}
                      className={[
                        'h-8 w-8 cursor-pointer rounded-full border-2 p-0.5',
                        selectedColor === color.label ? 'border-primary' : 'border-transparent',
                      ]
                        .join(' ')
                        .trim()}
                    >
                      <span
                        className='block h-full w-full rounded-full border border-border'
                        style={{ backgroundColor: color.value }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className='mb-5 flex w-fit items-center rounded-[var(--radius)] border border-border'>
                <button
                  type='button'
                  aria-label='Decrease quantity'
                  onClick={decrementQuantity}
                  className='h-[38px] w-[38px] cursor-pointer bg-transparent text-base font-medium leading-[1.6] text-text'
                >
                  −
                </button>
                <span className='w-10 text-center font-bold'>{quantity}</span>
                <button
                  type='button'
                  aria-label='Increase quantity'
                  onClick={incrementQuantity}
                  className='h-[38px] w-[38px] cursor-pointer bg-transparent text-base font-medium leading-[1.6] text-text'
                >
                  +
                </button>
              </div>

              <div className='mb-6 flex gap-2.5'>
                <Button className='flex-1 rounded-[var(--radius)] border-0'>Add to cart</Button>
                <Button variant='ghost' className='flex-1 rounded-[var(--radius)]'>Buy now</Button>
                <IconButton
                  icon={<Icon name='heart' className='h-5 w-5' />}
                  aria-label='Add to wishlist'
                  className='rounded-[var(--radius)]'
                  style={{ width: 48, height: 48 }}
                />
              </div>

              <div className='flex flex-col gap-2.5 rounded-[var(--radius)] bg-surface-2 p-[18px] text-[13px] text-text-muted'>
                <div className='flex items-center gap-2.5'>
                  <Icon name='shipping' className='h-[18px] w-[18px] text-primary' />
                  <span>Free shipping, estimated delivery 2–4 business days</span>
                </div>
                <div className='flex items-center gap-2.5'>
                  <Icon name='returns' className='h-[18px] w-[18px] text-primary' />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-14 flex gap-7 border-b border-border'>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type='button'
                onClick={() => setActiveTab(tab.key)}
                className={[
                  'cursor-pointer border-b-2 pb-3.5 text-sm font-bold leading-[1.6]',
                  activeTab === tab.key
                    ? 'border-primary text-text'
                    : 'border-transparent text-text-muted',
                ]
                  .join(' ')
                  .trim()}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className='mt-7'>
            {activeTab === 'desc' ? (
              <p className='max-w-[70ch] text-sm leading-[1.6] text-text-muted'>
                The WH-1000XM5 refines Sony&apos;s flagship noise cancellation with two processors controlling eight microphones, adapting to your surroundings in real time. Multipoint connection lets you switch between devices instantly, and a lightweight, cushioned build makes long listening sessions disappear.
              </p>
            ) : null}

            {activeTab === 'specs' ? (
              <div className='grid grid-cols-2 gap-x-8 gap-y-3.5 max-[860px]:grid-cols-1'>
                {specs.map(([label, value]) => (
                  <div key={label} className='flex items-center justify-between border-b border-border pb-2.5 text-sm leading-[1.6]'>
                    <span className='text-text-muted'>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'rev' ? (
              <div className='grid grid-cols-2 gap-5 max-[860px]:grid-cols-1'>
                {reviews.map((review) => (
                  <div key={review.author} className='rounded-[var(--radius)] border border-border bg-surface p-5'>
                    <div className='mb-2.5 flex gap-0.5 text-accent'>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Icon
                          key={`${review.author}-${index}`}
                          name='star'
                          className={[
                            'h-3.5 w-3.5',
                            index >= review.filled ? 'opacity-25' : 'opacity-100',
                          ]
                            .join(' ')
                            .trim()}
                        />
                      ))}
                    </div>
                    <p className='mb-3.5 text-sm leading-[1.6]'>"{review.quote}"</p>
                    <div className='text-[13px] font-bold'>
                      {review.author} <span className='font-medium text-text-muted'>· {review.meta}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'faq' ? (
              <div>
                {[
                  ['Does this product support fast charging?', 'Yes — a 3-minute charge gives roughly 3 hours of playback.'],
                  ['Is it compatible with iPhone?', 'Yes, it pairs over standard Bluetooth with iOS, Android, and most Bluetooth-enabled devices.'],
                  ['What is included in the box?', 'Headphones, carrying case, USB-C cable, and a 3.5mm audio cable for wired listening.'],
                ].map(([question, answer], index) => (
                  <details key={question} open={index === 0} className='border-b border-border py-3.5'>
                    <summary className='cursor-pointer text-sm font-bold leading-[1.6]'>{question}</summary>
                    <p className='mt-2.5 text-sm leading-[1.6] text-text-muted'>{answer}</p>
                  </details>
                ))}
              </div>
            ) : null}
          </div>

          <div className='mt-[60px]'>
            <div className='mb-7 flex items-end justify-between'>
              <h2 className='text-2xl font-extrabold leading-[1.6] tracking-[-0.02em]'>You may also like</h2>
            </div>

            <div className='grid grid-cols-4 gap-5 max-[860px]:grid-cols-2'>
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  showWishlist={true}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
