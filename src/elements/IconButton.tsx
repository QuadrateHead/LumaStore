import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  badge?: string | number
}

export function IconButton({ icon, badge, className = '', ...props }: IconButtonProps) {
  return (
    <button
      type={props.type ?? 'button'}
      className={[
        'relative flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-text transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        className,
      ]
        .join(' ')
        .trim()}
      {...props}
    >
      {icon}
      {badge !== undefined && badge !== null && badge !== '' ? (
        <span className='absolute -right-1.5 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-on-primary'>
          {badge}
        </span>
      ) : null}
    </button>
  )
}
