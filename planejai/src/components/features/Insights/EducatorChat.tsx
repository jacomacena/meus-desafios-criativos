import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { AlertCircle, Bot, Loader2, MessageSquare, RefreshCw, Send, User } from 'lucide-react'
import { useEducatorChat } from '@/hooks/useEducatorChat'

interface EducatorChatProps {
  simulationId: string
}

const SUGGESTED_QUESTIONS = [
  'Como posso cortar custos fixos para atingir minha meta mais rápido?',
  'Qual tipo de investimento é recomendado para este prazo?',
  'O que fazer se eu não conseguir economizar o valor mensal necessário?',
]

export function EducatorChat({ simulationId }: EducatorChatProps) {
  const { messages, isLoading, error, sendMessage, retryLastQuestion } =
    useEducatorChat(simulationId)
  const [inputQuestion, setInputQuestion] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, error])

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault()
    if (!inputQuestion.trim() || isLoading) return
    void sendMessage(inputQuestion)
    setInputQuestion('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSelectSuggestion = (suggestion: string) => {
    void sendMessage(suggestion)
  }

  return (
    <div className="border-border bg-card mt-6 rounded-2xl border p-5 shadow-[2px_2px_12px_0px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-xl">
            <MessageSquare size={18} />
          </div>
          <div>
            <h3 className="text-foreground font-semibold text-sm">
              Conversar com o Educador Financeiro
            </h3>
            <p className="text-muted-foreground text-xs">
              Tire dúvidas sobre seu orçamento e estratégias para esta meta.
            </p>
          </div>
        </div>
      </div>

      {/* Messages thread */}
      <div className="max-h-80 overflow-y-auto pr-1 [scrollbar-color:var(--border)_transparent]">
        {messages.length === 0 ? (
          <div className="my-3 space-y-3">
            <p className="text-muted-foreground text-xs font-medium">
              💡 Sugestões de perguntas para iniciar:
            </p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_QUESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSuggestion(suggestion)}
                  disabled={isLoading}
                  className="bg-secondary-button hover:border-primary/50 text-foreground border-border flex items-center justify-between rounded-xl border p-2.5 text-left text-xs font-medium transition-all hover:bg-primary/5 disabled:opacity-50"
                >
                  <span>"{suggestion}"</span>
                  <span className="text-primary text-xs font-bold">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 py-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="bg-primary/10 text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-lg mt-0.5">
                    <Bot size={15} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-xs'
                      : 'bg-secondary-button text-foreground border border-border rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`mt-1 block text-[10px] ${
                      msg.sender === 'user'
                        ? 'text-primary-foreground/75 text-right'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="bg-primary text-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-lg mt-0.5">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Loading Feedback */}
        {isLoading && (
          <div className="flex items-center gap-2.5 py-2">
            <div className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
              <Bot size={15} />
            </div>
            <div className="bg-secondary-button border-border flex items-center gap-2 rounded-2xl rounded-tl-xs border px-4 py-2.5 text-xs text-muted-foreground">
              <Loader2 size={14} className="animate-spin text-primary" />
              <span>Educador Financeiro está analisando sua pergunta...</span>
            </div>
          </div>
        )}

        {/* Error Feedback */}
        {error && (
          <div className="my-2 border-red-500/30 bg-red-500/10 text-red-500 flex items-center justify-between rounded-xl border p-3 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={retryLastQuestion}
              className="hover:bg-red-500/20 flex items-center gap-1 rounded-lg px-2 py-1 font-semibold transition-colors"
            >
              <RefreshCw size={12} />
              Tentar novamente
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input section */}
      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Faça uma pergunta sobre sua simulação..."
          disabled={isLoading}
          className="bg-input text-foreground border-border focus:ring-primary/50 flex-1 rounded-xl border px-3.5 py-2.5 text-xs transition-all placeholder:text-muted-foreground focus:ring-2 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputQuestion.trim() || isLoading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex cursor-pointer items-center justify-center rounded-xl p-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Enviar pergunta"
          title="Enviar pergunta"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
