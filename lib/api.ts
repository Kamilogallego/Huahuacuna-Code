import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

/**
 * API Client for Huahuacuna Backend Services
 * 
 * This client handles communication with the backend gateway.
 * - Uses NEXT_PUBLIC_API_URL cuando está definida (tanto en cliente como en servidor)
 * - Si no está definida, en servidor usa 'http://localhost:8080' y en cliente '/api'
 * - Supports cookie-based auth with withCredentials
 * - Automatically adds JWT token from localStorage if available
 */

// Determine the base URL based on environment
function getBaseURL(): string {
  const envBase = process.env.NEXT_PUBLIC_API_URL

  // If we have an explicit gateway URL, always use it
  if (envBase && envBase.length > 0) {
    return envBase
  }

  // Fallbacks when NEXT_PUBLIC_API_URL is not set
  if (typeof window === 'undefined') {
    // Server-side default
    return 'http://localhost:8080'
  }

  // Client-side default: rely on Next.js rewrites for '/api'
  return '/api'
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // Enable cookies for session-based auth
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
})

// Request interceptor to add JWT token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem('authToken')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (error) {
        // Silently fail if localStorage is not available
        console.warn('Failed to access localStorage:', error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      
      if (status === 401) {
        // Unauthorized - clear auth token
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('authToken')
            localStorage.removeItem('userEmail')
          } catch (e) {
            // Silently fail
          }
        }
      }
    } else if (error.request) {
      // Request made but no response - API might be down
      console.warn('API request failed - no response received:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default apiClient
