import { env } from '@/env'
import axios from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data.message || 'Erro inesperado'
    toast.error(message)

    return Promise.reject(error)
  }
)