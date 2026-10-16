import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

export function LegalPage() {
  const { hash } = useLocation()

  useEffect(() => {
    const id = hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [hash])

  useEffect(() => {
    document.title = 'Legal information — LumaStore'
  }, [])

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header />
      <main className='mx-auto max-w-[1180px] px-6 pb-16 pt-7'>
        <div className='mb-[18px] text-[13px] text-text-muted'>
          <Link to='/' className='hover:text-primary'>Home</Link>
          {' / Legal'}
        </div>
        <h1 className='mb-2 text-[32px] font-extrabold tracking-[-0.02em]'>Legal information</h1>
        <p className='mb-8 max-w-[68ch] text-sm text-text-muted'>
          These sample policies explain how a LumaStore account and store experience are intended to work.
          They are illustrative UI content, not legal advice.
        </p>
        <nav aria-label='Legal documents' className='mb-8 flex flex-wrap gap-3 text-sm font-bold text-primary'>
          <a href='#terms' className='hover:underline'>Terms of Service</a>
          <a href='#privacy' className='hover:underline'>Privacy Policy</a>
        </nav>
        <div className='grid gap-5 min-[861px]:grid-cols-2'>
          <section id='terms' className='scroll-mt-24 rounded-[var(--radius)] border border-border bg-surface p-6'>
            <h2 className='mb-3 text-xl font-extrabold'>Terms of Service</h2>
            <p className='mb-3 text-sm text-text-muted'>
              By using this storefront, you agree to provide accurate account and order information and to use
              the site lawfully. Product availability, prices, promotions, and delivery estimates may change.
            </p>
            <p className='text-sm text-text-muted'>
              Orders and account actions shown in this project are demonstrations only. No real payment is
              collected and no purchase is created.
            </p>
          </section>
          <section id='privacy' className='scroll-mt-24 rounded-[var(--radius)] border border-border bg-surface p-6'>
            <h2 className='mb-3 text-xl font-extrabold'>Privacy Policy</h2>
            <p className='mb-3 text-sm text-text-muted'>
              A production store would use account details to provide shopping, customer support, and order
              services, and would explain any analytics or marketing use before collecting personal data.
            </p>
            <p className='text-sm text-text-muted'>
              This preview does not submit registration, contact, or checkout information to a server.
            </p>
          </section>
        </div>
      </main>
      <Footer showNewsletter={false} />
    </div>
  )
}
