import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { useNetworkStatus } from '../hooks/useNetworkStatus'
import { useTaskStore } from '../contexts/useTaskStore'
import { theme } from '../styles/global'
import { STRINGS } from '../constants/strings'
import styled from 'styled-components/native'

const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.sm}px ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`

const StatusText = styled.Text`
  font-size: ${theme.fontSize.small}px;
  font-weight: ${theme.fontWeight.medium};
`

const SyncButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.sm}px;
`

const SyncButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.small}px;
  font-weight: ${theme.fontWeight.semibold};
`

const StatusIndicator = styled.View<{ isOnline: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${props => props.isOnline ? theme.colors.success : theme.colors.error};
  margin-right: ${theme.spacing.xs}px;
`

export function NetworkStatus() {
  const { isOnline } = useNetworkStatus()
  const { hasOfflineData, syncOfflineData, isLoading } = useTaskStore()

  const handleSync = () => {
    if (!isOnline) {
      Alert.alert(
        STRINGS.NETWORK.NO_CONNECTION,
        STRINGS.NETWORK.NO_CONNECTION_MESSAGE,
        [{ text: 'OK' }]
      )
      return
    }

    Alert.alert(
      STRINGS.NETWORK.SYNC_CONFIRMATION,
      STRINGS.NETWORK.SYNC_CONFIRMATION_MESSAGE,
      [
        { text: STRINGS.NETWORK.SYNC_CANCEL, style: 'cancel' },
        { 
          text: STRINGS.NETWORK.SYNC_CONFIRM, 
          onPress: () => syncOfflineData()
        }
      ]
    )
  }

  const onlineStatus = isOnline ?? false

  return (
    <StatusContainer>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <StatusIndicator isOnline={onlineStatus} />
        <StatusText style={{ color: onlineStatus ? theme.colors.success : theme.colors.error }}>
          {onlineStatus ? STRINGS.NETWORK.ONLINE : STRINGS.NETWORK.OFFLINE}
        </StatusText>
      </View>
      
      {hasOfflineData && onlineStatus && (
        <SyncButton onPress={handleSync} disabled={isLoading}>
          <SyncButtonText>
            {isLoading ? STRINGS.NETWORK.SYNCING : STRINGS.NETWORK.SYNC_BUTTON}
          </SyncButtonText>
        </SyncButton>
      )}
      
      {hasOfflineData && !onlineStatus && (
        <StatusText style={{ color: theme.colors.warning }}>
          {STRINGS.NETWORK.PENDING_TASKS}
        </StatusText>
      )}
    </StatusContainer>
  )
} 