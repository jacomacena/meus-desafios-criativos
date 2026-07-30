import { useCallback, useEffect, useState } from 'react'
import type { ChatMessage } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { askEducatorQuestion } from '@/services/aiService'

export const useEducatorChat = (simulationId: string) => {
  const { getFormData, updateSimulation } = useSimulationStorage()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastQuestion, setLastQuestion] = useState<string | null>(null)

  useEffect(() => {
    const simulation = getFormData(simulationId)
    if (simulation?.chatHistory) {
      setMessages(simulation.chatHistory)
    }
  }, [simulationId, getFormData])

  const sendMessage = useCallback(
    async (questionText: string) => {
      const text = questionText.trim()
      if (!text || isLoading) return

      const simulation = getFormData(simulationId)
      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      setLastQuestion(text)
      setError(null)

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'user',
        text,
        timestamp: new Date().toISOString(),
      }

      const updatedWithUser = [...messages, userMessage]
      setMessages(updatedWithUser)

      updateSimulation(simulationId, {
        ...simulation,
        chatHistory: updatedWithUser,
      })

      setIsLoading(true)

      try {
        const answerText = await askEducatorQuestion(
          simulation,
          messages,
          text,
        )

        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          sender: 'assistant',
          text: answerText,
          timestamp: new Date().toISOString(),
        }

        const finalMessages = [...updatedWithUser, assistantMessage]
        setMessages(finalMessages)

        const currentSimulation = getFormData(simulationId)
        if (currentSimulation) {
          updateSimulation(simulationId, {
            ...currentSimulation,
            chatHistory: finalMessages,
          })
        }
      } catch {
        setError('Não foi possível obter uma resposta do Educador Financeiro. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    },
    [simulationId, messages, isLoading, getFormData, updateSimulation],
  )

  const retryLastQuestion = useCallback(() => {
    if (lastQuestion) {
      void sendMessage(lastQuestion)
    }
  }, [lastQuestion, sendMessage])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    retryLastQuestion,
  }
}
