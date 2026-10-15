import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { CategoryStrip } from '../components/CategoryStrip'
import { ColorSwatches } from '../components/ColorSwatches'
import { FilterCheckboxList } from '../components/FilterCheckboxList'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Pagination } from '../components/Pagination'
import { PriceRangeFilter } from '../components/PriceRangeFilter'
import { ProductFilterBlock } from '../components/ProductFilterBlock'
import { ProductFilterSidebar } from '../components/ProductFilterSidebar'
import { ProductGrid } from '../components/ProductGrid'
import { Button, Icon } from '../elements'
import type { IconName } from '../elements'

const categoryChips = ['All audio', 'Headphones', 'Earbuds', 'Speakers', 'Microphones']
const brands = ['Sony', 'Anker', 'Samsung', 'Logitech']
const ratings = ['4 stars & up', '3 stars & up']
const availability = ['In stock', 'Out of stock']
const swatches = [
  { name: 'Black', color: '#18181B' },
  { name: 'White', color: '#FAFAFA' },
  { name: 'Silver', color: '#C4C4C8' },
  { name: 'Blue', color: '#3B4A6B' },
]

const categoryProducts = [
  { name: 'WH-1000XM5 headphones', brand: 'Sony', price: '$349', originalPrice: '$399', rating: '4.8 (1,204)', badge: '-13%', imageIcon: 'headphones' as IconName },
  { name: 'Soundcore Motion+ speaker', brand: 'Anker', price: '$99', rating: '4.6 (842)', imageIcon: 'speaker' as IconName },
  { name: 'Yeti USB microphone', brand: 'Logitech', price: '$79', originalPrice: '$99', rating: '4.7 (563)', badge: '-20%', imageIcon: 'microphone' as IconName },
  { name: 'Galaxy Buds2 Pro', brand: 'Samsung', price: '$149', rating: '4.5 (391)', imageIcon: 'earbuds' as IconName },
  { name: 'Soundcore Space One', brand: 'Anker', price: '$89', rating: '4.4 (276)', imageIcon: 'headphones' as IconName },
  { name: 'SRS-XB100 speaker', brand: 'Sony', price: '$59', rating: '4.6 (718)', imageIcon: 'portableSpeaker' as IconName },
]

const otherCategories = [
  { name: 'Keyboards', count: '64 products', to: '/categories/keyboards' },
  { name: 'Smart watches', count: '42 products', to: '/categories/smart-watches' },
  { name: 'Desk setup', count: '96 products', to: '/categories/desk-setup' },
  { name: 'Bags', count: '37 products', to: '/categories/bags' },
  { name: 'Phone accessories', count: '53 products', to: '/categories/phone-accessories' },
]

export function CategoryPage() {
  const { slug } = useParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeChip, setActiveChip] = useState(categoryChips[0])
  const [activeColor, setActiveColor] = useState('Black')
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({
    'In stock': true,
  })
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [activePage, setActivePage] = useState(1)
  const categoryName = slug
    ? slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
    : 'Audio'

  useEffect(() => {
    document.title = `${categoryName} — LumaStore`
  }, [categoryName])

  const setFilter = (label: string, checked: boolean) => {
    setSelectedFilters((current) => ({ ...current, [label]: checked }))
  }

  const clearFilters = () => {
    setSelectedFilters({})
    setPriceRange({ min: '', max: '' })
    setActiveColor('')
  }

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header activeNav='categories' />

      <main>
        <div className='mx-auto max-w-[1180px] px-6 pb-16 pt-7'>
          <div className='mb-[18px] text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            {' / '}
            <Link to='/products' className='hover:text-primary'>Products</Link>
            {' / '}
            {categoryName}
          </div>

          <section className='mb-7 grid grid-cols-[1.2fr_1fr] items-center gap-8 rounded-[20px] border border-border bg-surface p-8 max-[860px]:grid-cols-1 max-[860px]:p-6'>
            <div>
              <h1 className='mb-2.5 text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] max-[860px]:text-[28px]'>{categoryName}</h1>
              <p className='mb-[18px] max-w-[48ch] text-[15px] text-text-muted'>
                Wireless headphones, speakers, microphones, and sound accessories for focused work and long listening sessions.
              </p>
              <div className='flex flex-wrap gap-2' aria-label={`${categoryName} subcategories`}>
                {categoryChips.map((chip) => (
                  <button
                    type='button'
                    key={chip}
                    aria-pressed={activeChip === chip}
                    onClick={() => setActiveChip(chip)}
                    className={[
                      'cursor-pointer rounded-full border px-3.5 py-[7px] text-[13px] font-bold',
                      activeChip === chip
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-border bg-surface text-text',
                    ].join(' ')}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
            <div className='flex h-[170px] items-center justify-center rounded-[14px] bg-surface-2 text-text-muted max-[860px]:hidden'>
              <Icon name='headphones' className='h-14 w-14' />
            </div>
          </section>

          <div className='grid grid-cols-[240px_minmax(0,1fr)] items-start gap-9 max-[860px]:grid-cols-1'>
            <div className='flex items-center justify-between min-[861px]:hidden'>
              <span className='text-[13px] text-text-muted'>128 products in {categoryName}</span>
              <Button
                variant='ghost'
                size='sm'
                aria-expanded={filtersOpen}
                onClick={() => setFiltersOpen((open) => !open)}
              >
                Filters
              </Button>
            </div>

            <ProductFilterSidebar open={filtersOpen}>
              <PriceRangeFilter
                min={priceRange.min}
                max={priceRange.max}
                onMinChange={(min) => setPriceRange((current) => ({ ...current, min }))}
                onMaxChange={(max) => setPriceRange((current) => ({ ...current, max }))}
              />

              <ProductFilterBlock title='Brand'>
                <FilterCheckboxList
                  options={brands.map((label) => ({ label }))}
                  selectedValues={selectedFilters}
                  onChange={setFilter}
                />
              </ProductFilterBlock>

              <ProductFilterBlock title='Rating'>
                <FilterCheckboxList
                  options={ratings.map((label) => ({ label }))}
                  selectedValues={selectedFilters}
                  onChange={setFilter}
                />
              </ProductFilterBlock>

              <ProductFilterBlock title='Availability'>
                <FilterCheckboxList
                  options={availability.map((label) => ({ label }))}
                  selectedValues={selectedFilters}
                  onChange={setFilter}
                />
              </ProductFilterBlock>

              <ProductFilterBlock title='Color'>
                <ColorSwatches
                  swatches={swatches}
                  activeColor={activeColor}
                  onChange={setActiveColor}
                  transparentBackground
                />
              </ProductFilterBlock>

              <button
                type='button'
                onClick={clearFilters}
                className='w-fit cursor-pointer border-0 bg-transparent p-0 text-left text-[13px] font-bold text-primary'
              >
                Clear all filters
              </button>
            </ProductFilterSidebar>

            <div className='min-w-0'>
              <div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
                <div className='flex items-center gap-2.5'>
                  <span className='text-[13px] text-text-muted'>128 products in {categoryName}</span>
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

              <ProductGrid products={categoryProducts} imageHeight={150} />

              <Pagination
                ariaLabel='Category pagination'
                activePage={activePage}
                onPageChange={setActivePage}
              />
            </div>
          </div>

          <section className='mt-14'>
            <h2 className='mb-5 text-[22px] font-extrabold tracking-[-0.02em]'>Explore other categories</h2>
            <CategoryStrip
              items={otherCategories}
            />
          </section>
        </div>
      </main>

      <Footer showNewsletter={false} />
    </div>
  )
}
