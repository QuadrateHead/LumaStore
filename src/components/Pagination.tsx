type PaginationProps = {
  ariaLabel: string
  activePage: number
  onPageChange: (page: number) => void
  pageCount?: number
}

/** Render a bounded page-number window with controls to traverse every page. */
export function Pagination({
  ariaLabel,
  activePage,
  onPageChange,
  pageCount = 4,
}: PaginationProps) {
  const safePageCount = Math.max(1, pageCount)
  const currentPage = Math.min(Math.max(activePage, 1), safePageCount)
  const visiblePageCount = Math.min(5, safePageCount)
  const firstVisiblePage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(visiblePageCount / 2),
      safePageCount - visiblePageCount + 1,
    ),
  )
  const visiblePages = Array.from(
    { length: visiblePageCount },
    (_, index) => firstVisiblePage + index,
  )

  return (
    <nav className='mt-9 flex items-center justify-center gap-2' aria-label={ariaLabel}>
      <button
        type='button'
        aria-label='Previous page'
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className='h-9 w-9 cursor-pointer rounded-[9px] border border-border bg-surface text-[13px] font-bold text-text-muted'
      >
        ‹
      </button>
      {visiblePages.map((page) => (
        <button
          type='button'
          key={page}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
          onClick={() => onPageChange(page)}
          className={[
            'h-9 w-9 cursor-pointer rounded-[9px] border text-[13px] font-bold',
            currentPage === page
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
        disabled={currentPage === safePageCount}
        onClick={() => onPageChange(Math.min(safePageCount, currentPage + 1))}
        className='h-9 w-9 cursor-pointer rounded-[9px] border border-border bg-surface text-[13px] font-bold text-text-muted'
      >
        ›
      </button>
    </nav>
  )
}
