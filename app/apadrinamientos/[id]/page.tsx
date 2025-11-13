"use client"

import { useEffect, useState } from "react"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, MapPin, Calendar, ArrowLeft, CheckCircle2, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getApadrinamientoById, type ChildDetailResponse } from "@/lib/services/apadrinamientos.service"

export default function ChildProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [child, setChild] = useState<ChildDetailResponse | null>(null)
  const [fetchLoading, setFetchLoading] = useState(true)

  // Fetch child details from API
  useEffect(() => {
    const fetchChild = async () => {
      setFetchLoading(true)
      try {
        const data = await getApadrinamientoById(params.id)
        setChild(data)
      } catch (error) {
        console.error("Failed to fetch child details:", error)
      } finally {
        setFetchLoading(false)
      }
    }

    fetchChild()
  }, [params.id])

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
        <AuthHeader />
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="text-center py-16">
            <CardContent>
              <p className="text-muted-foreground">Cargando información del niño...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (!child) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
        <AuthHeader />
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="text-center py-16">
            <CardContent>
              <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-heading font-bold text-[#1C4E9A] mb-2">Niño no encontrado</h2>
              <p className="text-muted-foreground mb-6">El niño que buscas no está disponible</p>
              <Button asChild className="bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading">
                <Link href="/apadrinamientos">Volver al catálogo</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const handleConfirmSponsorship = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsConfirmDialogOpen(false)
      setIsSuccessDialogOpen(true)
      console.log("[v0] Sponsorship confirmed for child:", child.id)
    }, 1500)
  }

  const handleSuccessClose = () => {
    setIsSuccessDialogOpen(false)
    router.push("/mis-apadrinamientos")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <Button variant="ghost" asChild className="mb-6 text-[#1C4E9A] hover:text-[#1C4E9A]/80">
          <Link href="/apadrinamientos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al catálogo
          </Link>
        </Button>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Columna izquierda - Foto e info básica */}
          <div className="md:col-span-2">
            <Card className="sticky top-6">
              <div className="relative h-96 overflow-hidden rounded-t-lg">
                <Image src={child.foto || "/placeholder.svg"} alt={child.nombre} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#5CA244] hover:bg-[#5CA244]/90 text-base px-4 py-2">Disponible</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-3xl font-heading text-[#1C4E9A]">{child.nombre}</CardTitle>
                <div className="flex flex-col gap-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{child.edad} años</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{child.municipio}, Quindío</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setIsConfirmDialogOpen(true)} className="w-full bg-[#C33B2A] hover:bg-[#C33B2A]/90 font-heading text-lg h-14">
                  <Heart className="mr-2 h-5 w-5" />
                  Apadrinar a {child.nombre}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha - Detalle */}
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Historia de {child.nombre}</CardTitle>
                <CardDescription>Conoce más sobre su vida y sus sueños</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{child.historiaCompleta}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Necesidades Actuales</CardTitle>
                <CardDescription>Cómo tu apadrinamiento ayudará</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {child.necesidades.map((n, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 p-1 bg-[#5CA244] rounded-full">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-muted-foreground">{n}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-[#1C4E9A] to-[#5CA244] text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">¿Qué incluye el apadrinamiento?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" /><p className="text-white/90">Educación completa: matrícula, uniforme, útiles y transporte</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" /><p className="text-white/90">Atención médica y odontológica anual</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" /><p className="text-white/90">Vestido, calzado y artículos de aseo</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" /><p className="text-white/90">Actividades de esparcimiento y desarrollo integral</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" /><p className="text-white/90">Comunicación directa con administradores sobre el progreso</p></div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Confirmación */}
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading text-[#1C4E9A]">Confirmar Apadrinamiento</DialogTitle>
              <DialogDescription>Estás a punto de cambiar la vida de {child.nombre}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={child.foto || "/placeholder.svg"} alt={child.nombre} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-[#1C4E9A]">{child.nombre}</h3>
                  <p className="text-sm text-muted-foreground">{child.edad} años - {child.municipio}</p>
                </div>
              </div>

              <Alert className="bg-[#F6C344]/10 border-[#F6C344]">
                <Heart className="h-4 w-4 text-[#C33B2A]" />
                <AlertDescription className="text-foreground">
                  Al confirmar, {child.nombre} será asignado a tu cuenta y recibirás un correo de confirmación con los próximos pasos.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)} disabled={loading} className="w-full sm:w-auto">
                Cancelar
              </Button>
              <Button onClick={handleConfirmSponsorship} disabled={loading} className="w-full sm:w-auto bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading">
                {loading ? "Procesando..." : "Confirmar Apadrinamiento"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Éxito */}
        <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="mx-auto w-16 h-16 bg-[#5CA244] rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <DialogTitle className="text-2xl font-heading text-[#1C4E9A] text-center">¡Apadrinamiento Confirmado!</DialogTitle>
              <DialogDescription className="text-center">Gracias por transformar la vida de {child.nombre}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Alert className="bg-[#5CA244]/10 border-[#5CA244]">
                <Mail className="h-4 w-4 text-[#5CA244]" />
                <AlertDescription className="text-foreground">
                  Hemos enviado un correo de confirmación con toda la información sobre tu apadrinamiento.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button onClick={handleSuccessClose} className="w-full bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 font-heading">
                Ver Mis Apadrinamientos
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}