import axios from 'axios'
import { appConfig } from '../config/appConfig'

export const api = axios.create({
  baseURL: appConfig.api.baseURL,
  timeout: appConfig.api.timeout,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any request headers or authentication here
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors here
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)