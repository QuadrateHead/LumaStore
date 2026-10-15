type PaginationProps = {
  ariaLabel: string
  activePage: number
  onPageChange: (page: number) => void
  pageCount?: number
}

export function Pagination({
  ariaLabel,
  activePage,
  onPageChange,
  pageCount = 4,
}: PaginationProps) {
  return (
    <nav className='mt-9 flex items-center justify-center gap-2' aria-label={ariaLabel}>
      <button
        type='button'
        aria-label='Previous page'
        onClick={() => onPageChange(Math.max(1, activePage - 1))}
        className='h-9 w-9 cursor-pointer rounded-[9px] border border-border bg-surface text-[13px] font-bold text-text-muted'
      >
        ‹
      </button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
        <button
          type='button'
          key={page}
          aria-label={`Page ${page}`}
          aria-current={activePage === page ? 'page' : undefined}
          onClick={() => onPageChange(page)}
          className={[
            'h-9 w-9 cursor-pointer rounded-[9px] border text-[13px] font-bold',
            activePage === page
              ? 'border-primary bg-primary text-on-primary'
              : 'border-border bg-surface text-text',
          ].join(' ')}
        >
          {page}
        </button>
      ))}
      <button
        type='button'
        aria-label='Next page'
        onClick={() => onPageChange(Math.min(pageCount, activePage + 1))}
        className='h-9 w-9 cursor-pointer rounded-[9px] border border-border bg-surface text-[13px] font-bold text-text-muted'
      >
        ›
      </button>
    </nav>
  )
}
