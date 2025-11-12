"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, DollarSign, Calendar, User, ShoppingBag, History, CheckCircle2, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function PerfilApadrinadorPage() {
  const [activeSection, setActiveSection] = useState("perfil")
  const router = useRouter()

  // Mock data
  const userData = {
    nombre: "María González",
    email: "padrino@huahuacuna.org",
    foto: "/colombian-woman-smiling.jpg",
    estado: "Apadrinador Aprobado",
    ninosApadrinados: 2,
    totalDonado: 2400000,
    ultimaDonacion: "15 de Marzo, 2024",
  }

  const menuItems = [
    { id: "perfil", label: "Mi Perfil", icon: User },
    { id: "catalogo", label: "Catálogo", icon: ShoppingBag },
    { id: "donaciones", label: "Donaciones", icon: DollarSign },
    { id: "historial", label: "Historial", icon: History },
  ]

  useEffect(() => {
    // Redirect if user is not authenticated
    // Example condition: if (!isAuthenticated) router.push('/login')
  }, [router])

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-gradient-to-b from-[#1C4E9A] to-[#1C4E9A]/90 text-white p-6">
          <div className="mb-8">
            <h2 className="text-xl font-heading font-bold mb-2">Panel de Padrino</h2>
            <p className="text-sm text-white/80">Bienvenido de nuevo</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-heading ${
                    activeSection === item.id ? "bg-white text-[#1C4E9A] shadow-lg" : "text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <p className="text-xs text-white/80 mb-2">Impacto Total</p>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-[#F6C344]" />
              <span className="text-lg font-bold">{userData.ninosApadrinados} Niños</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gradient-to-br from-[#F6C344]/5 via-white to-[#5CA244]/5">
          {activeSection === "perfil" && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-heading font-bold text-[#1C4E9A] mb-2">Mi Perfil</h1>
                <p className="text-muted-foreground">Información de tu cuenta y estadísticas</p>
              </div>

              {/* User Info Card */}
              <Card className="mb-6 border-[#1C4E9A]/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24 border-4 border-[#1C4E9A]/20">
                      <AvatarImage src={userData.foto || "/placeholder.svg"} alt={userData.nombre} />
                      <AvatarFallback className="bg-[#1C4E9A] text-white text-2xl">
                        {userData.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-2xl font-heading font-bold text-[#1C4E9A] mb-1">{userData.nombre}</h2>
                      <p className="text-muted-foreground mb-3">{userData.email}</p>
                      <Badge className="bg-[#5CA244] hover:bg-[#5CA244]/90 text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {userData.estado}
                      </Badge>
                    </div>
                    <Button asChild className="bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading">
                      <Link href="/perfil">Editar Perfil</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="border-[#5CA244]/30 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-heading text-muted-foreground">Niños Apadrinados</CardTitle>
                      <div className="p-2 bg-[#5CA244]/10 rounded-lg">
                        <Users className="h-5 w-5 text-[#5CA244]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[#1C4E9A]">{userData.ninosApadrinados}</span>
                      <span className="text-sm text-muted-foreground">niños</span>
                    </div>
                    <Button asChild variant="link" className="text-[#5CA244] hover:text-[#5CA244]/80 p-0 h-auto mt-2">
                      <Link href="/mis-apadrinamientos">Ver mis apadrinados →</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-[#1C4E9A]/30 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-heading text-muted-foreground">Total Donado</CardTitle>
                      <div className="p-2 bg-[#1C4E9A]/10 rounded-lg">
                        <DollarSign className="h-5 w-5 text-[#1C4E9A]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[#1C4E9A]">
                        ${(userData.totalDonado / 1000).toFixed(0)}K
                      </span>
                      <span className="text-sm text-muted-foreground">COP</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-[#5CA244] text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>+12% este mes</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#F6C344]/30 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-heading text-muted-foreground">Última Donación</CardTitle>
                      <div className="p-2 bg-[#F6C344]/10 rounded-lg">
                        <Calendar className="h-5 w-5 text-[#F6C344]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-semibold text-[#1C4E9A] mb-1">{userData.ultimaDonacion}</div>
                    <p className="text-sm text-muted-foreground">Hace 12 días</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="border-[#1C4E9A]/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-[#1C4E9A]">Acciones Rápidas</CardTitle>
                  <CardDescription>Gestiona tus apadrinamientos y donaciones</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <Button asChild className="bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading h-12 text-base" size="lg">
                    <Link href="/apadrinamientos">
                      <Heart className="mr-2 h-5 w-5" />
                      Apadrinar un Niño
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#1C4E9A] text-[#1C4E9A] hover:bg-[#1C4E9A]/10 font-heading h-12 text-base bg-transparent"
                    size="lg"
                  >
                    <Link href="/mis-apadrinamientos">
                      <Users className="mr-2 h-5 w-5" />
                      Ver Mis Apadrinados
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "catalogo" && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-heading font-bold text-[#1C4E9A] mb-2">Catálogo de Niños</h1>
                <p className="text-muted-foreground">Encuentra un niño para apadrinar</p>
              </div>
              <Card className="border-[#5CA244]/20">
                <CardContent className="p-12 text-center">
                  <ShoppingBag className="h-16 w-16 text-[#5CA244] mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-semibold text-[#1C4E9A] mb-2">Explora Niños Disponibles</h3>
                  <p className="text-muted-foreground mb-6">
                    Descubre los niños que necesitan tu apoyo y cambia una vida
                  </p>
                  <Button asChild className="bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading">
                    <Link href="/apadrinamientos">Ir al Catálogo</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "donaciones" && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-heading font-bold text-[#1C4E9A] mb-2">Mis Donaciones</h1>
                <p className="text-muted-foreground">Historial de contribuciones</p>
              </div>
              <Card className="border-[#1C4E9A]/20">
                <CardContent className="p-12 text-center">
                  <DollarSign className="h-16 w-16 text-[#1C4E9A] mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-semibold text-[#1C4E9A] mb-2">Historial de Donaciones</h3>
                  <p className="text-muted-foreground mb-2">Total donado: ${userData.totalDonado.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Próximamente: Detalles completos de donaciones</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "historial" && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-heading font-bold text-[#1C4E9A] mb-2">Historial</h1>
                <p className="text-muted-foreground">Actividad reciente</p>
              </div>
              <Card className="border-[#5CA244]/20">
                <CardContent className="p-12 text-center">
                  <History className="h-16 w-16 text-[#5CA244] mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-semibold text-[#1C4E9A] mb-2">Actividad Reciente</h3>
                  <p className="text-muted-foreground mb-6">Revisa tu historial de apadrinamientos y donaciones</p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#5CA244] text-[#5CA244] font-heading bg-transparent"
                  >
                    <Link href="/mis-apadrinamientos">Ver Mis Apadrinamientos</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
