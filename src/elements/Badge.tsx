import type { ReactNode } from 'react'

export type BadgeVariant = 'primary' | 'accent' | 'success' | 'neutral'

export type BadgeProps = {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const badgeClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary text-on-primary',
  accent: 'bg-accent text-on-accent',
  success: 'bg-success text-bg',
  neutral: 'bg-surface-2 text-text',
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]',
        badgeClasses[variant],
        className,
      ]
        .join(' ')
        .trim()}
    >
      {children}
    </span>
  )
}
