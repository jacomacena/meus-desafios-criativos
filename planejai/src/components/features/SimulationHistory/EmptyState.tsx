import { useNavigate } from 'react-router-dom'
import { PlusCircle, Wallet } from 'lucide-react'
import { Button } from '@/components/shared/Button'

export function EmptyState() {
  const navigate = useNavigate()

  return (
    <div className="bg-card border-border flex flex-col items-center justify-center rounded-2xl border px-6 py-16 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.1)]">
      <div className="bg-primary/10 text-primary mb-5 flex h-16 w-16 items-center justify-center rounded-2xl">
        <Wallet size={36} />
      </div>
      <h2 className="text-foreground text-xl font-bold sm:text-2xl">
        Nenhuma simulação salva
      </h2>
      <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
        Você ainda não criou nenhuma simulação financeira. Monte seu plano para atingir metas de curto, médio ou longo prazo com diagnósticos com IA!
      </p>
      <div className="mt-6">
        <Button
          variant="primary"
          icon={PlusCircle}
          onClick={() => void navigate('/')}
        >
          Criar minha primeira simulação
        </Button>
      </div>
    </div>
  )
}
