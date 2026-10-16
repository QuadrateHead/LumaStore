import { Link, useNavigate } from 'react-router-dom'

import { Icon } from '../elements/Icon'
import { ThemeToggle } from './ThemeToggle'

type HeaderProps = {
  accountName?: string
  activeNav?: 'categories'
  cartCount?: number
  searchQuery?: string
  wishlistCount?: number
}

export function Header({
  accountName,
  activeNav,
  cartCount = 2,
  searchQuery = '',
  wishlistCount,
}: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className='sticky top-0 z-10 border-b border-border bg-bg pt-[env(safe-area-inset-top,0px)]'>
      <div className='mx-auto flex h-[72px] max-w-[1180px] items-center justify-between gap-6 px-6'>
        <Link
          to='/'
          aria-label='LumaStore home'
          className='text-xl font-extrabold tracking-[-0.02em] hover:text-primary'
        >
          LumaStore
        </Link>
        <nav
          className='flex gap-7 text-sm font-medium max-[860px]:hidden'
          aria-label='Main navigation'
        >
          <Link to='/#new-arrivals' className='hover:text-primary'>New arrivals</Link>
          <Link to='/#best-sellers' className='hover:text-primary'>Best sellers</Link>
          <Link
            to='/#categories'
            aria-current={activeNav === 'categories' ? 'page' : undefined}
            className={activeNav === 'categories' ? 'text-primary' : 'hover:text-primary'}
          >
            Categories
          </Link>
          <Link to='/#deals' className='hover:text-primary'>Deals</Link>
        </nav>
        <div className='flex items-center gap-[14px]'>
          <form
            role='search'
            onSubmit={(event) => {
              event.preventDefault()
              const query = new FormData(event.currentTarget).get('q')
              const trimmedQuery = typeof query === 'string' ? query.trim() : ''
              navigate(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : '/search')
            }}
            className='flex w-[200px] items-center gap-2 rounded-[var(--radius)] border border-border bg-surface-2 px-3 py-2 max-[860px]:hidden'
          >
            <Icon name='search' className='h-5 w-5 shrink-0' />
            <input
              className='w-full border-0 bg-transparent text-[13px] text-text outline-none'
              type='search'
              name='q'
              defaultValue={searchQuery}
              placeholder='Search products'
              aria-label='Search products'
            />
          </form>
          <Link
            to='/wishlist'
            aria-label='Wishlist'
            aria-current={wishlistCount !== undefined ? 'page' : undefined}
            className={[
              'relative flex h-[38px] w-[38px] items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-text',
              wishlistCount !== undefined ? 'border-primary text-primary' : '',
            ].join(' ')}
          >
            <Icon
              name='heart'
              className='h-5 w-5'
              style={{ fill: wishlistCount !== undefined ? 'currentColor' : 'none' }}
            />
            {wishlistCount !== undefined && wishlistCount > 0 ? (
              <span className='absolute -right-[6px] -top-[6px] inline-flex h-[17px] w-[17px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary'>
                {wishlistCount}
              </span>
            ) : null}
          </Link>
          <Link
            to='/cart'
            aria-label='Cart'
            className='relative flex h-[38px] w-[38px] items-center justify-center rounded-[var(--radius)] border border-border bg-surface text-text'
          >
            <Icon name='cart' className='h-5 w-5' />
            {cartCount > 0 ? (
              <span className='absolute -right-[6px] -top-[6px] inline-flex h-[17px] w-[17px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary'>
                {cartCount}
              </span>
            ) : null}
          </Link>
          {accountName ? (
            <div className='flex items-center gap-[9px] rounded-full border border-border bg-surface py-[5px] pl-[5px] pr-[14px]'>
              <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-on-primary'>
                {accountName
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </span>
              <span className='text-[13px] font-bold'>{accountName.split(' ')[0]}</span>
            </div>
          ) : (
            <Link
              to='/login'
              className='inline-flex cursor-pointer items-center justify-center gap-2 rounded-[9px] bg-primary px-[14px] py-2 text-[13px] font-bold leading-[1.6] text-on-primary transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
            >
              Sign in
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
