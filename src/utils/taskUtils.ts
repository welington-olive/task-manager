import { Task } from '../types/Task'
import { STRINGS } from '../constants/strings'

export const taskUtils = {
  /**
   * Get the display label for a task status
   */
  getStatusLabel: (status: string): string => {
    return status === STRINGS.STATUS.COMPLETED 
      ? STRINGS.STATUS.COMPLETED_LABEL 
      : STRINGS.STATUS.PENDING_LABEL
  },

  /**
   * Check if a task is completed
   */
  isCompleted: (task: Task): boolean => {
    return task.status === STRINGS.STATUS.COMPLETED
  },

  /**
   * Filter tasks by status and/or responsible
   */
  filterTasks: (tasks: Task[], filters: {
    status?: string
    responsible?: string
  }): Task[] => {
    let filteredTasks = tasks

    if (filters.status) {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status)
    }

    if (filters.responsible) {
      filteredTasks = filteredTasks.filter(task => 
        task.responsible.toLowerCase().includes(filters.responsible!.toLowerCase())
      )
    }

    return filteredTasks
  },

  /**
   * Sort tasks by creation date (oldest first)
   */
  sortTasksByDate: (tasks: Task[]): Task[] => {
    return [...tasks].sort((a, b) => {
      // Se ambas as tarefas têm createdAt, ordenar por data
      if (a.createdAt && b.createdAt) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
      // Se apenas uma tem createdAt, a que tem fica depois
      if (a.createdAt && !b.createdAt) return 1
      if (!a.createdAt && b.createdAt) return -1
      // Se nenhuma tem createdAt, ordenar por ID (mais antigo primeiro)
      return a.id - b.id
    }).map(task => ({
      ...task,
      // Garantir que as propriedades de sincronização sejam preservadas
      isSynced: task.isSynced ?? true,
      createdAt: task.createdAt || new Date().toISOString(),
      updatedAt: task.updatedAt || new Date().toISOString()
    }))
  },

  /**
   * Validate task data
   */
  validateTask: (task: Partial<Task>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!task.title?.trim()) {
      errors.push(STRINGS.VALIDATION.TITLE_REQUIRED)
    }

    if (!task.responsible?.trim()) {
      errors.push(STRINGS.VALIDATION.RESPONSIBLE_REQUIRED)
    }

    if (task.status && !['pending', 'completed'].includes(task.status)) {
      errors.push(STRINGS.VALIDATION.INVALID_STATUS)
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
} 