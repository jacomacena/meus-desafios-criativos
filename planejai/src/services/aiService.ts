import type { ChatMessage, SimulationRecord } from '@/data/simulation'

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[]
    }
  }[]
}

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible'
    content: string
  }
  diagnosis: {
    content: string
  }
  suggestions: {
    items: string[]
  }
  extraIncome: {
    items: string[]
  }
  investment: {
    items: string[]
  }
  motivation: {
    content: string
  }
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)
const MODEL_NAME = 'gemini-flash-latest'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

const callGeminiAPI = async (prompt: string) => {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`)
  }

  return (await response.json()) as GeminiResponse
}

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI(prompt)
  const json = response.candidates[0].content.parts[0].text
  return JSON.parse(json) as InsightData
}

export const askEducatorQuestion = async (
  simulation: SimulationRecord,
  chatHistory: ChatMessage[],
  newQuestion: string,
) => {
  const contextPrompt = `Você é um Educador Financeiro especializado em planejamento financeiro pessoal, atencioso, empático e prático.

Dados do perfil e meta do usuário:
- Renda mensal bruta: R$ ${simulation.income}
- Custos fixos essenciais: R$ ${simulation.expenses}
- Dívidas / parcelas: R$ ${simulation.debts}
- Meta: ${simulation.goalName}
- Custo da meta: R$ ${simulation.goalAmount}
- Prazo: ${simulation.goalDeadline} meses

Sua missão:
1. Responda à dúvida do usuário com explicações simples, orientações práticas e linguagem encorajadora (fale diretamente em 2ª pessoa: "você", "sua meta").
2. Leve em consideração a renda, custos, dívidas e a meta descritos acima.
3. Não retorne JSON. Retorne apenas texto claro e bem formatado (parágrafos curtos ou listas se necessário).`

  const contents = [
    {
      role: 'user',
      parts: [{ text: contextPrompt }],
    },
    {
      role: 'model',
      parts: [
        {
          text: 'Entendido! Sou seu Educador Financeiro. Como posso te ajudar com sua simulação e seus objetivos hoje?',
        },
      ],
    },
    ...chatHistory.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    })),
    {
      role: 'user',
      parts: [{ text: newQuestion }],
    },
  ]

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents }),
  })

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`)
  }

  const data = (await response.json()) as GeminiResponse
  return data.candidates[0].content.parts[0].text
}