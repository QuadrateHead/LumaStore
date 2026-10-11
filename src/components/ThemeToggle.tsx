import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getPreferredTheme(): Theme {
  const currentTheme = document.documentElement.getAttribute('data-theme')

  if (currentTheme === 'light' || currentTheme === 'dark') {
    return currentTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <button
      type='button'
      onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))}
      className='flex h-9.5 w-9.5 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-text'
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  )
}
