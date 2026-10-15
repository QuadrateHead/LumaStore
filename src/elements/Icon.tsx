import type { SVGProps } from 'react'

export type IconName =
  | 'cart'
  | 'dashboard'
  | 'heart'
  | 'headphones'
  | 'image'
  | 'keyboard'
  | 'location'
  | 'logout'
  | 'mail'
  | 'mouse'
  | 'orders'
  | 'returns'
  | 'search'
  | 'clock'
  | 'shipping'
  | 'star'
  | 'support'
  | 'phone'
  | 'trash'
  | 'check'
  | 'speaker'
  | 'microphone'
  | 'earbuds'
  | 'portableSpeaker'
  | 'backpack'
  | 'charger'
  | 'watch'
  | 'webcam'
  | 'lock'
  | 'monitor'
  | 'package'
  | 'user'
  | 'desk'

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
      {name === 'headphones' ? (
        <>
          <path d='M4 13a8 8 0 0 1 16 0' />
          <rect x='2' y='13' width='5' height='7' rx='1.5' />
          <rect x='17' y='13' width='5' height='7' rx='1.5' />
        </>
      ) : null}
      {name === 'cart' ? (
        <>
          <circle cx='9' cy='21' r='1.4' />
          <circle cx='18' cy='21' r='1.4' />
          <path d='M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6' />
        </>
      ) : null}
      {name === 'dashboard' ? (
        <>
          <rect x='3' y='3' width='7' height='7' rx='1.5' />
          <rect x='14' y='3' width='7' height='7' rx='1.5' />
          <rect x='3' y='14' width='7' height='7' rx='1.5' />
          <rect x='14' y='14' width='7' height='7' rx='1.5' />
        </>
      ) : null}
      {name === 'image' ? (
        <>
          <rect x='2' y='4' width='20' height='16' rx='2' />
          <circle cx='8' cy='10' r='1.6' />
          <path d='M2 16l5-5 4 4 5-6 6 7' />
        </>
      ) : null}
      {name === 'location' ? (
        <>
          <path d='M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z' />
          <circle cx='12' cy='10' r='2.4' />
        </>
      ) : null}
      {name === 'mail' ? (
        <>
          <rect x='3' y='5' width='18' height='14' rx='2' />
          <path d='M3 7l9 6 9-6' />
        </>
      ) : null}
      {name === 'clock' ? (
        <>
          <circle cx='12' cy='12' r='9' />
          <path d='M12 7v5l3 2' />
        </>
      ) : null}
      {name === 'logout' ? (
        <>
          <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
          <path d='M16 17l5-5-5-5M21 12H9' />
        </>
      ) : null}
      {name === 'orders' ? (
        <>
          <path d='M4 20V9a2 2 0 0 1 2-2h1l1-3h8l1 3h1a2 2 0 0 1 2 2v11' />
          <path d='M4 20h16' />
        </>
      ) : null}
      {name === 'star' ? (
        <path
          d='M12 2l2.9 6.26L21 9.27l-4.5 4.38L17.8 20 12 16.9 6.2 20l1.3-6.35L3 9.27l6.1-1.01z'
          fill='currentColor'
          stroke='none'
        />
      ) : null}
      {name === 'charger' ? (
        <>
          <rect x='6' y='5' width='12' height='16' rx='2' />
          <path d='M9 2v3m6-3v3m-4 6-2 3h3l-1 3 3-4h-3l1-2' />
        </>
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
      {name === 'monitor' ? (
        <>
          <rect x='4' y='6' width='16' height='11' rx='2' />
          <path d='M8 20h8M12 17v3' />
        </>
      ) : null}
      {name === 'keyboard' ? (
        <>
          <rect x='2' y='5' width='20' height='14' rx='2' />
          <path d='M5 9h1m3 0h1m3 0h1m3 0h1M5 12h1m3 0h1m3 0h1m3 0h1M8 15h8' />
        </>
      ) : null}
      {name === 'watch' ? (
        <>
          <path d='M8 3h8l1 4H7l1-4zM7 17h10l-1 4H8l-1-4z' />
          <rect x='6' y='7' width='12' height='10' rx='3' />
          <path d='M12 9v3l2 1' />
        </>
      ) : null}
      {name === 'mouse' ? (
        <>
          <rect x='5' y='2' width='14' height='20' rx='7' />
          <path d='M12 2v6' />
        </>
      ) : null}
      {name === 'trash' ? (
        <>
          <path d='M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6z' />
        </>
      ) : null}
      {name === 'check' ? (
        <path d='M20 6L9 17l-5-5' />
      ) : null}
      {name === 'speaker' ? (
        <>
          <circle cx='12' cy='12' r='9' />
          <circle cx='12' cy='12' r='3' />
        </>
      ) : null}
      {name === 'microphone' ? (
        <>
          <rect x='8' y='3' width='8' height='12' rx='4' />
          <path d='M5 11a7 7 0 0 0 14 0M12 18v3' />
        </>
      ) : null}
      {name === 'earbuds' ? (
        <>
          <circle cx='8' cy='12' r='3' />
          <circle cx='16' cy='12' r='3' />
          <path d='M8 9V5m8 4V5' />
        </>
      ) : null}
      {name === 'portableSpeaker' ? (
        <>
          <rect x='6' y='3' width='12' height='18' rx='3' />
          <circle cx='12' cy='15' r='3' />
        </>
      ) : null}
      {name === 'backpack' ? (
        <>
          <path d='M7 7V6a5 5 0 0 1 10 0v1' />
          <rect x='4' y='7' width='16' height='14' rx='3' />
          <path d='M8 7v3m8-3v3M8 14h8v7H8z' />
        </>
      ) : null}
      {name === 'phone' ? (
        <>
          <rect x='6' y='2' width='12' height='20' rx='2' />
          <path d='M10 5h4m-2 13h.01' />
        </>
      ) : null}
      {name === 'webcam' ? (
        <>
          <rect x='3' y='5' width='18' height='13' rx='3' />
          <circle cx='12' cy='11.5' r='3' />
          <path d='M9 18v3m6-3v3m-6 0h6' />
        </>
      ) : null}
      {name === 'package' ? (
        <>
          <path d='M21 8l-9-5-9 5 9 5 9-5z' />
          <path d='M3 8v8l9 5 9-5V8' />
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
      {name === 'user' ? (
        <>
          <circle cx='12' cy='8' r='4' />
          <path d='M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7' />
        </>
      ) : null}
      {name === 'desk' ? (
        <>
          <rect x='3' y='10' width='18' height='4' rx='1' />
          <path d='M6 14v3m12-3v3M4 10l2-4h12l2 4' />
        </>
      ) : null}
    </svg>
  )
}
