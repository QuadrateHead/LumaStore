import { Link } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { PromoBanner } from '../components/PromoBanner'
import { Icon } from '../elements'

const stats = [
  { value: '350+', label: 'Products tested and stocked' },
  { value: '40k', label: 'Orders delivered' },
  { value: '4.8', label: 'Average customer rating' },
  { value: '30 days', label: 'Returns on every order' },
]

const qualityPromises = [
  {
    icon: 'lock' as const,
    title: 'Tested before we sell',
    description: 'Each product spends at least two weeks on a real desk before it earns a listing.',
  },
  {
    icon: 'shipping' as const,
    title: 'Fast, careful shipping',
    description: 'Orders leave within one business day, packed to survive the trip.',
  },
  {
    icon: 'star' as const,
    title: 'Honest reviews',
    description: 'Only verified buyers can review, and we never remove a review for being critical.',
  },
]

const team = [
  { initials: 'AM', name: 'Amara Mensah', role: 'Co-founder, product curation' },
  { initials: 'LK', name: 'Luka Kovač', role: 'Co-founder, operations' },
  { initials: 'SP', name: 'Sofia Petrova', role: 'Customer support lead' },
  { initials: 'DR', name: 'Daniel Ríos', role: 'Product testing' },
]

export function AboutPage() {
  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header />

      <main>
        <div className='mx-auto max-w-[1180px] px-6 pb-16 pt-7'>
          <div className='mb-[18px] text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            <span> / About</span>
          </div>

          <div className='mb-10 max-w-[64ch]'>
            <h1 className='mb-3 text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] text-text'>
              Tech that earns its place on your desk
            </h1>
            <p className='text-base text-text-muted'>
              LumaStore started with one cluttered desk and a simple question: why is it so hard
              to find gear that is both well made and well designed?
            </p>
          </div>

          <section className='mb-12'>
            <h2 className='mb-3.5 text-[22px] font-extrabold tracking-[-0.02em] text-text'>Our story</h2>
            <div className='max-w-[68ch] text-[15px] text-text-muted'>
              <p>
                We began in 2022 as two friends swapping keyboard and headphone recommendations.
                Friends started asking us to order for them, and a small shelf of tested products
                became a store.
              </p>
              <p className='mt-3'>
                Today we curate audio, keyboards, smart watches, and workspace essentials. Every
                product is tested by our team before it goes on sale, and we drop anything we would
                not use ourselves.
              </p>
            </div>
          </section>

          <section className='mb-12'>
            <h2 className='mb-3.5 text-[22px] font-extrabold tracking-[-0.02em] text-text'>Our mission</h2>
            <div className='max-w-[68ch] text-[15px] text-text-muted'>
              <p>
                Make it easy to build a workspace you enjoy: fewer, better products, clear pricing,
                and support from people who know what they are selling.
              </p>
            </div>
          </section>

          <section className='mb-12'>
            <div className='flex flex-wrap gap-4'>
              {stats.map((stat) => (
                <div key={stat.label} className='min-w-[150px] flex-1 rounded-[var(--radius)] bg-surface-2 p-[18px]'>
                  <b className='block text-[24px] font-extrabold leading-none text-text'>{stat.value}</b>
                  <span className='mt-2 block text-[13px] text-text-muted'>{stat.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className='mb-12'>
            <h2 className='mb-4 text-[22px] font-extrabold tracking-[-0.02em] text-text'>Our quality promise</h2>
            <div className='grid gap-5 md:grid-cols-3'>
              {qualityPromises.map(({ icon, title, description }) => (
                <div key={title} className='rounded-[var(--radius)] border border-border bg-surface p-[22px]'>
                  <div className='mb-3 flex h-10 w-10 items-center justify-center text-primary'>
                    <Icon name={icon} className='h-6 w-6' />
                  </div>
                  <h3 className='mb-1.5 text-[15px] font-bold text-text'>{title}</h3>
                  <p className='text-sm text-text-muted'>{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className='mb-12'>
            <h2 className='mb-4 text-[22px] font-extrabold tracking-[-0.02em] text-text'>The team</h2>
            <div className='grid gap-5 md:grid-cols-4'>
              {team.map(({ initials, name, role }) => (
                <div key={name} className='rounded-[var(--radius)] border border-border bg-surface p-[22px]'>
                  <div className='mb-3 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-primary text-sm font-extrabold text-on-primary'>
                    {initials}
                  </div>
                  <h3 className='mb-1 text-[15px] font-bold text-text'>{name}</h3>
                  <p className='text-sm text-text-muted'>{role}</p>
                </div>
              ))}
            </div>
          </section>

          <PromoBanner
            size='compact'
            title='Ready to upgrade your setup?'
            action={
              <Link
                to='/product'
                className='inline-flex items-center justify-center rounded-[var(--radius)] bg-accent px-5 py-3 text-sm font-bold text-on-accent transition-colors hover:brightness-105'
              >
                Shop new arrivals
              </Link>
            }
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
