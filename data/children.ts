export type Child = {
  id: string
  nombre: string
  edad: number
  genero: "M" | "F"
  municipio: string
  descripcion: string
  foto: string
  estado: "disponible" | "apadrinado"
}

export const CHILDREN: Child[] = [
  { id: "1", nombre: "Sofía", edad: 8, genero: "F", municipio: "Armenia", descripcion: "Le encanta dibujar y sueña con ser artista. Necesita apoyo para continuar sus estudios.", foto: "/young-colombian-girl-smiling.jpg", estado: "disponible" },
  { id: "2", nombre: "Carlos", edad: 10, genero: "M", municipio: "Calarcá", descripcion: "Apasionado por el fútbol y las matemáticas. Busca oportunidades para desarrollar su potencial.", foto: "/young-colombian-boy-smiling.jpg", estado: "disponible" },
  { id: "3", nombre: "María", edad: 7, genero: "F", municipio: "Circasia", descripcion: "Ama la música y cantar. Necesita apoyo para acceder a educación de calidad.", foto: "/young-girl-colombia-happy.jpg", estado: "disponible" },
  { id: "4", nombre: "Andrés", edad: 12, genero: "M", municipio: "Armenia", descripcion: "Estudiante dedicado que sueña con ser ingeniero. Requiere apoyo para materiales escolares.", foto: "/colombian-boy-student.jpg", estado: "disponible" },
  { id: "5", nombre: "Valentina", edad: 9, genero: "F", municipio: "Montenegro", descripcion: "Le fascina leer y escribir historias. Busca oportunidades para desarrollar su creatividad.", foto: "/young-girl-reading-colombia.jpg", estado: "disponible" },
  { id: "6", nombre: "Juan", edad: 11, genero: "M", municipio: "Quimbaya", descripcion: "Apasionado por la naturaleza y los animales. Sueña con ser veterinario.", foto: "/colombian-boy-nature.jpg", estado: "disponible" },
  { id: "7", nombre: "Isabella", edad: 6, genero: "F", municipio: "Armenia", descripcion: "Niña alegre que ama bailar y jugar. Necesita apoyo para su educación inicial.", foto: "/young-girl-dancing-colombia.jpg", estado: "disponible" },
  { id: "8", nombre: "Diego", edad: 13, genero: "M", municipio: "Calarcá", descripcion: "Talentoso en deportes y ciencias. Busca oportunidades para continuar su educación.", foto: "/teenage-boy-colombia-sports.jpg", estado: "disponible" },
  { id: "9", nombre: "Camila", edad: 8, genero: "F", municipio: "Circasia", descripcion: "Le encanta ayudar a otros y sueña con ser doctora. Necesita apoyo educativo.", foto: "/young-girl-helping-colombia.jpg", estado: "disponible" },
  { id: "10", nombre: "Mateo", edad: 10, genero: "M", municipio: "Montenegro", descripcion: "Creativo y curioso, ama construir cosas. Sueña con ser arquitecto.", foto: "/boy-building-colombia.jpg", estado: "disponible" },
  { id: "11", nombre: "Lucía", edad: 7, genero: "F", municipio: "Armenia", descripcion: "Niña dulce que ama los animales y la naturaleza. Necesita apoyo para su educación.", foto: "/girl-animals-colombia.jpg", estado: "disponible" },
  { id: "12", nombre: "Santiago", edad: 9, genero: "M", municipio: "Quimbaya", descripcion: "Apasionado por la tecnología y los videojuegos. Busca oportunidades educativas.", foto: "/boy-technology-colombia.jpg", estado: "disponible" },
  { id: "13", nombre: "Emma", edad: 11, genero: "F", municipio: "Calarcá", descripcion: "Estudiante destacada que ama las ciencias. Sueña con ser científica.", foto: "/girl-science-colombia.jpg", estado: "disponible" },
]

export const CHILDREN_BY_ID: Record<string, Child> = CHILDREN.reduce((acc, c) => {
  acc[c.id] = c
  return acc
}, {} as Record<string, Child>)