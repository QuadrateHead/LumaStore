import type { ReactNode } from 'react'

type PromoBannerProps = {
  title: string
  action: ReactNode
  size?: 'large' | 'compact'
}

const sizeClasses = {
  large: {
    container: 'gap-6 p-12',
    title: 'max-w-[34ch] text-[26px]',
  },
  compact: {
    container: 'gap-5 px-10 py-10 max-[860px]:px-6 max-[860px]:py-7',
    title: 'max-w-[30ch] text-[24px]',
  },
} satisfies Record<NonNullable<PromoBannerProps['size']>, { container: string; title: string }>

export function PromoBanner({ title, action, size = 'large' }: PromoBannerProps) {
  const classes = sizeClasses[size]

  return (
    <div
      className={`flex flex-wrap items-center justify-between rounded-[20px] bg-primary text-on-primary ${classes.container}`}
    >
      <h3 className={`font-extrabold tracking-[-0.02em] ${classes.title}`}>{title}</h3>
      {action}
    </div>
  )
}
