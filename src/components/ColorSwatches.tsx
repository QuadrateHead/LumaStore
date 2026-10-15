type ColorSwatch = {
  name: string
  color: string
}

type ColorSwatchesProps = {
  swatches: readonly ColorSwatch[]
  activeColor: string
  onChange: (color: string) => void
  transparentBackground?: boolean
}

export function ColorSwatches({
  swatches,
  activeColor,
  onChange,
  transparentBackground = false,
}: ColorSwatchesProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {swatches.map(({ name, color }) => (
        <button
          key={name}
          type='button'
          aria-label={name}
          aria-pressed={activeColor === name}
          onClick={() => onChange(name)}
          className={[
            'h-[26px] w-[26px] cursor-pointer rounded-full border-2 p-0.5',
            transparentBackground ? 'bg-transparent' : '',
            activeColor === name ? 'border-primary' : 'border-transparent',
          ].join(' ').trim()}
        >
          <i
            className='block h-full w-full rounded-full border border-border'
            style={{ backgroundColor: color }}
          />
        </button>
      ))}
    </div>
  )
}
