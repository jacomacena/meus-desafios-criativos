import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Filter, PlusCircle, Search, X } from 'lucide-react'
import { EmptyState } from '@/components/features/SimulationHistory/EmptyState'
import { SimulationCard } from '@/components/features/SimulationHistory/SimulationCard'
import { Button } from '@/components/shared/Button'
import { PageHero } from '@/components/shared/PageHero'
import { Pagination } from '@/components/shared/Pagination'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

const ITEMS_PER_PAGE = 6

type StatusFilter = 'all' | 'viable' | 'needs_adjustment' | 'unfeasible'

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState<SimulationRecord[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setSimulations(getSimulations())
  }, [getSimulations])

  const handleDelete = (id: string) => {
    const updated = deleteSimulation(id)
    setSimulations(updated)
  }

  // Filter logic
  const filteredSimulations = useMemo(() => {
    return simulations.filter((sim) => {
      const matchesSearch = sim.goalName
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim())

      if (!matchesSearch) return false

      if (statusFilter === 'all') return true

      const simStatus = sim.insight?.feasibility.status
      return simStatus === statusFilter
    })
  }, [simulations, searchQuery, statusFilter])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, statusFilter])

  // Pagination math
  const totalPages = Math.ceil(filteredSimulations.length / ITEMS_PER_PAGE)
  const paginatedSimulations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredSimulations.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredSimulations, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setStatusFilter('all')
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      {/* Header section */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <PageHero
            title="Histórico de Simulações"
            subtitle="Acompanhe suas metas financeiras e diagnósticos gerados."
          />
        </div>
        {simulations.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="bg-secondary-button text-muted-foreground rounded-full px-3 py-1 text-xs font-semibold">
              {simulations.length}{' '}
              {simulations.length === 1 ? 'simulação' : 'simulações'}
            </span>
          </div>
        )}
      </div>

      {simulations.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-6">
          {/* Filter & Search Bar */}
          <div className="bg-card border-border flex flex-col gap-3 rounded-2xl border p-4 shadow-xs md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="text-muted-foreground absolute top-1/2 left-3.5 -translate-y-1/2"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar simulação por nome da meta..."
                className="bg-input text-foreground border-border focus:ring-primary/50 w-full rounded-xl border py-2 pr-9 pl-9 text-xs transition-all placeholder:text-muted-foreground focus:ring-2 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Status Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <div className="text-muted-foreground flex items-center gap-1 text-xs font-medium mr-1">
                <Filter size={14} />
                <span>Status:</span>
              </div>

              {(
                [
                  { id: 'all', label: 'Todas' },
                  { id: 'viable', label: 'Viáveis' },
                  { id: 'needs_adjustment', label: 'Ajuste Nec.' },
                  { id: 'unfeasible', label: 'Inviáveis' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === tab.id
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-secondary-button text-muted-foreground hover:text-foreground border border-border'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid or Search Empty State */}
          {filteredSimulations.length === 0 ? (
            <div className="bg-card border-border flex flex-col items-center justify-center rounded-2xl border px-6 py-12 text-center shadow-xs">
              <p className="text-foreground font-semibold text-base">
                Nenhuma simulação encontrada
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Tente ajustar sua busca ou filtro para encontrar a simulação desejada.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="bg-secondary-button text-foreground hover:bg-primary/10 border-border mt-4 rounded-xl border px-4 py-2 text-xs font-semibold transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {paginatedSimulations.map((simulation) => (
                <SimulationCard
                  key={simulation.id}
                  simulation={simulation}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredSimulations.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </main>
  )
}
