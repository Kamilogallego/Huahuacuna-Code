"use client"

import { useState } from "react"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Heart, MapPin, Calendar, Filter, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Child = {
  id: string
  nombre: string
  edad: number
  genero: "M" | "F"
  municipio: string
  descripcion: string
  foto: string
  estado: "disponible" | "apadrinado"
}

const MOCK_CHILDREN: Child[] = [
  {
    id: "1",
    nombre: "Sofía",
    edad: 8,
    genero: "F",
    municipio: "Armenia",
    descripcion: "Le encanta dibujar y sueña con ser artista. Necesita apoyo para continuar sus estudios.",
    foto: "/young-colombian-girl-smiling.jpg",
    estado: "disponible",
  },
  {
    id: "2",
    nombre: "Carlos",
    edad: 10,
    genero: "M",
    municipio: "Calarcá",
    descripcion: "Apasionado por el fútbol y las matemáticas. Busca oportunidades para desarrollar su potencial.",
    foto: "/young-colombian-boy-smiling.jpg",
    estado: "disponible",
  },
  {
    id: "3",
    nombre: "María",
    edad: 7,
    genero: "F",
    municipio: "Circasia",
    descripcion: "Ama la música y cantar. Necesita apoyo para acceder a educación de calidad.",
    foto: "/young-girl-colombia-happy.jpg",
    estado: "disponible",
  },
  {
    id: "4",
    nombre: "Andrés",
    edad: 12,
    genero: "M",
    municipio: "Armenia",
    descripcion: "Estudiante dedicado que sueña con ser ingeniero. Requiere apoyo para materiales escolares.",
    foto: "/colombian-boy-student.jpg",
    estado: "disponible",
  },
  {
    id: "5",
    nombre: "Valentina",
    edad: 9,
    genero: "F",
    municipio: "Montenegro",
    descripcion: "Le fascina leer y escribir historias. Busca oportunidades para desarrollar su creatividad.",
    foto: "/young-girl-reading-colombia.jpg",
    estado: "disponible",
  },
  {
    id: "6",
    nombre: "Juan",
    edad: 11,
    genero: "M",
    municipio: "Quimbaya",
    descripcion: "Apasionado por la naturaleza y los animales. Sueña con ser veterinario.",
    foto: "/colombian-boy-nature.jpg",
    estado: "disponible",
  },
  {
    id: "7",
    nombre: "Isabella",
    edad: 6,
    genero: "F",
    municipio: "Armenia",
    descripcion: "Niña alegre que ama bailar y jugar. Necesita apoyo para su educación inicial.",
    foto: "/young-girl-dancing-colombia.jpg",
    estado: "disponible",
  },
  {
    id: "8",
    nombre: "Diego",
    edad: 13,
    genero: "M",
    municipio: "Calarcá",
    descripcion: "Talentoso en deportes y ciencias. Busca oportunidades para continuar su educación.",
    foto: "/teenage-boy-colombia-sports.jpg",
    estado: "disponible",
  },
  {
    id: "9",
    nombre: "Camila",
    edad: 8,
    genero: "F",
    municipio: "Circasia",
    descripcion: "Le encanta ayudar a otros y sueña con ser doctora. Necesita apoyo educativo.",
    foto: "/young-girl-helping-colombia.jpg",
    estado: "disponible",
  },
  {
    id: "10",
    nombre: "Mateo",
    edad: 10,
    genero: "M",
    municipio: "Montenegro",
    descripcion: "Creativo y curioso, ama construir cosas. Sueña con ser arquitecto.",
    foto: "/boy-building-colombia.jpg",
    estado: "disponible",
  },
  {
    id: "11",
    nombre: "Lucía",
    edad: 7,
    genero: "F",
    municipio: "Armenia",
    descripcion: "Niña dulce que ama los animales y la naturaleza. Necesita apoyo para su educación.",
    foto: "/girl-animals-colombia.jpg",
    estado: "disponible",
  },
  {
    id: "12",
    nombre: "Santiago",
    edad: 9,
    genero: "M",
    municipio: "Quimbaya",
    descripcion: "Apasionado por la tecnología y los videojuegos. Busca oportunidades educativas.",
    foto: "/boy-technology-colombia.jpg",
    estado: "disponible",
  },
  {
    id: "13",
    nombre: "Emma",
    edad: 11,
    genero: "F",
    municipio: "Calarcá",
    descripcion: "Estudiante destacada que ama las ciencias. Sueña con ser científica.",
    foto: "/girl-science-colombia.jpg",
    estado: "disponible",
  },
]

const ITEMS_PER_PAGE = 12

export default function ApadrinamientosPage() {
  const [filters, setFilters] = useState({
    edadMin: "",
    edadMax: "",
    genero: "",
    municipio: "",
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Filter children
  const filteredChildren = MOCK_CHILDREN.filter((child) => {
    if (child.estado !== "disponible") return false
    if (filters.edadMin && child.edad < Number.parseInt(filters.edadMin)) return false
    if (filters.edadMax && child.edad > Number.parseInt(filters.edadMax)) return false
    if (filters.genero && child.genero !== filters.genero) return false
    if (filters.municipio && child.municipio !== filters.municipio) return false
    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredChildren.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedChildren = filteredChildren.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const clearFilters = () => {
    setFilters({ edadMin: "", edadMax: "", genero: "", municipio: "" })
    setCurrentPage(1)
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  const municipios = Array.from(new Set(MOCK_CHILDREN.map((child) => child.municipio))).sort()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1C4E9A] mb-4 text-balance">
              Niños Disponibles para Apadrinamiento
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Conoce a los niños que esperan tu apoyo para transformar sus vidas
            </p>
          </div>
          <Button asChild variant="outline" className="border-[#1C4E9A] text-[#1C4E9A] bg-transparent">
            <Link href="/dashboard">Ir al Dashboard</Link>
          </Button>
        </div>

        {/* Filters Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-[#1C4E9A]" />
                <CardTitle className="font-heading text-[#1C4E9A]">Filtros de Búsqueda</CardTitle>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-[#C33B2A] hover:text-[#C33B2A]/80"
                >
                  <X className="h-4 w-4 mr-2" />
                  Limpiar Filtros
                </Button>
              )}
            </div>
            <CardDescription>
              {filteredChildren.length} {filteredChildren.length === 1 ? "niño encontrado" : "niños encontrados"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edadMin" className="font-heading">
                  Edad Mínima
                </Label>
                <Input
                  id="edadMin"
                  type="number"
                  min="5"
                  max="18"
                  placeholder="5"
                  value={filters.edadMin}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, edadMin: e.target.value }))
                    setCurrentPage(1)
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edadMax" className="font-heading">
                  Edad Máxima
                </Label>
                <Input
                  id="edadMax"
                  type="number"
                  min="5"
                  max="18"
                  placeholder="18"
                  value={filters.edadMax}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, edadMax: e.target.value }))
                    setCurrentPage(1)
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genero" className="font-heading">
                  Género
                </Label>
                <Select
                  value={filters.genero}
                  onValueChange={(value) => {
                    setFilters((prev) => ({ ...prev, genero: value }))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger id="genero">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="municipio" className="font-heading">
                  Municipio
                </Label>
                <Select
                  value={filters.municipio}
                  onValueChange={(value) => {
                    setFilters((prev) => ({ ...prev, municipio: value }))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger id="municipio">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {municipios.map((municipio) => (
                      <SelectItem key={municipio} value={municipio}>
                        {municipio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Children Grid */}
        {paginatedChildren.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedChildren.map((child) => (
                <Card key={child.id} className="hover:shadow-xl transition-shadow overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={child.foto || "/placeholder.svg"}
                      alt={child.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-[#5CA244] hover:bg-[#5CA244]/90">Disponible</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-heading text-[#1C4E9A] text-xl">{child.nombre}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{child.edad} años</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{child.municipio}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{child.descripcion}</p>
                    <Button asChild className="w-full bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading">
                      <Link href={`/apadrinamientos/${child.id}`}>
                        <Heart className="mr-2 h-4 w-4" />
                        Ver Perfil
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <Card className="py-16">
            <CardContent className="text-center">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-heading font-semibold text-[#1C4E9A] mb-2">
                No se encontraron niños con estos filtros
              </h3>
              <p className="text-muted-foreground mb-6">Intenta ajustar los filtros de búsqueda</p>
              <Button onClick={clearFilters} className="bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading">
                Limpiar Filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
