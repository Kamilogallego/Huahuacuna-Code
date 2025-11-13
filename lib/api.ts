import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

/**
 * API Client for Huahuacuna Backend Services
 * 
 * This client handles communication with the backend gateway.
 * - In the browser: uses '/api' path which is rewritten to the gateway URL by Next.js
 * - On the server (SSR): uses the full gateway URL from NEXT_PUBLIC_API_URL
 * - Supports cookie-based auth with withCredentials
 * - Automatically adds JWT token from localStorage if available
 */

// Determine the base URL based on environment
function getBaseURL(): string {
  // Server-side: use the full gateway URL
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
  }
  
  // Client-side: use '/api' which will be proxied by Next.js rewrites
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
