import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import { EmptyState } from '@/components/features/SimulationHistory/EmptyState'
import { SimulationCard } from '@/components/features/SimulationHistory/SimulationCard'
import { Button } from '@/components/shared/Button'
import { PageHero } from '@/components/shared/PageHero'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState<SimulationRecord[]>([])

  useEffect(() => {
    setSimulations(getSimulations())
  }, [getSimulations])

  const handleDelete = (id: string) => {
    const updated = deleteSimulation(id)
    setSimulations(updated)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <PageHero
            title="Histórico de Simulações"
            subtitle="Acompanhe suas metas financeiras e diagnósticos gerados."
          />
        </div>
        {simulations.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground bg-secondary-button rounded-full px-3 py-1 text-xs font-semibold">
              {simulations.length} {simulations.length === 1 ? 'simulação' : 'simulações'}
            </span>
            <Button
              variant="primary"
              icon={PlusCircle}
              onClick={() => void navigate('/')}
            >
              Nova Simulação
            </Button>
          </div>
        )}
      </div>

      {simulations.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-4">
          {simulations.map((simulation) => (
            <SimulationCard
              key={simulation.id}
              simulation={simulation}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  )
}
