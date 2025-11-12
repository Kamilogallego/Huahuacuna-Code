use client

import Link from "next/link"
import { AuthHeader } from "@/components/auth-header"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, HeartHandshake, Bell, LayoutDashboard } from "lucide-react"

export default function DashboardPage() {
  const sponsoredCount = 1
  const unreadMessages = 1
  const nextEvent = "Visita comunitaria - 25 Nov"

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-[#1C4E9A]">Mi Panel</h1>
          <p className="text-muted-foreground">Resumen de tu impacto y acciones rápidas.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1C4E9A]">
                <HeartHandshake className="h-5 w-5" /> Apadrinamientos
              </CardTitle>
              <CardDescription>Niños y niñas apadrinados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-heading">{sponsoredCount}</div>
              <div className="mt-4">
                <Button asChild className="bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading">
                  <Link href="/apadrinamientos">Explorar más</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1C4E9A]">
                <MessageCircle className="h-5 w-5" /> Mensajes
              </CardTitle>
              <CardDescription>Conversaciones con admins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-4xl font-heading">{unreadMessages}</div>
                {unreadMessages > 0 && <Badge className="bg-[#C33B2A]">sin leer</Badge>}
              </div>
              <div className="mt-4">
                <Button asChild variant="outline">
                  <Link href="/chat/sofia">Ir al chat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1C4E9A]">
                <Bell className="h-5 w-5" /> Próximo
              </CardTitle>
              <CardDescription>Eventos o recordatorios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg">{nextEvent}</div>
              <div className="mt-4">
                <Button asChild variant="ghost" className="text-[#1C4E9A]">
                  <Link href="/notificaciones">Ver notificaciones</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1C4E9A]">
                <LayoutDashboard className="h-5 w-5" /> Acciones rápidas
              </CardTitle>
              <CardDescription>Empieza por aquí</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/apadrinamientos">Buscar a quién apoyar</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/perfil">Actualizar mi perfil</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/ayuda">Centro de ayuda</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}