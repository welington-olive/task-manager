import { create } from 'zustand'
import { taskService } from '../services/api'
import { syncService } from '../services/syncService'
import { migrateData } from '../utils/migrateData'
import { Task } from '../types/Task'

type Store = {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  isOnline: boolean
  hasOfflineData: boolean
  fetchTasks: () => Promise<void>
  addTask: (task: Omit<Task, 'id'>) => Promise<void>
  updateTask: (id: number, task: Partial<Task>) => Promise<void>
  deleteTask: (id: number) => Promise<void>
  clearAllTasks: () => Promise<void>
  migrateData: () => Promise<void>
  syncOfflineData: () => Promise<void>
  setOnlineStatus: (isOnline: boolean) => void
  checkOfflineData: () => Promise<void>
}

export const useTaskStore = create<Store>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  isOnline: true,
  hasOfflineData: false,
  
  setOnlineStatus: (isOnline: boolean) => {
    set({ isOnline })
    // Se voltou online, verificar se há dados para sincronizar
    if (isOnline) {
      get().checkOfflineData()
    }
  },

  checkOfflineData: async () => {
    try {
      const hasOfflineData = await syncService.hasOfflineData()
      set({ hasOfflineData })
    } catch (error) {
      console.error('Error checking offline data:', error)
    }
  },
  
  fetchTasks: async () => {
    try {
      set({ isLoading: true, error: null })
      
      // Verifica se precisa migrar dados
      const needsMigration = await migrateData.needsMigration()
      if (needsMigration) {
        await migrateData.migrateFromDbJson()
      }
      
      const tasks = await taskService.getAll()
      
      // Sempre carregar tarefas offline, independente do status de conexão
      const offlineTasks = await syncService.getOfflineTasks()
      const allTasks = [...tasks, ...offlineTasks]
      set({ tasks: allTasks, isLoading: false })
    } catch (error) {
      console.error('Error fetching tasks:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao carregar tarefas',
        isLoading: false 
      })
      throw error
    }
  },
  
  addTask: async (task) => {
    try {
      set({ isLoading: true, error: null })
      
      if (get().isOnline) {
        // Se online, salvar normalmente
        const newTask = await taskService.create(task)
        set(state => ({ 
          tasks: [...state.tasks, newTask],
          isLoading: false 
        }))
      } else {
        // Se offline, salvar localmente
        const offlineTask: Task = {
          ...task,
          id: Date.now(), // ID temporário
          isSynced: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        await syncService.saveOfflineTask(offlineTask)
        set(state => ({ 
          tasks: [...state.tasks, offlineTask],
          hasOfflineData: true,
          isLoading: false 
        }))
      }
    } catch (error) {
      console.error('Error adding task:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao adicionar tarefa',
        isLoading: false 
      })
      throw error
    }
  },
  
  updateTask: async (id, task) => {
    try {
      set({ isLoading: true, error: null })
      
      if (get().isOnline) {
        // Se online, atualizar normalmente
        const updatedTask = await taskService.update(id, task)
        set(state => ({
          tasks: state.tasks.map(t => t.id === id ? updatedTask : t),
          isLoading: false
        }))
      } else {
        // Se offline, salvar atualização localmente
        await syncService.saveOfflineUpdate(id, task)
        const currentTask = get().tasks.find(t => t.id === id)
        if (currentTask) {
          const updatedTask: Task = {
            ...currentTask,
            ...task,
            isSynced: false,
            updatedAt: new Date().toISOString()
          }
          
          set(state => ({
            tasks: state.tasks.map(t => t.id === id ? updatedTask : t),
            hasOfflineData: true,
            isLoading: false
          }))
        } else {
          set({ isLoading: false })
        }
      }
    } catch (error) {
      console.error('Error updating task:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao atualizar tarefa',
        isLoading: false 
      })
      throw error
    }
  },
  
  deleteTask: async (id) => {
    try {
      set({ isLoading: true, error: null })
      
      if (get().isOnline) {
        // Se online, deletar normalmente
        await taskService.delete(id)
        set(state => ({
          tasks: state.tasks.filter(t => t.id !== id),
          isLoading: false
        }))
      } else {
        // Se offline, salvar exclusão localmente
        await syncService.saveOfflineDelete(id)
        set(state => ({
          tasks: state.tasks.filter(t => t.id !== id),
          hasOfflineData: true,
          isLoading: false
        }))
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao deletar tarefa',
        isLoading: false 
      })
      throw error
    }
  },
  
  clearAllTasks: async () => {
    try {
      set({ isLoading: true, error: null })
      await taskService.clearAll()
      set({ tasks: [], isLoading: false })
    } catch (error) {
      console.error('Error clearing tasks:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao limpar tarefas',
        isLoading: false 
      })
      throw error
    }
  },
  
  migrateData: async () => {
    try {
      set({ isLoading: true, error: null })
      await migrateData.migrateFromDbJson()
      const tasks = await taskService.getAll()
      
      // Incluir tarefas offline após migração
      const offlineTasks = await syncService.getOfflineTasks()
      const allTasks = [...tasks, ...offlineTasks]
      
      set({ tasks: allTasks, isLoading: false })
    } catch (error) {
      console.error('Error migrating data:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erro na migração de dados',
        isLoading: false 
      })
      throw error
    }
  },

  syncOfflineData: async () => {
    try {
      set({ isLoading: true, error: null })
      
      const [offlineTasks, offlineUpdates, offlineDeletes] = await Promise.all([
        syncService.getOfflineTasks(),
        syncService.getOfflineUpdates(),
        syncService.getOfflineDeletes()
      ])

      // Sincronizar tarefas criadas offline
      for (const task of offlineTasks) {
        try {
          const { id, isSynced, createdAt, updatedAt, ...taskData } = task
          await taskService.create(taskData)
        } catch (error) {
          console.error('Error syncing offline task:', error)
        }
      }

      // Sincronizar atualizações offline
      for (const update of offlineUpdates) {
        try {
          const { updatedAt, ...updateData } = update.updates
          await taskService.update(update.id, updateData)
        } catch (error) {
          console.error('Error syncing offline update:', error)
        }
      }

      // Sincronizar exclusões offline
      for (const deleteOp of offlineDeletes) {
        try {
          await taskService.delete(deleteOp.id)
        } catch (error) {
          console.error('Error syncing offline delete:', error)
        }
      }

      // Limpar dados offline
      await syncService.clearOfflineData()

      // Recarregar tarefas incluindo as offline (que agora devem estar vazias)
      const tasks = await taskService.getAll()
      const remainingOfflineTasks = await syncService.getOfflineTasks()
      const allTasks = [...tasks, ...remainingOfflineTasks]
      
      set({ 
        tasks: allTasks, 
        hasOfflineData: remainingOfflineTasks.length > 0,
        isLoading: false 
      })
    } catch (error) {
      console.error('Error syncing offline data:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erro na sincronização',
        isLoading: false 
      })
      throw error
    }
  }
}))