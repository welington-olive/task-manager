import { fileStorage } from '../services/fileStorage'
import { Task } from '../types/Task'

// Dados iniciais do db.json
const initialData: Task[] = [
  {
    title: "Study React Native",
    status: "pending",
    responsible: "John",
    id: 1
  }
]

export const migrateData = {
  /**
   * Migra dados do db.json original para o novo sistema de arquivos
   */
  async migrateFromDbJson(): Promise<void> {
    try {
      console.log('Iniciando migração de dados...')
      
      // Verifica se já existem dados no novo sistema
      const existingTasks = await fileStorage.getAllTasks()
      
      if (existingTasks.length === 0) {
        console.log('Nenhum dado encontrado, importando dados iniciais...')
        
        // Importa os dados iniciais
        for (const task of initialData) {
          await fileStorage.createTask({
            title: task.title,
            status: task.status,
            responsible: task.responsible
          })
        }
        
        console.log(`Migração concluída: ${initialData.length} tarefas importadas`)
      } else {
        console.log(`Dados já existem no sistema: ${existingTasks.length} tarefas encontradas`)
      }
    } catch (error) {
      console.error('Erro durante a migração:', error)
      throw error
    }
  },

  /**
   * Exporta dados do sistema de arquivos para um formato JSON
   */
  async exportToJson(): Promise<string> {
    try {
      const tasks = await fileStorage.getAllTasks()
      const exportData = {
        tasks: tasks,
        exportedAt: new Date().toISOString(),
        totalTasks: tasks.length
      }
      
      return JSON.stringify(exportData, null, 2)
    } catch (error) {
      console.error('Erro ao exportar dados:', error)
      throw error
    }
  },

  /**
   * Importa dados de um JSON para o sistema de arquivos
   */
  async importFromJson(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData)
      
      if (!data.tasks || !Array.isArray(data.tasks)) {
        throw new Error('Formato JSON inválido: campo "tasks" não encontrado ou não é um array')
      }
      
      // Limpa dados existentes
      await fileStorage.clearAllTasks()
      
      // Importa novos dados
      for (const task of data.tasks) {
        if (task.title && task.status && task.responsible) {
          await fileStorage.createTask({
            title: task.title,
            status: task.status,
            responsible: task.responsible
          })
        }
      }
      
      console.log(`Importação concluída: ${data.tasks.length} tarefas importadas`)
    } catch (error) {
      console.error('Erro ao importar dados:', error)
      throw error
    }
  },

  /**
   * Verifica se a migração é necessária
   */
  async needsMigration(): Promise<boolean> {
    try {
      const tasks = await fileStorage.getAllTasks()
      return tasks.length === 0
    } catch (error) {
      console.error('Erro ao verificar necessidade de migração:', error)
      return true
    }
  }
} 