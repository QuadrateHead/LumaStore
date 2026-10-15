import type { ReactNode } from 'react'

type ProductFilterBlockProps = {
  title: string
  children: ReactNode
  className?: string
}

export function ProductFilterBlock({
  title,
  children,
  className = '',
}: ProductFilterBlockProps) {
  return (
    <section className={['border-b border-border pb-[18px]', className].join(' ').trim()}>
      <h2 className='mb-3 text-[13px] font-bold'>{title}</h2>
      {children}
    </section>
  )
}
