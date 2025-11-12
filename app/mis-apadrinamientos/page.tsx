"use client"

import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChatNotificationBadge } from "@/components/chat-notification-badge"
import { Heart, MessageCircle, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type SponsoredChild = {
  id: string
  nombre: string
  edad: number
  municipio: string
  foto: string
  fechaApadrinamiento: string
  ultimaActualizacion: string
}

const MOCK_SPONSORED_CHILDREN: SponsoredChild[] = [
  {
    id: "1",
    nombre: "Sofía",
    edad: 8,
    municipio: "Armenia",
    foto: "/young-colombian-girl-smiling.jpg",
    fechaApadrinamiento: "2024-01-15",
    ultimaActualizacion: "2024-03-10",
  },
]

export default function MisApadrinamientosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1C4E9A] mb-4">Mis Apadrinamientos</h1>
            <p className="text-lg text-muted-foreground">Los niños que estás ayudando a transformar</p>
          </div>
          <Button asChild variant="outline" className="border-[#1C4E9A] text-[#1C4E9A] bg-transparent">
            <Link href="/dashboard">Ir al Dashboard</Link>
          </Button>
        </div>

        {MOCK_SPONSORED_CHILDREN.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SPONSORED_CHILDREN.map((child) => (
              <Card key={child.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image src={child.foto || "/placeholder.svg"} alt={child.nombre} fill className="object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-[#5CA244] hover:bg-[#5CA244]/90">Activo</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-heading text-[#1C4E9A]">{child.nombre}</CardTitle>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{child.edad} años</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{child.municipio}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <strong>Apadrinado desde:</strong>{" "}
                      {new Date(child.fechaApadrinamiento).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1 bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading">
                      <Link href={`/mis-apadrinamientos/${child.id}`}>Ver Perfil</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="border-[#5CA244] text-[#5CA244] bg-transparent relative"
                    >
                      <Link href={`/chat/${child.id}`}>
                        <MessageCircle className="h-4 w-4" />
                        <ChatNotificationBadge
                          childId={child.id}
                          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                        />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-16">
            <CardContent className="text-center">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-heading font-semibold text-[#1C4E9A] mb-2">
                Aún no tienes niños apadrinados
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Comienza a transformar vidas apadrinando a un niño vulnerable
              </p>
              <Button asChild className="bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading">
                <Link href="/apadrinamientos">
                  <Heart className="mr-2 h-4 w-4" />
                  Explorar Niños Disponibles
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
