"use client"

import { useState } from "react"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { UserPlus, Search, Mail, User, Shield, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

type Admin = {
  id: string
  nombre: string
  email: string
  permisos: string[]
  activo: boolean
  fechaCreacion: string
}

export default function AdminUsuariosPage() {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "1",
      nombre: "María González",
      email: "maria@huahuacuna.org",
      permisos: ["usuarios", "apadrinamientos", "reportes"],
      activo: true,
      fechaCreacion: "2024-01-15",
    },
    {
      id: "2",
      nombre: "Carlos Ramírez",
      email: "carlos@huahuacuna.org",
      permisos: ["usuarios", "donaciones"],
      activo: true,
      fechaCreacion: "2024-02-20",
    },
    {
      id: "3",
      nombre: "Ana Martínez",
      email: "ana@huahuacuna.org",
      permisos: ["reportes"],
      activo: false,
      fechaCreacion: "2023-11-10",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAdmin, setNewAdmin] = useState({
    nombre: "",
    email: "",
    permisos: [] as string[],
  })

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleAdminStatus = (id: string) => {
    setAdmins((prev) => prev.map((admin) => (admin.id === id ? { ...admin, activo: !admin.activo } : admin)))
  }

  const handleCreateAdmin = () => {
    const admin: Admin = {
      id: String(admins.length + 1),
      nombre: newAdmin.nombre,
      email: newAdmin.email,
      permisos: newAdmin.permisos,
      activo: true,
      fechaCreacion: new Date().toISOString().split("T")[0],
    }
    setAdmins((prev) => [...prev, admin])
    setNewAdmin({ nombre: "", email: "", permisos: [] })
    setIsDialogOpen(false)
  }

  const togglePermiso = (permiso: string) => {
    setNewAdmin((prev) => ({
      ...prev,
      permisos: prev.permisos.includes(permiso)
        ? prev.permisos.filter((p) => p !== permiso)
        : [...prev.permisos, permiso],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C4E9A]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold text-[#1C4E9A] mb-2">Gestión de Administradores</h1>
            <p className="text-muted-foreground">Administra usuarios con permisos de administrador</p>
          </div>
          <Button asChild variant="outline" className="border-[#1C4E9A] text-[#1C4E9A] bg-transparent">
            <Link href="/dashboard">Ir al Dashboard</Link>
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Administradores del Sistema</CardTitle>
                <CardDescription>{admins.length} administradores registrados</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Crear Administrador
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-[#1C4E9A]">Nuevo Administrador</DialogTitle>
                    <DialogDescription>Crea un nuevo usuario con permisos de administrador</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="font-heading">
                        Nombre Completo
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="nombre"
                          placeholder="Juan Pérez"
                          value={newAdmin.nombre}
                          onChange={(e) => setNewAdmin((prev) => ({ ...prev, nombre: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-heading">
                        Correo Electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="juan@huahuacuna.org"
                          value={newAdmin.email}
                          onChange={(e) => setNewAdmin((prev) => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-heading">Permisos</Label>
                      <div className="space-y-2">
                        {[
                          "usuarios",
                          "apadrinamientos",
                          "donaciones",
                          "reportes",
                        ].map((permiso) => (
                          <div key={permiso} className="flex items-center justify-between p-3 border rounded-lg">
                            <span className="capitalize">{permiso}</span>
                            <Switch
                              checked={newAdmin.permisos.includes(permiso)}
                              onCheckedChange={() => togglePermiso(permiso)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleCreateAdmin}
                      className="w-full bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading"
                      disabled={!newAdmin.nombre || !newAdmin.email || newAdmin.permisos.length === 0}
                    >
                      Crear Administrador
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-heading">Nombre</TableHead>
                    <TableHead className="font-heading">Email</TableHead>
                    <TableHead className="font-heading">Permisos</TableHead>
                    <TableHead className="font-heading">Fecha Creación</TableHead>
                    <TableHead className="font-heading">Estado</TableHead>
                    <TableHead className="font-heading text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-medium">{admin.nombre}</TableCell>
                      <TableCell className="text-muted-foreground">{admin.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {admin.permisos.map((permiso) => (
                            <Badge
                              key={permiso}
                              variant="secondary"
                              className="bg-[#F6C344]/20 text-[#1E1E1E] capitalize"
                            >
                              {permiso}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(admin.fechaCreacion).toLocaleDateString("es-CO")}
                      </TableCell>
                      <TableCell>
                        {admin.activo ? (
                          <Badge className="bg-[#5CA244] hover:bg-[#5CA244]/90">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Activo
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-muted">
                            <XCircle className="mr-1 h-3 w-3" />
                            Inactivo
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch checked={admin.activo} onCheckedChange={() => toggleAdminStatus(admin.id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAdmins.length === 0 && (
              <div className="text-center py-12">
                <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No se encontraron administradores</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
