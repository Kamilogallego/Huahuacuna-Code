import apiClient from '../api'

/**
 * Authentication Service
 * 
 * Handles authentication operations through the backend gateway.
 * Endpoints assume the gateway routes to the auth-service-huahuacuna microservice.
 */

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token?: string
  user?: {
    id: string
    email: string
    role?: string
    name?: string
  }
  message?: string
}

export interface SessionResponse {
  user: {
    id: string
    email: string
    role?: string
    name?: string
  }
  authenticated: boolean
}

export interface LogoutResponse {
  message: string
}

/**
 * Login user with email and password
 * 
 * @param credentials - User email and password
 * @returns Login response with user data and optional JWT token
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
  
  // If JWT token is returned, store it in localStorage
  if (response.data.access_token && typeof window !== 'undefined') {
    try {
      localStorage.setItem('authToken', response.data.access_token)
      if (response.data.user?.email) {
        localStorage.setItem('userEmail', response.data.user.email)
      }
      if (response.data.user?.role) {
        localStorage.setItem('userRole', response.data.user.role)
      }
    } catch (error) {
      console.warn('Failed to store auth data:', error)
    }
  }
  
  return response.data
}

/**
 * Logout current user
 * 
 * @returns Logout confirmation
 */
export async function logout(): Promise<LogoutResponse> {
  const response = await apiClient.post<LogoutResponse>('/auth/logout')
  
  // Clear local auth data
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userRole')
    } catch (error) {
      console.warn('Failed to clear auth data:', error)
    }
  }
  
  return response.data
}

/**
 * Get current session/user information
 * 
 * @returns Current session data
 */
export async function getSession(): Promise<SessionResponse> {
  const response = await apiClient.get<SessionResponse>('/auth/session')
  return response.data
}
