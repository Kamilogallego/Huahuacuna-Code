import apiClient from "../api"

// 1. Crear conversación
// POST /chat/conversations, Body: { sponsorshipId }
export interface CreateConversationDto {
  sponsorshipId: number
}

export interface Conversation {
  id: number
  [key: string]: unknown
}

export async function createConversation(
  dto: CreateConversationDto,
): Promise<Conversation> {
  const response = await apiClient.post<Conversation>("/chat/conversations", dto)
  return response.data
}

// 2. Enviar mensaje
// POST /chat/messages, Body: { conversationId, content }
export interface SendMessageDto {
  conversationId: number
  content: string
}

export interface Message {
  id: number
  [key: string]: unknown
}

export async function sendMessage(dto: SendMessageDto): Promise<Message> {
  const response = await apiClient.post<Message>("/chat/messages", dto)
  return response.data
}

// 3. Obtener mensajes de una conversación
// GET /chat/conversations/:conversationId/messages
export interface GetMessagesParams {
  conversationId: number
  page?: number
  limit?: number
}

export interface PaginatedMessages {
  data: Message[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export async function getMessages(
  params: GetMessagesParams,
): Promise<PaginatedMessages> {
  const { conversationId, ...query } = params
  const response = await apiClient.get<PaginatedMessages>(
    `/chat/conversations/${conversationId}/messages`,
    { params: query },
  )
  return response.data
}

// 4. Obtener conversaciones
// GET /chat/conversations, Query: page, limit
export interface GetMyConversationsParams {
  page?: number
  limit?: number
}

export interface ConversationListItem extends Conversation {}

export interface PaginatedConversations {
  data: ConversationListItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export async function getMyConversations(
  params: GetMyConversationsParams = {},
): Promise<PaginatedConversations> {
  const response = await apiClient.get<PaginatedConversations>(
    "/chat/conversations",
    { params },
  )
  return response.data
}

// 5. Marcar mensajes como leídos
// POST /chat/conversations/:conversationId/read
export interface MarkAsReadDto {
  conversationId: number
}

export interface MarkAsReadResponse {
  count: number
}

export async function markMessagesAsRead(
  dto: MarkAsReadDto,
): Promise<MarkAsReadResponse> {
  const response = await apiClient.post<MarkAsReadResponse>(
    `/chat/conversations/${dto.conversationId}/read`,
    {},
  )
  return response.data
}

// 6. Obtener conteo de mensajes no leídos
// GET /chat/unread-count
export interface GetUnreadCountParams {
  userId: number
  conversationId?: number
}

export interface UnreadCountResponse {
  count: number
}

export async function getUnreadCount(
  params: GetUnreadCountParams,
): Promise<UnreadCountResponse> {
  const response = await apiClient.get<UnreadCountResponse>(
    "/chat/unread-count",
    { params },
  )
  return response.data
}
