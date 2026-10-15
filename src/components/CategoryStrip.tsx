import { Link } from 'react-router-dom'

export type CategoryStripItem = {
  name: string
  count: string
  to?: string
}

export function CategoryStrip({ items }: { items: readonly CategoryStripItem[] }) {
  return (
    <div className='flex overflow-hidden rounded-[var(--radius)] border border-border max-[860px]:flex-wrap'>
      {items.map(({ name, count, to }, index) => {
        const className = [
          'min-w-0 flex-1 border-r border-border p-5 text-left last:border-r-0 hover:text-primary max-[860px]:flex-[1_1_50%] max-[860px]:border-b',
          index % 2 === 0 ? 'bg-surface-2' : 'bg-surface',
        ].join(' ')
        const content = (
          <>
            <strong className='mb-1 block text-[15px]'>{name}</strong>
            <span className='text-[13px] text-text-muted'>{count}</span>
          </>
        )

        return to ? (
          <Link to={to} className={className} key={name}>
            {content}
          </Link>
        ) : (
          <div className={className} key={name}>
            {content}
          </div>
        )
      })}
    </div>
  )
}
