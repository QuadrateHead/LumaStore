import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border border-transparent bg-primary text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
  secondary:
    'border border-border bg-surface text-text hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
  ghost:
    'border border-border bg-transparent text-text hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
  accent:
    'border border-transparent bg-accent text-on-accent hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'rounded-[9px] px-[14px] py-2 text-[13px]',
  md: 'px-[22px] py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

export function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--radius)] font-bold leading-[1.6] transition-colors duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .join(' ')
        .trim()}
      {...props}
    >
      {children}
    </button>
  )
}
