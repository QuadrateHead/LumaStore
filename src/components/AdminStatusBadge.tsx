export type AdminStatus =
  | 'Archived'
  | 'Cancelled'
  | 'Delivered'
  | 'Draft'
  | 'New'
  | 'Out of stock'
  | 'Paid'
  | 'Pending'
  | 'Processing'
  | 'Published'
  | 'Refunded'
  | 'Shipped'

type AdminStatusBadgeProps = {
  status: AdminStatus
}

const statusClasses: Record<AdminStatus, string> = {
  Archived: 'bg-surface-2 text-text-muted',
  Cancelled: 'bg-danger/15 text-danger',
  Delivered: 'bg-success/15 text-success',
  Draft: 'bg-surface-2 text-text-muted',
  New: 'bg-accent/15 text-accent',
  'Out of stock': 'bg-danger/15 text-danger',
  Paid: 'bg-success/15 text-success',
  Pending: 'bg-accent/15 text-accent',
  Processing: 'bg-accent/15 text-accent',
  Published: 'bg-success/15 text-success',
  Refunded: 'bg-surface-2 text-text-muted',
  Shipped: 'bg-primary/15 text-primary',
}

export function AdminStatusBadge({ status }: AdminStatusBadgeProps) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${statusClasses[status]}`}>
      {status}
    </span>
  )
}
