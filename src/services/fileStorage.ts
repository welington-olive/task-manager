import { Task } from '../types/Task'
import * as FileSystem from 'expo-file-system'
import { Platform } from 'react-native'

// Path to the db.json file
const DB_FILE_PATH = `${FileSystem.documentDirectory}db.json`

// Helper function to normalize task ID
const normalizeTaskId = (id: string | number): number => {
  return typeof id === 'string' ? parseInt(id, 10) : id
}

// Helper function to find task by ID
const findTaskById = (tasks: Task[], id: string | number): Task | undefined => {
  const numId = normalizeTaskId(id)
  return tasks.find(t => t.id === numId)
}

// Initialize the database file if it doesn't exist
const initializeDatabase = async (): Promise<void> => {
  try {
    const fileExists = await FileSystem.getInfoAsync(DB_FILE_PATH)
    
    if (!fileExists.exists) {
      // Create initial database structure
      const initialData = {
        tasks: []
      }
      await FileSystem.writeAsStringAsync(DB_FILE_PATH, JSON.stringify(initialData, null, 2))
    }
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

// Read the database file
const readDatabase = async (): Promise<{ tasks: Task[] }> => {
  try {
    await initializeDatabase()
    const data = await FileSystem.readAsStringAsync(DB_FILE_PATH)
    const parsed = JSON.parse(data)
    
    // Normalize IDs to numbers
    parsed.tasks = parsed.tasks.map((task: any) => ({
      ...task,
      id: normalizeTaskId(task.id)
    }))
    
    return parsed
  } catch (error) {
    console.error('Error reading database:', error)
    throw error
  }
}

// Write to the database file
const writeDatabase = async (data: { tasks: Task[] }): Promise<void> => {
  try {
    await FileSystem.writeAsStringAsync(DB_FILE_PATH, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing to database:', error)
    throw error
  }
}

export const fileStorage = {
  /**
   * Get all tasks from the database file
   */
  async getAllTasks(): Promise<Task[]> {
    try {
      const db = await readDatabase()
      return db.tasks
    } catch (error) {
      console.error('Error getting all tasks:', error)
      return []
    }
  },

  /**
   * Get a task by ID from the database file
   */
  async getTaskById(id: string | number): Promise<Task | null> {
    try {
      const db = await readDatabase()
      const task = findTaskById(db.tasks, id)
      return task || null
    } catch (error) {
      console.error(`Error getting task ${id}:`, error)
      return null
    }
  },

  /**
   * Create a new task in the database file
   */
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      const db = await readDatabase()
      
      // Generate new ID
      const maxId = db.tasks.length > 0 ? Math.max(...db.tasks.map(t => t.id)) : 0
      const newTask: Task = {
        ...task,
        id: maxId + 1
      }
      
      db.tasks.push(newTask)
      await writeDatabase(db)
      
      return newTask
    } catch (error) {
      console.error('Error creating task:', error)
      throw error
    }
  },

  /**
   * Update a task in the database file
   */
  async updateTask(id: string | number, updates: Partial<Task>): Promise<Task> {
    try {
      const db = await readDatabase()
      const taskIndex = db.tasks.findIndex(t => t.id === normalizeTaskId(id))
      
      if (taskIndex === -1) {
        throw new Error(`Task with id ${id} not found`)
      }
      
      const updatedTask: Task = {
        ...db.tasks[taskIndex],
        ...updates,
        id: normalizeTaskId(id) // Ensure ID remains the same
      }
      
      db.tasks[taskIndex] = updatedTask
      await writeDatabase(db)
      
      return updatedTask
    } catch (error) {
      console.error(`Error updating task ${id}:`, error)
      throw error
    }
  },

  /**
   * Delete a task from the database file
   */
  async deleteTask(id: string | number): Promise<void> {
    try {
      const db = await readDatabase()
      const normalizedId = normalizeTaskId(id)
      
      const taskIndex = db.tasks.findIndex(t => t.id === normalizedId)
      
      if (taskIndex === -1) {
        throw new Error(`Task with id ${id} not found`)
      }
      
      db.tasks.splice(taskIndex, 1)
      await writeDatabase(db)
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error)
      throw error
    }
  },

  /**
   * Patch a task (partial update) in the database file
   */
  async patchTask(id: string | number, updates: Partial<Task>): Promise<Task> {
    return this.updateTask(id, updates)
  },

  /**
   * Clear all tasks from the database file
   */
  async clearAllTasks(): Promise<void> {
    try {
      const db = await readDatabase()
      db.tasks = []
      await writeDatabase(db)
    } catch (error) {
      console.error('Error clearing all tasks:', error)
      throw error
    }
  },

  /**
   * Get database file info
   */
  async getDatabaseInfo(): Promise<{ exists: boolean; size?: number; uri?: string }> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(DB_FILE_PATH)
      return {
        exists: fileInfo.exists,
        size: fileInfo.exists ? (fileInfo as any).size : undefined,
        uri: fileInfo.uri
      }
    } catch (error) {
      console.error('Error getting database info:', error)
      return { exists: false }
    }
  }
} 