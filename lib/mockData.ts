export const solicitudesMock = [
  { id: 1, nombre: 'Juan Pérez', documento: '123456789', correo: 'juan@email.com', telefono: '3001234567', estado: 'pendiente', fecha: '2024-11-10' },
  { id: 2, nombre: 'Ana López', documento: '987654321', correo: 'ana@email.com', telefono: '3019876543', estado: 'aprobada',  fecha: '2024-11-02' },
  { id: 3, nombre: 'Luis Gómez', documento: '112233445', correo: 'luis@email.com', telefono: '3024567890', estado: 'rechazada', fecha: '2024-10-28' },
  { id: 4, nombre: 'María Rojas', documento: '556677889', correo: 'maria@email.com', telefono: '3041237890', estado: 'pendiente', fecha: '2024-11-11' },
  { id: 5, nombre: 'Carlos Díaz', documento: '445566778', correo: 'carlos@email.com', telefono: '3055552222', estado: 'pendiente', fecha: '2024-11-08' }
] as const;

export const donacionesMock = [
  { id: 1, tipo: 'dinero', monto: 50, metodo: 'PayPal', fecha: '2024-11-01', estado: 'aprobada' },
  { id: 2, tipo: 'especie', descripcion: 'Mercados básicos', fecha: '2024-11-03', estado: 'pendiente' },
  { id: 3, tipo: 'dinero', monto: 120, metodo: 'Nequi', fecha: '2024-11-05', estado: 'aprobada' },
  { id: 4, tipo: 'especie', descripcion: 'Útiles Escolares', fecha: '2024-11-07', estado: 'aprobada' }
] as const;

export const ninosMock = [
  { id: 1, foto: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400', nombre: 'Sofía', edad: 7, descripcion: 'Amante del dibujo.', necesidades: 'Útiles escolares', apadrinado: false, estado: 'disponible' },
  { id: 2, foto: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=400', nombre: 'Mateo', edad: 9, descripcion: 'Le gusta el fútbol.', necesidades: 'Uniforme y zapatos', apadrinado: true, estado: 'apadrinado' }
] as const;

export const usuariosMock = [
  { id: 1, nombre: 'Admin Principal', email: 'admin@huahuacuna.org', rol: 'admin', estado: 'activo', fechaRegistro: '2024-10-01' },
  { id: 2, nombre: 'Padrino Demo', email: 'padrino@test.com', rol: 'padrino', estado: 'activo', fechaRegistro: '2024-10-12' }
] as const;
