import apiClient from "../api"

// 1. Crear registro de actividad
// POST /activity-logs
export type ActivityType =
  | 'SPONSORSHIP_STARTED'
  | 'SPONSORSHIP_ENDED'
  | 'CHAT_MESSAGE'
  | 'CHILD_UPDATE'
  | 'DONATION'
  | 'MILESTONE'
  | string

export interface CreateActivityLogDto {
  type: ActivityType
  title: string
  description: string
  childId?: number
  sponsorshipId?: number
  metadata?: Record<string, unknown>
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

export interface PaginatedActivityLogs {
  data: ActivityLog[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// 2. Obtener actividades de un niño
// GET /activity-logs/child/:childId
export async function getActivityLogsByChild(
  childId: number,
  params: PaginationParams = {},
): Promise<PaginatedActivityLogs> {
  const response = await apiClient.get<PaginatedActivityLogs>(
    `/activity-logs/child/${childId}`,
    { params },
  )
  return response.data
}

// 3. Obtener actividades de un apadrinamiento
// GET /activity-logs/sponsorship/:sponsorshipId
export async function getActivityLogsBySponsorship(
  sponsorshipId: number,
  params: PaginationParams = {},
): Promise<PaginatedActivityLogs> {
  const response = await apiClient.get<PaginatedActivityLogs>(
    `/activity-logs/sponsorship/${sponsorshipId}`,
    { params },
  )
  return response.data
}

// 4. Obtener actividades recientes
// GET /activity-logs/recent
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
