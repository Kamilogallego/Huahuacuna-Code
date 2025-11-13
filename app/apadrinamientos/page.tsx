"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
import { Heart, MapPin, Calendar, Filter, X, LogIn } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CHILDREN } from "@/data/children"

const ITEMS_PER_PAGE = 12

export default function ApadrinamientosPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    try {
      const role = localStorage.getItem("userRole")
      if (role === "padrino") {
        setAuthorized(true)
      } else {
        router.replace("/login?redirect=/apadrinamientos")
      }
    } catch {
      router.replace("/login?redirect=/apadrinamientos")
    } finally {
      setAuthChecked(true)
    }
  }, [router])

  if (!authChecked || !authorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
        <AuthHeader />
        <main className="container mx-auto px-4 py-12 max-w-3xl">
          <Card className="py-16 text-center">
            <CardContent className="space-y-3">
              <LogIn className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="text-2xl font-heading font-bold text-[#1C4E9A]">Debes iniciar sesión como Padrino</h2>
              <p className="text-muted-foreground">Para ver el catálogo de niños, inicia sesión con tu cuenta de padrino.</p>
              <Button asChild className="bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading">
                <Link href="/login?redirect=/apadrinamientos">Ir a Iniciar sesión</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const [filters, setFilters] = useState({
    edadMin: "",
    edadMax: "",
    genero: "",
    municipio: "",
  })
  const [currentPage, setCurrentPage] = useState(1)

  const filteredChildren = CHILDREN.filter((child) => {
    if (child.estado !== "disponible") return false
    if (filters.edadMin && child.edad < Number.parseInt(filters.edadMin)) return false
    if (filters.edadMax && child.edad > Number.parseInt(filters.edadMax)) return false
    if (filters.genero && filters.genero !== "all" && child.genero !== filters.genero) return false
    if (filters.municipio && filters.municipio !== "all" && child.municipio !== filters.municipio) return false
    return true
  })

  const totalPages = Math.ceil(filteredChildren.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedChildren = filteredChildren.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const clearFilters = () => {
    setFilters({ edadMin: "", edadMax: "", genero: "", municipio: "" })
    setCurrentPage(1)
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")
  const municipios = Array.from(new Set(CHILDREN.map((child) => child.municipio))).sort()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1C4E9A] mb-4 text-balance">Niños Disponibles para Apadrinamiento</h1>
            <p className="text-lg text-muted-foreground text-pretty">Conoce a los niños que esperan tu apoyo para transformar sus vidas</p>
          </div>
          <Button asChild variant="outline" className="border-[#1C4E9A] text-[#1C4E9A] bg-transparent">
            <Link href="/perfil-apadrinador">Ir a mi perfil</Link>
          </Button>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-[#1C4E9A]" />
                <CardTitle className="font-heading text-[#1C4E9A]">Filtros de Búsqueda</CardTitle>
              </div>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#C33B2A] hover:text-[#C33B2A]/80">
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
                <Label htmlFor="edadMin" className="font-heading">Edad Mínima</Label>
                <Input id="edadMin" type="number" min="5" max="18" placeholder="5" value={filters.edadMin} onChange={(e) => { setFilters((prev) => ({ ...prev, edadMin: e.target.value })); setCurrentPage(1) }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edadMax" className="font-heading">Edad Máxima</Label>
                <Input id="edadMax" type="number" min="5" max="18" placeholder="18" value={filters.edadMax} onChange={(e) => { setFilters((prev) => ({ ...prev, edadMax: e.target.value })); setCurrentPage(1) }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genero" className="font-heading">Género</Label>
                <Select value={filters.genero} onValueChange={(value) => { setFilters((prev) => ({ ...prev, genero: value })); setCurrentPage(1) }}>
                  <SelectTrigger id="genero"><SelectValue placeholder="Todos" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Femenino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipio" className="font-heading">Municipio</Label>
                <Select value={filters.municipio} onValueChange={(value) => { setFilters((prev) => ({ ...prev, municipio: value })); setCurrentPage(1) }}>
                  <SelectTrigger id="municipio"><SelectValue placeholder="Todos" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {municipios.map((municipio) => (<SelectItem key={municipio} value={municipio}>{municipio}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {paginatedChildren.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedChildren.map((child) => (
                <Card key={child.id} className="hover:shadow-xl transition-shadow overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={child.foto || "/placeholder.svg"} alt={child.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 right-3"><Badge className="bg-[#5CA244] hover:bg-[#5CA244]/90">Disponible</Badge></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-heading text-[#1C4E9A] text-xl">{child.nombre}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /><span>{child.edad} años</span></div>
                      <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span>{child.municipio}</span></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{child.descripcion}</p>
                    <Button asChild className="w-full bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading">
                      <Link href={`/apadrinamientos/${child.id}`}><Heart className="mr-2 h-4 w-4" />Ver Perfil</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page} className="cursor-pointer">{page}</PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
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
              <h3 className="text-xl font-heading font-semibold text-[#1C4E9A] mb-2">No se encontraron niños con estos filtros</h3>
              <p className="text-muted-foreground mb-6">Intenta ajustar los filtros de búsqueda</p>
              <Button onClick={clearFilters} className="bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading">Limpiar Filtros</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
