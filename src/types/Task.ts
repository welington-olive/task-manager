export type Task = {
  id: number
  title: string
  status: string
  responsible: string
  completed?: boolean
  isSynced?: boolean
  createdAt?: string
  updatedAt?: string
}