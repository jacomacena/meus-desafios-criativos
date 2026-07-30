import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CalendarClock,
  PiggyBank,
  Sparkles,
  Trash2,
  Wallet,
} from 'lucide-react'
import type { SimulationRecord } from '@/data/simulation'
import { calcMonthlySavings } from '@/utils/simulation'

interface SimulationCardProps {
  simulation: SimulationRecord
  onDelete: (id: string) => void
}

const statusStyles = {
  viable: {
    label: 'Meta viável',
    className:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/40',
  },
  needs_adjustment: {
    label: 'Ajuste necessário',
    className:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/40',
  },
  unfeasible: {
    label: 'Meta inviável',
    className:
      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/40',
  },
}

export function SimulationCard({ simulation, onDelete }: SimulationCardProps) {
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)

  const monthlySavings = calcMonthlySavings(simulation)
  const insightStatus = simulation.insight?.feasibility.status
  const statusConfig = insightStatus ? statusStyles[insightStatus] : null

  const formattedDate = simulation.createdAt
    ? new Date(simulation.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <div className="bg-card border-border flex flex-col gap-4 rounded-2xl border p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.15)] transition-all duration-200 hover:shadow-[4px_8px_24px_0px_rgba(0,0,0,0.2)] sm:flex-row sm:items-center sm:justify-between">
      {/* Left: Icon + title + status */}
      <div className="flex min-w-0 items-center gap-3 sm:w-56 sm:shrink-0">
        <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <Sparkles size={20} />
        </div>
        <div className="min-w-0">
          <h3 className="text-foreground truncate font-semibold text-base leading-snug">
            {simulation.goalName || 'Meta sem nome'}
          </h3>
          {formattedDate && (
            <span className="text-muted-foreground text-xs font-medium">
              {formattedDate}
            </span>
          )}
        </div>
      </div>

      {/* Middle: Metrics */}
      <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-1 sm:justify-around sm:gap-8">
        <div>
          <div className="text-muted-foreground mb-0.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide">
            <Wallet size={12} className="text-primary" />
            <span>Custo da Meta</span>
          </div>
          <p className="text-foreground font-bold text-sm">
            R$ {simulation.goalAmount}
          </p>
        </div>

        <div>
          <div className="text-muted-foreground mb-0.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide">
            <CalendarClock size={12} className="text-primary" />
            <span>Prazo</span>
          </div>
          <p className="text-foreground font-bold text-sm">
            {simulation.goalDeadline} meses
          </p>
        </div>

        <div>
          <div className="text-primary mb-0.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide">
            <PiggyBank size={12} />
            <span>Economia Mensal</span>
          </div>
          <p className="text-primary font-extrabold text-sm">
            R${' '}
            {monthlySavings.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      {statusConfig && (
        <span
          className={`hidden items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold sm:inline-flex ${statusConfig.className}`}
        >
          {statusConfig.label}
        </span>
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:shrink-0">
        {isDeleting ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onDelete(simulation.id)}
              className="rounded-lg bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            >
              Excluir
            </button>
            <button
              type="button"
              onClick={() => setIsDeleting(false)}
              className="rounded-lg bg-secondary-button px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsDeleting(true)}
            className="text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-lg p-2 transition-colors"
            aria-label="Excluir simulação"
            title="Excluir simulação"
          >
            <Trash2 size={18} />
          </button>
        )}

        <button
          type="button"
          onClick={() => void navigate(`/resultado/${simulation.id}`)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2 px-4 text-sm font-semibold transition-colors whitespace-nowrap"
        >
          <span>Ver detalhes</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}