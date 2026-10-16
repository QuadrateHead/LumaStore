import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page not found — LumaStore'
  }, [])

  return (
    <div className='flex min-h-screen flex-col leading-[1.6]'>
      <Header />
      <main className='mx-auto flex w-full max-w-[1180px] flex-1 flex-col items-center justify-center px-6 py-16 text-center'>
        <span className='mb-3 text-5xl font-extrabold tracking-[0.16em] text-primary sm:text-6xl'>404</span>
        <h1 className='mb-2 text-[32px] font-extrabold tracking-[-0.02em]'>Page not found</h1>
        <p className='mb-6 max-w-[48ch] text-sm text-text-muted'>
          That page may have moved, or the address may be incorrect.
        </p>
        <Link
          to='/'
          className='inline-flex items-center justify-center gap-2 rounded-[var(--radius)] border border-transparent bg-primary px-[22px] py-3 text-sm font-bold text-on-primary hover:bg-primary-hover'
        >
          Back to home
        </Link>
      </main>
      <Footer showNewsletter={false} />
    </div>
  )
}
