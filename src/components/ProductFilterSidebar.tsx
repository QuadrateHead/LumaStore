import type { ReactNode } from 'react'

type ProductFilterSidebarProps = {
  children: ReactNode
  open: boolean
  ariaLabel?: string
}

export function ProductFilterSidebar({
  children,
  open,
  ariaLabel = 'Product filters',
}: ProductFilterSidebarProps) {
  return (
    <aside
      aria-label={ariaLabel}
      className={[
        'sticky top-[88px] flex flex-col gap-[22px] max-[860px]:static max-[860px]:rounded-[var(--radius)] max-[860px]:border max-[860px]:border-border max-[860px]:p-4',
        open ? 'max-[860px]:flex' : 'max-[860px]:hidden',
      ].join(' ')}
    >
      {children}
    </aside>
  )
}
