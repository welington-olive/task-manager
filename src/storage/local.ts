import AsyncStorage from '@react-native-async-storage/async-storage'
import { Task } from '../types/Task'
import { appConfig } from '../config/appConfig'

export const localStorage = {
  /**
   * Save a task to local storage
   */
  async saveTask(task: Task): Promise<void> {
    try {
      const data = await AsyncStorage.getItem(appConfig.storage.tasks)
      const tasks = data ? JSON.parse(data) : []
      tasks.push(task)
      await AsyncStorage.setItem(appConfig.storage.tasks, JSON.stringify(tasks))
    } catch (error) {
      console.error('Error saving task to local storage:', error)
      throw error
    }
  },

  /**
   * Get all tasks from local storage
   */
  async getTasks(): Promise<Task[]> {
    try {
      const data = await AsyncStorage.getItem(appConfig.storage.tasks)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error getting tasks from local storage:', error)
      return []
    }
  },

  /**
   * Update a task in local storage
   */
  async updateTask(updatedTask: Task): Promise<void> {
    try {
      const tasks = await this.getTasks()
      const updatedTasks = tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
      await AsyncStorage.setItem(appConfig.storage.tasks, JSON.stringify(updatedTasks))
    } catch (error) {
      console.error('Error updating task in local storage:', error)
      throw error
    }
  },

  /**
   * Delete a task from local storage
   */
  async deleteTask(taskId: number): Promise<void> {
    try {
      const tasks = await this.getTasks()
      const filteredTasks = tasks.filter(task => task.id !== taskId)
      await AsyncStorage.setItem(appConfig.storage.tasks, JSON.stringify(filteredTasks))
    } catch (error) {
      console.error('Error deleting task from local storage:', error)
      throw error
    }
  },

  /**
   * Clear all tasks from local storage
   */
  async clearTasks(): Promise<void> {
    try {
      await AsyncStorage.removeItem(appConfig.storage.tasks)
    } catch (error) {
      console.error('Error clearing tasks from local storage:', error)
      throw error
    }
  },
}