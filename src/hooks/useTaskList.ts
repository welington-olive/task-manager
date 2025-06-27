import { useEffect, useState } from 'react'
import { useTaskStore } from '../contexts/useTaskStore'
import { Task } from '../types/Task'
import { taskUtils } from '../utils/taskUtils'

export function useTaskList() {
  const { tasks, fetchTasks } = useTaskStore()
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      await fetchTasks()
    } catch (error) {
      console.error('Error loading tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    try {
      setRefreshing(true)
      await fetchTasks()
    } catch (error) {
      console.error('Error refreshing tasks:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const handleLoadMore = async () => {
    if (!loading) {
      await loadTasks()
    }
  }

  const getFilteredTasks = (filters: { status?: string; responsible?: string }): Task[] => {
    return taskUtils.filterTasks(tasks, filters)
  }

  const getSortedTasks = (): Task[] => {
    return taskUtils.sortTasksByDate(tasks)
  }

  return {
    tasks: getSortedTasks(),
    loading,
    refreshing,
    handleRefresh,
    handleLoadMore,
    getFilteredTasks,
  }
} 