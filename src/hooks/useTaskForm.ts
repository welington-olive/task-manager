import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema } from '../schemas/taskSchema'
import { useTaskStore } from '../contexts/useTaskStore'
import { Task } from '../types/Task'

type FormData = {
  title: string
  status: 'pending' | 'completed'
  responsible: string
}

interface UseTaskFormProps {
  task?: Task
  onSuccess?: () => void
}

export function useTaskForm({ task, onSuccess }: UseTaskFormProps = {}) {
  const { addTask, updateTask } = useTaskStore()
  
  const form = useForm<FormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      status: (task?.status as 'pending' | 'completed') || 'pending',
      responsible: task?.responsible || '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (task) {
        await updateTask(task.id, data)
      } else {
        await addTask(data)
      }
      form.reset()
      onSuccess?.()
      return { success: true }
    } catch (error) {
      console.error('Error saving task:', error)
      return { success: false, error }
    }
  }

  const handleStatusChange = (status: 'pending' | 'completed') => {
    form.setValue('status', status)
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleStatusChange,
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
    isEditing: !!task,
  }
} 