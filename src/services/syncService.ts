import AsyncStorage from '@react-native-async-storage/async-storage'
import { Task } from '../types/Task'

const OFFLINE_TASKS_KEY = '@offline_tasks'
const OFFLINE_UPDATES_KEY = '@offline_updates'
const OFFLINE_DELETES_KEY = '@offline_deletes'

export const syncService = {
  // Salvar tarefa offline
  saveOfflineTask: async (task: Task): Promise<void> => {
    try {
      const offlineTasks = await syncService.getOfflineTasks()
      const taskWithOfflineData = {
        ...task,
        isSynced: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      offlineTasks.push(taskWithOfflineData)
      await AsyncStorage.setItem(OFFLINE_TASKS_KEY, JSON.stringify(offlineTasks))
    } catch (error) {
      console.error('Error saving offline task:', error)
      throw error
    }
  },

  // Obter tarefas offline
  getOfflineTasks: async (): Promise<Task[]> => {
    try {
      const offlineTasks = await AsyncStorage.getItem(OFFLINE_TASKS_KEY)
      return offlineTasks ? JSON.parse(offlineTasks) : []
    } catch (error) {
      console.error('Error getting offline tasks:', error)
      return []
    }
  },

  // Salvar atualização offline
  saveOfflineUpdate: async (id: number, updates: Partial<Task>): Promise<void> => {
    try {
      const offlineUpdates = await syncService.getOfflineUpdates()
      const updateData = {
        id,
        updates: {
          ...updates,
          updatedAt: new Date().toISOString()
        },
        timestamp: new Date().toISOString()
      }
      offlineUpdates.push(updateData)
      await AsyncStorage.setItem(OFFLINE_UPDATES_KEY, JSON.stringify(offlineUpdates))
    } catch (error) {
      console.error('Error saving offline update:', error)
      throw error
    }
  },

  // Obter atualizações offline
  getOfflineUpdates: async (): Promise<Array<{ id: number; updates: Partial<Task>; timestamp: string }>> => {
    try {
      const offlineUpdates = await AsyncStorage.getItem(OFFLINE_UPDATES_KEY)
      return offlineUpdates ? JSON.parse(offlineUpdates) : []
    } catch (error) {
      console.error('Error getting offline updates:', error)
      return []
    }
  },

  // Salvar exclusão offline
  saveOfflineDelete: async (id: number): Promise<void> => {
    try {
      const offlineDeletes = await syncService.getOfflineDeletes()
      const deleteData = {
        id,
        timestamp: new Date().toISOString()
      }
      offlineDeletes.push(deleteData)
      await AsyncStorage.setItem(OFFLINE_DELETES_KEY, JSON.stringify(offlineDeletes))
    } catch (error) {
      console.error('Error saving offline delete:', error)
      throw error
    }
  },

  // Obter exclusões offline
  getOfflineDeletes: async (): Promise<Array<{ id: number; timestamp: string }>> => {
    try {
      const offlineDeletes = await AsyncStorage.getItem(OFFLINE_DELETES_KEY)
      return offlineDeletes ? JSON.parse(offlineDeletes) : []
    } catch (error) {
      console.error('Error getting offline deletes:', error)
      return []
    }
  },

  // Limpar dados offline após sincronização
  clearOfflineData: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([OFFLINE_TASKS_KEY, OFFLINE_UPDATES_KEY, OFFLINE_DELETES_KEY])
    } catch (error) {
      console.error('Error clearing offline data:', error)
      throw error
    }
  },

  // Verificar se há dados offline para sincronizar
  hasOfflineData: async (): Promise<boolean> => {
    try {
      const [offlineTasks, offlineUpdates, offlineDeletes] = await Promise.all([
        syncService.getOfflineTasks(),
        syncService.getOfflineUpdates(),
        syncService.getOfflineDeletes()
      ])
      return offlineTasks.length > 0 || offlineUpdates.length > 0 || offlineDeletes.length > 0
    } catch (error) {
      console.error('Error checking offline data:', error)
      return false
    }
  }
} 