# Documentación Frontend Huahuacuna

Este documento describe cómo está estructurado el frontend de Huahuacuna, cómo se conecta con el Client Gateway y dónde se encuentran los servicios que consumen cada módulo (Auth, Children, Sponsorships, Chat, Activity Logs).

## 1. Arquitectura general

- **Framework**: Next.js 16 (App Router, carpeta `app/`).
- **Lenguaje**: TypeScript + React.
- **UI**:
  - Componentes en `components/` (Shadcn UI + Radix UI).
  - Hooks de UI en `hooks/` (`use-mobile`, `use-toast`).
- **Datos / API**:
  - Cliente HTTP común: `lib/api.ts` (axios).
  - Servicios por dominio en `lib/services/`:
    - `auth.service.ts`
    - `children.service.ts`
    - `sponsorships.service.ts`
    - `chat.service.ts`
    - `activity-logs.service.ts`
- **Mocks / datos locales**:
  - `data/children.ts` (lista de niños demo).
  - `lib/childrenMock.ts`, `lib/apadrinamientosMock.ts` (datos de ejemplo).

El flujo típico es:

`app/...` (páginas) → `lib/services/...` (servicios) → `lib/api.ts` (cliente HTTP) → Client Gateway Huahuacuna

---

## 2. Configuración de API y variables de entorno

### 2.1. NEXT_PUBLIC_API_URL

En `.env.example` ya existe:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

En desarrollo, debes copiar este archivo a `.env.local` y ajustar la URL según dónde corre el **Client Gateway Huahuacuna**.

### 2.2. Cliente HTTP (`lib/api.ts`)

`lib/api.ts` exporta `apiClient` (axios) con una base URL dinámica:

- Si `NEXT_PUBLIC_API_URL` está definida (p.ej. `http://localhost:4000`):
  - Todas las llamadas se hacen contra `http://localhost:4000/...`.
- Si no está definida:
  - En servidor (SSR): `http://localhost:8080`.
  - En cliente: `/api` (usando rewrites de Next.js definidos en `next.config.mjs`).

Además:

- `withCredentials: true` → permite cookies si el backend las usa.
- Interceptor de request → añade `Authorization: Bearer <authToken>` desde `localStorage` si existe.
- Interceptor de response → en `401` limpia `authToken` y `userEmail`.

---

## 3. Servicios de dominio (`lib/services/...`)

### 3.1. Autenticación (Auth) – `lib/services/auth.service.ts`

Modela los 11 endpoints del módulo de autenticación:

- **POST /auth/login** → `login(credentials: LoginRequest)`
  - Body: `{ email, password }`.
  - Si el backend devuelve `access_token` y `user`, guarda en `localStorage`:
    - `authToken`
    - `userEmail`
    - `userRole`
    - `userId`
- **POST /auth/register** → `register(data: RegisterRequest)`
  - Registro de padrinos.
- **POST /auth/verify-email** → `verifyEmail({ token })`
- **POST /auth/password/request-reset** → `requestPasswordReset({ email })`
- **POST /auth/password/reset** → `resetPassword({ token, newPassword })`
- **POST /auth/refresh** → `refreshToken({ refreshToken })`
- **POST /auth/logout** → `logout({ refreshToken })`
  - Limpia `authToken`, `userEmail`, `userRole`, `userId` del `localStorage`.
- **GET /auth/profile** → `getProfile()`
- **PATCH /auth/profile** → `updateProfile({ phone?, address?, avatar? })`
- **POST /auth/admins** → `createAdmin({ name, email, password, role })`
- **PATCH /auth/admins/:adminId** → `updateAdmin(adminId, { name?, status? })`
- Compat extra para código antiguo:
  - **GET /auth/session** → `getSession()`

### 3.2. Niños (Children) – `lib/services/children.service.ts`

Endpoints del módulo Children:

- **POST /children** → `createChild(dto: CreateChildDto, userId: number)`
- **GET /children/available** → `getAvailableChildren({ page?, limit? })`
- **GET /children/filter** → `filterChildren({ gender?, minAge?, maxAge?, municipality?, page?, limit? })`
- **GET /children** → `getAllChildren({ page?, limit? })`
- **GET /children/:id** → `getChildById(id)`
- **PATCH /children/:id** → `updateChild(id, dto)`
- **DELETE /children/:id** → `deleteChild(id)`

`CreateChildDto` incluye campos como `firstName`, `lastName`, `dateOfBirth`, `gender`, `municipality`, `shortDescription`, `fullStory`, etc., con campos opcionales `ethnicity`, `specialCondition`, `address`, `photo`, `photos`.

### 3.3. Apadrinamientos (Sponsorships) – `lib/services/sponsorships.service.ts`

Endpoints del módulo Sponsorships:

- **POST /sponsorships/requests** → `createSponsorshipRequest({ childId, reason })`
  - `reason` es requerido según la doc (mín. 20 caracteres).
  - El padrino se infiere del token en el backend.
- **POST /sponsorships/requests/approve** → `approveSponsorshipRequest({ requestId, reviewerId })`
- **POST /sponsorships/requests/reject** → `rejectSponsorshipRequest({ requestId, reviewerId, rejectionReason })`
- **GET /sponsorships/requests/pending** → `getPendingSponsorshipRequests({ page?, limit? })`
- **GET /sponsorships/my** → `getMySponsorships({ padrinoId, page?, limit?, activeOnly? })`
- **GET /sponsorships/history** → `getSponsorshipHistory({ page?, limit? })`
- **GET /sponsorships/:id** → `getSponsorshipDetails(sponsorshipId)`
- **POST /sponsorships/:id/cancel** → `cancelSponsorship({ sponsorshipId, cancellationReason })`

### 3.4. Chat – `lib/services/chat.service.ts`

Endpoints del módulo Chat:

- **POST /chat/conversations** → `createConversation({ sponsorshipId })`
- **GET /chat/conversations** → `getMyConversations({ page?, limit? })`
- **GET /chat/conversations/:conversationId/messages** → `getMessages({ conversationId, page?, limit? })`
- **POST /chat/messages** → `sendMessage({ conversationId, content })`
- **POST /chat/conversations/:conversationId/read** → `markMessagesAsRead({ conversationId })`
- **GET /chat/unread-count** → `getUnreadCount({ userId, conversationId? })`

### 3.5. Activity Logs – `lib/services/activity-logs.service.ts`

Endpoints del módulo Bitácora de Actividades:

- **POST /activity-logs** → `createActivityLog({ type, title, description, childId?, sponsorshipId?, metadata? })`
- **GET /activity-logs/recent** → `getRecentActivityLogs({ page?, limit?, type? })`
- **GET /activity-logs/child/:childId** → `getActivityLogsByChild(childId, { page?, limit? })`
- **GET /activity-logs/sponsorship/:sponsorshipId** → `getActivityLogsBySponsorship(sponsorshipId, { page?, limit? })`

---

## 4. Páginas y flujos principales (`app/`)

### 4.1. Login – `app/login/page.tsx`

- Página cliente (`"use client"`).
- Usa `login` de `auth.service`.
- Flujo:
  1. Usuario ingresa `email` y `password`.
  2. `handleSubmit` valida que no estén vacíos.
  3. Llama a `login({ email, password })`.
  4. Según `response.user.role`:
     - `admin` / `ADMIN` → redirige a `/dashboard`.
     - `padrino` / `PADRINO` → redirige a `/perfil-apadrinador`.
     - Cualquier otro rol → redirige a `/dashboard`.
  5. Maneja errores (mensajes amigables y contador de intentos, bloqueando tras 5 fallos).

### 4.2. Dashboard – `app/dashboard/page.tsx`

- Requiere que `userEmail` exista en `localStorage`.
- `useEffect`:
  - Si `userEmail === "padrino@huahuacuna.org"` → redirige a `/perfil-apadrinador`.
  - Si no hay `userEmail` → redirige a `/login`.
- Muestra cards para:
  - Ver perfil (`/perfil`).
  - Historial de apadrinamientos (`/admin/apadrinamientos`).
  - Gestión de usuarios (`/admin/usuarios`).

### 4.3. Catálogo de niños – `app/apadrinamientos/page.tsx`

- Gate de rol: solo `userRole === "padrino"` puede ver el catálogo.
  - Si no es padrino → redirige a `/login?redirect=/apadrinamientos`.
- Filtros disponibles:
  - Edad mínima y máxima.
  - Género (Masculino/Femenino).
  - Municipio (derivado de `data/children.ts`).
- `useEffect`:
  - Llama a `filterChildren` con los filtros y la página actual.
  - Actualiza `children` (lista de niños) y `totalChildren`.
  - Muestra loading, grid de cards o mensaje de “no se encontraron niños”.
- Paginación basada en `ITEMS_PER_PAGE` y `totalChildren`.

### 4.4. Mis Apadrinamientos – `app/mis-apadrinamientos/page.tsx`

- Contiene un `MOCK_SPONSORED_CHILDREN` como datos iniciales.
- `useEffect`:
  - Intenta leer `userId` de `localStorage`.
  - Si existe, llama a `getMySponsorships({ padrinoId: userId, page: 1, limit: 50, activeOnly: true })`.
  - Mapea la respuesta a `SponsoredChild` (id, nombre, edad, municipio, foto, fechas).
  - Si el fetch falla o no hay datos, mantiene el mock, de modo que la UI no se rompe.
- UI: cards con foto, edad, municipio, botón "Ver Perfil" y botón de chat.

### 4.5. Admin – Crear Niño – `app/admin/children/page.tsx`

- Página sencilla de formulario para crear un niño:
  - Campos: `firstName`, `lastName`, `dateOfBirth`, `gender`, `municipality`, `shortDescription`, `fullStory`.
- `handleSubmit`:
  - Llama a `createChild(form, userId)` con `userId` fijo en `1` (para ajustar cuando se integre el perfil real).
  - Muestra el ID del niño creado o un error.
- Representa un panel admin que pega directo a `POST /children` usando el gateway.

---

## 5. Mocks y fallback

- **Children mocks**:
  - `data/children.ts` → se usa para mostrar un catálogo demo y para listar municipios.
- **Apadrinamientos mocks**:
  - `/mis-apadrinamientos` mantiene un mock de niños apadrinados y solo lo reemplaza con datos reales si la API responde bien.

Esto permite que el frontend se vea funcional incluso si el backend no está disponible, a la vez que los servicios ya están listos para consumir el Client Gateway real.

---

## 6. Resumen

- La lógica de llamadas a la API está centralizada en `lib/services/...`.
- `lib/api.ts` asegura que todas las llamadas vayan al gateway configurado en `NEXT_PUBLIC_API_URL`.
- Las páginas principales (`login`, `dashboard`, `apadrinamientos`, `mis-apadrinamientos`, `admin/children`) ya usan estos servicios, manteniendo los mocks para no romper la experiencia de usuario.

Para que todo funcione con datos reales, es necesario que el Client Gateway Huahuacuna:

1. Esté corriendo en la URL configurada en `NEXT_PUBLIC_API_URL`.
2. Exponga los endpoints descritos.
3. Tenga CORS habilitado para permitir peticiones desde `http://localhost:3000` (u origen donde corra el frontend).
