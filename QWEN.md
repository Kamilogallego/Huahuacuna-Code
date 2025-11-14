# Fundación Huahuacuna - Frontend Qwen Code Context

## Project Overview

This is a complete Next.js application for Fundación Huahuacuna, featuring public pages, forms, user authentication, and administration panel. The application is designed to support the foundation's mission of helping vulnerable children through sponsorship programs.

### Key Technologies
- **Framework**: Next.js 16.0.0 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom brand colors
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Hooks
- **Analytics**: Vercel Analytics
- **Theme**: next-themes (dark/light mode support)

### Brand Colors
- **Golden Yellow**: `#f6c344` - Warmth and hope
- **Warm Red**: `#c33b2a` - Passion and energy
- **Hope Green**: `#5ca244` - Growth and sustainability
- **Huahuacuna Blue**: `#1c4e9a` - Trust and stability
- **Deep Black**: `#1e1e1e` - Contrast and elegance
- **Pure White**: `#ffffff` - Clarity and purity

## Project Structure

```
Huahuacuna-Code/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles with Tailwind
│   ├── admin/               # Admin dashboard pages
│   ├── apadrinamientos/     # Sponsorship pages
│   ├── chat/                # Chat functionality
│   ├── dashboard/           # User dashboard
│   ├── login/               # Login page
│   ├── mis-apadrinamientos/ # My sponsorships
│   ├── perfil/              # User profile
│   ├── perfil-apadrinador/  # Sponsor profile
│   ├── recuperar-password/  # Password recovery
│   └── registro/            # Registration page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── auth-header.tsx      # Authentication header
│   ├── chat-notification-badge.tsx
│   └── theme-provider.tsx   # Theme context provider
├── hooks/                   # Custom React hooks
│   ├── use-mobile.ts        # Mobile detection hook
│   └── use-toast.ts         # Toast notifications hook
├── lib/                     # Utility functions
│   └── utils.ts             # Helper utilities (cn, etc.)
├── public/                  # Static assets (images, icons)
├── styles/                  # Additional CSS files (legacy)
├── components.json          # shadcn/ui configuration
├── next.config.mjs          # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint (currently configured to ignore during builds)

## Environment Configuration

The application uses the following environment variables (defined in `.env.example`):

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

This API URL is used for proxying `/api/*` requests to a backend service. In production, this should be configured to point to the actual backend gateway.

## Key Features

### Frontend Architecture
- Next.js 16.0.0 with App Router
- TypeScript 5 with strict type checking
- Tailwind CSS v4 with custom theme matching brand colors
- Responsive design with mobile-first approach
- Dark/light theme support using `next-themes`

### UI/UX Components
- Custom branded UI components using shadcn/ui and Radix UI
- Poppins font for headings, Nunito Sans for body text
- Consistent color scheme using the foundation's brand colors
- Responsive navigation with mobile support
- Form validation with React Hook Form and Zod

### Pages and Sections
- Landing page with foundation information and calls-to-action
- Sponsorship pages for supporting vulnerable children
- Donation system
- Volunteer opportunities
- User authentication (login/registration)
- User dashboard and profile management
- Admin panel for managing content
- Chat functionality for communication

### Development Notes

#### Windows/PowerShell Users
If you encounter issues on Windows:
1. **Node Modules Path Too Long**: Enable long path support or move the project to a shorter path (e.g., `C:\projects\huahuacuna`)
2. **OneDrive Sync Issues**: Don't place the project in OneDrive-synced folders. Use a local directory.
3. **Execution Policy**: If scripts fail to run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

#### Peer Dependencies
The project uses React 19, which is newer than some dependencies expect. The `--legacy-peer-deps` flag is used to bypass warnings, which is safe for this project.

#### API Proxying
The application rewrites `/api/*` routes to the configured `NEXT_PUBLIC_API_URL` to handle CORS in development.

## Development Conventions

### Coding Style
- Component-based architecture using React
- TypeScript for type safety
- Tailwind CSS for styling (no custom CSS files beyond globals.css)
- Shadcn/ui and Radix UI for component primitives
- Form validation with Zod schemas
- Custom hooks for reusable logic

### File Organization
- Pages and routes defined in the `app/` directory using the App Router
- Components organized in the `components/` directory with a `ui/` subdirectory for shadcn/ui components
- Utility functions in the `lib/` directory
- Custom hooks in the `hooks/` directory
- Static assets in the `public/` directory

### Naming Conventions
- PascalCase for React components
- camelCase for functions and variables
- kebab-case for file names
- Use descriptive names for components and functions

## Next Steps for Development

When working on this project, consider:
1. The backend integration for authentication and data operations
2. The proxy configuration in `next.config.mjs` for API requests
3. The custom brand colors defined in `globals.css` for consistency
4. The existing page structure in the `app/` directory for new features
5. The component library setup with shadcn/ui and Radix UI for UI development