"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Filter, X, Calendar, Heart } from "lucide-react"

type Sponsorship = {
  id: string
  childName: string
  childAge: number
  sponsorName: string
  sponsorEmail: string
  startDate: string
  endDate: string | null
  status: "activo" | "finalizado" | "suspendido"
  municipality: string
}

const MOCK_SPONSORSHIPS: Sponsorship[] = [
  { id: "1", childName: "Sofía Rodríguez", childAge: 8, sponsorName: "Juan Pérez García", sponsorEmail: "juan@ejemplo.com", startDate: "2024-01-15", endDate: null, status: "activo", municipality: "Armenia" },
  { id: "2", childName: "Carlos Martínez", childAge: 10, sponsorName: "María López", sponsorEmail: "maria@ejemplo.com", startDate: "2023-09-20", endDate: null, status: "activo", municipality: "Calarcá" },
  { id: "3", childName: "Ana García", childAge: 12, sponsorName: "Pedro Sánchez", sponsorEmail: "pedro@ejemplo.com", startDate: "2023-03-10", endDate: "2024-02-28", status: "finalizado", municipality: "Armenia" },
  { id: "4", childName: "Diego Torres", childAge: 9, sponsorName: "Laura Ramírez", sponsorEmail: "laura@ejemplo.com", startDate: "2023-11-05", endDate: null, status: "activo", municipality: "Montenegro" },
  { id: "5", childName: "Valentina Gómez", childAge: 7, sponsorName: "Carlos Mendoza", sponsorEmail: "carlos@ejemplo.com", startDate: "2024-02-01", endDate: null, status: "activo", municipality: "Circasia" },
  { id: "6", childName: "Andrés Silva", childAge: 11, sponsorName: "Ana Morales", sponsorEmail: "ana@ejemplo.com", startDate: "2023-06-15", endDate: null, status: "suspendido", municipality: "Armenia" },
  { id: "7", childName: "Isabella Cruz", childAge: 8, sponsorName: "Roberto Díaz", sponsorEmail: "roberto@ejemplo.com", startDate: "2023-08-20", endDate: "2024-01-15", status: "finalizado", municipality: "Quimbaya" },
  { id: "8", childName: "Mateo Vargas", childAge: 10, sponsorName: "Patricia Ruiz", sponsorEmail: "patricia@ejemplo.com", startDate: "2024-01-10", endDate: null, status: "activo", municipality: "Calarcá" },
]

export default function AdminSponsorshipsPage() {
  const [sponsorships] = useState<Sponsorship[]>(MOCK_SPONSORSHIPS)
  const [filters, setFilters] = useState({ search: "", status: "", startDate: "", endDate: "" })

  const filteredSponsorships = useMemo(() => {
    const searchLower = filters.search.toLowerCase()
    return sponsorships.filter((s) => {
      const matchesSearch = !filters.search || s.childName.toLowerCase().includes(searchLower) || s.sponsorName.toLowerCase().includes(searchLower) || s.sponsorEmail.toLowerCase().includes(searchLower)
      const matchesStatus = !filters.status || s.status === filters.status
      const matchesStartDate = !filters.startDate || new Date(s.startDate) >= new Date(filters.startDate)
      const matchesEndDate = !filters.endDate || (s.endDate && new Date(s.endDate) <= new Date(filters.endDate)) || (!s.endDate && s.status === "activo")
      return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate
    })
  }, [filters, sponsorships])

  const clearFilters = () => setFilters({ search: "", status: "", startDate: "", endDate: "" })
  const hasActiveFilters = Object.values(filters).some((v) => v !== "")

  const exportToCSV = () => {
    const headers = ["ID","Niño","Edad","Padrino","Email Padrino","Fecha Inicio","Fecha Fin","Estado","Municipio"]
    const rows = filteredSponsorships.map((s) => [s.id,s.childName,s.childAge,s.sponsorName,s.sponsorEmail,new Date(s.startDate).toLocaleDateString("es-CO"),s.endDate ? new Date(s.endDate).toLocaleDateString("es-CO") : "Activo",s.status,s.municipality])
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a"); const url = URL.createObjectURL(blob)
    link.setAttribute("href", url); link.setAttribute("download", `apadrinamientos_${new Date().toISOString().split("T")[0]}.csv`); link.style.visibility = "hidden"
    document.body.appendChild(link); link.click(); document.body.removeChild(link)
  }

  const getStatusBadge = (status: Sponsorship["status"]) => {
    switch (status) {
      case "activo": return <Badge className="bg-[#5CA244] hover:bg-[#5CA244]/90">Activo</Badge>
      case "finalizado": return <Badge variant="secondary" className="bg-muted">Finalizado</Badge>
      case "suspendido": return <Badge className="bg-[#F6C344] hover:bg-[#F6C344]/90 text-[#1E1E1E]">Suspendido</Badge>
      default: return null
    }
  }

  const stats = { total: sponsorships.length, active: sponsorships.filter((s) => s.status === "activo").length, finished: sponsorships.filter((s) => s.status === "finalizado").length, suspended: sponsorships.filter((s) => s.status === "suspendido").length }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1C4E9A] mb-4">Historial de Apadrinamientos</h1>
            <p className="text-lg text-muted-foreground">Gestión completa de todos los apadrinamientos</p>
          </div>
          <Button asChild variant="outline" className="border-[#1C4E9A] text-[#1C4E9A] bg-transparent"><Link href="/dashboard">Ir al Dashboard</Link></Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground font-heading">Total</p><p className="text-3xl font-heading font-bold text-[#1C4E9A]">{stats.total}</p></div><Heart className="h-8 w-8 text-[#1C4E9A]/20" /></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground font-heading">Activos</p><p className="text-3xl font-heading font-bold text-[#5CA244]">{stats.active}</p></div><Heart className="h-8 w-8 text-[#5CA244]/20" /></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground font-heading">Finalizados</p><p className="text-3xl font-heading font-bold text-muted-foreground">{stats.finished}</p></div><Heart className="h-8 w-8 text-muted-foreground/20" /></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground font-heading">Suspendidos</p><p className="text-3xl font-heading font-bold text-[#F6C344]">{stats.suspended}</p></div><Heart className="h-8 w-8 text-[#F6C344]/20" /></div></CardContent></Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Todos los Apadrinamientos</CardTitle>
                <CardDescription>{filteredSponsorships.length} de {sponsorships.length} apadrinamientos</CardDescription>
              </div>
              <Button onClick={exportToCSV} className="bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading"><Download className="mr-2 h-4 w-4" />Exportar a CSV</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="bg-muted/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Filter className="h-5 w-5 text-[#1C4E9A]" /><CardTitle className="text-lg font-heading text-[#1C4E9A]">Filtros</CardTitle></div>
                  {hasActiveFilters && (<Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#C33B2A] hover:text-[#C33B2A]/80"><X className="h-4 w-4 mr-2" />Limpiar</Button>)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2"><Label htmlFor="search" className="font-heading">Buscar</Label><div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="search" placeholder="Niño, padrino o email..." value={filters.search} onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))} className="pl-10" /></div></div>
                  <div className="space-y-2"><Label htmlFor="status" className="font-heading">Estado</Label><Select value={filters.status} onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}><SelectTrigger id="status"><SelectValue placeholder="Todos" /></SelectTrigger><SelectContent><SelectItem value="">Todos</SelectItem><SelectItem value="activo">Activo</SelectItem><SelectItem value="finalizado">Finalizado</SelectItem><SelectItem value="suspendido">Suspendido</SelectItem></SelectContent></Select></div>
                  <div className="space-y-2"><Label htmlFor="startDate" className="font-heading">Desde</Label><div className="relative"><Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="startDate" type="date" value={filters.startDate} onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))} className="pl-10" /></div></div>
                  <div className="space-y-2"><Label htmlFor="endDate" className="font-heading">Hasta</Label><div className="relative"><Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="endDate" type="date" value={filters.endDate} onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))} className="pl-10" /></div></div>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-heading">ID</TableHead>
                    <TableHead className="font-heading">Niño</TableHead>
                    <TableHead className="font-heading">Padrino</TableHead>
                    <TableHead className="font-heading">Municipio</TableHead>
                    <TableHead className="font-heading">Fecha Inicio</TableHead>
                    <TableHead className="font-heading">Fecha Fin</TableHead>
                    <TableHead className="font-heading">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSponsorships.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">#{s.id}</TableCell>
                      <TableCell><div><p className="font-medium">{s.childName}</p><p className="text-xs text-muted-foreground">{s.childAge} años</p></div></TableCell>
                      <TableCell><div><p className="font-medium">{s.sponsorName}</p><p className="text-xs text-muted-foreground">{s.sponsorEmail}</p></div></TableCell>
                      <TableCell className="text-muted-foreground">{s.municipality}</TableCell>
                      <TableCell className="text-muted-foreground">{new Date(s.startDate).toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" })}</TableCell>
                      <TableCell className="text-muted-foreground">{s.endDate ? new Date(s.endDate).toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" }) : "-"}</TableCell>
                      <TableCell>{getStatusBadge(s.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredSponsorships.length === 0 && (
              <div className="text-center py-12"><Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" /><p className="text-muted-foreground">No se encontraron apadrinamientos con estos filtros</p></div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}