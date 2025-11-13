import apiClient from '../api'
import { CHILDREN, CHILDREN_BY_ID, type Child } from '@/data/children'

/**
 * Apadrinamientos (Sponsorships) Service
 * 
 * Handles child sponsorship operations through the backend gateway.
 * Endpoints assume the gateway routes to the apadrinamiento-service-huahuacuna microservice.
 * 
 * Features graceful fallback to local dataset when API is unavailable.
 */

export interface ApadrinamientosFilters {
  edadMin?: number
  edadMax?: number
  genero?: 'M' | 'F' | ''
  municipio?: string
  page?: number
  pageSize?: number
}

export interface ApadrinamientosResponse {
  items: Child[]
  total: number
  page: number
  pageSize: number
}

export interface ChildDetailResponse extends Child {
  historiaCompleta?: string
  necesidades?: string[]
}

/**
 * Get list of children available for sponsorship with optional filters
 * Falls back to local dataset if API fails
 * 
 * @param filters - Optional filters for the query
 * @returns List of children and pagination info
 */
export async function getApadrinamientos(
  filters: ApadrinamientosFilters = {}
): Promise<ApadrinamientosResponse> {
  try {
    // Build query parameters
    const params: Record<string, string | number> = {}
    if (filters.edadMin !== undefined) params.edadMin = filters.edadMin
    if (filters.edadMax !== undefined) params.edadMax = filters.edadMax
    if (filters.genero && filters.genero !== '') params.genero = filters.genero
    if (filters.municipio && filters.municipio !== 'all' && filters.municipio !== '') {
      params.municipio = filters.municipio
    }
    if (filters.page !== undefined) params.page = filters.page
    if (filters.pageSize !== undefined) params.pageSize = filters.pageSize

    const response = await apiClient.get<ApadrinamientosResponse>('/apadrinamientos', {
      params,
    })

    return response.data
  } catch (error) {
    console.warn('API unavailable, using local dataset fallback:', error)
    
    // Fallback to local dataset
    return getLocalApadrinamientos(filters)
  }
}

/**
 * Get detailed information about a specific child
 * Falls back to local dataset if API fails
 * 
 * @param id - Child ID
 * @returns Detailed child information
 */
export async function getApadrinamientoById(id: string): Promise<ChildDetailResponse | null> {
  try {
    const response = await apiClient.get<ChildDetailResponse>(`/apadrinamientos/${id}`)
    return response.data
  } catch (error) {
    console.warn('API unavailable, using local dataset fallback:', error)
    
    // Fallback to local dataset
    return getLocalChildById(id)
  }
}

/**
 * Local fallback: Filter children from local dataset
 */
function getLocalApadrinamientos(filters: ApadrinamientosFilters = {}): ApadrinamientosResponse {
  let filteredChildren = CHILDREN.filter((child) => {
    // Only show available children
    if (child.estado !== 'disponible') return false
    
    // Apply filters
    if (filters.edadMin !== undefined && child.edad < filters.edadMin) return false
    if (filters.edadMax !== undefined && child.edad > filters.edadMax) return false
    if (filters.genero && filters.genero !== '' && child.genero !== filters.genero) return false
    if (
      filters.municipio &&
      filters.municipio !== 'all' &&
      filters.municipio !== '' &&
      child.municipio !== filters.municipio
    ) {
      return false
    }
    
    return true
  })

  // Apply pagination
  const page = filters.page || 1
  const pageSize = filters.pageSize || 12
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedChildren = filteredChildren.slice(startIndex, endIndex)

  return {
    items: paginatedChildren,
    total: filteredChildren.length,
    page,
    pageSize,
  }
}

/**
 * Local fallback: Get child by ID with enriched data
 */
function getLocalChildById(id: string): ChildDetailResponse | null {
  const child = CHILDREN_BY_ID[id]
  if (!child) return null

  // Enrich with additional details
  return {
    ...child,
    historiaCompleta:
      `Esta es la historia de ${child.nombre}. Proviene de ${child.municipio} y sueña con un futuro mejor. ` +
      `Gracias al programa de apadrinamiento, puede continuar desarrollando sus habilidades y estudios.`,
    necesidades: [
      'Matrícula y útiles escolares',
      'Uniforme y calzado escolar',
      'Apoyo nutricional',
    ],
  }
}
