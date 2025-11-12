export type ChildEstado = 'disponible' | 'apadrinado' | 'activo';
export interface Child {
  id: number;
  nombre: string;
  edad: number;
  municipio: string;
  genero: 'F' | 'M';
  foto: string;
  descripcion: string;
  historia: string;
  necesidades: string[];
  educacion?: { grado: string; institucion: string; rendimiento: string; apoyo: string[] };
  salud?: { resumen: string; controles: string[] };
  actualizaciones?: { fecha: string; texto: string }[];
  estado: ChildEstado;
  fechaInicio?: string; // si apadrinado
}

export const childrenMock: Child[] = [
  {
    id: 1,
    nombre: 'Sofia',
    edad: 8,
    municipio: 'Armenia',
    genero: 'F',
    foto: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400',
    descripcion: 'Le encanta dibujar y sueña con ser artista.',
    historia: 'Niña alegre y creativa que vive con su abuela. Sueña con estudiar arte y desea materiales para desarrollar su talento.',
    necesidades: ['Matrícula y útiles escolares', 'Materiales de arte', 'Uniforme y calzado escolar', 'Apoyo nutricional'],
    educacion: { grado: '3° de Primaria', institucion: 'Institución Educativa Simón Bolívar', rendimiento: 'Excelente – Promedio académico: 4.5/5.0. Destaca en artes y español.', apoyo: ['Matrícula', 'Uniforme completo', 'Útiles escolares', 'Transporte escolar', 'Refrigerio escolar'] },
    salud: { resumen: 'Buen estado general. Próximo control médico anual programado.', controles: ['Control médico anual', 'Revisión odontológica'] },
    actualizaciones: [{ fecha: '2024-03-10', texto: 'Ganó primer lugar en concurso de dibujo escolar.' }],
    estado: 'disponible'
  },
  {
    id: 2,
    nombre: 'Carlos',
    edad: 10,
    municipio: 'Calarcá',
    genero: 'M',
    foto: 'https://images.unsplash.com/photo-1502447530047-69f28696e1b1?q=80&w=400',
    descripcion: 'Apasionado por el fútbol y las matemáticas.',
    historia: 'Niño dedicado que quiere oportunidades para desarrollar su potencial académico y deportivo.',
    necesidades: ['Uniforme deportivo', 'Apoyo en tutorías de matemáticas'],
    estado: 'disponible'
  },
  {
    id: 3,
    nombre: 'María',
    edad: 7,
    municipio: 'Circasia',
    genero: 'F',
    foto: 'https://images.unsplash.com/photo-1581578968792-b587a04e83d8?q=80&w=400',
    descripcion: 'Ama la música y cantar. Necesita apoyo educativo.',
    historia: 'Niña con talento musical que busca acceso a clases y a educación de calidad.',
    necesidades: ['Clases de música', 'Material escolar básico'],
    estado: 'disponible'
  }
];
