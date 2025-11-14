import apiClient from "../api"

export type Gender = "MALE" | "FEMALE"

export interface CreateChildDto {
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: Gender
  municipality: string
  shortDescription: string
  fullStory: string
  ethnicity?: string
  specialCondition?: string
  address?: string
  photo?: string
  photos?: string[]
}

export interface CreateChildPayload {
  dto: CreateChildDto
  userId: number
}

// Ajustable según lo que devuelva el backend; garantizamos al menos un id numérico
export interface CreateChildResponse {
  id: number
  [key: string]: unknown
}

/**
 * Crear niño a través del gateway.
 * Usa el cliente axios global (apiClient), que en cliente golpea `/api` y en SSR el gateway real.
 */
export async function createChild(
  dto: CreateChildDto,
  userId: number
): Promise<CreateChildResponse> {
  const payload: CreateChildPayload = { dto, userId }

  try {
    const response = await apiClient.post<CreateChildResponse>("/children", payload)
    return response.data
  } catch (error: any) {
    const message =
      error?.response?.data?.message ??
      error?.message ??
      "Error al crear el niño en el servidor."
    throw new Error(message)
  }
}

// 2. Obtener niños disponibles
export interface PaginatedChildrenResponse<TChild = unknown> {
  data: TChild[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface GetAvailableChildrenParams {
  page?: number
  limit?: number
}

export async function getAvailableChildren(
  params: GetAvailableChildrenParams = {}
): Promise<PaginatedChildrenResponse> {
  const response = await apiClient.get<PaginatedChildrenResponse>("/children/available", {
    params,
  })
  return response.data
}

// 3. Filtrar niños
export interface FilterChildrenParams {
  gender?: Gender
  minAge?: number
  maxAge?: number
  municipality?: string
  page?: number
  limit?: number
}

export async function filterChildren(
  params: FilterChildrenParams = {}
): Promise<PaginatedChildrenResponse> {
  const response = await apiClient.get<PaginatedChildrenResponse>("/children/filter", {
    params,
  })
  return response.data
}

// 4. Obtener todos los niños
export interface GetAllChildrenParams {
  page?: number
  limit?: number
}

export async function getAllChildren(
  params: GetAllChildrenParams = {}
): Promise<PaginatedChildrenResponse> {
  const response = await apiClient.get<PaginatedChildrenResponse>("/children", {
    params,
  })
  return response.data
}

// 5. Obtener niño por ID
export async function getChildById<TChild = unknown>(id: number | string): Promise<TChild> {
  const response = await apiClient.get<TChild>(`/children/${id}`)
  return response.data
}

// 6. Actualizar niño
export type UpdateChildDto = Partial<CreateChildDto>

export interface UpdateChildPayload {
  id: number
  dto: UpdateChildDto
}

export async function updateChild(id: number, dto: UpdateChildDto): Promise<void> {
  const payload: UpdateChildPayload = { id, dto }
  await apiClient.patch(`/children/${id}`, payload)
}

// 7. Eliminar niño
export interface DeleteChildResponse {
  success: boolean
}

export async function deleteChild(id: number): Promise<DeleteChildResponse> {
  const response = await apiClient.delete<DeleteChildResponse>(`/children/${id}`)
  return response.data
}
