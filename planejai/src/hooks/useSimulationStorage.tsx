import { useCallback } from 'react'
import {
  type SimulationFormData,
  type SimulationRecord,
} from '@/data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {
  const getSimulations = useCallback((): SimulationRecord[] => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!storage) return []
    try {
      return JSON.parse(storage) as SimulationRecord[]
    } catch {
      return []
    }
  }, [])

  const saveFormData = useCallback((formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const record: SimulationRecord = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
    }

    const savedData = getSimulations()
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...savedData, record]),
    )

    return id
  }, [getSimulations])

  const getFormData = useCallback((id: string) => {
    const savedData = getSimulations()
    return savedData.find((record) => record.id === id) || null
  }, [getSimulations])

  const updateSimulation = useCallback((id: string, data: SimulationRecord) => {
    const savedData = getSimulations()

    const updated = savedData.map((record) =>
      record.id === id ? { ...data } : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }, [getSimulations])

  const deleteSimulation = useCallback((id: string): SimulationRecord[] => {
    const savedData = getSimulations()
    const updated = savedData.filter((record) => record.id !== id)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    return updated
  }, [getSimulations])

  return { saveFormData, getSimulations, getFormData, updateSimulation, deleteSimulation }
}