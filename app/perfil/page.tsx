"use client"

import type React from "react"

import { useState } from "react"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Phone, MapPin, Mail, Camera, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PerfilPage() {
  const [formData, setFormData] = useState({
    nombreCompleto: "Juan Pérez García",
    email: "juan@ejemplo.com",
    telefono: "+57 300 123 4567",
    direccion: "Calle 123 #45-67, Armenia, Quindío",
    documento: "1234567890",
    fotoPerfil: "/abstract-profile.png",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSuccess(true)
      setIsEditing(false)
      setLoading(false)

      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, fotoPerfil: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#1C4E9A]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold text-[#1C4E9A] mb-2">Mi Perfil</h1>
            <p className="text-muted-foreground">Gestiona tu información personal</p>
          </div>
          <Button asChild variant="outline" className="border-[#1C4E9A] text-[#1C4E9A] bg-transparent">
            <Link href="/dashboard">Ir al Dashboard</Link>
          </Button>
        </div>

        {success && (
          <Alert className="mb-6 bg-[#5CA244]/10 border-[#5CA244]">
            <CheckCircle2 className="h-4 w-4 text-[#5CA244]" />
            <AlertDescription className="text-foreground">Perfil actualizado exitosamente</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="font-heading text-[#1C4E9A]">Foto de Perfil</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={formData.fotoPerfil || "/placeholder.svg"} alt={formData.nombreCompleto} />
                  <AvatarFallback className="bg-[#1C4E9A] text-white text-3xl">
                    {formData.nombreCompleto
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label
                    htmlFor="foto-upload"
                    className="absolute bottom-0 right-0 bg-[#F6C344] hover:bg-[#F6C344]/90 text-white p-2 rounded-full cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <input
                      id="foto-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
              <div className="text-center">
                <p className="font-heading font-semibold text-lg">{formData.nombreCompleto}</p>
                <p className="text-sm text-muted-foreground">Padrino</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-heading text-[#1C4E9A]">Información Personal</CardTitle>
                  <CardDescription>{isEditing ? "Edita tu información" : "Visualiza tu información"}</CardDescription>
                </div>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} className="bg-[#1C4E9A] hover:bg-[#1C4E9A]/90">
                    Editar Perfil
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombreCompleto" className="font-heading">
                    Nombre Completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nombreCompleto"
                      value={formData.nombreCompleto}
                      onChange={(e) => setFormData((prev) => ({ ...prev, nombreCompleto: e.target.value }))}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-heading">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" value={formData.email} className="pl-10 bg-muted" disabled />
                  </div>
                  <p className="text-xs text-muted-foreground">El email no puede ser modificado</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documento" className="font-heading">
                    Documento de Identidad
                  </Label>
                  <Input id="documento" value={formData.documento} className="bg-muted" disabled />
                  <p className="text-xs text-muted-foreground">El documento no puede ser modificado</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="font-heading">
                    Teléfono
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion" className="font-heading">
                    Dirección
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="direccion"
                      value={formData.direccion}
                      onChange={(e) => setFormData((prev) => ({ ...prev, direccion: e.target.value }))}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading"
                      disabled={loading}
                    >
                      {loading ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
