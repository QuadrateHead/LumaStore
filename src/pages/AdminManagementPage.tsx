import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { AdminPanel } from '../components/AdminPanel'
import { AdminSidebar } from '../components/AdminSidebar'
import { AdminStatusBadge } from '../components/AdminStatusBadge'
import type { AdminStatus } from '../components/AdminStatusBadge'
import { ThemeToggle } from '../components/ThemeToggle'
import { Button, Icon } from '../elements'

type Row = {
  name: string
  detail: string
  status: AdminStatus
  value: string
  editId?: string
}

type ManagementSection = 'products' | 'orders' | 'categories' | 'customers' | 'reviews' | 'coupons' | 'settings'
type ListSection = Exclude<ManagementSection, 'settings'>
type AdminOrderStatus = 'New' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

const orderStatusOptions: AdminOrderStatus[] = ['New', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const sectionTitles: Record<ManagementSection, string> = {
  products: 'Products',
  orders: 'Orders',
  categories: 'Categories',
  customers: 'Customers',
  reviews: 'Reviews',
  coupons: 'Coupons',
  settings: 'Store settings',
}

const sectionRows: Record<ListSection, Row[]> = {
  products: [
    { name: 'Sony WH-1000XM5', detail: 'AUD-1001 · Audio', status: 'Published', value: '$349 · 2 in stock', editId: '1' },
    { name: 'Keychron K2 Keyboard', detail: 'KEY-2040 · Keyboards', status: 'Published', value: '$129 · 3 in stock', editId: '2' },
    { name: 'Logitech MX Master 3S', detail: 'DSK-3012 · Desk setup', status: 'Published', value: '$76 · 48 in stock', editId: '3' },
    { name: 'Galaxy Watch 6', detail: 'WAT-4007 · Smart watches', status: 'Out of stock', value: '$249 · 0 in stock', editId: '4' },
    { name: 'Everyday Backpack 20L', detail: 'BAG-5003 · Bags', status: 'Draft', value: '$68 · 61 in stock', editId: '5' },
  ],
  orders: [
    { name: 'LUMA-10483', detail: 'Jordan Casey · Oct 3, 2026', status: 'New', value: '$680.40' },
    { name: 'LUMA-10482', detail: 'Jordan Casey · Mar 12, 2026', status: 'Shipped', value: '$342.02' },
    { name: 'LUMA-10481', detail: 'Priya M. · Mar 11, 2026', status: 'New', value: '$129.00' },
    { name: 'LUMA-10480', detail: 'Daniel R. · Mar 11, 2026', status: 'Processing', value: '$76.00' },
    { name: 'LUMA-10479', detail: 'Sam O. · Mar 10, 2026', status: 'Delivered', value: '$349.00' },
    { name: 'LUMA-10478', detail: 'Amara K. · Mar 9, 2026', status: 'Cancelled', value: '$249.00' },
  ],
  categories: [
    { name: 'Audio', detail: 'Headphones, speakers and microphones', status: 'Active', value: '128 products' },
    { name: 'Keyboards', detail: 'Mechanical and wireless keyboards', status: 'Active', value: '64 products' },
    { name: 'Smart watches', detail: 'Wearable technology', status: 'Active', value: '42 products' },
    { name: 'Desk setup', detail: 'Monitors, mice and workspace gear', status: 'Active', value: '96 products' },
    { name: 'Bags', detail: 'Everyday and travel bags', status: 'Active', value: '37 products' },
  ],
  customers: [
    { name: 'Jordan Casey', detail: 'jordan.casey@email.com', status: 'Active', value: '12 orders · $2,840 spent' },
    { name: 'Priya Mehta', detail: 'priya.m@email.com', status: 'Active', value: '4 orders · $682 spent' },
    { name: 'Daniel Rivera', detail: 'daniel.r@email.com', status: 'Active', value: '2 orders · $291 spent' },
    { name: 'Sam Okafor', detail: 'sam.o@email.com', status: 'Active', value: '7 orders · $1,204 spent' },
    { name: 'Amara King', detail: 'amara.k@email.com', status: 'Inactive', value: '1 order · $249 spent' },
  ],
  reviews: [
    { name: '“Excellent sound and comfort”', detail: 'Sony WH-1000XM5 · Jordan Casey · 2 days ago', status: 'Pending', value: '★★★★★' },
    { name: '“Great keyboard for work”', detail: 'Keychron K2 · Priya Mehta · 4 days ago', status: 'Approved', value: '★★★★★' },
    { name: '“A little smaller than expected”', detail: 'Everyday Backpack 20L · Sam Okafor · 1 week ago', status: 'Pending', value: '★★★☆☆' },
    { name: '“Fast delivery, works perfectly”', detail: 'PowerCore 20K · Daniel Rivera · 2 weeks ago', status: 'Approved', value: '★★★★☆' },
  ],
  coupons: [
    { name: 'WELCOME10', detail: '10% off · New customers', status: 'Active', value: 'Expires Dec 31, 2026' },
    { name: 'DESK25', detail: '25% off · Desk setup', status: 'Active', value: 'Expires Nov 15, 2026' },
    { name: 'SUMMER15', detail: '15% off · All products', status: 'Expired', value: 'Expired Aug 31, 2026' },
  ],
}

const statusOptions: Record<ListSection, string[]> = {
  products: ['Published', 'Draft', 'Out of stock', 'Archived'],
  orders: ['New', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  categories: ['Active', 'Hidden'],
  customers: ['Active', 'Inactive'],
  reviews: ['Pending', 'Approved', 'Rejected'],
  coupons: ['Active', 'Scheduled', 'Expired'],
}

function AdminOrderDetails({ id }: { id: string }) {
  const [status, setStatus] = useState<AdminOrderStatus>(id === 'LUMA-10482' ? 'Shipped' : 'New')
  const [notice, setNotice] = useState('')
  const knownOrder = sectionRows.orders.find((order) => order.name === id)

  if (!knownOrder) {
    return (
      <AdminPageFrame title='Order not found' activeSection='orders'>
        <AdminPanel>
          <p className='text-sm text-text-muted'>No sample order exists with that order number.</p>
          <Link to='/admin/orders' className='mt-4 inline-block text-sm font-bold text-primary'>Back to orders</Link>
        </AdminPanel>
      </AdminPageFrame>
    )
  }

  return (
    <AdminPageFrame title={`Order #${id}`} activeSection='orders'>
      <div className='grid grid-cols-[minmax(0,1fr)_320px] items-start gap-5 max-[1000px]:grid-cols-1'>
        <AdminPanel title='Order items'>
          <div className='mb-4 flex items-center justify-between gap-3 border-b border-border pb-4'>
            <div>
              <p className='text-sm font-bold'>{knownOrder.detail.split(' · ')[0]}</p>
              <p className='text-xs text-text-muted'>{knownOrder.detail.split(' · ')[1]}</p>
            </div>
            <AdminStatusBadge status={status} />
          </div>
          <div className='flex items-center justify-between gap-4 py-2 text-sm'>
            <span>Sony WH-1000XM5 headphones × 1</span>
            <strong>$349.00</strong>
          </div>
          <div className='flex items-center justify-between gap-4 py-2 text-sm'>
            <span>USB-C charging cable × 2</span>
            <strong>$34.00</strong>
          </div>
          <div className='mt-3 flex items-center justify-between border-t border-border pt-3 text-base font-extrabold'>
            <span>Order total</span>
            <span>{knownOrder.value}</span>
          </div>
        </AdminPanel>
        <AdminPanel title='Update order'>
          <label className='mb-3 block text-[13px] font-bold' htmlFor='order-status'>Order status</label>
          <select
            id='order-status'
            value={status}
            disabled={status === 'Cancelled'}
            onChange={(event) => {
              const nextStatus = orderStatusOptions.find((option) => option === event.target.value)
              if (nextStatus) setStatus(nextStatus)
              setNotice('Order status updated for this preview.')
            }}
            className='w-full rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm disabled:opacity-60'
          >
            {orderStatusOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
          <p className='mt-3 text-xs text-text-muted'>A cancelled order is locked. Status changes in this preview are not persisted.</p>
          {notice ? <p role='status' className='mt-3 text-xs font-bold text-success'>{notice}</p> : null}
          <Link to='/admin/orders' className='mt-5 inline-flex text-sm font-bold text-primary'>← Back to orders</Link>
        </AdminPanel>
      </div>
    </AdminPageFrame>
  )
}

function AdminPageFrame({
  title,
  activeSection,
  children,
}: {
  title: string
  activeSection: 'overview' | 'products' | 'orders'
  children: ReactNode
}) {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `${title} — Admin — LumaStore`
  }, [title])

  return (
    <div className='grid min-h-screen min-[861px]:grid-cols-[232px_1fr]'>
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={(section) => navigate(section === 'overview' ? '/admin' : `/admin/${section}`)}
      />
      <main className='min-w-0 px-8 pb-16 pt-7 max-[860px]:px-6'>
        <div className='mb-7 flex flex-wrap items-center justify-between gap-4'>
          <div>
            <Link to='/admin' className='mb-1 block text-[13px] text-text-muted hover:text-primary'>Admin / Management</Link>
            <h1 className='text-[28px] font-extrabold tracking-[-0.02em]'>{title}</h1>
          </div>
          <div className='flex items-center gap-3'>
            <ThemeToggle />
            <Link
              to='/account'
              aria-label='Admin account'
              title='Account'
              className='flex h-[34px] w-[34px] items-center justify-center rounded-full bg-primary text-xs font-extrabold text-on-primary hover:ring-2 hover:ring-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            >
              AD
            </Link>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}

export function AdminManagementPage() {
  const location = useLocation()
  const { id } = useParams()
  const section = location.pathname.split('/')[2] as ManagementSection
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [notice, setNotice] = useState('')
  const isListSection = Object.hasOwn(sectionRows, section)
  const listSection: ListSection = isListSection ? section as ListSection : 'products'
  const filteredRows = useMemo(
    () => isListSection
      ? sectionRows[listSection].filter((row) => {
          const queryMatches = `${row.name} ${row.detail} ${row.value}`.toLowerCase().includes(search.toLowerCase())
          return queryMatches && (!statusFilter || row.status === statusFilter)
        })
      : [],
    [isListSection, listSection, search, statusFilter],
  )

  if (section === 'orders' && id) {
    return <AdminOrderDetails id={id} />
  }

  if (section === 'settings') {
    return (
      <AdminPageFrame title={sectionTitles.settings} activeSection='overview'>
        <SettingsPanel />
      </AdminPageFrame>
    )
  }

  if (!isListSection) {
    return <AdminPageFrame title='Page not found' activeSection='overview'><AdminPanel>Choose a management section from the sidebar.</AdminPanel></AdminPageFrame>
  }

  const title = sectionTitles[listSection]

  return (
    <AdminPageFrame
      title={title}
      activeSection={listSection === 'orders' ? 'orders' : listSection === 'products' ? 'products' : 'overview'}
    >
      <AdminPanel>
        <div className='mb-4 flex flex-wrap gap-2.5'>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className='min-w-[200px] flex-1 rounded-[9px] border border-border bg-surface px-3 py-[9px] text-[13px]'
            placeholder={`Search ${title.toLowerCase()}`}
            aria-label={`Search ${title.toLowerCase()}`}
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className='rounded-[9px] border border-border bg-surface px-3 py-[9px] text-[13px]'
            aria-label='Filter by status'
          >
            <option value=''>All statuses</option>
            {statusOptions[listSection].map((option) => <option key={option}>{option}</option>)}
          </select>
          {listSection === 'products' ? (
            <Link to='/admin/products/new' className='inline-flex items-center rounded-[9px] bg-primary px-3.5 py-2 text-[13px] font-bold text-on-primary hover:bg-primary-hover'>+ Add product</Link>
          ) : null}
          {listSection === 'categories' || listSection === 'coupons' ? (
            <Button size='sm' onClick={() => setNotice(`${listSection === 'categories' ? 'Category' : 'Coupon'} creation is available in this UI preview.`)}>
              + Add {listSection === 'categories' ? 'category' : 'coupon'}
            </Button>
          ) : null}
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-sm'>
            <thead>
              <tr className='text-left text-[13px] text-text-muted'>
                {['Name', 'Details', 'Status', 'Value', ...(listSection === 'orders' ? [''] : ['Actions'])].map((heading, index) => (
                  <th key={`${heading}-${index}`} className='whitespace-nowrap border-b border-border px-3.5 py-3'>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.name}>
                  <td className='whitespace-nowrap border-b border-border px-3.5 py-3 font-bold'>
                    {listSection === 'orders' ? (
                      <Link className='text-primary hover:underline' to={`/admin/orders/${row.name}`}>#{row.name}</Link>
                    ) : row.name}
                  </td>
                  <td className='whitespace-nowrap border-b border-border px-3.5 py-3 text-text-muted'>{row.detail}</td>
                  <td className='whitespace-nowrap border-b border-border px-3.5 py-3'><AdminStatusBadge status={row.status} /></td>
                  <td className='whitespace-nowrap border-b border-border px-3.5 py-3'>{row.value}</td>
                  <td className='whitespace-nowrap border-b border-border px-3.5 py-3'>
                    {listSection === 'orders' ? (
                      <Link to={`/admin/orders/${row.name}`} className='text-sm font-bold text-primary hover:underline'>View</Link>
                    ) : listSection === 'products' ? (
                      <Link to={`/admin/products/${row.editId}/edit`} className='text-sm font-bold text-primary hover:underline'>Edit</Link>
                    ) : (
                      <button
                        type='button'
                        onClick={() => setNotice(`${row.name} action is simulated in this UI preview.`)}
                        className='cursor-pointer text-sm font-bold text-primary hover:underline'
                      >
                        {listSection === 'reviews' ? 'Review' : 'Edit'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRows.length === 0 ? (
            <div className='py-10 text-center text-sm text-text-muted'>
              <Icon name='search' className='mx-auto mb-2 h-6 w-6' />
              No {title.toLowerCase()} match these filters.
            </div>
          ) : null}
        </div>
        {notice ? <p role='status' className='mt-3 text-xs font-bold text-success'>{notice}</p> : null}
      </AdminPanel>
      <p className='text-xs text-text-muted'>Sample data and actions are for UI demonstration only; changes are not persisted.</p>
    </AdminPageFrame>
  )
}

function SettingsPanel() {
  const [saved, setSaved] = useState(false)

  return (
    <AdminPanel title='Store information'>
      <form
        className='grid grid-cols-2 gap-4 max-[700px]:grid-cols-1'
        onSubmit={(event) => {
          event.preventDefault()
          setSaved(true)
        }}
      >
        <label className='flex flex-col gap-1.5 text-[13px] font-bold'>
          Store name
          <input defaultValue='LumaStore' className='rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm font-normal' />
        </label>
        <label className='flex flex-col gap-1.5 text-[13px] font-bold'>
          Support email
          <input type='email' defaultValue='support@lumastore.example' className='rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm font-normal' />
        </label>
        <label className='flex flex-col gap-1.5 text-[13px] font-bold'>
          Currency
          <select defaultValue='USD' className='rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm font-normal'>
            <option>USD</option><option>EUR</option><option>GBP</option>
          </select>
        </label>
        <label className='flex flex-col gap-1.5 text-[13px] font-bold'>
          Time zone
          <select defaultValue='UTC' className='rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm font-normal'>
            <option>UTC</option><option>Europe/Belgrade</option><option>America/New_York</option>
          </select>
        </label>
        <label className='col-span-2 flex items-center gap-2 text-sm max-[700px]:col-span-1'>
          <input type='checkbox' defaultChecked className='accent-primary' />
          Allow customer reviews
        </label>
        <div className='col-span-2 max-[700px]:col-span-1'>
          <Button type='submit' size='sm'>Save settings</Button>
          {saved ? <span role='status' className='ml-3 text-xs font-bold text-success'>Settings saved for this preview.</span> : null}
        </div>
      </form>
      <p className='mt-4 text-xs text-text-muted'>Settings are local preview values and are not persisted.</p>
    </AdminPanel>
  )
}
