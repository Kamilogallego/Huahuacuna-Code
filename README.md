# Fundación Huahuacuna – Frontend (Next.js 14 + TS)

Proyecto frontend para la Fundación Huahuacuna, con páginas públicas, formularios y panel de administración simulado (mock, sin backend).

## Stack
- Next.js 14 (App Router)
- TypeScript
- **Tailwind CSS** (migrado desde funda-funda)
- **shadcn/ui** components
- Iconos: lucide-react
- Notificaciones: react-hot-toast, sonner
- Estado: React Hooks (useState, useEffect)
- Formularios: react-hook-form + zod

## Iniciar

```bash
npm i    # o pnpm i / yarn
npm run dev  # abre http://localhost:3000
```

Build y producción:
```bash
npm run build
npm start
```

## Variables de Entorno

Copia `.env.example` a `.env.local` y configura las variables necesarias:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores. La aplicación funciona sin variables de entorno configuradas (usa datos mock).

## Estructura

```
app/
├── layout.tsx
├── page.tsx
├── globals.css (con Tailwind directives)
├── apadrinar/page.tsx
├── apadrinamientos/
│   ├── page.tsx
│   └── [id]/page.tsx
├── chat/[childId]/page.tsx
├── dashboard/page.tsx
├── donar/page.tsx
├── login/page.tsx
├── recuperar-password/page.tsx
├── padrino/
│   ├── dashboard/page.tsx
│   ├── catalogo/
│   └── apadrinamientos/
└── admin/
    ├── layout.tsx
    ├── page.tsx
    ├── solicitudes/page.tsx
    ├── donaciones/page.tsx
    ├── apadrinamientos/page.tsx
    ├── ninos/page.tsx
    └── usuarios/page.tsx

components/
├── Navbar.tsx (+ Navbar.module.css)
├── Footer.tsx
├── Button.tsx (wrapper para compatibilidad)
├── Badge.tsx (wrapper para compatibilidad)
├── Card.tsx
├── Input.tsx
├── Textarea.tsx
├── Table.tsx
├── Modal.tsx
├── TabsWrapper.tsx
├── auth-header.tsx
├── theme-provider.tsx
├── ui/ (60+ shadcn/ui components)
│   ├── accordion.tsx
│   ├── alert-dialog.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── switch.tsx
│   ├── tabs.tsx
│   └── ... (y muchos más)
├── admin/Sidebar.tsx
└── padrino/
    ├── ApadrinadoCard.tsx
    └── ChildCard.tsx

hooks/
├── use-mobile.tsx
└── use-toast.ts

styles/
├── variables.css
└── utils.css

lib/
├── mockData.ts
├── childrenMock.ts
├── apadrinamientosMock.ts
└── utils.ts (cn function)

public/images/
└── (24 imágenes de Colombia, logos, placeholders)
```

## Credenciales de prueba
```
Admin: admin@huahuacuna.org / admin123
Padrino: padrino@test.com / padrino123
```

- Admin redirige a /admin
- Padrino redirige a /padrino/dashboard

## Notas
- Formularios hacen console.log y muestran toasts de éxito.
- CRUD en panel admin es en memoria (se pierde al recargar).
- Diseño responsive, con gradientes y tarjetas limpias.

## Migración desde funda-funda

Este proyecto ha sido migrado desde el repositorio `funda-funda` con los siguientes cambios:

### ✅ Cambios Realizados

1. **Tailwind CSS integrado**: Aunque el proyecto original no usaba Tailwind, se agregó para soportar los componentes shadcn/ui de funda-funda.
   - Configuración completa en `tailwind.config.ts`
   - Colores de marca preservados: Golden Yellow (#f6c344), Warm Red (#c33b2a), Hope Green (#5ca244), Huahuacuna Blue (#1c4e9a)
   - Dark mode configurado

2. **Componentes shadcn/ui**: Se migraron 60+ componentes de shadcn/ui desde funda-funda a `components/ui/`:
   - Accordion, Alert Dialog, Avatar, Badge, Button, Card, Checkbox, Dialog, Input, Select, Switch, Tabs, y muchos más
   - Todos basados en Radix UI con estilos Tailwind

3. **Assets migrados**: 24 imágenes colombianas temáticas copiadas a `public/images/`

4. **Componentes de compatibilidad**: 
   - `Badge.tsx` wrapper para mantener compatibilidad con la API antigua
   - `TabsWrapper.tsx` para páginas que usan la API de tabs personalizada

5. **Hooks organizados**: `use-mobile` y `use-toast` movidos a `hooks/`

6. **TypeScript paths actualizados**: Se agregó `@/*`, `@hooks/*` para mejor organización

### 🔧 Configuración Requerida

- **Node.js**: 18.x o superior recomendado
- **Package Manager**: npm, pnpm, o yarn

### 🎨 Colores de Marca

Los colores de la Fundación Huahuacuna están definidos en `tailwind.config.ts`:
- `golden-yellow`: #f6c344 - Amarillo dorado
- `warm-red`: #c33b2a - Rojo cálido
- `hope-green`: #5ca244 - Verde esperanza
- `huahuacuna-blue`: #1c4e9a - Azul Huahuacuna

### 📝 Próximos Pasos

- [ ] Implementar autenticación real con NextAuth
- [ ] Conectar a backend API
- [ ] Implementar pasarela de pagos para donaciones
- [ ] Agregar tests unitarios y e2e
- [ ] Configurar CI/CD

## Licencia
Uso interno de la Fundación.