export interface PadrinoUser {
  id: number;
  nombre: string;
  email: string;
  documento: string;
  telefono: string;
  direccion: string;
  foto: string;
  rol: 'padrino';
  fechaRegistro: string;
}

export const padrinoActual: PadrinoUser = {
  id: 1,
  nombre: 'Juan Pérez García',
  email: 'juan@ejemplo.com',
  documento: '1234567890',
  telefono: '+57 300 123 4567',
  direccion: 'Calle 123 #45-67. Armenia, Quindío',
  foto: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=300',
  rol: 'padrino',
  fechaRegistro: '2024-01-14'
};