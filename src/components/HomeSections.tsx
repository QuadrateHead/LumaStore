import { Badge, Button, ProductCard, SectionHeader } from '../elements'
import { Icon } from '../elements/Icon'

const newArrivals = [
  { name: 'Wireless headphones', price: '$199', originalPrice: '$249' },
  { name: 'Mechanical keyboard', price: '$129' },
  { name: 'Smart watch', price: '$249' },
  { name: 'Desk lamp', price: '$59' },
]

const bestSellers = [
  { name: 'Portable charger', price: '$39', rating: '4.8 (632)' },
  { name: 'Ergonomic mouse', price: '$89', rating: '4.9 (1,204)' },
  { name: 'Standing desk converter', price: '$179', rating: '4.7 (398)' },
  { name: '4K webcam', price: '$69', rating: '4.6 (215)' },
]

const categories = [
  ['Audio', '128 products'],
  ['Keyboards', '64 products'],
  ['Smart watches', '42 products'],
  ['Desk setup', '96 products'],
  ['Bags', '37 products'],
]

const benefits = [
  { icon: 'shipping', title: 'Free shipping', description: 'On orders over $100' },
  { icon: 'returns', title: '30-day returns', description: 'No questions asked' },
  { icon: 'lock', title: 'Secure checkout', description: 'Encrypted payments' },
  { icon: 'support', title: '24/7 support', description: 'Real humans, always' },
] as const

const reviews = [
  {
    quote:
      '"Fast delivery and genuinely nice packaging — my desk finally looks like one cohesive thing instead of five."',
    name: 'Priya M.',
  },
  {
    quote:
      '"Switched from a budget keyboard to the Keychron here and typing feels like a different job. Wish I\'d done it sooner."',
    name: 'Daniel R.',
  },
  {
    quote:
      '"The headphones arrived a day early and the noise cancellation is no joke. Already recommended it to two coworkers."',
    name: 'Sam O.',
  },
]

export function HeroSection() {
  return (
    <section className='px-0 pb-[22px] pt-4'>
      <div className='mx-auto grid max-w-[1180px] grid-cols-[1.15fr_1fr] items-center gap-[10px] px-6 max-[860px]:grid-cols-1'>
        <div>
          <h1 className='mb-[18px] text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] max-[860px]:text-[32px]'>
            The upgrade your desk has been asking for.
          </h1>
          <p className='mb-7 max-w-[46ch] text-[17px] text-text-muted'>
            Premium audio, keyboards, and workspace essentials, chosen for people who notice the details.
          </p>
          <div className='mb-[22px] flex flex-wrap gap-3'>
            <Button className='px-[22px] py-3 text-sm'>Shop new arrivals</Button>
            <Button variant='ghost'>See today's deals</Button>
          </div>
          <p className='mb-0 text-[13px] text-text-muted'>
            Free shipping over $100 and 30-day returns.
          </p>
        </div>
        <div className='rounded-[20px] border border-border bg-surface p-7'>
          <div className='mb-[18px] flex h-[180px] items-center justify-center rounded-[14px] bg-surface-2 text-text-muted'>
            <Icon name='image' className='h-11 w-11' />
          </div>
          <div className='mb-2 flex items-start justify-between'>
            <span className='text-base font-bold'>Sony WH-1000XM5</span>
            <Badge
              variant='accent'
              className='!rounded-[7px] px-2 py-[3px] text-[11px] font-bold normal-case tracking-normal'
            >
              -20%
            </Badge>
          </div>
          <div className='text-xl font-extrabold'>
            $349
            <small className='ml-1.5 text-[13px] font-medium text-text-muted line-through'>
              $399
            </small>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CategorySection() {
  return (
    <section id='categories' className='py-5'>
      <div className='mx-auto max-w-[1180px] px-6'>
        <SectionHeader title='Shop by category' className='mb-7' />
        <div className='flex overflow-hidden rounded-[var(--radius)] border border-border max-[860px]:flex-wrap'>
          {categories.map(([name, count]) => (
            <div
              className='flex-1 border-r border-border p-5 text-left odd:bg-surface-2 last:border-r-0 max-[860px]:flex-[1_1_50%] max-[860px]:border-b'
              key={name}
            >
              <strong className='mb-1 block text-[15px]'>{name}</strong>
              <span className='text-[13px] text-text-muted'>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductSection({
  id,
  title,
  products,
}: {
  id: string
  title: string
  products: typeof newArrivals | typeof bestSellers
}) {
  return (
    <section id={id} className='py-5'>
      <div className='mx-auto max-w-[1180px] px-6'>
        <SectionHeader
          title={title}
          action={<a className='text-sm font-bold' href='#'>View all</a>}
          className='mb-7'
        />
        <div className='grid grid-cols-4 gap-5 max-[860px]:grid-cols-2'>
          {products.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              price={product.price}
              {...('originalPrice' in product ? { originalPrice: product.originalPrice } : {})}
              {...('rating' in product ? { rating: product.rating } : {})}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProductSections() {
  return (
    <>
      <ProductSection id='new-arrivals' title='New arrivals' products={newArrivals} />
      <ProductSection id='best-sellers' title='Best sellers' products={bestSellers} />
    </>
  )
}

export function PromotionSection() {
  return (
    <section id='deals' className='py-5'>
      <div className='mx-auto max-w-[1180px] px-6'>
        <div className='flex flex-wrap items-center justify-between gap-6 rounded-[20px] bg-primary p-12 text-on-primary'>
          <h3 className='max-w-[34ch] text-[26px] font-extrabold tracking-[-0.02em]'>
            Summer desk setup sale — up to 25% off monitors, lamps, and keyboards.
          </h3>
          <Button variant='accent'>Shop the sale</Button>
        </div>
      </div>
    </section>
  )
}

export function BenefitsSection() {
  return (
    <section className='py-5'>
      <div className='mx-auto flex max-w-[1180px] flex-wrap justify-between gap-6 px-6'>
        {benefits.map(({ icon, title, description }) => (
          <div className='flex min-w-[220px] flex-1 items-center gap-[14px]' key={title}>
            <Icon name={icon} className='h-[26px] w-[26px] shrink-0 text-primary' />
            <div>
              <strong className='block text-sm'>{title}</strong>
              <span className='text-[13px] text-text-muted'>{description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ReviewsSection() {
  return (
    <section className='py-5'>
      <div className='mx-auto max-w-[1180px] px-6'>
        <SectionHeader title='What customers say' className='mb-7' />
        <div className='grid grid-cols-3 gap-5 max-[860px]:grid-cols-1'>
          {reviews.map(({ quote, name }) => (
            <article className='rounded-[var(--radius)] border border-border bg-surface p-5' key={name}>
              <div className='mb-2.5 flex gap-0.5 text-accent' aria-label='5 out of 5 stars'>
                {Array.from({ length: 5 }, (_, index) => (
                  <Icon name='star' className='h-[14px] w-[14px]' key={index} />
                ))}
              </div>
              <p className='mb-[14px] text-sm'>{quote}</p>
              <div className='text-[13px] font-bold'>
                {name} <span className='font-medium text-text-muted'>· Verified buyer</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
