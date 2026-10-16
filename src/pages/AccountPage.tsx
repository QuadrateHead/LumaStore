import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Button, Icon } from '../elements'

type AccountTab = 'overview' | 'profile' | 'addresses' | 'orders' | 'wishlist'

const accountNavigation = [
  { id: 'overview', icon: 'dashboard', label: 'Overview' },
  { id: 'profile', icon: 'user', label: 'Profile settings' },
  { id: 'addresses', icon: 'location', label: 'Addresses' },
  { id: 'orders', icon: 'orders', label: 'Order history' },
  { id: 'wishlist', icon: 'heart', label: 'Wishlist' },
] as const

const accountStats = [
  { value: '12', label: 'Total orders' },
  { value: '5', label: 'Wishlist items' },
  { value: 'Mar 2024', label: 'Member since' },
]

const orders = [
  { id: 'LUMA-10482', date: 'March 12, 2026', status: 'Shipped', statusClass: 'shipped', total: '$342.02', reorder: true },
  { id: 'LUMA-10417', date: 'February 2, 2026', status: 'Delivered', statusClass: 'delivered', total: '$128.50', reorder: true },
  { id: 'LUMA-10390', date: 'January 20, 2026', status: 'Processing', statusClass: 'processing', total: '$79.00', reorder: true },
  { id: 'LUMA-10355', date: 'December 30, 2025', status: 'Cancelled', statusClass: 'cancelled', total: '$249.00', reorder: false },
] as const

const wishlist = [
  { name: 'Sony WH-1000XM5 headphones', price: '$349', icon: 'headphones' },
  { name: '27″ 4K monitor', price: '$329', icon: 'monitor' },
  { name: 'Standing desk converter', price: '$179', icon: 'shipping' },
] as const

export function AccountPage() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<AccountTab>(
    location.pathname === '/account/orders' ? 'orders' : 'overview',
  )
  const navigate = useNavigate()
  const currentTab = location.pathname === '/account/orders' ? 'orders' : activeTab

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header accountName='Jordan Casey' />

      <main>
        <div className='mx-auto max-w-[1180px] px-6 pb-16 pt-7'>
          <div className='mb-[18px] text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            <span> / Account</span>
          </div>

          <h1 className='mb-6 text-[28px] font-extrabold tracking-[-0.02em]'>My account</h1>

          <div className='grid items-start gap-9 min-[861px]:grid-cols-[230px_1fr]'>
            <nav
              aria-label='Account sections'
              className='flex flex-wrap gap-1.5 min-[861px]:sticky min-[861px]:top-[88px] min-[861px]:flex-col'
            >
              {accountNavigation.map(({ id, icon, label }) => (
                <button
                  type='button'
                  key={label}
                  aria-current={currentTab === id ? 'page' : undefined}
                  onClick={() => {
                    setActiveTab(id)
                    if (id === 'orders') navigate('/account/orders')
                    else if (location.pathname === '/account/orders') navigate('/account')
                  }}
                  className={[
                    'flex w-full cursor-pointer items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-left text-sm font-bold min-[861px]:w-full',
                    currentTab === id ? 'bg-surface-2 text-text' : 'text-text-muted hover:text-text',
                  ].join(' ')}
                >
                  <Icon name={icon} className='h-[18px] w-[18px] shrink-0' />
                  {label}
                </button>
              ))}
              <div className='hidden border-t border-border min-[861px]:my-2.5 min-[861px]:block' />
              <button
                type='button'
                className='flex w-full cursor-pointer items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-left text-sm font-bold text-danger'
              >
                <Icon name='logout' className='h-[18px] w-[18px] shrink-0' />
                Sign out
              </button>
            </nav>

            <section aria-labelledby='account-overview-title'>
              {currentTab === 'overview' ? (
                <div>
                  <h2 id='account-overview-title' className='mb-5 text-[19px] font-extrabold tracking-[-0.02em]'>
                    Welcome back, Jordan
                  </h2>
                  <div className='mb-6 flex flex-wrap gap-4 max-[860px]:flex-col'>
                    {accountStats.map(({ value, label }) => (
                      <div
                        key={label}
                        className='min-w-[150px] flex-1 rounded-[var(--radius)] border border-border bg-surface p-[18px]'
                      >
                        <div className='text-2xl font-extrabold'>{value}</div>
                        <div className='text-[13px] text-text-muted'>{label}</div>
                      </div>
                    ))}
                  </div>
                  <h3 className='mb-2.5 text-sm font-bold'>Most recent order</h3>
                  <div className='mb-2 flex flex-wrap items-center justify-between gap-3.5 rounded-[var(--radius)] border border-border bg-surface px-[22px] py-5'>
                    <div>
                      <strong className='mb-[3px] block text-sm'>Order #LUMA-10482</strong>
                      <span className='text-xs text-text-muted'>
                        Placed March 12, 2026 · 3 items · $342.02
                      </span>
                    </div>
                    <span className='inline-block whitespace-nowrap rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-bold text-primary'>
                      Shipped
                    </span>
                    <Button variant='ghost' size='sm' onClick={() => navigate('/account/orders')}>
                      View order
                    </Button>
                  </div>
                </div>
              ) : null}

              {currentTab === 'profile' ? (
                <div>
                  <h2 className='mb-5 text-[19px] font-extrabold tracking-[-0.02em]'>Profile settings</h2>
                  <div className='mb-5 rounded-[var(--radius)] border border-border bg-surface p-6'>
                    <h3 className='mb-4 text-sm font-bold'>Personal information</h3>
                    <form>
                      <div className='grid grid-cols-2 gap-4 max-[860px]:grid-cols-1'>
                        <label className='mb-4 flex flex-col gap-1.5 text-[13px] font-bold'>
                          Full name
                          <input name='fullName' defaultValue='Jordan Casey' className='w-full rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm font-normal text-text' />
                        </label>
                        <label className='mb-4 flex flex-col gap-1.5 text-[13px] font-bold'>
                          Email
                          <input name='email' type='email' defaultValue='jordan.casey@email.com' className='w-full rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm font-normal text-text' />
                        </label>
                        <label className='mb-4 flex flex-col gap-1.5 text-[13px] font-bold'>
                          Phone number
                          <input name='phone' defaultValue='+381 60 123 4567' className='w-full rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm font-normal text-text' />
                        </label>
                      </div>
                      <Button type='button' size='sm'>Save changes</Button>
                    </form>
                  </div>
                  <div className='mb-5 rounded-[var(--radius)] border border-border bg-surface p-6'>
                    <h3 className='mb-4 text-sm font-bold'>Change password</h3>
                    <div className='grid grid-cols-2 gap-4 max-[860px]:grid-cols-1'>
                      <label className='col-span-2 mb-4 flex flex-col gap-1.5 text-[13px] font-bold max-[860px]:col-span-1'>
                        Current password
                        <input type='password' placeholder='Enter current password' className='w-full rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm font-normal text-text' />
                      </label>
                      <label className='mb-4 flex flex-col gap-1.5 text-[13px] font-bold'>
                        New password
                        <input type='password' placeholder='Minimum 8 characters' className='w-full rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm font-normal text-text' />
                      </label>
                      <label className='mb-4 flex flex-col gap-1.5 text-[13px] font-bold'>
                        Confirm new password
                        <input type='password' placeholder='Re-enter new password' className='w-full rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm font-normal text-text' />
                      </label>
                    </div>
                    <Button size='sm'>Update password</Button>
                  </div>
                </div>
              ) : null}

              {currentTab === 'addresses' ? (
                <div>
                  <h2 className='mb-5 text-[19px] font-extrabold tracking-[-0.02em]'>Addresses</h2>
                  <div className='mb-4 grid grid-cols-2 gap-4 max-[860px]:grid-cols-1'>
                    <article className='relative rounded-[var(--radius)] border border-border bg-surface p-[18px]'>
                      <span className='absolute right-[14px] top-[14px] rounded-[7px] bg-accent px-[9px] py-[3px] text-[11px] font-bold text-on-accent'>Default</span>
                      <strong className='mb-1 block text-sm'>Home</strong>
                      <p className='mb-3 text-[13px] text-text-muted'>
                        Jordan Casey<br />Bulevar Mihajla Pupina 10<br />Novi Beograd, 11070, Serbia<br />+381 60 123 4567
                      </p>
                      <div className='flex gap-4 text-xs font-bold'>
                        <button type='button' className='cursor-pointer text-primary'>Edit</button>
                        <button type='button' className='cursor-pointer text-danger'>Delete</button>
                      </div>
                    </article>
                    <article className='relative rounded-[var(--radius)] border border-border bg-surface p-[18px]'>
                      <strong className='mb-1 block text-sm'>Work</strong>
                      <p className='mb-3 text-[13px] text-text-muted'>
                        Jordan Casey<br />Bulevar Zorana Đinđića 64<br />Novi Beograd, 11070, Serbia<br />+381 60 123 4567
                      </p>
                      <div className='flex flex-wrap gap-4 text-xs font-bold'>
                        <button type='button' className='cursor-pointer text-primary'>Set as default</button>
                        <button type='button' className='cursor-pointer text-primary'>Edit</button>
                        <button type='button' className='cursor-pointer text-danger'>Delete</button>
                      </div>
                    </article>
                  </div>
                  <Button variant='ghost' size='sm'>+ Add new address</Button>
                </div>
              ) : null}

              {currentTab === 'orders' ? (
                <div>
                  <h2 className='mb-5 text-[19px] font-extrabold tracking-[-0.02em]'>Order history</h2>
                  <div className='flex flex-col gap-3'>
                    {orders.map(({ id, date, status, statusClass, total, reorder }) => (
                      <article
                        key={id}
                        className='flex flex-wrap items-center justify-between gap-3.5 rounded-[var(--radius)] border border-border bg-surface px-5 py-4'
                      >
                        <div className='flex min-w-[150px] flex-col gap-0.5'>
                          <strong className='text-sm'>#{id}</strong>
                          <span className='text-xs text-text-muted'>{date}</span>
                        </div>
                        <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${statusClass === 'delivered' ? 'bg-success/15 text-success' : statusClass === 'processing' ? 'bg-accent/15 text-accent' : statusClass === 'cancelled' ? 'bg-danger/15 text-danger' : 'bg-primary/15 text-primary'}`}>
                          {status}
                        </span>
                        <div className='min-w-[70px] text-sm font-extrabold'>{total}</div>
                        <div className='flex gap-2'>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => navigate(`/account/orders/${id}`)}
                            disabled={id !== 'LUMA-10482'}
                          >
                            View details
                          </Button>
                          {reorder ? <Button size='sm'>Reorder</Button> : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {currentTab === 'wishlist' ? (
                <div>
                  <h2 className='mb-5 text-[19px] font-extrabold tracking-[-0.02em]'>Wishlist</h2>
                  <div className='grid grid-cols-3 gap-5 max-[860px]:grid-cols-2 max-[520px]:grid-cols-1'>
                    {wishlist.map(({ name, price, icon }) => (
                      <article key={name} className='overflow-hidden rounded-[var(--radius)] border border-border bg-surface'>
                        <div className='relative flex h-[130px] items-center justify-center bg-surface-2 text-text-muted'>
                          <Icon name={icon} className='h-[30px] w-[30px]' />
                          <button
                            type='button'
                            aria-label={`Remove ${name} from wishlist`}
                            className='absolute right-2.5 top-2.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-text-muted'
                          >
                            <span aria-hidden='true' className='text-sm leading-none'>×</span>
                          </button>
                        </div>
                        <div className='p-[14px] px-4 pb-4'>
                          <span className='mb-1.5 block text-sm font-bold'>{name}</span>
                          <div className='mb-3 text-[15px] font-extrabold'>{price}</div>
                          <Button size='sm' className='w-full'>Move to cart</Button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
