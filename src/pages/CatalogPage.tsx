import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Button, ProductCard } from '../elements'
import type { IconName } from '../elements'

type CatalogProduct = {
  name: string
  brand: string
  price: string
  originalPrice?: string
  rating: string
  badge?: string
  badgePosition?: 'left' | 'right'
  imageIcon: IconName
}

const products: CatalogProduct[] = [
  { name: 'WH-1000XM5 headphones', brand: 'Sony', price: '$349', originalPrice: '$399', rating: '4.8 (1,204)', badge: '-20%', imageIcon: 'headphones' },
  { name: 'K2 mechanical keyboard', brand: 'Keychron', price: '$129', rating: '4.7 (398)', imageIcon: 'keyboard' },
  { name: 'Galaxy Watch 6', brand: 'Samsung', price: '$249', rating: '4.6 (512)', imageIcon: 'watch' },
  { name: 'MX Master 3S mouse', brand: 'Logitech', price: '$76', originalPrice: '$89', rating: '4.9 (1,204)', badge: '-15%', imageIcon: 'mouse' },
  { name: '27″ 4K monitor', brand: 'LumaStore', price: '$329', rating: '4.5 (167)', imageIcon: 'monitor' },
  { name: 'Everyday backpack 20L', brand: 'Anker', price: '$68', rating: '4.7 (289)', imageIcon: 'backpack' },
  { name: 'PowerCore 20K charger', brand: 'Anker', price: '$39', rating: '4.8 (632)', imageIcon: 'charger' },
  { name: '4K webcam', brand: 'LumaStore', price: '$69', rating: '4.6 (215)', imageIcon: 'webcam' },
  { name: 'MagSafe charging stand', brand: 'Apple', price: '$49', rating: '4.4 (94)', badge: 'New', badgePosition: 'right', imageIcon: 'phone' },
]

const categories = [
  { name: 'Audio', count: '128' },
  { name: 'Keyboards', count: '64' },
  { name: 'Smart watches', count: '42' },
  { name: 'Desk setup', count: '96' },
  { name: 'Bags', count: '37' },
  { name: 'Phone accessories', count: '53' },
]

const brands = ['Sony', 'Logitech', 'Keychron', 'Anker', 'Samsung']
const colors = [
  { name: 'Black', value: '#18181B' },
  { name: 'White', value: '#FAFAFA' },
  { name: 'Silver', value: '#C4C4C8' },
  { name: 'Blue', value: '#3B4A6B' },
  { name: 'Green', value: '#3F6B4A' },
]

const filterOptions = [
  { label: '4 stars & up', key: 'rating-4' },
  { label: '3 stars & up', key: 'rating-3' },
  { label: 'In stock', key: 'in-stock' },
  { label: 'Out of stock', key: 'out-of-stock' },
]

function FilterCheckbox({
  label,
  checked,
  onChange,
  count,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  count?: string
}) {
  return (
    <label className='flex cursor-pointer items-center gap-[9px] text-[13px] text-text-muted'>
      <input
        type='checkbox'
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className='h-[15px] w-[15px] accent-primary'
      />
      {label}
      {count ? <span className='ml-auto text-text-muted opacity-70'>{count}</span> : null}
    </label>
  )
}

function FilterBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className='border-b border-border pb-[18px] last:border-b-0'>
      <h2 className='mb-3 text-[13px] font-bold'>{title}</h2>
      {children}
    </section>
  )
}

export function CatalogPage() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeColor, setActiveColor] = useState('Black')
  const [activePage, setActivePage] = useState(1)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({
    Audio: true,
    'In stock': true,
  })
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  useEffect(() => {
    document.title = 'All Products — LumaStore'
  }, [])

  const setFilter = (key: string, checked: boolean) => {
    setSelectedFilters((current) => ({ ...current, [key]: checked }))
  }

  const clearFilters = () => {
    setSelectedFilters({})
    setPriceRange({ min: '', max: '' })
  }

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header />

      <main>
        <div className='mx-auto max-w-[1180px] px-6 pb-[60px] pt-7'>
          <div className='mb-[18px] text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            {' / Products'}
          </div>

          <div className='mb-6 flex flex-wrap items-end justify-between gap-4'>
            <div>
              <h1 className='mb-1 text-[28px] font-extrabold tracking-[-0.02em]'>All products</h1>
              <div className='text-[13px] text-text-muted'>128 products found</div>
            </div>
            <Button
              variant='ghost'
              size='sm'
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((open) => !open)}
              className='!hidden max-[860px]:!inline-flex'
            >
              Filters
            </Button>
          </div>

          <div className='grid grid-cols-[240px_minmax(0,1fr)] items-start gap-9 max-[860px]:grid-cols-1'>
            <aside
              className={[
                'sticky top-[88px] flex flex-col gap-[22px] max-[860px]:static max-[860px]:rounded-[var(--radius)] max-[860px]:border max-[860px]:border-border max-[860px]:p-4',
                filtersOpen ? 'max-[860px]:flex' : 'max-[860px]:hidden',
              ].join(' ')}
              aria-label='Product filters'
            >
              <FilterBlock title='Category'>
                <div className='flex flex-col gap-[9px]'>
                  {categories.map(({ name, count }) => (
                    <FilterCheckbox
                      key={name}
                      label={name}
                      count={count}
                      checked={Boolean(selectedFilters[name])}
                      onChange={(checked) => setFilter(name, checked)}
                    />
                  ))}
                </div>
              </FilterBlock>

              <FilterBlock title='Price'>
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    aria-label='Minimum price'
                    placeholder='Min'
                    value={priceRange.min}
                    onChange={(event) => setPriceRange((current) => ({ ...current, min: event.target.value }))}
                    className='w-full min-w-0 rounded-[9px] border border-border bg-surface px-2.5 py-2 text-[13px] text-text'
                  />
                  <span className='text-[13px] text-text-muted'>—</span>
                  <input
                    type='number'
                    aria-label='Maximum price'
                    placeholder='Max'
                    value={priceRange.max}
                    onChange={(event) => setPriceRange((current) => ({ ...current, max: event.target.value }))}
                    className='w-full min-w-0 rounded-[9px] border border-border bg-surface px-2.5 py-2 text-[13px] text-text'
                  />
                </div>
              </FilterBlock>

              <FilterBlock title='Brand'>
                <div className='flex flex-col gap-[9px]'>
                  {brands.map((brand) => (
                    <FilterCheckbox
                      key={brand}
                      label={brand}
                      checked={Boolean(selectedFilters[brand])}
                      onChange={(checked) => setFilter(brand, checked)}
                    />
                  ))}
                </div>
              </FilterBlock>

              <FilterBlock title='Rating'>
                <div className='flex flex-col gap-[9px]'>
                  {filterOptions.slice(0, 2).map(({ label, key }) => (
                    <FilterCheckbox
                      key={key}
                      label={label}
                      checked={Boolean(selectedFilters[key])}
                      onChange={(checked) => setFilter(key, checked)}
                    />
                  ))}
                </div>
              </FilterBlock>

              <FilterBlock title='Availability'>
                <div className='flex flex-col gap-[9px]'>
                  {filterOptions.slice(2).map(({ label, key }) => (
                    <FilterCheckbox
                      key={key}
                      label={label}
                      checked={Boolean(selectedFilters[label])}
                      onChange={(checked) => setFilter(label, checked)}
                    />
                  ))}
                </div>
              </FilterBlock>

              <FilterBlock title='Color'>
                <div className='flex flex-wrap gap-2'>
                  {colors.map(({ name, value }) => (
                    <button
                      key={name}
                      type='button'
                      aria-label={name}
                      aria-pressed={activeColor === name}
                      onClick={() => setActiveColor(name)}
                      className={[
                        'h-[26px] w-[26px] cursor-pointer rounded-full border-2 p-0.5',
                        activeColor === name ? 'border-primary' : 'border-transparent',
                      ].join(' ')}
                    >
                      <i
                        className='block h-full w-full rounded-full border border-border'
                        style={{ backgroundColor: value }}
                      />
                    </button>
                  ))}
                </div>
              </FilterBlock>

              <button
                type='button'
                onClick={clearFilters}
                className='w-fit cursor-pointer border-0 bg-transparent p-0 text-left text-[13px] font-bold text-primary'
              >
                Clear all filters
              </button>
            </aside>

            <div className='min-w-0'>
              <div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
                <div className='flex items-center gap-2.5'>
                  <span className='text-[13px] text-text-muted'>Showing 1–9 of 128</span>
                </div>
                <select
                  aria-label='Sort products'
                  className='rounded-[9px] border border-border bg-surface px-3 py-[9px] text-[13px] text-text'
                  defaultValue='Newest'
                >
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best rated</option>
                  <option>Biggest discount</option>
                </select>
              </div>

              <div className='grid grid-cols-3 gap-5 max-[860px]:grid-cols-2'>
                {products.map((product) => (
                  <ProductCard
                    key={product.name}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    rating={product.rating}
                    badge={product.badge}
                    badgePosition={product.badgePosition}
                    imageIcon={product.imageIcon}
                    imageHeight={150}
                  />
                ))}
              </div>

              <nav className='mt-9 flex items-center justify-center gap-2' aria-label='Catalog pagination'>
                <button
                  type='button'
                  aria-label='Previous page'
                  onClick={() => setActivePage((page) => Math.max(1, page - 1))}
                  className='h-9 w-9 cursor-pointer rounded-[9px] border border-border bg-surface text-[13px] font-bold text-text-muted'
                >
                  ‹
                </button>
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    type='button'
                    aria-label={`Page ${page}`}
                    aria-current={activePage === page ? 'page' : undefined}
                    onClick={() => setActivePage(page)}
                    className={[
                      'h-9 w-9 cursor-pointer rounded-[9px] border text-[13px] font-bold',
                      activePage === page
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-border bg-surface text-text',
                    ].join(' ')}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type='button'
                  aria-label='Next page'
                  onClick={() => setActivePage((page) => Math.min(4, page + 1))}
                  className='h-9 w-9 cursor-pointer rounded-[9px] border border-border bg-surface text-[13px] font-bold text-text-muted'
                >
                  ›
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} />
    </div>
  )
}
