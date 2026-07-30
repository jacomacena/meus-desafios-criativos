import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarClock,
  Check,
  Copy,
  CreditCardIcon,
  Goal,
  Landmark,
  PiggyBank,
  PlusCircle,
  Wallet,
} from 'lucide-react'
import { AIInsightsCard } from '@/components/features/SimulationResults/AIInsightCardProps'
import { Card } from '@/components/features/SimulationResults/Card'
import { Button } from '@/components/shared/Button'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { calcMonthlySavings } from '@/utils/simulation'

export function SimulationResultsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getFormData } = useSimulationStorage()
  const [copied, setCopied] = useState(false)

  const data = id ? getFormData(id) : null

  if (!data) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <h2 className="text-foreground text-2xl font-bold">
          Simulação não encontrada
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          A simulação procurada não existe ou foi excluída.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="secondary" onClick={() => void navigate('/historico')}>
            Ver Histórico
          </Button>
          <Button variant="primary" onClick={() => void navigate('/')}>
            Nova Simulação
          </Button>
        </div>
      </main>
    )
  }

  const monthlySavings = calcMonthlySavings(data)

  const handleCopySummary = () => {
    const summaryText = `📊 Resumo da Simulação - ${data.goalName}
• Meta: ${data.goalName} (${data.goalAmount})
• Prazo: ${data.goalDeadline} meses
• Economia mensal necessária: R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
• Renda mensal: R$ ${data.income}
• Custos fixos: R$ ${data.expenses}
• Dívidas/parcelas: R$ ${data.debts}`

    void navigator.clipboard.writeText(summaryText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      {/* Top action bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => void navigate('/historico')}
          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar para o histórico</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="border-border bg-secondary-button hover:bg-primary/10 text-foreground flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-500" />
                <span className="text-green-500">Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copiar resumo</span>
              </>
            )}
          </button>
        </div>
      </div>

      <PageHero
        title="Resultado da sua simulação"
        subtitle={`Perfil e estratégia para atingir a meta: ${data.goalName}`}
      />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          {/* Goal Summary Cards */}
          <Card
            icon={Goal}
            label="Custo da Meta"
            value={`R$ ${data.goalAmount}`}
            subtitle={data.goalName}
          />
          <Card
            icon={CalendarClock}
            label="Prazo"
            value={`${data.goalDeadline} meses`}
            subtitle="Prazo para atingir a meta"
          />
          <Card
            variant="primary"
            icon={PiggyBank}
            label="Economia mensal"
            value={`R$ ${monthlySavings.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            subtitle="Economia mensal necessária"
          />
          
          
          <Card
            icon={Wallet}
            label="Renda mensal"
            value={`R$ ${data.income}`}
            subtitle="Renda total bruta por mês"
          />
          <Card
            icon={CreditCardIcon}
            label="Custos Fixos de Vida"
            value={`R$ ${data.expenses}`}
            subtitle="Gastos essenciais por mês"
          />
          <Card
            icon={Landmark}
            label="Dívidas / Parcelas"
            value={`R$ ${data.debts}`}
            subtitle="Valor comprometido em parcelas"
          />
        </div>

        {/* Financial Profile & AI Insights */}
        <div className="lg:col-span-2">
          <AIInsightsCard simulationId={data.id} />
        </div>
      </div>
    </main>
  )
}