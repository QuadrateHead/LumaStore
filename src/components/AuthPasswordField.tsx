import { useState } from 'react'
import type { ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

type AuthPasswordFieldProps = {
  id: string
  label: string
  placeholder: string
  autoComplete: 'current-password' | 'new-password'
  registration: UseFormRegisterReturn
  error?: string
  labelAction?: ReactNode
  children?: ReactNode
  minLength?: number
}

export function AuthPasswordField({
  id,
  label,
  placeholder,
  autoComplete,
  registration,
  error,
  labelAction,
  children,
  minLength,
}: AuthPasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className='mb-4 flex flex-col gap-1.5'>
      <div className='flex items-center justify-between'>
        <label htmlFor={id} className='text-[13px] font-bold'>{label}</label>
        {labelAction}
      </div>
      <div className='relative'>
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          required
          minLength={minLength}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            'w-full rounded-[9px] border bg-surface px-3 py-[11px] pr-14 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
            error ? 'border-danger' : 'border-border',
          ].join(' ')}
          {...registration}
        />
        <button
          type='button'
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
          className='absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 text-xs font-bold text-text-muted'
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      {children}
      {error ? <span id={`${id}-error`} className='text-xs text-danger'>{error}</span> : null}
    </div>
  )
}
