import type { ReactNode } from 'react'

import { Badge } from './Badge'
import { Button } from './Button'

export type ProductCardProps = {
  brand?: string
  name: string
  price: string
  originalPrice?: string
  rating?: number
  reviewCount?: number
  tag?: string
  imageLabel?: string
  image?: ReactNode
}

export function ProductCard({
  brand = 'Luma',
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  tag,
  imageLabel = 'Product',
  image,
}: ProductCardProps) {
  return (
    <article className='overflow-hidden rounded-[var(--radius)] border border-border bg-surface shadow-sm'>
      <div className='relative flex h-48 items-center justify-center bg-surface-2 text-text-muted'>
        {tag ? (
          <div className='absolute left-3 top-3'>
            <Badge variant='accent'>{tag}</Badge>
          </div>
        ) : null}
        <button
          type='button'
          aria-label={`Add ${name} to wishlist`}
          className='absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:bg-surface-2'
        >
          ♡
        </button>
        {image ?? (
          <div className='flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface text-lg font-semibold'>
            {imageLabel.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      <div className='space-y-3 p-4'>
        {brand ? <p className='text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted'>{brand}</p> : null}

        <div className='flex items-start justify-between gap-3'>
          <h3 className='text-sm font-bold text-text'>{name}</h3>
        </div>

        {rating !== undefined ? (
          <div className='flex items-center gap-1 text-xs text-text-muted'>
            <span className='text-accent'>★</span>
            <span>
              {rating.toFixed(1)}
              {reviewCount ? ` (${reviewCount})` : ''}
            </span>
          </div>
        ) : null}

        <div className='flex items-end gap-2'>
          <span className='text-lg font-extrabold text-text'>{price}</span>
          {originalPrice ? (
            <span className='text-xs text-text-muted line-through'>{originalPrice}</span>
          ) : null}
        </div>

        <Button variant='primary' size='sm' className='w-full'>
          Add to cart
        </Button>
      </div>
    </article>
  )
}
