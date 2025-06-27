import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { taskService } from '../services/api'
import { migrateData } from '../utils/migrateData'
import styled from 'styled-components/native'

const Container = styled.View`
  padding: 16px;
  background-color: #f5f5f5;
  margin: 8px;
  border-radius: 8px;
`

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
`

const InfoText = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`

const Button = styled.TouchableOpacity`
  background-color: #007AFF;
  padding: 12px 16px;
  border-radius: 6px;
  margin: 8px 0;
  align-items: center;
`

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 14px;
`

const DangerButton = styled.TouchableOpacity`
  background-color: #FF3B30;
  padding: 12px 16px;
  border-radius: 6px;
  margin: 8px 0;
  align-items: center;
`

const Section = styled.View`
  margin-bottom: 16px;
`

export const DatabaseInfo: React.FC = () => {
  const [dbInfo, setDbInfo] = useState<any>(null)
  const [taskCount, setTaskCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const loadInfo = async () => {
    try {
      setIsLoading(true)
      const info = await taskService.getDatabaseInfo()
      const tasks = await taskService.getAll()
      setDbInfo(info)
      setTaskCount(tasks.length)
    } catch (error) {
      console.error('Error loading database info:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadInfo()
  }, [])

  const handleMigrateData = async () => {
    try {
      setIsLoading(true)
      await migrateData.migrateFromDbJson()
      await loadInfo()
      Alert.alert('Sucesso', 'Dados migrados com sucesso!')
    } catch (error) {
      Alert.alert('Erro', 'Erro ao migrar dados')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = async () => {
    try {
      setIsLoading(true)
      const jsonData = await migrateData.exportToJson()
      Alert.alert('Dados Exportados', jsonData)
    } catch (error) {
      Alert.alert('Erro', 'Erro ao exportar dados')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearAll = async () => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja apagar todas as tarefas? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true)
              await taskService.clearAll()
              await loadInfo()
              Alert.alert('Sucesso', 'Todas as tarefas foram apagadas!')
            } catch (error) {
              Alert.alert('Erro', 'Erro ao apagar tarefas')
            } finally {
              setIsLoading(false)
            }
          }
        }
      ]
    )
  }

  return (
    <ScrollView>
      <Container>
        <Title>Informações do Banco de Dados</Title>
        
        <Section>
          <InfoText>Status: {isLoading ? 'Carregando...' : 'Pronto'}</InfoText>
          <InfoText>Arquivo existe: {dbInfo?.exists ? 'Sim' : 'Não'}</InfoText>
          <InfoText>Tamanho: {dbInfo?.size ? `${dbInfo.size} bytes` : 'N/A'}</InfoText>
          <InfoText>Total de tarefas: {taskCount}</InfoText>
        </Section>

        <Section>
          <Button onPress={loadInfo} disabled={isLoading}>
            <ButtonText>Atualizar Informações</ButtonText>
          </Button>
          
          <Button onPress={handleMigrateData} disabled={isLoading}>
            <ButtonText>Migrar Dados</ButtonText>
          </Button>
          
          <Button onPress={handleExportData} disabled={isLoading}>
            <ButtonText>Exportar Dados</ButtonText>
          </Button>
          
          <DangerButton onPress={handleClearAll} disabled={isLoading}>
            <ButtonText>Apagar Todas as Tarefas</ButtonText>
          </DangerButton>
        </Section>
      </Container>
    </ScrollView>
  )
} 