# Fundación Huahuacuna – Frontend (Next.js 14 + TS)

Proyecto frontend para la Fundación Huahuacuna, con páginas públicas, formularios y panel de administración simulado (mock, sin backend).

## Stack
- Next.js 14 (App Router)
- TypeScript
- CSS (variables + CSS Modules/utilitarias propias)
- Iconos: lucide-react
- Notificaciones: react-hot-toast
- Estado: React Hooks (useState, useEffect)

> Importante: No se usa Tailwind. No se usa localStorage/sessionStorage. Sin librerías de UI.

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

## Estructura

```
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── apadrinar/page.tsx
├── donar/page.tsx
├── login/page.tsx
├── recuperar-password/page.tsx
├── padrino/dashboard/page.tsx
└── admin/
    ├── layout.tsx
    ├── page.tsx
    ├── solicitudes/page.tsx
    ├── donaciones/page.tsx
    ├── ninos/page.tsx
    └── usuarios/page.tsx

components/
├── Navbar.tsx (+ Navbar.module.css)
├── Footer.tsx
├── Button.tsx
├── Card.tsx
├── Input.tsx
├── Textarea.tsx
├── Table.tsx
├── Modal.tsx
├── ui/Badge.tsx
└── admin/Sidebar.tsx

styles/
├── variables.css
└── utils.css

lib/
└── mockData.ts
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

## Licencia
Uso interno de la Fundación.