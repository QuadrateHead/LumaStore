import { Link } from 'react-router-dom'

import { Icon } from '../elements'

export type AdminSection = 'overview' | 'products' | 'orders'

type AdminSidebarProps = {
  activeSection: AdminSection
  onSectionChange: (section: AdminSection) => void
}

const sections: { id: AdminSection; label: string; icon: 'dashboard' | 'package' | 'orders' }[] = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'products', label: 'Products', icon: 'package' },
  { id: 'orders', label: 'Orders', icon: 'orders' },
]

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <aside className='sticky top-0 flex h-screen flex-col gap-1 border-r border-border bg-surface px-4 py-6 max-[860px]:static max-[860px]:h-auto max-[860px]:flex-row max-[860px]:flex-wrap max-[860px]:items-center max-[860px]:border-r-0 max-[860px]:border-b max-[860px]:py-3.5'>
      <Link
        to='/'
        className='mb-0.5 px-2.5 text-xl font-extrabold tracking-[-0.02em] max-[860px]:mb-0 max-[860px]:w-full'
      >
        LumaStore
      </Link>
      <small className='mb-4.5 px-2.5 text-xs text-text-muted max-[860px]:hidden'>Admin</small>
      {sections.map(({ id, label, icon }) => (
        <button
          type='button'
          key={id}
          aria-pressed={activeSection === id}
          onClick={() => onSectionChange(id)}
          className={[
            'flex w-full cursor-pointer items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-left text-sm font-bold text-text-muted hover:text-text max-[860px]:w-auto',
            activeSection === id ? 'bg-surface-2 text-text [&_svg]:text-primary' : '',
          ].join(' ')}
        >
          <Icon name={icon} className='h-4.5 w-4.5 shrink-0' />
          {label}
        </button>
      ))}
      <div className='mt-auto flex flex-col gap-1 max-[860px]:hidden'>
        <Link
          to='/'
          className='flex w-full items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-sm font-bold text-text-muted hover:text-text'
        >
          <Icon name='logout' className='h-4.5 w-4.5 shrink-0' />
          Back to store
        </Link>
      </div>
    </aside>
  )
}
