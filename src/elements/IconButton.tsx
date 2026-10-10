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
        'relative flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-text',
        className,
      ]
        .join(' ')
        .trim()}
      {...props}
    >
      {icon}
      {badge !== undefined && badge !== null && badge !== '' ? (
        <span className='absolute -right-[6px] -top-[6px] inline-flex h-[17px] w-[17px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary'>
          {badge}
        </span>
      ) : null}
    </button>
  )
}
