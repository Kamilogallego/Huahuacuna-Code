export interface Child {
  id: number;
  nombre: string;
  edad: number;
  municipio: string;
  genero: 'M' | 'F';
  foto: string;
  descripcion: string;
  historiaCompleta: string;
  necesidades: string[];
  estado: 'disponible' | 'apadrinado' | 'activo';
}

// Array VALIDADO (no estrecha a literales)
export const CHILDREN = [
  {
    id: 1,
    nombre: 'Sofía',
    edad: 8,
    municipio: 'Armenia',
    genero: 'F',
    foto: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400',
    descripcion: 'Le encanta dibujar y sueña con ser artista.',
    historiaCompleta: 'Niña alegre que vive con su abuela. Desea estudiar arte y requiere materiales para su talento.',
    necesidades: ['Matrícula y útiles escolares', 'Materiales de arte', 'Uniforme y calzado escolar', 'Apoyo nutricional'],
    estado: 'disponible'
  },
  {
    id: 2,
    nombre: 'Mateo',
    edad: 9,
    municipio: 'Calarcá',
    genero: 'M',
    foto: 'https://images.unsplash.com/photo-1502447530047-69f28696e1b1?q=80&w=400',
    descripcion: 'Le gusta el fútbol y las matemáticas.',
    historiaCompleta: 'Niño dedicado que busca potenciar su rendimiento académico y deportivo.',
    necesidades: ['Uniforme deportivo', 'Tutorías de matemáticas'],
    estado: 'disponible'
  }
] satisfies Child[];

// Si prefieres un mapa por id:
export const CHILDREN_BY_ID: Record<number, Child> = Object.fromEntries(
  CHILDREN.map(c => [c.id, c])
);