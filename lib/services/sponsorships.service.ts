import apiClient from "../api"

// 1. Crear solicitud de apadrinamiento
// POST /sponsorships/requests
// Body oficial: { childId, reason }
// El padrino se infiere del token en el backend
export interface CreateSponsorshipRequestDto {
  childId: number
  reason: string
}

export interface SponsorshipRequestResponse {
  id: number
  [key: string]: unknown
}

export async function createSponsorshipRequest(
  dto: CreateSponsorshipRequestDto
): Promise<SponsorshipRequestResponse> {
  const payload = {
    childId: dto.childId,
    reason: dto.reason,
  }

  const response = await apiClient.post<SponsorshipRequestResponse>(
    "/sponsorships/requests",
    payload,
  )
  return response.data
}

// 2. Aprobar solicitud de apadrinamiento
export interface ApproveSponsorshipRequestDto {
  requestId: number
  reviewerId: number
}

export async function approveSponsorshipRequest(
  dto: ApproveSponsorshipRequestDto
): Promise<void> {
  await apiClient.post("/sponsorships/requests/approve", dto)
}

// 3. Rechazar solicitud de apadrinamiento
export interface RejectSponsorshipRequestDto {
  requestId: number
  reviewerId: number
  rejectionReason: string
}

export async function rejectSponsorshipRequest(
  dto: RejectSponsorshipRequestDto
): Promise<void> {
  await apiClient.post("/sponsorships/requests/reject", dto)
}

// 4. Obtener solicitudes pendientes
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PendingSponsorshipRequest {
  id: number
  [key: string]: unknown
}

export async function getPendingSponsorshipRequests(
  params: PaginationParams = {},
): Promise<PaginatedResponse<PendingSponsorshipRequest>> {
  const response = await apiClient.get<PaginatedResponse<PendingSponsorshipRequest>>(
    "/sponsorships/requests/pending",
    { params },
  )
  return response.data
}

// 5. Obtener mis apadrinamientos
export interface GetMySponsorshipsParams extends PaginationParams {
  padrinoId: number
  activeOnly?: boolean
}

export interface SponsorshipItem {
  id: number
  [key: string]: unknown
}

export async function getMySponsorships(
  params: GetMySponsorshipsParams,
): Promise<PaginatedResponse<SponsorshipItem>> {
  const response = await apiClient.get<PaginatedResponse<SponsorshipItem>>(
    "/sponsorships/my",
    { params },
  )
  return response.data
}

// 6. Obtener detalles de apadrinamiento
// GET /sponsorships/:id
export interface SponsorshipDetails {
  id: number
  [key: string]: unknown
}

export async function getSponsorshipDetails(
  sponsorshipId: number,
): Promise<SponsorshipDetails> {
  const response = await apiClient.get<SponsorshipDetails>(
    `/sponsorships/${sponsorshipId}`,
  )
  return response.data
}

// 7. Cancelar apadrinamiento
// POST /sponsorships/:id/cancel
export interface CancelSponsorshipDto {
  sponsorshipId: number
  cancellationReason: string
}

export async function cancelSponsorship(dto: CancelSponsorshipDto): Promise<void> {
  await apiClient.post(
    `/sponsorships/${dto.sponsorshipId}/cancel`,
    { cancellationReason: dto.cancellationReason },
  )
}

// 8. Obtener historial de apadrinamientos (admin)
export async function getSponsorshipHistory(
  params: PaginationParams = {},
): Promise<PaginatedResponse<SponsorshipItem>> {
  const response = await apiClient.get<PaginatedResponse<SponsorshipItem>>(
    "/sponsorships/history",
    { params },
  )
  return response.data
}
