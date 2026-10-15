type FilterCheckboxOption = {
  label: string
  value?: string
  count?: string
}

type FilterCheckboxListProps = {
  options: readonly FilterCheckboxOption[]
  selectedValues: Record<string, boolean>
  onChange: (value: string, checked: boolean) => void
}

export function FilterCheckboxList({
  options,
  selectedValues,
  onChange,
}: FilterCheckboxListProps) {
  return (
    <div className='flex flex-col gap-[9px]'>
      {options.map(({ label, value = label, count }) => (
        <label key={value} className='flex cursor-pointer items-center gap-[9px] text-[13px] text-text-muted'>
          <input
            type='checkbox'
            checked={Boolean(selectedValues[value])}
            onChange={(event) => onChange(value, event.target.checked)}
            className='h-[15px] w-[15px] accent-primary'
          />
          {label}
          {count ? <span className='ml-auto text-text-muted opacity-70'>{count}</span> : null}
        </label>
      ))}
    </div>
  )
}
