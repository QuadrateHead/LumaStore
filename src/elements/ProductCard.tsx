import { Button } from './Button'
import { IconButton } from './IconButton'
import { Icon } from './Icon'

export type ProductCardProps = {
  name: string
  price: string
  originalPrice?: string
  rating?: string
}

export function ProductCard({
  name,
  price,
  originalPrice,
  rating,
}: ProductCardProps) {
  return (
    <article className='overflow-hidden rounded-[var(--radius)] border border-border bg-surface'>
      <div className='relative flex h-[140px] items-center justify-center bg-surface-2 text-text-muted'>
        <Icon name='image' className='h-[34px] w-[34px]' />
        <IconButton
          icon={<Icon name='heart' className='h-[14px] w-[14px]' />}
          aria-label={`Add ${name} to wishlist`}
          className='cursor-pointer rounded-full'
          style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30 }}
        />
      </div>
      <div className='p-[14px] pb-4'>
        <div className='mb-1.5 text-sm font-bold'>{name}</div>
        {rating ? (
          <div className='mb-2 flex items-center gap-1 text-xs text-text-muted'>
            <Icon name='star' className='h-3 w-3 text-accent' />
            {rating}
          </div>
        ) : null}
        <div className='mb-3 text-base font-extrabold'>
          {price}
          {originalPrice ? (
            <small className='ml-1 text-xs font-medium text-text-muted line-through'>
              {originalPrice}
            </small>
          ) : null}
        </div>
        <Button size='sm' className='w-full'>Add to cart</Button>
      </div>
    </article>
  )
}
