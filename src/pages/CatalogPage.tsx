import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ColorSwatches } from '../components/ColorSwatches'
import { FilterCheckboxList } from '../components/FilterCheckboxList'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Pagination } from '../components/Pagination'
import { PriceRangeFilter } from '../components/PriceRangeFilter'
import { ProductFilterBlock } from '../components/ProductFilterBlock'
import { ProductFilterSidebar } from '../components/ProductFilterSidebar'
import { ProductGrid } from '../components/ProductGrid'
import { Button } from '../elements'
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
  { name: 'Black', color: '#18181B' },
  { name: 'White', color: '#FAFAFA' },
  { name: 'Silver', color: '#C4C4C8' },
  { name: 'Blue', color: '#3B4A6B' },
  { name: 'Green', color: '#3F6B4A' },
]

const filterOptions = [
  { label: '4 stars & up', key: 'rating-4' },
  { label: '3 stars & up', key: 'rating-3' },
  { label: 'In stock', key: 'in-stock' },
  { label: 'Out of stock', key: 'out-of-stock' },
]

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
            <ProductFilterSidebar open={filtersOpen}>
              <ProductFilterBlock title='Category' className='last:border-b-0'>
                <FilterCheckboxList
                  options={categories.map(({ name, count }) => ({ label: name, count }))}
                  selectedValues={selectedFilters}
                  onChange={setFilter}
                />
              </ProductFilterBlock>

              <PriceRangeFilter
                min={priceRange.min}
                max={priceRange.max}
                onMinChange={(min) => setPriceRange((current) => ({ ...current, min }))}
                onMaxChange={(max) => setPriceRange((current) => ({ ...current, max }))}
              />

              <ProductFilterBlock title='Brand' className='last:border-b-0'>
                <FilterCheckboxList
                  options={brands.map((label) => ({ label }))}
                  selectedValues={selectedFilters}
                  onChange={setFilter}
                />
              </ProductFilterBlock>

              <ProductFilterBlock title='Rating' className='last:border-b-0'>
                <FilterCheckboxList
                  options={filterOptions.slice(0, 2).map(({ label, key }) => ({ label, value: key }))}
                  selectedValues={selectedFilters}
                  onChange={setFilter}
                />
              </ProductFilterBlock>

              <ProductFilterBlock title='Availability' className='last:border-b-0'>
                <FilterCheckboxList
                  options={filterOptions.slice(2).map(({ label }) => ({ label }))}
                  selectedValues={selectedFilters}
                  onChange={setFilter}
                />
              </ProductFilterBlock>

              <ProductFilterBlock title='Color' className='last:border-b-0'>
                <ColorSwatches
                  swatches={colors}
                  activeColor={activeColor}
                  onChange={setActiveColor}
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

              <ProductGrid products={products} imageHeight={150} />

              <Pagination
                ariaLabel='Catalog pagination'
                activePage={activePage}
                onPageChange={setActivePage}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} />
    </div>
  )
}
