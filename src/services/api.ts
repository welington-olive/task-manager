import { Task } from '../types/Task'
import { fileStorage } from './fileStorage'

// Helper function to normalize task ID
const normalizeTaskId = (id: string | number): number => {
  return typeof id === 'string' ? parseInt(id, 10) : id
}

// Task CRUD operations using local file storage
export const taskService = {
  // Get all tasks
  getAll: async (): Promise<Task[]> => {
    try {
      const tasks = await fileStorage.getAllTasks()
      // Marcar todas as tarefas como sincronizadas (já estão no storage local)
      return tasks.map(task => ({
        ...task,
        isSynced: true,
        createdAt: task.createdAt || new Date().toISOString(),
        updatedAt: task.updatedAt || new Date().toISOString()
      }))
    } catch (error) {
      console.error('Error getting all tasks:', error)
      return []
    }
  },

  // Get task by ID
  getById: async (id: string | number): Promise<Task> => {
    try {
      const task = await fileStorage.getTaskById(id)
      if (!task) {
        throw new Error(`Task with id ${id} not found`)
      }
      return {
        ...task,
        isSynced: true,
        createdAt: task.createdAt || new Date().toISOString(),
        updatedAt: task.updatedAt || new Date().toISOString()
      }
    } catch (error) {
      console.error(`Error getting task ${id}:`, error)
      throw error
    }
  },

  // Create new task
  create: async (task: Omit<Task, 'id'>): Promise<Task> => {
    try {
      const newTask = await fileStorage.createTask(task)
      return {
        ...newTask,
        isSynced: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error creating task:', error)
      throw error
    }
  },

  // Update task
  update: async (id: string | number, task: Partial<Task>): Promise<Task> => {
    try {
      const updatedTask = await fileStorage.updateTask(id, task)
      return {
        ...updatedTask,
        isSynced: true,
        updatedAt: new Date().toISOString()
      }
    } catch (error) {
      console.error(`Error updating task ${id}:`, error)
      throw error
    }
  },

  // Delete task
  delete: async (id: string | number): Promise<void> => {
    try {
      await fileStorage.deleteTask(id)
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error)
      throw error
    }
  },

  // Patch task (partial update)
  patch: async (id: string | number, updates: Partial<Task>): Promise<Task> => {
    try {
      const patchedTask = await fileStorage.patchTask(id, updates)
      return {
        ...patchedTask,
        isSynced: true,
        updatedAt: new Date().toISOString()
      }
    } catch (error) {
      console.error(`Error patching task ${id}:`, error)
      throw error
    }
  },

  // Clear all tasks
  clearAll: async (): Promise<void> => {
    try {
      await fileStorage.clearAllTasks()
    } catch (error) {
      console.error('Error clearing all tasks:', error)
      throw error
    }
  },

  // Get database info
  getDatabaseInfo: async () => {
    try {
      return await fileStorage.getDatabaseInfo()
    } catch (error) {
      console.error('Error getting database info:', error)
      return { exists: false }
    }
  }
}