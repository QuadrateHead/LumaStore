import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { AuthPageLayout } from '../components/AuthPageLayout'
import { AuthPasswordField } from '../components/AuthPasswordField'
import { Button } from '../elements'

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const demoUsers = [
  { email: 'user@test.com', password: 'Password1' },
  { email: 'admin@test.com', password: 'Admin123' },
]

export function LoginPage() {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [credentialsError, setCredentialsError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const submitLogin = async (values: LoginFormValues) => {
    setCredentialsError(false)
    setIsSigningIn(true)
    await new Promise((resolve) => window.setTimeout(resolve, 700))
    setIsSigningIn(false)
    if (demoUsers.some((user) => (
      user.email === values.email.toLowerCase() && user.password === values.password
    ))) {
      setIsSignedIn(true)
    } else {
      setCredentialsError(true)
    }
  }

  return (
    <AuthPageLayout
      title='Sign in'
      documentTitle='Sign In — LumaStore'
      description='Welcome back. Enter your details to continue.'
      breadcrumb='Sign in'
      maxWidth='420px'
    >
      {credentialsError ? (
        <div role='alert' className='mb-[18px] rounded-[9px] border border-danger bg-danger/10 px-3.5 py-[11px] text-[13px] text-danger'>
          Invalid email or password.
        </div>
      ) : null}

      <form noValidate onSubmit={handleSubmit(submitLogin)}>
        <div className='mb-4 flex flex-col gap-1.5'>
          <label htmlFor='login-email' className='text-[13px] font-bold'>Email</label>
          <input
            id='login-email'
            type='email'
            required
            autoComplete='email'
            placeholder='you@email.com'
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            className={[
              'w-full rounded-[9px] border bg-surface px-3 py-[11px] text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
              errors.email ? 'border-danger' : 'border-border',
            ].join(' ')}
            {...register('email')}
          />
          {errors.email ? <span id='login-email-error' className='text-xs text-danger'>{errors.email.message}</span> : null}
        </div>

        <AuthPasswordField
          id='login-password'
          label='Password'
          placeholder='Enter your password'
          autoComplete='current-password'
          registration={register('password')}
          error={errors.password?.message}
          minLength={1}
          labelAction={
            <Link to='/forgot-password' className='text-xs font-bold text-primary'>Forgot password?</Link>
          }
        />

        <Button
          type='submit'
          disabled={isSigningIn || isSignedIn}
          className='w-full disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isSigningIn ? 'Signing in…' : isSignedIn ? 'Signed in ✓' : 'Sign in'}
        </Button>
      </form>

      <div className='my-[22px] flex items-center gap-3 text-xs text-text-muted before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border'>
        or
      </div>

      <button
        type='button'
        className='flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[var(--radius)] border border-border bg-transparent px-[22px] py-3 text-sm font-bold text-text'
      >
        <svg aria-hidden='true' className='h-4 w-4 shrink-0' viewBox='0 0 24 24'>
          <path fill='#4285F4' d='M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.87c2.27-2.09 3.56-5.17 3.56-8.8z' />
          <path fill='#34A853' d='M12 24c3.24 0 5.96-1.07 7.94-2.93l-3.87-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1C3.24 21.3 7.31 24 12 24z' />
          <path fill='#FBBC05' d='M5.27 14.26A7.2 7.2 0 0 1 4.89 12c0-.78.14-1.55.38-2.26v-3.1H1.27A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.27 5.36l4-3.1z' />
          <path fill='#EA4335' d='M12 4.75c1.76 0 3.35.6 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.24 2.7 1.27 6.64l4 3.1C6.22 6.86 8.87 4.75 12 4.75z' />
        </svg>
        Continue with Google
      </button>

      <p className='mt-[26px] text-center text-[13px] text-text-muted'>
        New to LumaStore? <Link to='/register' className='font-bold text-primary'>Create an account</Link>
      </p>
    </AuthPageLayout>
  )
}
