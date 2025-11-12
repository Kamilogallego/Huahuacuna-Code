"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, User } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")

    // If user is a sponsor (padrino), redirect to sponsor profile
    if (userEmail === "padrino@huahuacuna.org") {
      router.push("/perfil-apadrinador")
      return
    }

    // If no user is logged in, redirect to login
    if (!userEmail) {
      router.push("/login")
      return
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#1C4E9A]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1C4E9A] mb-4">Dashboard Administrativo</h1>
          <p className="text-lg text-muted-foreground">Panel de control para administradores</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#1C4E9A]/10 rounded-lg">
                  <User className="h-6 w-6 text-[#1C4E9A]" />
                </div>
                <div>
                  <CardTitle className="font-heading text-[#1C4E9A]">Mi Perfil</CardTitle>
                  <CardDescription>Gestiona tu información</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading">
                <Link href="/perfil">Ver Perfil</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#5CA244]/10 rounded-lg">
                  <Heart className="h-6 w-6 text-[#5CA244]" />
                </div>
                <div>
                  <CardTitle className="font-heading text-[#1C4E9A]">Apadrinamientos</CardTitle>
                  <CardDescription>Gestionar apadrinamientos</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-[#5CA244] text-[#5CA244] font-heading bg-transparent"
              >
                <Link href="/admin/apadrinamientos">Ver Historial</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#F6C344]/10 rounded-lg">
                  <Shield className="h-6 w-6 text-[#F6C344]" />
                </div>
                <div>
                  <CardTitle className="font-heading text-[#1C4E9A]">Usuarios</CardTitle>
                  <CardDescription>Gestión de usuarios</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-[#1C4E9A] text-[#1C4E9A] font-heading bg-transparent"
              >
                <Link href="/admin/usuarios">Gestionar Usuarios</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-to-r from-[#1C4E9A] to-[#5CA244] text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-heading">Panel Administrativo</CardTitle>
            <CardDescription className="text-white/90">Fundación Huahuacuna</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/90 leading-relaxed">
              Desde aquí puedes gestionar usuarios, apadrinamientos y toda la información de la fundación.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
