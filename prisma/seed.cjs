# Instalar dependencias y generar cliente
pnpm install
pnpm prisma generate

# Crear tablas (usa db push para dev o migrate deploy si tienes migraciones)
pnpm prisma db push

# Sembrar usuarios
pnpm prisma db seed