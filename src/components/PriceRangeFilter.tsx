import { ProductFilterBlock } from './ProductFilterBlock'

type PriceRangeFilterProps = {
  min: string
  max: string
  onMinChange: (value: string) => void
  onMaxChange: (value: string) => void
}

export function PriceRangeFilter({
  min,
  max,
  onMinChange,
  onMaxChange,
}: PriceRangeFilterProps) {
  return (
    <ProductFilterBlock title='Price'>
      <div className='flex items-center gap-2'>
        <input
          type='number'
          aria-label='Minimum price'
          placeholder='Min'
          value={min}
          onChange={(event) => onMinChange(event.target.value)}
          className='w-full min-w-0 rounded-[9px] border border-border bg-surface px-2.5 py-2 text-[13px] text-text'
        />
        <span className='text-[13px] text-text-muted'>—</span>
        <input
          type='number'
          aria-label='Maximum price'
          placeholder='Max'
          value={max}
          onChange={(event) => onMaxChange(event.target.value)}
          className='w-full min-w-0 rounded-[9px] border border-border bg-surface px-2.5 py-2 text-[13px] text-text'
        />
      </div>
    </ProductFilterBlock>
  )
}
