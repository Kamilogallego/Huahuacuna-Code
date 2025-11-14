import apiClient from '../api'

/**
 * Authentication Service
 * 
 * Handles authentication operations through the backend gateway.
 * Endpoints assume the gateway routes to the auth-service-huahuacuna microservice.
 */

// Tipos comunes
export interface AuthUser {
  id: string
  email: string
  role?: string
  name?: string
}

// LOGIN
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token?: string
  refresh_token?: string
  user?: AuthUser
  message?: string
}

// REGISTER
export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone: string
  documentId: string
  address: string
}

export interface RegisterResponse {
  message?: string
}

// VERIFY EMAIL
export interface VerifyEmailRequest {
  token: string
}

// PASSWORD RESET
export interface PasswordRequestResetRequest {
  email: string
}

export interface PasswordResetRequest {
  token: string
  newPassword: string
}

// REFRESH TOKEN
export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  access_token: string
  refresh_token?: string
}

// PROFILE
export interface ProfileResponse extends AuthUser {}

export interface UpdateProfileRequest {
  phone?: string
  address?: string
  avatar?: string
}

// ADMINS
export type AdminRole = 'ADMIN' | 'SUPER_ADMIN'

export interface CreateAdminRequest {
  name: string
  email: string
  password: string
  role: AdminRole
}

export interface UpdateAdminRequest {
  name?: string
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
}

// SESSION
export interface SessionResponse {
  user: AuthUser
  authenticated: boolean
}

// LOGOUT
export interface LogoutRequest {
  refreshToken: string
}

export interface LogoutResponse {
  message: string
}

/**
 * POST /auth/login
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
  
  // Si hay token, guardarlo en localStorage (manteniendo comportamiento actual)
  if (response.data.access_token && typeof window !== 'undefined') {
    try {
      localStorage.setItem('authToken', response.data.access_token)
      if (response.data.user?.email) {
        localStorage.setItem('userEmail', response.data.user.email)
      }
      if (response.data.user?.role) {
        localStorage.setItem('userRole', response.data.user.role)
      }
      if (response.data.user?.id) {
        localStorage.setItem('userId', response.data.user.id)
      }
    } catch (error) {
      console.warn('Failed to store auth data:', error)
    }
  }
  
  return response.data
}

/**
 * POST /auth/register
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>('/auth/register', data)
  return response.data
}

/**
 * POST /auth/verify-email
 */
export async function verifyEmail(payload: VerifyEmailRequest): Promise<void> {
  await apiClient.post('/auth/verify-email', payload)
}

/**
 * POST /auth/password/request-reset
 */
export async function requestPasswordReset(payload: PasswordRequestResetRequest): Promise<void> {
  await apiClient.post('/auth/password/request-reset', payload)
}

/**
 * POST /auth/password/reset
 */
export async function resetPassword(payload: PasswordResetRequest): Promise<void> {
  await apiClient.post('/auth/password/reset', payload)
}

/**
 * POST /auth/refresh
 */
export async function refreshToken(payload: RefreshTokenRequest): Promise<RefreshTokenResponse> {
  const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', payload)
  return response.data
}

/**
 * POST /auth/logout
 */
export async function logout(payload: LogoutRequest): Promise<LogoutResponse> {
  const response = await apiClient.post<LogoutResponse>('/auth/logout', payload)
  
  // Clear local auth data
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userId')
    } catch (error) {
      console.warn('Failed to clear auth data:', error)
    }
  }
  
  return response.data
}

/**
 * GET /auth/profile
 */
export async function getProfile(): Promise<ProfileResponse> {
  const response = await apiClient.get<ProfileResponse>('/auth/profile')
  return response.data
}

/**
 * PATCH /auth/profile
 */
export async function updateProfile(payload: UpdateProfileRequest): Promise<ProfileResponse> {
  const response = await apiClient.patch<ProfileResponse>('/auth/profile', payload)
  return response.data
}

/**
 * POST /auth/admins
 */
export async function createAdmin(payload: CreateAdminRequest): Promise<void> {
  await apiClient.post('/auth/admins', payload)
}

/**
 * PATCH /auth/admins/:adminId
 */
export async function updateAdmin(adminId: string, payload: UpdateAdminRequest): Promise<void> {
  await apiClient.patch(`/auth/admins/${adminId}`, payload)
}

/**
 * (Compat) GET /auth/session
 * Mantiene la API anterior para no romper código existente que use getSession.
 */
export async function getSession(): Promise<SessionResponse> {
  const response = await apiClient.get<SessionResponse>('/auth/session')
  return response.data
}
