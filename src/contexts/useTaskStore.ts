import { create } from 'zustand'
import { api } from '../services/api'
import { Task } from '../types/Task'

type Store = {
  tasks: Task[]
  fetchTasks: () => Promise<void>
  addTask: (task: Omit<Task, 'id'>) => Promise<void>
  updateTask: (id: number, task: Partial<Task>) => Promise<void>
  deleteTask: (id: number) => Promise<void>
}

export const useTaskStore = create<Store>((set, get) => ({
  tasks: [],
  fetchTasks: async () => {
    const { data } = await api.get('/tasks')
    set({ tasks: data })
  },
  addTask: async (task) => {
    const { data } = await api.post('/tasks', task)
    set(state => ({ tasks: [data, ...state.tasks] }))
  },
  updateTask: async (id, task) => {
    const { data } = await api.put(`/tasks/${id}`, task)
    set(state => ({
      tasks: state.tasks.map(t => t.id === id ? data : t)
    }))
  },
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`)
    set(state => ({
      tasks: state.tasks.filter(t => t.id !== id)
    }))
  },
}))