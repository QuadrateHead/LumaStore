import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Footer } from './Footer'
import { Header } from './Header'

type AuthPageLayoutProps = {
  title: string
  documentTitle: string
  description: string
  breadcrumb: string
  maxWidth: '420px' | '440px'
  children: ReactNode
}

export function AuthPageLayout({
  title,
  documentTitle,
  description,
  breadcrumb,
  maxWidth,
  children,
}: AuthPageLayoutProps) {
  useEffect(() => {
    document.title = documentTitle
  }, [documentTitle])

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header />

      <main>
        <div className='mx-auto max-w-295 px-6 pb-18 pt-7'>
          <div className='mb-8 text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            {' / '}
            {breadcrumb}
          </div>

          <div className='mx-auto' style={{ maxWidth }}>
            <section className='rounded-lg border border-border bg-surface p-9 max-[860px]:px-5.5 max-[860px]:py-7'>
              <h1 className='mb-1.5 text-2xl font-extrabold tracking-[-0.02em]'>{title}</h1>
              <p className='mb-7 text-sm text-text-muted'>{description}</p>
              {children}
            </section>
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} />
    </div>
  )
}
