import type { ReactNode } from 'react'

export type SectionHeaderProps = {
  eyebrow?: string
  title: string
  action?: ReactNode
  className?: string
}

export function SectionHeader({ eyebrow, title, action, className = '' }: SectionHeaderProps) {
  return (
    <div className={['flex items-end justify-between gap-4', className].join(' ').trim()}>
      <div>
        {eyebrow ? (
          <p className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted'>
            {eyebrow}
          </p>
        ) : null}
        <h2 className='text-[26px] font-extrabold tracking-[-0.02em] text-text'>
          {title}
        </h2>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}
