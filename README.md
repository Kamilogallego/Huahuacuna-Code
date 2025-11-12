# Fundación Huahuacuna – Frontend

Complete Next.js application for Fundación Huahuacuna, featuring public pages, forms, user authentication, and administration panel.

## Tech Stack

- **Framework**: Next.js 16.0.0 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom brand colors
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Hooks
- **Analytics**: Vercel Analytics
- **Theme**: next-themes (dark/light mode support)

## Prerequisites

- **Node.js**: >= 20.0.0 (recommended: use version specified in `.nvmrc`)
- **Package Manager**: npm (included with Node.js)

### Installing Node.js

#### Using nvm (Recommended)

```bash
# Install nvm (if not already installed)
# Visit: https://github.com/nvm-sh/nvm#installing-and-updating

# Use the project's Node version
nvm use

# Or install and use Node 20
nvm install 20
nvm use 20
```

#### Direct Installation

Download and install Node.js 20.x from [nodejs.org](https://nodejs.org/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Kamilogallego/Huahuacuna-Code.git
cd Huahuacuna-Code
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

**Note**: We use `--legacy-peer-deps` due to some peer dependency conflicts with React 19 and certain packages. This is safe and will be resolved in future package updates.

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure any required environment variables. The application will work with default values for development.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

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

## Design System

### Brand Colors

The application uses Fundación Huahuacuna's official brand colors:

- **Golden Yellow**: `#f6c344` - Warmth and hope
- **Warm Red**: `#c33b2a` - Passion and energy
- **Hope Green**: `#5ca244` - Growth and sustainability
- **Huahuacuna Blue**: `#1c4e9a` - Trust and stability
- **Deep Black**: `#1e1e1e` - Contrast and elegance
- **Pure White**: `#ffffff` - Clarity and purity

### Typography

- **Headings**: Poppins font family
- **Body**: Nunito Sans font family

## Authentication

The application includes authentication pages:

- `/login` - User login
- `/registro` - User registration
- `/recuperar-password` - Password recovery

**Note**: Authentication logic may require backend integration. Currently, the UI is fully functional with form validation.

## Development Notes

### Windows/PowerShell Users

If you encounter issues on Windows:

1. **Node Modules Path Too Long**: Enable long path support or move the project to a shorter path (e.g., `C:\projects\huahuacuna`)

```powershell
# Enable long paths (requires admin)
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

2. **OneDrive Sync Issues**: Don't place the project in OneDrive-synced folders. Use a local directory.

3. **Execution Policy**: If scripts fail to run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Common Issues

#### Build Errors

If you encounter TypeScript or ESLint errors during build:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Try building again
npm run build
```

#### Peer Dependency Warnings

The project uses React 19, which is newer than some dependencies expect. We use `--legacy-peer-deps` to bypass these warnings. This is safe and doesn't affect functionality.

#### Module Not Found

If you see "Module not found" errors:

1. Ensure all dependencies are installed: `npm install --legacy-peer-deps`
2. Check that path aliases in `tsconfig.json` are correct
3. Restart your development server

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test locally with `npm run build` and `npm start`
4. Submit a pull request

## License

Internal use by Fundación Huahuacuna.

## Support

For issues or questions, please contact the development team or create an issue in the repository.