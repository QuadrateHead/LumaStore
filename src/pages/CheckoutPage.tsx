import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Button, Icon } from '../elements'

type DeliveryMethod = 'standard' | 'express' | 'pickup'
type CheckoutErrors = Record<string, string>

type CheckoutConfirmation = {
  shippingAddress: string
  delivery: string
  deliveryEta: string
  payment: string
}

const maxPhoneDigits = 12

const deliveryOptions: {
  id: DeliveryMethod
  name: string
  eta: string
  price: number
}[] = [
  { id: 'standard', name: 'Standard delivery', eta: '3–5 business days', price: 0 },
  { id: 'express', name: 'Express delivery', eta: '1–2 business days', price: 14.99 },
  { id: 'pickup', name: 'Pickup point', eta: '2–3 business days', price: 4.99 },
]

const checkoutItems = [
  { name: 'Sony WH-1000XM5', summaryName: 'Sony WH-1000XM5 Headphones', quantity: 1, price: 349, icon: 'headphones' as const },
  { name: 'Keychron K2 Keyboard', summaryName: 'Keychron K2 Keyboard', quantity: 1, price: 129, icon: 'keyboard' as const },
  { name: 'Logitech MX Master 3S', summaryName: 'Logitech MX Master 3S Mouse', quantity: 2, price: 152, icon: 'image' as const },
]

const subtotal = 630
const tax = 50.4
const defaultConfirmation: CheckoutConfirmation = {
  shippingAddress: 'Jordan Casey — Bulevar Mihajla Pupina 10, Novi Beograd 11070, Serbia',
  delivery: 'Standard delivery — 3–5 business days',
  deliveryEta: '3–5 business days',
  payment: 'Jordan Casey — card ending in 4242',
}

function isCheckoutConfirmation(value: unknown): value is CheckoutConfirmation {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return (
    'shippingAddress' in value &&
    typeof value.shippingAddress === 'string' &&
    'delivery' in value &&
    typeof value.delivery === 'string' &&
    'deliveryEta' in value &&
    typeof value.deliveryEta === 'string' &&
    'payment' in value &&
    typeof value.payment === 'string'
  )
}

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= maxPhoneDigits
}

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, maxPhoneDigits)
  if (!digits) {
    return ''
  }

  const groups = [digits.slice(0, 1)]
  const number = digits.slice(1)
  for (let index = 0; index < number.length;) {
    const remaining = number.length - index
    const groupLength = remaining <= 4 ? remaining : 3
    groups.push(number.slice(index, index + groupLength))
    index += groupLength
  }

  return `+${groups.join(' ')}`
}

function CheckoutField({
  id,
  label,
  error,
  className = '',
  children,
}: {
  id: string
  label: string
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={['flex flex-col gap-1.5', className].join(' ')}>
      <label htmlFor={id} className='text-[13px] font-bold'>{label}</label>
      {children}
      {error ? <span className='text-[12px] text-danger'>{error}</span> : null}
    </div>
  )
}

const inputClasses =
  'w-full rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus-visible:ring-2 focus-visible:ring-primary'

function validateForm(form: HTMLFormElement | null): CheckoutErrors {
  if (!form) {
    return {}
  }

  const errors: CheckoutErrors = {}
  const fields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-checkout-field]')

  fields.forEach((field) => {
    const key = field.dataset.checkoutField
    const message = field.dataset.error
    if (key && message && !field.checkValidity()) {
      errors[key] = message
    }
  })

  const phone = form.elements.namedItem('phone')
  if (phone instanceof HTMLInputElement && !isValidPhone(phone.value)) {
    errors.phone = 'Enter a valid phone number.'
  }

  const zip = form.elements.namedItem('zip')
  if (zip instanceof HTMLInputElement && !/^[A-Za-z0-9 -]{3,10}$/.test(zip.value)) {
    errors.zip = 'Enter a valid zip code.'
  }

  const cardNumber = form.elements.namedItem('cardNumber')
  if (cardNumber instanceof HTMLInputElement && cardNumber.value.replace(/\D/g, '').length !== 16) {
    errors.cardNumber = 'Enter a 16-digit card number.'
  }

  return errors
}

export function CheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const confirmation = isCheckoutConfirmation(location.state)
    ? location.state
    : defaultConfirmation
  const isConfirmationRoute = location.pathname === '/checkout/success'
  const [checkoutStep, setCheckoutStep] = useState(1)
  const currentStep = isConfirmationRoute ? 5 : checkoutStep
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard')
  const [errors, setErrors] = useState<CheckoutErrors>({})
  const [shippingAddress, setShippingAddress] = useState(defaultConfirmation.shippingAddress)
  const [paymentSummary, setPaymentSummary] = useState(defaultConfirmation.payment)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const shippingForm = useRef<HTMLFormElement>(null)
  const paymentForm = useRef<HTMLFormElement>(null)
  const cardNumberPreview = useRef<HTMLDivElement>(null)
  const cardNamePreview = useRef<HTMLSpanElement>(null)
  const expiryPreview = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    document.title = isConfirmationRoute ? 'Order confirmed — LumaStore' : 'Checkout — LumaStore'
  }, [isConfirmationRoute])

  const selectedDelivery = deliveryOptions.find((option) => option.id === deliveryMethod)!
  const total = subtotal + selectedDelivery.price + tax

  const goToStep = (step: number) => {
    setCheckoutStep(step)
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const continueFromShipping = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm(shippingForm.current)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const data = new FormData(event.currentTarget)
    setShippingAddress(
      `${data.get('fullName')} — ${data.get('address')}, ${data.get('city')} ${data.get('zip')}, ${data.get('country')}`,
    )
    goToStep(2)
  }

  const continueFromPayment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm(paymentForm.current)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const data = new FormData(event.currentTarget)
    const cardDigits = String(data.get('cardNumber') ?? '').replace(/\D/g, '')
    setPaymentSummary(`${data.get('cardName')} — card ending in ${cardDigits.slice(-4)}`)
    goToStep(4)
  }

  const handlePlaceOrder = () => {
    setIsSubmitting(true)
    const nextConfirmation: CheckoutConfirmation = {
      shippingAddress,
      delivery: `${selectedDelivery.name} — ${selectedDelivery.eta}`,
      deliveryEta: selectedDelivery.eta,
      payment: paymentSummary,
    }

    window.setTimeout(() => {
      setIsSubmitting(false)
      navigate('/checkout/success', { state: nextConfirmation })
    }, 500)
  }

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.currentTarget.value.replace(/\D/g, '').slice(0, 16)
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ')
    event.currentTarget.value = formatted
    if (cardNumberPreview.current) {
      cardNumberPreview.current.textContent = formatted
        ? formatted.padEnd(19, '•')
        : '•••• •••• •••• ••••'
    }
    if (errors.cardNumber) {
      setErrors((current) => ({ ...current, cardNumber: '' }))
    }
  }

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    input.value = formatPhoneNumber(input.value)

    if (errors.phone) {
      setErrors((current) => ({
        ...current,
        phone: isValidPhone(input.value) ? '' : 'Enter a valid phone number.',
      }))
    }
  }

  const handleCardNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (cardNamePreview.current) {
      cardNamePreview.current.textContent = event.currentTarget.value || 'Full name'
    }
  }

  const handleExpiryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.currentTarget.value.replace(/\D/g, '').slice(0, 4)
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
    event.currentTarget.value = formatted
    if (expiryPreview.current) {
      expiryPreview.current.textContent = formatted || 'MM/YY'
    }
  }

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: '' }))
    }
  }

  const renderStepper = () => (
    <div
      className='mb-9 flex items-center'
      aria-label={`Checkout progress: ${currentStep === 5 ? 'all steps complete' : `step ${currentStep} of 5`}`}
    >
      {['Shipping', 'Delivery', 'Payment', 'Review', 'Confirmation'].map((label, index) => {
        const step = index + 1
        const isDone = currentStep === 5 || step < currentStep
        const isActive = step === currentStep

        return (
          <div key={label} className='flex min-w-0 flex-1 items-center last:flex-none'>
            <div className='flex shrink-0 items-center gap-2.5'>
              <span
                className={[
                  'flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full border text-[13px] font-bold',
                  isDone
                    ? 'border-success bg-success text-white'
                    : isActive
                      ? 'border-primary bg-primary text-on-primary'
                      : 'border-border bg-surface-2 text-text-muted',
                ].join(' ')}
              >
                {isDone ? <Icon name='check' className='h-3.5 w-3.5 stroke-[2.6]' /> : step}
              </span>
              <span
                className={[
                  'whitespace-nowrap text-[13px] font-bold max-[860px]:hidden',
                  isActive || isDone ? 'text-text' : 'text-text-muted',
                ].join(' ')}
              >
                {label}
              </span>
            </div>
            {step < 5 ? (
              <span
                className={[
                  'mx-3 h-px min-w-2 flex-1 max-[860px]:mx-1.5',
                  step < currentStep ? 'bg-success' : 'bg-border',
                ].join(' ')}
              />
            ) : null}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className='min-h-screen leading-[1.6]'>
      <Header />
      <main>
        <div className='mx-auto max-w-295 px-6 pb-16 pt-7'>
          <div className='mb-4.5 text-[13px] text-text-muted'>
            <Link to='/' className='hover:text-primary'>Home</Link>
            {' / '}
            <Link to='/cart' className='hover:text-primary'>Cart</Link>
            {' / Checkout'}
            {currentStep === 5 ? ' / Confirmation' : null}
          </div>

          {currentStep !== 5 ? (
            <h1 className='mb-7 text-[28px] font-extrabold tracking-[-0.02em]'>Checkout</h1>
          ) : null}

          {renderStepper()}

          {currentStep === 5 ? (
            <section className='mx-auto max-w-140 text-center'>
              <div className='mx-auto mb-5.5 flex h-15 w-15 items-center justify-center rounded-full bg-success text-white'>
                <Icon name='check' className='h-7 w-7 stroke-[2.4]' />
              </div>
              <h1 className='mb-2 text-[28px] font-extrabold tracking-[-0.02em]'>Thank you for your order!</h1>
              <p className='text-sm text-text-muted'>A confirmation has been sent to your email.</p>
              <div className='my-5 text-[19px] font-extrabold'>Order number: LUMA-10483</div>
              <p className='text-sm text-text-muted'>Estimated delivery: {confirmation.deliveryEta}</p>

              <section className='my-7 rounded-(--radius) border border-border bg-surface p-5.5 text-left'>
                <h2 className='mb-3.5 text-[15px] font-extrabold'>Order summary</h2>
                {checkoutItems.map((item) => (
                  <div key={item.name} className='mb-2 flex justify-between gap-3 text-[13px]'>
                    <span>{item.summaryName} × {item.quantity}</span>
                    <span className='shrink-0 text-text-muted'>{formatCurrency(item.price)}</span>
                  </div>
                ))}
                <div className='mt-3.5 flex flex-col gap-2 border-t border-border pt-3.5 text-[13px] text-text-muted'>
                  <div className='flex justify-between'><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                  <div className='flex justify-between'><span>Shipping</span><span>{selectedDelivery.price === 0 ? 'Free' : formatCurrency(selectedDelivery.price)}</span></div>
                  <div className='flex justify-between'><span>Tax</span><span>{formatCurrency(tax)}</span></div>
                  <div className='flex justify-between border-t border-border pt-3 text-[17px] font-extrabold text-text'>
                    <span>Total paid</span><span>{formatCurrency(total)}</span>
                  </div>
                </div>
                <div className='mt-4 grid gap-4 border-t border-border pt-4 text-[13px] text-text-muted max-[860px]:grid-cols-1 min-[861px]:grid-cols-3'>
                  <div><h3 className='mb-1 text-[13px] font-bold text-text'>Shipping to</h3>{confirmation.shippingAddress}</div>
                  <div><h3 className='mb-1 text-[13px] font-bold text-text'>Delivery</h3>{confirmation.delivery}</div>
                  <div><h3 className='mb-1 text-[13px] font-bold text-text'>Payment</h3>{confirmation.payment}</div>
                </div>
              </section>

              <div className='flex flex-wrap justify-center gap-3'>
                <Link to='/account'>
                  <Button variant='ghost'>View order</Button>
                </Link>
                <Link to='/products'>
                  <Button>Continue shopping</Button>
                </Link>
              </div>
              <p className='mt-5.5 text-[13px] text-text-muted'>
                Questions about your order? <Link to='/contact' className='font-bold text-primary'>Contact support</Link>
              </p>
            </section>
          ) : (
            <div className='grid items-start gap-9 min-[861px]:grid-cols-[minmax(0,1fr)_340px]'>
              <div className='rounded-(--radius) border border-border bg-surface p-7 max-[860px]:p-5'>
                {currentStep === 1 ? (
                  <section>
                    <h2 className='mb-5 text-lg font-extrabold'>Shipping information</h2>
                    <form ref={shippingForm} onSubmit={continueFromShipping} noValidate>
                      <div className='grid grid-cols-2 gap-4 max-[860px]:grid-cols-1'>
                        <CheckoutField id='fullName' label='Full name' className='col-span-2 max-[860px]:col-span-1' error={errors.fullName}>
                          <input id='fullName' name='fullName' placeholder='Jordan Casey' required minLength={2} data-checkout-field='fullName' data-error='Enter your full name.' className={inputClasses} onChange={() => clearFieldError('fullName')} />
                        </CheckoutField>
                        <CheckoutField id='email' label='Email' error={errors.email}>
                          <input id='email' name='email' type='email' placeholder='you@email.com' required data-checkout-field='email' data-error='Enter a valid email.' className={inputClasses} onChange={() => clearFieldError('email')} />
                        </CheckoutField>
                        <CheckoutField id='phone' label='Phone' error={errors.phone}>
                          <input id='phone' name='phone' type='tel' inputMode='numeric' autoComplete='tel' placeholder='+1 555 123 4567' required maxLength={17} data-checkout-field='phone' data-error='Enter a valid phone number.' className={inputClasses} onChange={handlePhoneChange} />
                        </CheckoutField>
                        <CheckoutField id='address' label='Address' className='col-span-2 max-[860px]:col-span-1' error={errors.address}>
                          <input id='address' name='address' placeholder='221B Baker Street' required minLength={5} data-checkout-field='address' data-error='Enter your street address.' className={inputClasses} onChange={() => clearFieldError('address')} />
                        </CheckoutField>
                        <CheckoutField id='city' label='City' error={errors.city}>
                          <input id='city' name='city' placeholder='Belgrade' required data-checkout-field='city' data-error='Enter your city.' className={inputClasses} onChange={() => clearFieldError('city')} />
                        </CheckoutField>
                        <CheckoutField id='zip' label='Zip code' error={errors.zip}>
                          <input id='zip' name='zip' placeholder='11000' required minLength={3} maxLength={10} data-checkout-field='zip' data-error='Enter a valid zip code.' className={inputClasses} onChange={() => clearFieldError('zip')} />
                        </CheckoutField>
                        <CheckoutField id='state' label='State / Region'>
                          <input id='state' name='state' placeholder='Central Serbia' className={inputClasses} />
                        </CheckoutField>
                        <CheckoutField id='country' label='Country'>
                          <select id='country' name='country' className={inputClasses}>
                            <option>Serbia</option>
                            <option>United States</option>
                            <option>Germany</option>
                            <option>United Kingdom</option>
                            <option>Other</option>
                          </select>
                        </CheckoutField>
                      </div>
                      <div className='mt-6.5 flex justify-end'>
                        <Button type='submit'>Continue to delivery</Button>
                      </div>
                    </form>
                  </section>
                ) : null}

                {currentStep === 2 ? (
                  <section>
                    <h2 className='mb-5 text-lg font-extrabold'>Delivery method</h2>
                    {deliveryOptions.map((option) => (
                      <label
                        key={option.id}
                        className={[
                          'mb-3 flex cursor-pointer items-center gap-3.5 rounded-(--radius) border p-4',
                          deliveryMethod === option.id ? 'border-primary bg-surface-2' : 'border-border',
                        ].join(' ')}
                      >
                        <input
                          type='radio'
                          name='delivery'
                          value={option.id}
                          checked={deliveryMethod === option.id}
                          onChange={() => setDeliveryMethod(option.id)}
                          className='h-4.5 w-4.5 shrink-0 accent-primary'
                        />
                        <span className='flex-1'>
                          <strong className='block text-sm'>{option.name}</strong>
                          <span className='text-[13px] text-text-muted'>{option.eta}</span>
                        </span>
                        <span className='shrink-0 text-sm font-extrabold'>
                          {option.price === 0 ? 'Free' : formatCurrency(option.price)}
                        </span>
                      </label>
                    ))}
                    <div className='mt-6.5 flex justify-between'>
                      <Button variant='ghost' onClick={() => goToStep(1)}>Back</Button>
                      <Button onClick={() => goToStep(3)}>Continue to payment</Button>
                    </div>
                  </section>
                ) : null}

                {currentStep === 3 ? (
                  <section>
                    <h2 className='mb-5 text-lg font-extrabold'>Payment</h2>
                    <div className='mb-5.5 flex min-h-35 flex-col justify-between rounded-2xl bg-linear-to-br from-primary to-primary-hover px-6 py-5.5 text-white'>
                      <div className='flex items-center justify-between text-xs tracking-[0.04em] opacity-85'>
                        <span>LumaStore Card</span><span>◈</span>
                      </div>
                      <div ref={cardNumberPreview} className='my-3.5 text-[19px] font-bold tracking-[2.5px]'>
                        •••• •••• •••• ••••
                      </div>
                      <div className='flex justify-between text-[11px] opacity-85'>
                        <div>Cardholder<span ref={cardNamePreview} className='mt-0.5 block text-[13px] font-bold tracking-[0.03em] opacity-100'>Full name</span></div>
                        <div>Expires<span ref={expiryPreview} className='mt-0.5 block text-[13px] font-bold tracking-[0.03em] opacity-100'>MM/YY</span></div>
                      </div>
                    </div>
                    <form ref={paymentForm} onSubmit={continueFromPayment} noValidate>
                      <div className='grid grid-cols-2 gap-4 max-[860px]:grid-cols-1'>
                        <CheckoutField id='cardName' label='Cardholder name' className='col-span-2 max-[860px]:col-span-1' error={errors.cardName}>
                          <input id='cardName' name='cardName' placeholder='Jordan Casey' required minLength={2} data-checkout-field='cardName' data-error='Enter the name on the card.' className={inputClasses} onChange={handleCardNameChange} />
                        </CheckoutField>
                        <CheckoutField id='cardNumber' label='Card number' className='col-span-2 max-[860px]:col-span-1' error={errors.cardNumber}>
                          <input id='cardNumber' name='cardNumber' inputMode='numeric' autoComplete='off' maxLength={19} placeholder='4242 4242 4242 4242' required data-checkout-field='cardNumber' data-error='Enter a 16-digit card number.' className={inputClasses} onChange={handleCardNumberChange} />
                        </CheckoutField>
                        <CheckoutField id='expiry' label='Expiry (MM/YY)' error={errors.expiry}>
                          <input id='expiry' name='expiry' placeholder='09/29' required pattern='(0[1-9]|1[0-2])/[0-9]{2}' maxLength={5} data-checkout-field='expiry' data-error='Use MM/YY format.' className={inputClasses} onChange={handleExpiryChange} />
                        </CheckoutField>
                        <CheckoutField id='cvv' label='CVV' error={errors.cvv}>
                          <input id='cvv' name='cvv' inputMode='numeric' autoComplete='off' placeholder='123' required pattern='[0-9]{3,4}' maxLength={4} data-checkout-field='cvv' data-error='Enter a valid CVV.' className={inputClasses} onChange={() => clearFieldError('cvv')} />
                        </CheckoutField>
                      </div>
                      <div className='mt-6.5 flex justify-between'>
                        <Button variant='ghost' onClick={() => goToStep(2)}>Back</Button>
                        <Button type='submit'>Review order</Button>
                      </div>
                    </form>
                  </section>
                ) : null}

                {currentStep === 4 ? (
                  <section>
                    <h2 className='mb-5 text-lg font-extrabold'>Review your order</h2>
                    <ReviewBlock title='Shipping to' value={shippingAddress} onEdit={() => goToStep(1)} />
                    <ReviewBlock title='Delivery method' value={`${selectedDelivery.name} — ${selectedDelivery.eta}`} onEdit={() => goToStep(2)} />
                    <ReviewBlock title='Payment' value={paymentSummary} onEdit={() => goToStep(3)} />
                    <div className='mb-3.5 rounded-(--radius) border border-border p-4.5'>
                      <h3 className='mb-3 text-[13px] font-bold'>Items</h3>
                      {checkoutItems.map((item) => (
                        <div key={item.name} className='mb-1.5 flex justify-between gap-3 text-[13px]'>
                          <span>{item.summaryName} × {item.quantity}</span>
                          <span className='shrink-0 text-text-muted'>{formatCurrency(item.price)}</span>
                        </div>
                      ))}
                    </div>
                    <div className='mt-6.5 flex justify-between'>
                      <Button variant='ghost' onClick={() => goToStep(3)}>Back</Button>
                      <Button onClick={handlePlaceOrder} disabled={isSubmitting}>
                        {isSubmitting ? 'Placing order…' : 'Place order'}
                      </Button>
                    </div>
                  </section>
                ) : null}
              </div>

              <aside className='sticky top-22 flex flex-col gap-4 rounded-(--radius) border border-border bg-surface p-5.5 max-[860px]:static'>
                <h2 className='text-sm font-extrabold'>Order summary</h2>
                {checkoutItems.map((item) => (
                  <div key={item.name} className='flex items-center gap-3 text-[13px]'>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-text-muted'>
                      <Icon name={item.icon} className='h-4.5 w-4.5' />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <div className='text-[13px] font-bold'>{item.name}</div>
                      <div className='text-xs text-text-muted'>Qty {item.quantity}</div>
                    </div>
                    <div className='shrink-0 text-[13px] font-bold'>{formatCurrency(item.price)}</div>
                  </div>
                ))}
                <div className='flex flex-col gap-2.5 border-t border-border pt-4 text-[13px] text-text-muted'>
                  <div className='flex justify-between'><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                  <div className='flex justify-between'><span>Shipping</span><span>{selectedDelivery.price === 0 ? 'Free' : formatCurrency(selectedDelivery.price)}</span></div>
                  <div className='flex justify-between'><span>Tax</span><span>{formatCurrency(tax)}</span></div>
                </div>
                <div className='flex justify-between border-t border-border pt-3.5 text-[17px] font-extrabold'>
                  <span>Total</span><span>{formatCurrency(total)}</span>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer showNewsletter={false} />
    </div>
  )
}

function ReviewBlock({
  title,
  value,
  onEdit,
}: {
  title: string
  value: string
  onEdit: () => void
}) {
  return (
    <div className='mb-3.5 rounded-(--radius) border border-border p-4.5'>
      <div className='mb-2.5 flex items-center justify-between'>
        <h3 className='text-[13px] font-bold'>{title}</h3>
        <button type='button' onClick={onEdit} className='cursor-pointer bg-transparent p-0 text-xs font-bold text-primary'>
          Edit
        </button>
      </div>
      <div className='text-[13px] text-text-muted'>{value}</div>
    </div>
  )
}
