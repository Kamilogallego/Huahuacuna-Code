import apiClient from "../api"

// 1. Crear conversación
export interface CreateConversationDto {
  sponsorshipId: number
  padrinoId: number
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
export interface SendMessageDto {
  conversationId: number
  senderId: number
  content: string
  senderRole: string
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
export interface GetMessagesParams {
  conversationId: number
  userId: number
  userRole: string
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
  const response = await apiClient.get<PaginatedMessages>("/chat/messages", { params })
  return response.data
}

// 4. Obtener mis conversaciones
export interface GetMyConversationsParams {
  userId: number
  userRole: string
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
  params: GetMyConversationsParams,
): Promise<PaginatedConversations> {
  const response = await apiClient.get<PaginatedConversations>(
    "/chat/my-conversations",
    { params },
  )
  return response.data
}

// 5. Marcar mensajes como leídos
export interface MarkAsReadDto {
  conversationId: number
  userId: number
  userRole: string
}

export interface MarkAsReadResponse {
  count: number
}

export async function markMessagesAsRead(
  dto: MarkAsReadDto,
): Promise<MarkAsReadResponse> {
  const response = await apiClient.post<MarkAsReadResponse>(
    "/chat/mark-as-read",
    dto,
  )
  return response.data
}

// 6. Obtener conteo de mensajes no leídos
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
