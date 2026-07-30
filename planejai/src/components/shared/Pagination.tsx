import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="border-border bg-card mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border p-4 shadow-xs sm:flex-row">
      <p className="text-muted-foreground text-xs font-medium">
        Exibindo <span className="text-foreground font-semibold">{startItem}</span> a{' '}
        <span className="text-foreground font-semibold">{endItem}</span> de{' '}
        <span className="text-foreground font-semibold">{totalItems}</span> simulações
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border-border bg-secondary-button hover:bg-primary/10 text-foreground flex h-9 w-9 items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Página anterior"
          title="Página anterior"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-xs font-semibold transition-all ${
                currentPage === page
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-secondary-button border-border text-foreground hover:bg-primary/10 border'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border-border bg-secondary-button hover:bg-primary/10 text-foreground flex h-9 w-9 items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Próxima página"
          title="Próxima página"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
