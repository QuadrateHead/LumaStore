'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { ColorSwatches } from '@/components/ColorSwatches'
import { FilterCheckboxList } from '@/components/FilterCheckboxList'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Pagination } from '@/components/Pagination'
import { PriceRangeFilter } from '@/components/PriceRangeFilter'
import { ProductFilterBlock } from '@/components/ProductFilterBlock'
import { ProductFilterSidebar } from '@/components/ProductFilterSidebar'
import { ProductGrid } from '@/components/ProductGrid'
import { Button } from '@/elements'
import type { ProductCardProps } from '@/elements'

import { useQuery } from '@tanstack/react-query'
import { fetchAllProducts } from '@/api/productFetch'

const PRODUCTS_PER_PAGE = 20

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

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

/** Render the storefront catalog, including product data and pagination states. */
export function CatalogScreen() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeColor, setActiveColor] = useState('Black')
  const [activePage, setActivePage] = useState(1)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({
    Audio: true,
    'In stock': true,
  })

  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  const {
    data,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['products', activePage, PRODUCTS_PER_PAGE],
    queryFn: () => fetchAllProducts(activePage, PRODUCTS_PER_PAGE),
    staleTime: 5 * 60 * 1000,
  })

  if (data && activePage > Math.max(1, data.pagination.pageCount)) {
    setActivePage(Math.max(1, data.pagination.pageCount))
  }

  const apiProducts = data?.products ?? []
  const products: ProductCardProps[] = apiProducts.map((product) => ({
    name: product.title,
    brand: product.brand ?? undefined,
    price: currencyFormatter.format(product.price),
    rating: `${product.rating.toFixed(1)} (${product.reviewCount.toLocaleString()})`,
  }))


  useEffect(() => {
    document.title = 'All Products — LumaStore'
  }, [])

  /** Update one selected catalog filter. */
  const setFilter = (key: string, checked: boolean) => {
    setSelectedFilters((current) => ({ ...current, [key]: checked }))
  }

  /** Clear all selected filters and price bounds. */
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
            <Link href='/' className='hover:text-primary'>Home</Link>
            {' / Products'}
          </div>

          <div className='mb-6 flex flex-wrap items-end justify-between gap-4'>
            <div>
              <h1 className='mb-1 text-[28px] font-extrabold tracking-[-0.02em]'>All products</h1>
              <div className='text-[13px] text-text-muted'>
                {isPending
                  ? 'Loading products...'
                  : isError
                    ? 'Products could not be loaded'
                    : `${data?.pagination.total ?? 0} products found`}
              </div>
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
                  <span className='text-[13px] text-text-muted'>
                    {isPending
                      ? 'Loading products...'
                      : `Showing ${data?.pagination.total === 0 ? 0 : (activePage - 1) * PRODUCTS_PER_PAGE + 1}–${(activePage - 1) * PRODUCTS_PER_PAGE + products.length} of ${data?.pagination.total ?? 0}`}
                  </span>
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

              {isPending ? (
                <p role='status' className='py-8 text-center text-sm text-text-muted'>
                  Loading products...
                </p>
              ) : isError ? (
                <div role='alert' className='py-8 text-center'>
                  <p className='mb-3 text-sm text-text-muted'>
                    {error instanceof Error ? error.message : 'Could not load products.'}
                  </p>
                  <Button
                    variant='ghost'
                    size='sm'
                    disabled={isFetching}
                    onClick={() => void refetch()}
                  >
                    {isFetching ? 'Retrying...' : 'Retry'}
                  </Button>
                </div>
              ) : products.length === 0 ? (
                <p className='py-8 text-center text-sm text-text-muted'>
                  No products are available right now.
                </p>
              ) : (
                <ProductGrid products={products} imageHeight={150} />
              )}

              {activePage > 1 ? (
                <div className='mt-5 flex justify-center'>
                  <Button variant='ghost' size='sm' onClick={() => setActivePage(1)}>
                    Back to first page
                  </Button>
                </div>
              ) : null}
              {(data?.pagination.pageCount ?? 0) > 1 || activePage > 1 ? (
                <Pagination
                  ariaLabel='Catalog pagination'
                  activePage={activePage}
                  pageCount={Math.max(data?.pagination.pageCount ?? 0, activePage, 1)}
                  onPageChange={setActivePage}
                />
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} />
    </div>
  )
}
