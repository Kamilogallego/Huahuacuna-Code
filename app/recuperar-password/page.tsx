"use client"

import type React from "react"

import { useState } from "react"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Por favor ingresa tu correo electrónico")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Por favor ingresa un correo electrónico válido")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
    }, 1500)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#5CA244]/10 via-background to-[#F6C344]/10">
        <AuthHeader />
        <main className="container mx-auto px-4 py-12 max-w-md">
          <Card className="shadow-lg border-2 border-[#5CA244]">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-[#5CA244] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Correo Enviado</CardTitle>
              <CardDescription className="text-base">
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-[#F6C344]/10 border-[#F6C344]">
                <Mail className="h-4 w-4 text-[#1C4E9A]" />
                <AlertDescription className="text-foreground">
                  El enlace es válido por 1 hora. Revisa tu bandeja de entrada y spam.
                </AlertDescription>
              </Alert>
              <Button asChild className="w-full bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al inicio de sesión
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5CA244]/10 via-background to-[#F6C344]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-md">
        <Button variant="ghost" asChild className="mb-6 text-[#1C4E9A] hover:text-[#1C4E9A]/80">
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio de sesión
          </Link>
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-[#1C4E9A] mb-4">Recuperar Contraseña</h1>
          <p className="text-muted-foreground text-pretty">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-heading text-[#1C4E9A]">Solicitar Recuperación</CardTitle>
            <CardDescription>Recibirás un correo con instrucciones</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-[#C33B2A]/10 border-[#C33B2A]">
                  <AlertDescription className="text-[#C33B2A]">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="font-heading">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading text-base h-12"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Enlace de Recuperación"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                ¿Recordaste tu contraseña?{" "}
                <Link href="/login" className="text-[#1C4E9A] hover:underline font-semibold">
                  Inicia sesión
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
