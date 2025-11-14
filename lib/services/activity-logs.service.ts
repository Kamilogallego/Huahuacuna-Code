import apiClient from "../api"

// 1. Crear registro de actividad
export type ActivityType =
  | "CHILD_UPDATE"
  | "SPONSORSHIP_CREATED"
  | "SPONSORSHIP_UPDATED"
  | "SPONSORSHIP_CANCELLED"
  | string

export interface CreateActivityLogDto {
  type: ActivityType
  title: string
  description: string
  childId?: number
  sponsorshipId?: number
  metadata?: Record<string, unknown>
  performedBy?: number
}

export interface ActivityLog {
  id: number
  [key: string]: unknown
}

export async function createActivityLog(
  dto: CreateActivityLogDto,
): Promise<ActivityLog> {
  const response = await apiClient.post<ActivityLog>("/activity-logs", dto)
  return response.data
}

// Paginación genérica
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedActivityLogs extends PaginationParams {
  data: ActivityLog[]
  total: number
  totalPages: number
}

// 2. Obtener actividades de un niño
export async function getActivityLogsByChild(
  childId: number,
  params: PaginationParams = {},
): Promise<PaginatedActivityLogs> {
  const response = await apiClient.get<PaginatedActivityLogs>(
    `/activity-logs/by-child/${childId}`,
    { params },
  )
  return response.data
}

// 3. Obtener actividades de un apadrinamiento
export interface GetActivityLogsBySponsorshipParams extends PaginationParams {
  userId: number
  userRole: string
}

export async function getActivityLogsBySponsorship(
  sponsorshipId: number,
  params: GetActivityLogsBySponsorshipParams,
): Promise<PaginatedActivityLogs> {
  const response = await apiClient.get<PaginatedActivityLogs>(
    `/activity-logs/by-sponsorship/${sponsorshipId}`,
    { params },
  )
  return response.data
}

// 4. Obtener actividades recientes
export interface GetRecentActivityLogsParams extends PaginationParams {
  type?: ActivityType
}

export async function getRecentActivityLogs(
  params: GetRecentActivityLogsParams = {},
): Promise<PaginatedActivityLogs> {
  const response = await apiClient.get<PaginatedActivityLogs>(
    "/activity-logs/recent",
    { params },
  )
  return response.data
}
