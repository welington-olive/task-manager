import { z } from 'zod'
import { STRINGS } from '../constants/strings'

export const taskSchema = z.object({
  title: z.string().min(1, STRINGS.VALIDATION.TITLE_REQUIRED),
  status: z.enum(['pending', 'completed']),
  responsible: z.string().min(1, STRINGS.VALIDATION.RESPONSIBLE_REQUIRED),
})