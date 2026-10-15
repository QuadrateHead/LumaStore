import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Button, Icon } from '../elements'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name (at least 2 characters).'),
  email: z.string().trim().email('Enter a valid email address.'),
  subject: z.string().trim().min(3, 'Add a subject (at least 3 characters).'),
  message: z.string().trim().min(10, 'Write a message of at least 10 characters.'),
})

type ContactFormValues = z.infer<typeof contactSchema>

const contactDetails = [
  { icon: 'mail', title: 'Email', lines: ['support@lumastore.com'] },
  { icon: 'phone', title: 'Phone', lines: ['+1 555 010 2030'] },
  { icon: 'location', title: 'Address', lines: ['12 Market Street, Suite 4', 'Belgrade, 11000, Serbia'] },
  { icon: 'clock', title: 'Support hours', lines: ['Mon–Fri, 9:00–18:00 CET'] },
] as const

export function ContactPage() {
  const [isSending, setIsSending] = useState(false)
  const [messageSent, setMessageSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })

  useEffect(() => {
    document.title = 'Contact Us — LumaStore'
  }, [])

  const submitMessage = async () => {
    setMessageSent(false)
    setIsSending(true)
    await new Promise((resolve) => window.setTimeout(resolve, 700))
    reset()
    setIsSending(false)
    setMessageSent(true)
  }

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header />

      <main>
        <div className='mx-auto max-w-[1180px] px-6 pb-16 pt-7'>
          <div className='mb-[18px] text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            {' / Contact'}
          </div>

          <div className='mb-9 max-w-[64ch]'>
            <h1 className='mb-3 text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] text-text max-[860px]:text-[28px]'>
              Contact us
            </h1>
            <p className='text-base text-text-muted'>
              Questions about an order or a product? Send us a message and we will reply within one business day.
            </p>
          </div>

          <div className='grid grid-cols-[minmax(0,1fr)_340px] items-start gap-9 max-[860px]:grid-cols-1'>
            <section className='rounded-[var(--radius)] border border-border bg-surface p-7 max-[860px]:p-[22px]'>
              <h2 className='mb-5 text-lg font-extrabold'>Send a message</h2>
              <form
                noValidate
                onSubmit={handleSubmit(submitMessage)}
                onChange={() => setMessageSent(false)}
              >
                <div className='grid grid-cols-2 gap-4 max-[860px]:grid-cols-1'>
                  <div className='flex flex-col gap-1.5'>
                    <label htmlFor='contact-name' className='text-[13px] font-bold'>Name</label>
                    <input
                      id='contact-name'
                      required
                      minLength={2}
                      placeholder='Jordan Casey'
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={[
                        'w-full rounded-[9px] border bg-surface px-3 py-2.5 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                        errors.name ? 'border-danger' : 'border-border',
                      ].join(' ')}
                      {...register('name')}
                    />
                    {errors.name ? <span id='contact-name-error' className='text-xs text-danger'>{errors.name.message}</span> : null}
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label htmlFor='contact-email' className='text-[13px] font-bold'>Email</label>
                    <input
                      id='contact-email'
                      type='email'
                      required
                      placeholder='you@email.com'
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={[
                        'w-full rounded-[9px] border bg-surface px-3 py-2.5 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                        errors.email ? 'border-danger' : 'border-border',
                      ].join(' ')}
                      {...register('email')}
                    />
                    {errors.email ? <span id='contact-email-error' className='text-xs text-danger'>{errors.email.message}</span> : null}
                  </div>

                  <div className='col-span-full flex flex-col gap-1.5'>
                    <label htmlFor='contact-subject' className='text-[13px] font-bold'>Subject</label>
                    <input
                      id='contact-subject'
                      required
                      minLength={3}
                      placeholder='Where is my order?'
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      className={[
                        'w-full rounded-[9px] border bg-surface px-3 py-2.5 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                        errors.subject ? 'border-danger' : 'border-border',
                      ].join(' ')}
                      {...register('subject')}
                    />
                    {errors.subject ? <span id='contact-subject-error' className='text-xs text-danger'>{errors.subject.message}</span> : null}
                  </div>

                  <div className='col-span-full flex flex-col gap-1.5'>
                    <label htmlFor='contact-message' className='text-[13px] font-bold'>Message</label>
                    <textarea
                      id='contact-message'
                      required
                      minLength={10}
                      placeholder='Tell us how we can help'
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={[
                        'min-h-[150px] w-full resize-y rounded-[9px] border bg-surface px-3 py-2.5 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                        errors.message ? 'border-danger' : 'border-border',
                      ].join(' ')}
                      {...register('message')}
                    />
                    {errors.message ? <span id='contact-message-error' className='text-xs text-danger'>{errors.message.message}</span> : null}
                  </div>
                </div>

                <div className='mt-[22px] flex flex-wrap items-center gap-4'>
                  <Button
                    type='submit'
                    disabled={isSending}
                    className='px-[22px] py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60'
                  >
                    {isSending ? 'Sending…' : 'Send message'}
                  </Button>
                  {messageSent ? (
                    <span role='status' className='text-[13px] font-bold text-success'>
                      Message sent. We will reply within one business day.
                    </span>
                  ) : null}
                </div>
              </form>
            </section>

            <aside className='flex flex-col gap-[18px] rounded-[var(--radius)] border border-border bg-surface p-7 max-[860px]:p-[22px]'>
              {contactDetails.map(({ icon, title, lines }) => (
                <div key={title} className='flex gap-[14px] text-sm'>
                  <Icon name={icon} className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                  <div>
                    <strong className='block'>{title}</strong>
                    <span className='text-text-muted'>
                      {lines.map((line) => (
                        <span className='block' key={line}>
                          {line}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              ))}
              <hr className='border-0 border-t border-border' />
              <p className='text-[13px] text-text-muted'>
                Looking for a quick answer? Most questions about delivery, returns, and coupons are covered in our FAQ.
              </p>
              <Link
                to='/faq'
                className='inline-flex items-center justify-center rounded-[9px] border border-border bg-transparent px-[14px] py-2 text-[13px] font-bold leading-[1.6] text-text hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              >
                Read the FAQ
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <Footer showNewsletter={false} activeLink='Contact' />
    </div>
  )
}
