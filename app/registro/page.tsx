"use client"

import type React from "react"

import { useState } from "react"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Mail, Lock, User, Phone, MapPin, FileText, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    telefono: "",
    documento: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = "El nombre completo es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
    }

    if (!formData.documento.trim()) {
      newErrors.documento = "El documento es requerido"
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es requerida"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Debe contener mayúsculas, minúsculas y números"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
    }, 1500)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
        <AuthHeader />
        <main className="container mx-auto px-4 py-12 max-w-2xl">
          <Card className="border-2 border-[#5CA244]">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-[#5CA244] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-heading text-[#1C4E9A]">¡Registro Exitoso!</CardTitle>
              <CardDescription className="text-base">
                Hemos enviado un correo de confirmación a <strong>{formData.email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-[#F6C344]/10 border-[#F6C344]">
                <Heart className="h-4 w-4 text-[#C33B2A]" />
                <AlertDescription className="text-foreground">
                  Por favor, revisa tu correo y activa tu cuenta para comenzar a transformar vidas.
                </AlertDescription>
              </Alert>
              <Button asChild className="w-full bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading">
                <Link href="/login">Ir al inicio de sesión</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1C4E9A] mb-4 text-balance">
            Únete a Nuestra Familia
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Conviértete en padrino y transforma la vida de un niño vulnerable. Juntos sembramos futuro.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Registro de Padrino</CardTitle>
            <CardDescription>Completa el formulario para crear tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombreCompleto" className="font-heading">
                    Nombre Completo *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nombreCompleto"
                      placeholder="Juan Pérez García"
                      value={formData.nombreCompleto}
                      onChange={(e) => handleChange("nombreCompleto", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.nombreCompleto && <p className="text-sm text-[#C33B2A]">{errors.nombreCompleto}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-heading">
                    Correo Electrónico *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="juan@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-[#C33B2A]">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="font-heading">
                    Teléfono *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="telefono"
                      placeholder="+57 300 123 4567"
                      value={formData.telefono}
                      onChange={(e) => handleChange("telefono", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.telefono && <p className="text-sm text-[#C33B2A]">{errors.telefono}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documento" className="font-heading">
                    Documento de Identidad *
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="documento"
                      placeholder="1234567890"
                      value={formData.documento}
                      onChange={(e) => handleChange("documento", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.documento && <p className="text-sm text-[#C33B2A]">{errors.documento}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion" className="font-heading">
                  Dirección *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="direccion"
                    placeholder="Calle 123 #45-67, Armenia, Quindío"
                    value={formData.direccion}
                    onChange={(e) => handleChange("direccion", e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.direccion && <p className="text-sm text-[#C33B2A]">{errors.direccion}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-heading">
                    Contraseña *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.password && <p className="text-sm text-[#C33B2A]">{errors.password}</p>}
                  <p className="text-xs text-muted-foreground">
                    Mínimo 8 caracteres con mayúsculas, minúsculas y números
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-heading">
                    Confirmar Contraseña *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-[#C33B2A]">{errors.confirmPassword}</p>}
                </div>
              </div>

              <Alert className="bg-[#F6C344]/10 border-[#F6C344]">
                <Heart className="h-4 w-4 text-[#C33B2A]" />
                <AlertDescription className="text-foreground">
                  Al registrarte, aceptas recibir información sobre nuestros programas y cómo puedes ayudar a
                  transformar vidas.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading text-base h-12"
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Crear Cuenta"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  ¿Ya tienes cuenta?{" "}
                  <Link href="/login" className="text-[#1C4E9A] hover:underline font-semibold">
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
