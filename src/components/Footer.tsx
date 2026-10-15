import { Link } from 'react-router-dom'

import { Button } from '../elements'

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: 'New arrivals', to: '/#new-arrivals' },
      { label: 'Best sellers', to: '/#best-sellers' },
      { label: 'Deals', to: '/#deals' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Shipping and returns', to: '/shipping-and-returns' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
]

export function Footer({
  showNewsletter = true,
  activeLink,
}: {
  showNewsletter?: boolean
  activeLink?: string
}) {
  return (
    <footer className='border-t border-border pb-[calc(32px+env(safe-area-inset-bottom,0px))] pt-12'>
      <div className='mx-auto max-w-[1180px] px-6'>
        <div className='mb-9 flex flex-wrap justify-between gap-8'>
          <div>
            <span className='text-xl font-extrabold tracking-[-0.02em]'>LumaStore</span>
            <p className='mt-2 max-w-[34ch] text-sm text-text-muted'>
              Premium tech and workspace essentials for people who care about the details.
            </p>
            {showNewsletter ? (
              <div className='mt-[14px] flex gap-2'>
                <input
                  type='email'
                  placeholder='you@email.com'
                  aria-label='Email address'
                  className='w-[220px] rounded-[9px] border border-border bg-surface px-3 py-[9px] text-[13px] text-text'
                />
                <Button
                  size='sm'
                  className='rounded-[9px] px-[14px] py-2 text-[13px] leading-[1.6]'
                >
                  Get updates
                </Button>
              </div>
            ) : null}
          </div>
          <div className='flex flex-wrap gap-14'>
            {footerLinks.map(({ title, links }) => (
              <div key={title}>
                <h4 className='mb-3 text-[13px] font-bold'>{title}</h4>
                {links.map(({ label, to }) => (
                  <Link
                    aria-current={activeLink === label ? 'page' : undefined}
                    className={[
                      'mb-2 block text-sm text-text-muted hover:text-primary',
                      activeLink === label ? 'text-primary' : '',
                    ].join(' ')}
                    to={to}
                    key={label}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-wrap justify-between gap-2 border-t border-border pt-5 text-[13px] text-text-muted'>
          <span>© 2026 LumaStore. All rights reserved.</span>
          <span>Midnight Violet &amp; Gold — light / dark</span>
        </div>
      </div>
    </footer>
  )
}
