import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProductGrid } from '../components/ProductGrid'
import { Button, Icon } from '../elements'
import type { IconName, ProductCardProps } from '../elements'

type SearchProduct = {
  brand: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  icon: IconName
  keywords: string
}

type SortOption = 'rel' | 'asc' | 'desc' | 'rate'

const products: SearchProduct[] = [
  { brand: 'Sony', name: 'WH-1000XM5 headphones', price: 349, originalPrice: 399, rating: 4.8, reviews: 1204, icon: 'headphones', keywords: 'headphones audio wireless noise cancelling' },
  { brand: 'Samsung', name: 'Galaxy Buds2 Pro', price: 149, rating: 4.5, reviews: 391, icon: 'earbuds', keywords: 'earbuds headphones audio wireless' },
  { brand: 'Anker', name: 'Soundcore Space One', price: 89, rating: 4.4, reviews: 276, icon: 'headphones', keywords: 'headphones audio wireless' },
  { brand: 'Anker', name: 'Soundcore Motion+ speaker', price: 99, rating: 4.6, reviews: 842, icon: 'speaker', keywords: 'speaker audio bluetooth' },
  { brand: 'Sony', name: 'SRS-XB100 speaker', price: 59, rating: 4.6, reviews: 718, icon: 'speaker', keywords: 'speaker audio bluetooth' },
  { brand: 'Logitech', name: 'Yeti USB microphone', price: 79, originalPrice: 99, rating: 4.7, reviews: 563, icon: 'microphone', keywords: 'microphone audio usb' },
  { brand: 'Keychron', name: 'K2 mechanical keyboard', price: 129, rating: 4.7, reviews: 398, icon: 'keyboard', keywords: 'keyboard wireless desk setup' },
  { brand: 'Logitech', name: 'MX Master 3S mouse', price: 76, originalPrice: 89, rating: 4.9, reviews: 1204, icon: 'mouse', keywords: 'mouse wireless desk setup' },
  { brand: 'LumaStore', name: '27″ 4K monitor', price: 329, rating: 4.5, reviews: 167, icon: 'monitor', keywords: 'monitor display desk setup' },
  { brand: 'LumaStore', name: '4K webcam', price: 69, rating: 4.6, reviews: 215, icon: 'webcam', keywords: 'webcam camera desk setup' },
  { brand: 'Anker', name: 'PowerCore 20K charger', price: 39, rating: 4.8, reviews: 632, icon: 'charger', keywords: 'charger power bank phone accessories' },
]

const popularSearches = ['headphones', 'keyboard', 'monitor', 'charger']
const suggestedSearches = ['desk', 'keyboard', 'headphones']

function SearchChip({ query }: { query: string }) {
  return (
    <Link
      to={`/search?q=${encodeURIComponent(query)}`}
      className='rounded-full border border-border bg-surface px-[14px] py-1.5 text-[13px] font-bold text-text hover:border-primary hover:text-primary'
    >
      {query}
    </Link>
  )
}

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = (searchParams.get('q') ?? '').trim()
  useEffect(() => {
    document.title = query ? `Search: ${query} — LumaStore` : 'Search — LumaStore'
  }, [query])

  return <SearchPageContent key={query} query={query} />
}

function SearchPageContent({ query }: { query: string }) {
  const [minimumPrice, setMinimumPrice] = useState('')
  const [maximumPrice, setMaximumPrice] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [fourStarsAndUp, setFourStarsAndUp] = useState(false)
  const [sort, setSort] = useState<SortOption>('rel')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const matches = products.filter((product) => {
    const searchableText = `${product.brand} ${product.name} ${product.keywords}`.toLowerCase()
    return words.length > 0 && words.every((word) => searchableText.includes(word))
  })
  const brands = [...new Set(matches.map((product) => product.brand))].sort()
  const minPrice = minimumPrice === '' ? 0 : Number.parseFloat(minimumPrice)
  const maxPrice = maximumPrice === '' ? Number.POSITIVE_INFINITY : Number.parseFloat(maximumPrice)
  const filteredProducts = matches.filter((product) =>
    (!selectedBrands.length || selectedBrands.includes(product.brand)) &&
    (!Number.isNaN(minPrice) ? product.price >= minPrice : true) &&
    (!Number.isNaN(maxPrice) ? product.price <= maxPrice : true) &&
    (!fourStarsAndUp || product.rating >= 4),
  )
  const sortedProducts = [...filteredProducts]
  if (sort === 'asc') sortedProducts.sort((a, b) => a.price - b.price)
  if (sort === 'desc') sortedProducts.sort((a, b) => b.price - a.price)
  if (sort === 'rate') sortedProducts.sort((a, b) => b.rating - a.rating)
  const productCards: ProductCardProps[] = sortedProducts.map((product) => {
    const discount = product.originalPrice
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0

    return {
      name: product.name,
      brand: product.brand,
      price: `$${product.price}`,
      originalPrice: product.originalPrice ? `$${product.originalPrice}` : undefined,
      rating: `${product.rating.toFixed(1)} (${product.reviews.toLocaleString('en-US')})`,
      showWishlist: false,
      badge: discount > 0 ? `-${discount}%` : undefined,
      imageIcon: product.icon,
    }
  })

  const clearFilters = () => {
    setMinimumPrice('')
    setMaximumPrice('')
    setSelectedBrands([])
    setFourStarsAndUp(false)
    setSort('rel')
  }

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header searchQuery={query} />

      <main>
        <div className='mx-auto max-w-[1180px] px-6 pb-16 pt-7'>
          <div className='mb-[18px] text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            {' / Search'}
          </div>

          <div className='mb-6'>
            <h1 className='mb-1 text-[28px] font-extrabold tracking-[-0.02em]'>
              {query ? `Search results for “${query}”` : 'Search products'}
            </h1>
            <div role='status' aria-live='polite' className='text-[13px] text-text-muted'>
              {!query
                ? 'Type a product name or brand in the search bar.'
                : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'} found`}
            </div>
            {!query || matches.length > 0 ? (
              <div className='mt-[14px] flex flex-wrap items-center gap-2'>
                <span className='mr-1 text-[13px] text-text-muted'>Popular:</span>
                {popularSearches.map((search) => <SearchChip key={search} query={search} />)}
              </div>
            ) : null}
          </div>

          {query && matches.length > 0 ? (
            <div className='grid items-start gap-9 max-[860px]:grid-cols-1 min-[861px]:grid-cols-[240px_minmax(0,1fr)]'>
              <aside
                id='search-filters'
                className={[
                  'flex flex-col gap-[22px] max-[860px]:rounded-[var(--radius)] max-[860px]:border max-[860px]:border-border max-[860px]:p-4',
                  filtersOpen ? 'max-[860px]:flex' : 'max-[860px]:hidden',
                  'min-[861px]:sticky min-[861px]:top-[88px]',
                ].join(' ')}
              >
                <div className='border-b border-border pb-[18px]'>
                  <h2 className='mb-3 text-[13px] font-bold'>Price</h2>
                  <div className='flex items-center gap-2'>
                    <input
                      type='number'
                      min='0'
                      value={minimumPrice}
                      onChange={(event) => setMinimumPrice(event.target.value)}
                      placeholder='Min'
                      aria-label='Minimum price'
                      className='w-full rounded-[9px] border border-border bg-surface px-2.5 py-2 text-[13px] text-text'
                    />
                    <span className='text-[13px] text-text-muted'>—</span>
                    <input
                      type='number'
                      min='0'
                      value={maximumPrice}
                      onChange={(event) => setMaximumPrice(event.target.value)}
                      placeholder='Max'
                      aria-label='Maximum price'
                      className='w-full rounded-[9px] border border-border bg-surface px-2.5 py-2 text-[13px] text-text'
                    />
                  </div>
                </div>

                {brands.length > 0 ? (
                  <fieldset className='border-b border-border pb-[18px]'>
                    <legend className='mb-3 text-[13px] font-bold'>Brand</legend>
                    <div className='flex flex-col gap-[9px]'>
                      {brands.map((brand) => (
                        <label key={brand} className='flex cursor-pointer items-center gap-[9px] text-[13px] text-text-muted'>
                          <input
                            type='checkbox'
                            checked={selectedBrands.includes(brand)}
                            onChange={(event) => {
                              setSelectedBrands((current) =>
                                event.target.checked
                                  ? [...current, brand]
                                  : current.filter((selectedBrand) => selectedBrand !== brand),
                              )
                            }}
                            className='h-[15px] w-[15px] accent-primary'
                          />
                          {brand}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ) : null}

                <fieldset className='border-b border-border pb-[18px]'>
                  <legend className='mb-3 text-[13px] font-bold'>Rating</legend>
                  <label className='flex cursor-pointer items-center gap-[9px] text-[13px] text-text-muted'>
                    <input
                      type='checkbox'
                      checked={fourStarsAndUp}
                      onChange={(event) => setFourStarsAndUp(event.target.checked)}
                      className='h-[15px] w-[15px] accent-primary'
                    />
                    4 stars &amp; up
                  </label>
                </fieldset>

                <button
                  type='button'
                  onClick={clearFilters}
                  className='cursor-pointer bg-transparent p-0 text-left text-[13px] font-bold text-primary'
                >
                  Clear all filters
                </button>
              </aside>

              <section aria-label='Search results' className='min-w-0'>
                <div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
                  <Button
                    variant='ghost'
                    size='sm'
                    aria-expanded={filtersOpen}
                    aria-controls='search-filters'
                    onClick={() => setFiltersOpen((open) => !open)}
                    className='hidden max-[860px]:inline-flex'
                  >
                    Filters
                  </Button>
                  <select
                    aria-label='Sort products'
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortOption)}
                    className='ml-auto rounded-[9px] border border-border bg-surface px-3 py-[9px] text-[13px] text-text'
                  >
                    <option value='rel'>Best match</option>
                    <option value='asc'>Price: Low to High</option>
                    <option value='desc'>Price: High to Low</option>
                    <option value='rate'>Best rated</option>
                  </select>
                </div>

                {productCards.length > 0 ? (
                  <ProductGrid
                    products={productCards}
                    imageHeight={150}
                    className='grid grid-cols-3 gap-5 max-[860px]:grid-cols-2'
                  />
                ) : (
                  <p className='mt-4 text-[13px] text-text-muted'>
                    No products match these filters. Clear filters to see all {matches.length} results.
                  </p>
                )}
              </section>
            </div>
          ) : null}

          {query && matches.length === 0 ? (
            <section className='flex flex-col items-center gap-3 rounded-[var(--radius)] border border-border bg-surface px-5 py-14 text-center'>
              <Icon name='search' className='h-11 w-11 text-text-muted' />
              <h2 className='text-xl font-extrabold tracking-[-0.02em]'>
                No products found for “{query}”.
              </h2>
              <p className='text-sm text-text-muted'>Check the spelling, or try a more general term.</p>
              <p className='text-sm text-text-muted'>Try searching for:</p>
              <div className='flex flex-wrap justify-center gap-2'>
                {suggestedSearches.map((search) => <SearchChip key={search} query={search} />)}
              </div>
              <Link
                to='/products'
                className='mt-2 inline-flex items-center justify-center rounded-[9px] bg-primary px-[14px] py-2 text-[13px] font-bold text-on-primary hover:bg-primary-hover'
              >
                Browse all products
              </Link>
            </section>
          ) : null}
        </div>
      </main>

      <Footer showNewsletter={false} />
    </div>
  )
}
