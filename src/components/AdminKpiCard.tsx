type AdminKpiCardProps = {
  label: string
  value: string
  warning?: boolean
}

export function AdminKpiCard({ label, value, warning = false }: AdminKpiCardProps) {
  return (
    <div className='rounded-[var(--radius)] border border-border bg-surface p-[18px]'>
      <div className={`text-2xl font-extrabold ${warning ? 'text-accent' : ''}`}>{value}</div>
      <div className='text-[13px] text-text-muted'>{label}</div>
    </div>
  )
}
