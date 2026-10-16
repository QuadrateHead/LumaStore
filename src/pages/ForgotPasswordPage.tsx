import { useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthPageLayout } from '../components/AuthPageLayout'
import { Button } from '../elements'

export function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <AuthPageLayout
      title='Reset your password'
      documentTitle='Reset password — LumaStore'
      description='Enter the email address associated with your account and we’ll send reset instructions.'
      breadcrumb='Reset password'
      maxWidth='420px'
    >
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
        }}
      >
        <label htmlFor='reset-email' className='mb-1.5 block text-[13px] font-bold'>Email address</label>
        <input
          id='reset-email'
          type='email'
          required
          autoComplete='email'
          className='mb-4 w-full rounded-[9px] border border-border bg-surface px-3 py-[11px] text-sm text-text'
          placeholder='you@email.com'
        />
        <Button type='submit' disabled={submitted} className='w-full'>
          {submitted ? 'Instructions sent ✓' : 'Send reset instructions'}
        </Button>
        {submitted ? (
          <p role='status' className='mt-3 text-center text-xs text-success'>
            If an account matches that email, reset instructions will be sent.
          </p>
        ) : null}
      </form>
      <p className='mt-6 text-center text-[13px] text-text-muted'>
        Remembered your password? <Link to='/login' className='font-bold text-primary'>Sign in</Link>
      </p>
    </AuthPageLayout>
  )
}
