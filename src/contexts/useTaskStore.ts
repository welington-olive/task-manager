import { create } from 'zustand'
import { taskService } from '../services/api'
import { migrateData } from '../utils/migrateData'
import { Task } from '../types/Task'

type Store = {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  fetchTasks: () => Promise<void>
  addTask: (task: Omit<Task, 'id'>) => Promise<void>
  updateTask: (id: number, task: Partial<Task>) => Promise<void>
  deleteTask: (id: number) => Promise<void>
  clearAllTasks: () => Promise<void>
  migrateData: () => Promise<void>
}

export const useTaskStore = create<Store>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  
  fetchTasks: async () => {
    try {
      set({ isLoading: true, error: null })
      
      // Verifica se precisa migrar dados
      const needsMigration = await migrateData.needsMigration()
      if (needsMigration) {
        await migrateData.migrateFromDbJson()
      }
      
      const tasks = await taskService.getAll()
      set({ tasks, isLoading: false })
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
      const newTask = await taskService.create(task)
      set(state => ({ 
        tasks: [newTask, ...state.tasks],
        isLoading: false 
      }))
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
      const updatedTask = await taskService.update(id, task)
      set(state => ({
        tasks: state.tasks.map(t => t.id === id ? updatedTask : t),
        isLoading: false
      }))
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
      await taskService.delete(id)
      set(state => ({
        tasks: state.tasks.filter(t => t.id !== id),
        isLoading: false
      }))
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
      set({ tasks, isLoading: false })
    } catch (error) {
      console.error('Error migrating data:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erro na migração de dados',
        isLoading: false 
      })
      throw error
    }
  }
}))