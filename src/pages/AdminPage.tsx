import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AdminKpiCard } from '../components/AdminKpiCard'
import { AdminPanel } from '../components/AdminPanel'
import { AdminSidebar } from '../components/AdminSidebar'
import type { AdminSection } from '../components/AdminSidebar'
import { AdminStatusBadge } from '../components/AdminStatusBadge'
import type { AdminStatus } from '../components/AdminStatusBadge'
import { ThemeToggle } from '../components/ThemeToggle'
import { Button, Icon } from '../elements'

type AdminOrder = {
  id: string
  customer: string
  date: string
  payment: AdminStatus
  status: AdminStatus
  total: string
}

const kpis = [
  { label: 'Total revenue', value: '$24,580' },
  { label: 'Total orders', value: '312' },
  { label: 'Customers', value: '1,240' },
  { label: 'Products in stock', value: '1,806' },
  { label: 'Low stock products', value: '3', warning: true },
  { label: 'Pending orders', value: '18', warning: true },
]

const sales = [
  { label: 'Mon', value: 620 },
  { label: 'Tue', value: 840 },
  { label: 'Wed', value: 510 },
  { label: 'Thu', value: 930 },
  { label: 'Fri', value: 1180 },
  { label: 'Sat', value: 760 },
  { label: 'Sun', value: 690 },
] as const

type SalesRange = 'today' | '7' | '30' | 'year'

const salesByRange: Record<SalesRange, readonly { label: string; value: number }[]> = {
  today: [
    { label: '9', value: 120 },
    { label: '12', value: 340 },
    { label: '15', value: 210 },
    { label: '18', value: 480 },
    { label: '21', value: 150 },
  ],
  '7': sales,
  '30': [
    { label: 'W1', value: 3900 },
    { label: 'W2', value: 4600 },
    { label: 'W3', value: 4100 },
    { label: 'W4', value: 5200 },
  ],
  year: [
    { label: 'Jan', value: 1800 },
    { label: 'Feb', value: 2100 },
    { label: 'Mar', value: 2600 },
    { label: 'Apr', value: 2300 },
    { label: 'May', value: 2900 },
    { label: 'Jun', value: 3300 },
    { label: 'Jul', value: 3100 },
    { label: 'Aug', value: 3500 },
    { label: 'Sep', value: 3800 },
    { label: 'Oct', value: 1200 },
  ],
}

const salesRangeLabels: Record<SalesRange, string> = {
  today: 'today',
  '7': 'the last seven days',
  '30': 'the last 30 days',
  year: 'this year',
}

const lowStock = [
  { name: 'Sony WH-1000XM5', count: '2 left' },
  { name: 'Keychron K2 Keyboard', count: '3 left' },
  { name: '27" 4K Monitor', count: '4 left' },
]

const recentOrders: AdminOrder[] = [
  { id: 'LUMA-10483', customer: 'Jordan Casey', date: 'Oct 3', payment: 'Paid', status: 'New', total: '$680.40' },
  { id: 'LUMA-10482', customer: 'Jordan Casey', date: 'Mar 12', payment: 'Paid', status: 'Shipped', total: '$342.02' },
  { id: 'LUMA-10481', customer: 'Priya M.', date: 'Mar 11', payment: 'Pending', status: 'New', total: '$129' },
  { id: 'LUMA-10480', customer: 'Daniel R.', date: 'Mar 11', payment: 'Paid', status: 'Processing', total: '$76' },
  { id: 'LUMA-10479', customer: 'Sam O.', date: 'Mar 10', payment: 'Paid', status: 'Delivered', total: '$349' },
]

const products = [
  { id: '1', name: 'Sony WH-1000XM5', sku: 'AUD-1001', category: 'Audio', price: '$349', stock: '2', status: 'Published' },
  { id: '2', name: 'Keychron K2 Keyboard', sku: 'KEY-2040', category: 'Keyboards', price: '$129', stock: '3', status: 'Published' },
  { id: '3', name: 'Logitech MX Master 3S', sku: 'DSK-3012', category: 'Desk setup', price: '$76', stock: '48', status: 'Published' },
  { id: '4', name: 'Galaxy Watch 6', sku: 'WAT-4007', category: 'Smart watches', price: '$249', stock: '0', status: 'Out of stock' },
  { id: '5', name: '27" 4K Monitor', sku: 'DSK-3055', category: 'Desk setup', price: '$329', stock: '4', status: 'Published' },
  { id: '6', name: 'Everyday Backpack 20L', sku: 'BAG-5003', category: 'Bags', price: '$68', stock: '61', status: 'Draft' },
  { id: '7', name: 'PowerCore 20K Charger', sku: 'PHN-6021', category: 'Phone accessories', price: '$39', stock: '120', status: 'Published' },
  { id: '8', name: '4K Webcam', sku: 'DSK-3078', category: 'Desk setup', price: '$69', stock: '35', status: 'Archived' },
] as const

const orders: AdminOrder[] = [
  ...recentOrders,
  { id: 'LUMA-10478', customer: 'Amara K.', date: 'Mar 9', payment: 'Refunded', status: 'Cancelled', total: '$249' },
]

const productStatusClasses: Record<(typeof products)[number]['status'], string> = {
  Published: 'bg-success/15 text-success',
  Draft: 'bg-surface-2 text-text-muted',
  'Out of stock': 'bg-danger/15 text-danger',
  Archived: 'bg-surface-2 text-text-muted',
}

function SalesChart({ range }: { range: SalesRange }) {
  const rangeSales = salesByRange[range]
  const max = Math.max(...rangeSales.map(({ value }) => value))

  return (
    <svg
      className='h-[220px] w-full'
      viewBox='0 0 600 220'
      preserveAspectRatio='none'
      role='img'
      aria-label={`Sales chart for ${salesRangeLabels[range]}`}
    >
      <line x1='0' x2='600' y1='190' y2='190' className='stroke-border' />
      {rangeSales.map(({ label, value }, index) => {
        const width = 600 / rangeSales.length
        const barWidth = Math.min(width * 0.55, 48)
        const height = (value / max) * 160
        const center = index * width + width / 2

        return (
          <g key={label}>
            <rect
              x={center - barWidth / 2}
              y={190 - height}
              width={barWidth}
              height={height}
              rx='4'
              className={index === sales.length - 1 ? 'fill-accent' : 'fill-primary'}
            >
              <title>{`${label}: $${value.toLocaleString('en-US')}`}</title>
            </rect>
            <text
              x={center}
              y='210'
              textAnchor='middle'
              className='fill-text-muted text-[11px]'
            >
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function OrdersTable({ rows }: { rows: readonly AdminOrder[] }) {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className='text-left text-[13px] text-text-muted'>
            <th className='whitespace-nowrap border-b border-border px-3.5 py-3'>Order</th>
            <th className='whitespace-nowrap border-b border-border px-3.5 py-3'>Customer</th>
            <th className='whitespace-nowrap border-b border-border px-3.5 py-3'>Date</th>
            <th className='whitespace-nowrap border-b border-border px-3.5 py-3'>Payment</th>
            <th className='whitespace-nowrap border-b border-border px-3.5 py-3'>Status</th>
            <th className='whitespace-nowrap border-b border-border px-3.5 py-3'>Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((order) => (
            <tr key={order.id}>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3 font-bold text-primary'>#{order.id}</td>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3'>{order.customer}</td>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3'>{order.date}</td>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3'><AdminStatusBadge status={order.payment} /></td>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3'><AdminStatusBadge status={order.status} /></td>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3 font-bold'>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ProductsTable() {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className='text-left text-[13px] text-text-muted'>
            {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((header) => (
              <th key={header} className='whitespace-nowrap border-b border-border px-3.5 py-3'>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.sku}>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3'>
                <div className='flex items-center gap-3 font-bold'>
                  <span className='flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-text-muted'>
                    <Icon name='image' className='h-[18px] w-[18px]' />
                  </span>
                  {product.name}
                </div>
              </td>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3'>{product.sku}</td>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3'>{product.category}</td>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3'>{product.price}</td>
              <td className={`whitespace-nowrap border-b border-border px-3.5 py-3 ${Number(product.stock) <= 5 ? 'font-bold text-danger' : ''}`}>
                {product.stock}
              </td>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3'>
                <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${productStatusClasses[product.status]}`}>
                  {product.status}
                </span>
              </td>
              <td className='whitespace-nowrap border-b border-border px-3.5 py-3'>
                <div className='flex gap-2'>
                  <Link
                    to={`/admin/products/${product.id}/edit`}
                    className='inline-flex items-center justify-center rounded-[9px] border border-border px-[14px] py-2 text-[13px] font-bold text-text hover:bg-surface-2'
                  >
                    Edit
                  </Link>
                  <Button variant='ghost' size='sm'>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function AdminPage() {
  const location = useLocation()
  const initialSection = location.hash.slice(1)
  const [activeSection, setActiveSection] = useState<AdminSection>(
    initialSection === 'products' || initialSection === 'orders' ? initialSection : 'overview',
  )
  const [salesRange, setSalesRange] = useState<SalesRange>('7')
  const title = activeSection[0].toUpperCase() + activeSection.slice(1)

  return (
    <div className='grid min-h-screen min-[861px]:grid-cols-[232px_1fr]'>
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className='min-w-0 px-8 pb-16 pt-7 max-[860px]:px-6'>
        <div className='mb-7 flex flex-wrap items-center justify-between gap-4'>
          <h1 className='text-[28px] font-extrabold tracking-[-0.02em]'>{title}</h1>
          <div className='flex items-center gap-3'>
            <ThemeToggle />
            <div className='flex h-[34px] w-[34px] items-center justify-center rounded-full bg-primary text-xs font-extrabold text-on-primary' title='Admin'>
              AD
            </div>
          </div>
        </div>

        {activeSection === 'overview' ? <section>
          <div className='mb-6 grid grid-cols-3 gap-4 max-[860px]:grid-cols-2'>
            {kpis.map(({ label, value, warning }) => (
              <AdminKpiCard key={label} label={label} value={value} warning={warning} />
            ))}
          </div>

          <div className='grid grid-cols-[minmax(0,1fr)_320px] items-stretch gap-5 max-[1000px]:grid-cols-1'>
            <AdminPanel
              title='Sales'
              action={
                <div className='flex gap-1 rounded-[9px] bg-surface-2 p-[3px] text-xs font-bold text-text-muted'>
                  {([
                    ['today', 'Today'],
                    ['7', '7 days'],
                    ['30', '30 days'],
                    ['year', 'This year'],
                  ] as const).map(([range, label]) => (
                    <button
                      key={range}
                      type='button'
                      aria-pressed={salesRange === range}
                      onClick={() => setSalesRange(range)}
                      className={[
                        'cursor-pointer rounded-[7px] px-3 py-1.5',
                        salesRange === range ? 'bg-surface text-text' : '',
                      ].join(' ')}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              }
            >
              <SalesChart range={salesRange} />
            </AdminPanel>

            <AdminPanel title='Low stock'>
              <ul className='flex list-none flex-col gap-3.5 p-0'>
                {lowStock.map(({ name, count }) => (
                  <li key={name} className='flex justify-between gap-2.5 text-sm'>
                    <strong>{name}</strong>
                    <span className='text-[13px] text-text-muted'>{count}</span>
                  </li>
                ))}
              </ul>
            </AdminPanel>
          </div>

          <AdminPanel
            title='Recent orders'
            action={<Button variant='ghost' onClick={() => setActiveSection('orders')}>View all</Button>}
          >
            <OrdersTable rows={recentOrders} />
          </AdminPanel>
        </section> : null}

        {activeSection === 'products' ? (
          <AdminPanel>
            <div className='mb-4 flex flex-wrap gap-2.5'>
              <input
                className='min-w-[200px] flex-1 rounded-[9px] border border-border bg-surface px-3 py-[9px] text-[13px] leading-[1.6]'
                placeholder='Search products or SKU'
                aria-label='Search products'
              />
              <select
                className='rounded-[9px] border border-border bg-surface px-3 py-[9px] text-[13px] leading-[1.6]'
                aria-label='Filter by status'
                defaultValue=''
              >
                <option value=''>All statuses</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Out of stock</option>
                <option>Archived</option>
              </select>
              <Link
                to='/admin/products/new'
                className='inline-flex cursor-pointer items-center justify-center gap-2 rounded-[9px] border border-transparent bg-primary px-3.5 py-2 text-[13px] font-bold leading-[1.6] text-on-primary transition-colors duration-200 hover:bg-primary-hover'
              >
                + Add product
              </Link>
            </div>
            <ProductsTable />
          </AdminPanel>
        ) : null}

        {activeSection === 'orders' ? (
          <AdminPanel title='Orders'>
            <div className='mb-4'>
              <select
                className='rounded-[9px] border border-border bg-surface px-3 py-[9px] text-[13px]'
                aria-label='Filter by status'
                defaultValue=''
              >
                <option value=''>All statuses</option>
                <option>New</option>
                <option>Paid</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <OrdersTable rows={orders} />
            <p className='mt-2.5 text-xs text-text-muted'>
              Rules: an order can't ship before it's paid, can't be delivered before it ships, and cancelled orders are locked.
            </p>
          </AdminPanel>
        ) : null}
      </main>
    </div>
  )
}
