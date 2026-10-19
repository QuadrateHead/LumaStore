'use client'

import { useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

function subscribe(callback: () => void) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        callback()
      }
    }
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', callback)

  return () => {
    observer.disconnect()
    mediaQuery.removeEventListener('change', callback)
  }
}

function getSnapshot(): Theme {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  if (currentTheme === 'light' || currentTheme === 'dark') {
    return currentTheme
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getServerSnapshot(): Theme {
  return 'light'
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', nextTheme)
    try {
      localStorage.setItem('theme', nextTheme)
    } catch {
      // Ignore storage errors in restricted environments
    }
  }

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='flex h-9.5 w-9.5 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-text'
      aria-label='Toggle theme'
      suppressHydrationWarning
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  )
}
