import { Button } from './Button'
import { IconButton } from './IconButton'
import { Icon } from './Icon'
import type { IconName } from './Icon'

export type ProductCardProps = {
  name: string
  price: string
  originalPrice?: string
  rating?: string
  showWishlist?: boolean
  brand?: string
  badge?: string
  badgePosition?: 'left' | 'right'
  imageIcon?: IconName
  imageHeight?: number
}

export function ProductCard({
  name,
  price,
  originalPrice,
  rating,
  showWishlist = true,
  brand,
  badge,
  badgePosition = 'left',
  imageIcon = 'image',
  imageHeight = 140,
}: ProductCardProps) {
  return (
    <article className='overflow-hidden rounded-[var(--radius)] border border-border bg-surface'>
      <div
        className='relative flex items-center justify-center bg-surface-2 text-text-muted'
        style={{ height: imageHeight }}
      >
        <Icon name={imageIcon} className='h-[34px] w-[34px]' />
        {badge ? (
          <span
            className={[
              'absolute top-2.5 rounded-[7px] bg-accent px-2 py-[3px] text-[11px] font-bold text-on-accent',
              badgePosition === 'right' ? 'right-11' : 'left-2.5',
            ].join(' ')}
          >
            {badge}
          </span>
        ) : null}
        {showWishlist ? (
          <IconButton
            icon={<Icon name='heart' className='h-[14px] w-[14px]' />}
            aria-label={`Add ${name} to wishlist`}
            className='cursor-pointer rounded-full'
            style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30 }}
          />
        ) : null}
      </div>
      <div className='px-4 pb-4 pt-[14px]'>
        {brand ? <div className='mb-0.5 text-[11px] leading-[1.6] text-text-muted'>{brand}</div> : null}
        <div className='mb-1.5 text-sm font-bold leading-[1.6]'>{name}</div>
        {rating ? (
          <div className='mb-2 flex items-center gap-1 text-xs leading-[1.6] text-text-muted'>
            <Icon name='star' className='h-3 w-3 text-accent' />
            {rating}
          </div>
        ) : null}
        <div className='mb-3 text-base font-extrabold leading-[1.6]'>
          {price}
          {originalPrice ? (
            <small className='ml-1 text-xs font-medium leading-[1.6] text-text-muted line-through'>
              {originalPrice}
            </small>
          ) : null}
        </div>
        <Button size='sm' className='w-full cursor-pointer border-0'>Add to cart</Button>
      </div>
    </article>
  )
}
