import { Clock, Moon, Sun, TrendingUp, Wallet } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { useTheme } from '@/hooks/useTheme'
import { Button } from './Button'
import { Divider } from './Divider'

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { getSimulations } = useSimulationStorage()

  const simulationsCount = getSimulations().length
  const isFormActive = location.pathname === '/'
  const isHistoryActive = location.pathname === '/historico'

  return (
    <header className="border-border border-b px-4 sm:px-6 py-3 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <nav className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => void navigate('/')}
          className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-85"
        >
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full shadow-xs">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="text-lg">
            <span className="text-muted-foreground font-medium">Planej</span>
            <span className="font-extrabold text-foreground">.ai</span>
          </span>
        </button>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant={isFormActive ? 'primary' : 'secondary'}
            icon={TrendingUp}
            onClick={() => void navigate('/')}
          >
            <span className="hidden sm:inline">Nova Simulação</span>
          </Button>
          <Button
            variant={isHistoryActive ? 'primary' : 'ghost'}
            icon={Clock}
            onClick={() => void navigate('/historico')}
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Divider orientation="vertical" />
          <Button
            aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            variant="ghost"
            icon={theme === 'light' ? Moon : Sun}
            onClick={toggleTheme}
          />
        </div>
      </nav>
    </header>
  )
}