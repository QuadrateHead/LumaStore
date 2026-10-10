import type { SVGProps } from 'react'

export type IconName =
  | 'cart'
  | 'heart'
  | 'image'
  | 'returns'
  | 'search'
  | 'shipping'
  | 'star'
  | 'support'
  | 'lock'

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName
}

export function Icon({ name, className = '', ...props }: IconProps) {
  return (
    <svg
      aria-hidden='true'
      className={[
        'block max-w-none fill-none stroke-current stroke-[1.6]',
        className,
      ]
        .join(' ')
        .trim()}
      viewBox='0 0 24 24'
      {...props}
    >
      {name === 'search' ? (
        <>
          <circle cx='11' cy='11' r='7' />
          <path d='M21 21l-4.3-4.3' />
        </>
      ) : null}
      {name === 'heart' ? (
        <path d='M12 20s-7-4.5-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5c-2.3 4.5-9.3 9-9.3 9z' />
      ) : null}
      {name === 'cart' ? (
        <>
          <circle cx='9' cy='21' r='1.4' />
          <circle cx='18' cy='21' r='1.4' />
          <path d='M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6' />
        </>
      ) : null}
      {name === 'image' ? (
        <>
          <rect x='2' y='4' width='20' height='16' rx='2' />
          <circle cx='8' cy='10' r='1.6' />
          <path d='M2 16l5-5 4 4 5-6 6 7' />
        </>
      ) : null}
      {name === 'star' ? (
        <path
          d='M12 2l2.9 6.26L21 9.27l-4.5 4.38L17.8 20 12 16.9 6.2 20l1.3-6.35L3 9.27l6.1-1.01z'
          fill='currentColor'
          stroke='none'
        />
      ) : null}
      {name === 'shipping' ? (
        <>
          <rect x='1' y='7' width='13' height='9' rx='1' />
          <path d='M14 10h4l3 3v3h-7z' />
          <circle cx='6' cy='18' r='1.6' />
          <circle cx='17' cy='18' r='1.6' />
        </>
      ) : null}
      {name === 'returns' ? (
        <>
          <path d='M20 11a8 8 0 1 0-2.6 6.1' />
          <path d='M20 5v6h-6' />
        </>
      ) : null}
      {name === 'lock' ? (
        <>
          <rect x='4' y='10' width='16' height='10' rx='2' />
          <path d='M8 10V7a4 4 0 0 1 8 0v3' />
        </>
      ) : null}
      {name === 'support' ? (
        <>
          <path d='M4 13a8 8 0 0 1 16 0' />
          <rect x='2' y='13' width='5' height='7' rx='1.5' />
          <rect x='17' y='13' width='5' height='7' rx='1.5' />
          <path d='M20 20a4 4 0 0 1-4 4h-2' />
        </>
      ) : null}
    </svg>
  )
}
