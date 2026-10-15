import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { AuthPageLayout } from '../components/AuthPageLayout'
import { AuthPasswordField } from '../components/AuthPasswordField'
import { Button } from '../elements'

const registerSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters.'),
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string()
    .min(8, 'Minimum 8 characters, with an uppercase letter and a number.')
    .regex(/[A-Z]/, 'Minimum 8 characters, with an uppercase letter and a number.')
    .regex(/[0-9]/, 'Minimum 8 characters, with an uppercase letter and a number.'),
  confirmPassword: z.string().min(1, "Passwords don't match."),
  terms: z.boolean().refine(Boolean, 'Please agree to the Terms of Service and Privacy Policy.'),
}).refine((values) => values.password === values.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword'],
})

type RegisterFormValues = z.infer<typeof registerSchema>

const strengthStages = [
  { width: '0%', color: 'var(--danger)', text: 'Use 8+ characters with a number and an uppercase letter.' },
  { width: '25%', color: 'var(--danger)', text: 'Weak — add an uppercase letter and a number.' },
  { width: '55%', color: 'var(--accent)', text: 'Fair — a symbol would make this stronger.' },
  { width: '80%', color: 'var(--accent)', text: 'Good password.' },
  { width: '100%', color: 'var(--success)', text: 'Strong password.' },
] as const

function getPasswordStrength(password: string) {
  const score = Number(password.length >= 8)
    + Number(/[A-Z]/.test(password))
    + Number(/[0-9]/.test(password))
    + Number(/[^A-Za-z0-9]/.test(password))

  return password.length === 0 ? strengthStages[0] : strengthStages[score] ?? strengthStages[1]
}

export function RegisterPage() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '', terms: false },
  })
  const password = useWatch({ control, name: 'password' })
  const passwordStrength = getPasswordStrength(password ?? '')

  const submitRegistration = async () => {
    setIsCreatingAccount(true)
    await new Promise((resolve) => window.setTimeout(resolve, 700))
    setIsCreatingAccount(false)
    setAccountCreated(true)
  }

  return (
    <AuthPageLayout
      title='Create your account'
      documentTitle='Create Account — LumaStore'
      description='Join LumaStore to track orders, save your wishlist, and check out faster.'
      breadcrumb='Create account'
      maxWidth='440px'
    >
      <form noValidate onSubmit={handleSubmit(submitRegistration)}>
        <div className='mb-4 flex flex-col gap-1.5'>
          <label htmlFor='register-name' className='text-[13px] font-bold'>Full name</label>
          <input
            id='register-name'
            required
            minLength={2}
            autoComplete='name'
            placeholder='Jordan Casey'
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'register-name-error' : undefined}
            className={[
              'w-full rounded-[9px] border bg-surface px-3 py-2.75 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
              errors.fullName ? 'border-danger' : 'border-border',
            ].join(' ')}
            {...register('fullName')}
          />
          {errors.fullName ? <span id='register-name-error' className='text-xs text-danger'>{errors.fullName.message}</span> : null}
        </div>

        <div className='mb-4 flex flex-col gap-1.5'>
          <label htmlFor='register-email' className='text-[13px] font-bold'>Email</label>
          <input
            id='register-email'
            type='email'
            required
            autoComplete='email'
            placeholder='you@email.com'
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'register-email-error' : undefined}
            className={[
              'w-full rounded-[9px] border bg-surface px-3 py-2.75 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
              errors.email ? 'border-danger' : 'border-border',
            ].join(' ')}
            {...register('email')}
          />
          {errors.email ? <span id='register-email-error' className='text-xs text-danger'>{errors.email.message}</span> : null}
        </div>

        <AuthPasswordField
          id='register-password'
          label='Password'
          placeholder='Minimum 8 characters'
          autoComplete='new-password'
          registration={register('password')}
          error={errors.password?.message}
          minLength={8}
        >
          <div className='mt-2'>
            <div className='mb-1.5 h-1.25 overflow-hidden rounded-full bg-surface-2'>
              <div
                className='h-full rounded-full transition-[width,background-color] duration-200'
                style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }}
              />
            </div>
            <span className='text-xs text-text-muted'>{passwordStrength.text}</span>
          </div>
        </AuthPasswordField>

        <AuthPasswordField
          id='register-confirm-password'
          label='Confirm password'
          placeholder='Re-enter your password'
          autoComplete='new-password'
          registration={register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <div className='mb-5 flex items-start gap-2.5'>
          <input
            id='register-terms'
            type='checkbox'
            required
            aria-invalid={Boolean(errors.terms)}
            aria-describedby={errors.terms ? 'register-terms-error' : undefined}
            className='mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary'
            {...register('terms')}
          />
          <div>
            <label
              htmlFor='register-terms'
              className={[
                'text-[13px] text-text-muted',
                errors.terms ? 'text-danger' : '',
              ].join(' ')}
            >
              I agree to the <a href='#' className='font-bold text-primary'>Terms of Service</a> and <a href='#' className='font-bold text-primary'>Privacy Policy</a>.
            </label>
            {errors.terms ? <span id='register-terms-error' className='mt-1 block text-xs text-danger'>{errors.terms.message}</span> : null}
          </div>
        </div>

        <Button
          type='submit'
          disabled={isCreatingAccount || accountCreated}
          className='w-full disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isCreatingAccount ? 'Creating account…' : accountCreated ? 'Account created ✓' : 'Create account'}
        </Button>
      </form>

      <p className='mt-6.5 text-center text-[13px] text-text-muted'>
        Already have an account? <Link to='/login' className='font-bold text-primary'>Sign in</Link>
      </p>
    </AuthPageLayout>
  )
}
