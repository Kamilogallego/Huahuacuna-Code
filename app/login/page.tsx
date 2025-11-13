"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos")
      return
    }

    setLoading(true)

    setTimeout(() => {
      const redirect = searchParams.get("redirect") || undefined

      if (formData.email === "admin@huahuacuna.org" && formData.password === "Admin123") {
        try {
          localStorage.setItem("userEmail", formData.email)
          localStorage.setItem("userRole", "admin")
        } catch {}
        setLoading(false)
        router.push("/dashboard")
      } else if (formData.email === "padrino@huahuacuna.org" && formData.password === "Padrino123") {
        try {
          localStorage.setItem("userEmail", formData.email)
          localStorage.setItem("userRole", "padrino")
        } catch {}
        setLoading(false)
        router.push(redirect || "/perfil-apadrinador")
      } else {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        if (newAttempts >= 5) {
          setError("Cuenta bloqueada temporalmente por 15 minutos debido a múltiples intentos fallidos")
        } else {
          setError("Credenciales incorrectas. Por favor verifica tu email y contraseña.")
        }
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#1C4E9A]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1C4E9A] mb-4">Bienvenido</h1>
          <p className="text-lg text-muted-foreground text-pretty">Inicia sesión para continuar transformando vidas</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-[#C33B2A]/10 border-[#C33B2A] text-foreground">
                  <AlertCircle className="h-4 w-4 text-[#C33B2A]" />
                  <AlertDescription className="text-[#C33B2A]">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="font-heading">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    disabled={attempts >= 5}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-heading">Contraseña</Label>
                  <Link href="/recuperar-password" className="text-sm text-[#1C4E9A] hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className="pl-10"
                    disabled={attempts >= 5}
                  />
                </div>
              </div>

              {attempts > 0 && attempts < 5 && (
                <p className="text-sm text-[#C33B2A]">Intentos fallidos: {attempts}/5</p>
              )}

              <Button type="submit" className="w-full bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading text-base h-12" disabled={loading || attempts >= 5}>
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">¿Nuevo en Huahuacuna?</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full border-[#5CA244] text-[#5CA244] hover:bg-[#5CA244]/10 font-heading bg-transparent" asChild>
                <Link href="/registro">Crear Cuenta de Padrino</Link>
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">Demo: admin@huahuacuna.org / Admin123</p>
        <p className="text-center text-xs text-muted-foreground">Padrino: padrino@huahuacuna.org / Padrino123</p>
      </main>
    </div>
  )
}