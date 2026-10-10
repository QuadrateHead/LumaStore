import { Button } from '../elements'

const footerLinks = [
  { title: 'Shop', links: ['New arrivals', 'Best sellers', 'Deals'] },
  { title: 'Company', links: ['About', 'Contact'] },
  { title: 'Support', links: ['Shipping and returns', 'FAQ'] },
]

export function Footer() {
  return (
    <footer className='border-t border-border pb-[calc(32px+env(safe-area-inset-bottom,0px))] pt-12'>
      <div className='mx-auto max-w-[1180px] px-6'>
        <div className='mb-9 flex flex-wrap justify-between gap-8'>
          <div>
            <span className='text-xl font-extrabold tracking-[-0.02em]'>LumaStore</span>
            <p className='mt-2 max-w-[34ch] text-sm text-text-muted'>
              Premium tech and workspace essentials for people who care about the details.
            </p>
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
          </div>
          <div className='flex flex-wrap gap-14'>
            {footerLinks.map(({ title, links }) => (
              <div key={title}>
                <h4 className='mb-3 text-[13px] font-bold'>{title}</h4>
                {links.map((link) => (
                  <a
                    className='mb-2 block text-sm text-text-muted'
                    href='#'
                    key={link}
                  >
                    {link}
                  </a>
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
