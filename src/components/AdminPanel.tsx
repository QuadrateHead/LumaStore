import type { ReactNode } from 'react'

type AdminPanelProps = {
  title: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function AdminPanel({ title, action, children, className = '' }: AdminPanelProps) {
  return (
    <section className={`mb-5 rounded-[var(--radius)] border border-border bg-surface p-[22px] ${className}`}>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
        <h2 className='text-base font-extrabold'>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
