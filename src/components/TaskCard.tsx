import React from 'react'
import { Alert, View } from 'react-native'
import { Task } from '../types/Task'
import { STRINGS } from '../constants/strings'
import { taskUtils } from '../utils/taskUtils'
import { useTaskStore } from '../contexts/useTaskStore'
import { theme } from '../styles/global'
import {
  CardContainer,
  TitleText,
  InfoText,
  StatusBadge,
  StatusText,
  ActionContainer,
  ActionButton,
  ActionButtonText,
  SyncIndicator,
} from './styles/TaskCardStyles'

interface TaskCardProps {
  task: Task
  onEdit?: (task: Task) => void
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask } = useTaskStore()

  const handleDelete = () => {
    Alert.alert(
      STRINGS.ALERT.DELETE_TASK_TITLE,
      STRINGS.ALERT.DELETE_TASK_MESSAGE.replace('{title}', task.title),
      [
        { text: STRINGS.ALERT.CANCEL, style: 'cancel' },
        { 
          text: STRINGS.ALERT.DELETE, 
          style: 'destructive',
          onPress: () => deleteTask(task.id)
        }
      ]
    )
  }

  const handleEdit = () => {
    onEdit?.(task)
  }

  return (
    <CardContainer status={task.status}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TitleText style={{ flex: 1 }}>{task.title}</TitleText>
        {task.isSynced === false && (
          <SyncIndicator style={{ backgroundColor: theme.colors.error }} />
        )}
      </View>
      <StatusBadge status={task.status}>
        <StatusText>{taskUtils.getStatusLabel(task.status)}</StatusText>
      </StatusBadge>
      <InfoText>{STRINGS.TASK.RESPONSIBLE_LABEL} {task.responsible}</InfoText>
      
      <ActionContainer>
        <ActionButton onPress={handleEdit} style={{ backgroundColor: theme.colors.secondary }}>
          <ActionButtonText>{STRINGS.TASK.EDIT_BUTTON}</ActionButtonText>
        </ActionButton>
        <ActionButton onPress={handleDelete} style={{ backgroundColor: theme.colors.error }}>
          <ActionButtonText>{STRINGS.TASK.DELETE_BUTTON}</ActionButtonText>
        </ActionButton>
      </ActionContainer>
    </CardContainer>
  )
}