import { useEffect, useState } from 'react'

import { Button, IconButton } from '../elements'
import { Icon } from '../elements/Icon'

type Theme = 'light' | 'dark'

function getPreferredTheme(): Theme {
  const currentTheme = document.documentElement.getAttribute('data-theme')

  if (currentTheme === 'light' || currentTheme === 'dark') {
    return currentTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function Header() {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <header className='sticky top-0 z-10 border-b border-border bg-bg pt-[env(safe-area-inset-top,0px)]'>
      <div className='mx-auto flex h-[72px] max-w-[1180px] items-center justify-between gap-6 px-6'>
        <span className='text-xl font-extrabold tracking-[-0.02em]'>LumaStore</span>
        <nav
          className='flex gap-7 text-sm font-medium max-[860px]:hidden'
          aria-label='Main navigation'
        >
          <a href='#new-arrivals' className='hover:text-primary'>New arrivals</a>
          <a href='#best-sellers' className='hover:text-primary'>Best sellers</a>
          <a href='#categories' className='hover:text-primary'>Categories</a>
          <a href='#deals' className='hover:text-primary'>Deals</a>
        </nav>
        <div className='flex items-center gap-[14px]'>
          <label className='flex w-[200px] items-center gap-2 rounded-[var(--radius)] border border-border bg-surface-2 px-3 py-2 max-[860px]:hidden'>
            <Icon name='search' className='h-5 w-5 shrink-0' />
            <input
              className='w-full border-0 bg-transparent text-[13px] text-text outline-none'
              type='text'
              placeholder='Search products'
              aria-label='Search products'
            />
          </label>
          <IconButton
            icon={<Icon name='heart' className='h-5 w-5' />}
            aria-label='Wishlist'
          />
          <IconButton
            icon={<Icon name='cart' className='h-5 w-5' />}
            badge='2'
            aria-label='Cart'
          />
          <Button
            size='sm'
            className='rounded-[9px] px-[14px] py-2 text-[13px] leading-[1.6]'
          >
            Sign in
          </Button>
          <button
            type='button'
            onClick={toggleTheme}
            className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-text'
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </div>
    </header>
  )
}
