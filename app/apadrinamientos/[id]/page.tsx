"use client"

import { useState } from "react"
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

type Child = {
  id: string
  nombre: string
  edad: number
  genero: "M" | "F"
  municipio: string
  descripcion: string
  historiaCompleta: string
  necesidades: string[]
  foto: string
  estado: "disponible" | "apadrinado"
}

const MOCK_CHILDREN: Record<string, Child> = {
  "1": {
    id: "1",
    nombre: "Sofía",
    edad: 8,
    genero: "F",
    municipio: "Armenia",
    descripcion: "Le encanta dibujar y sueña con ser artista. Necesita apoyo para continuar sus estudios.",
    historiaCompleta:
      "Sofía es una niña alegre y creativa de 8 años que vive en Armenia con su abuela. Desde pequeña ha mostrado un talento especial para el dibujo y la pintura. A pesar de las dificultades económicas de su familia, Sofía mantiene su espíritu positivo y sueña con algún día poder estudiar arte. Le encanta ir a la escuela y es muy aplicada en sus estudios. Su mayor deseo es poder tener materiales de arte para desarrollar su talento.",
    necesidades: [
      "Matrícula y útiles escolares",
      "Materiales de arte (pinturas, pinceles, papel)",
      "Uniforme y calzado escolar",
      "Apoyo nutricional",
    ],
    foto: "/young-colombian-girl-smiling.jpg",
    estado: "disponible",
  },
  "2": {
    id: "2",
    nombre: "Carlos",
    edad: 10,
    genero: "M",
    municipio: "Calarcá",
    descripcion: "Apasionado por el fútbol y las matemáticas. Busca oportunidades para desarrollar su potencial.",
    historiaCompleta:
      "Carlos tiene 10 años y vive en Calarcá con su madre y dos hermanos menores. Es un niño muy inteligente y responsable que ayuda a su mamá cuidando a sus hermanos. Le apasionan las matemáticas y el fútbol. Sueña con ser ingeniero y jugar profesionalmente. A pesar de las limitaciones económicas, Carlos se esfuerza mucho en la escuela y siempre busca aprender más.",
    necesidades: [
      "Matrícula y útiles escolares",
      "Uniforme deportivo",
      "Calzado escolar y deportivo",
      "Apoyo en alimentación",
    ],
    foto: "/young-colombian-boy-smiling.jpg",
    estado: "disponible",
  },
}

export default function ChildProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const child = MOCK_CHILDREN[params.id]

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

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setIsConfirmDialogOpen(false)
      setIsSuccessDialogOpen(true)

      // Simulate sending email and updating database
      console.log("[v0] Sponsorship confirmed for child:", child.id)
      console.log("[v0] Email sent to sponsor")
      console.log("[v0] Child status updated to 'apadrinado'")
      console.log("[v0] Sponsor-child relationship created in database")
    }, 2000)
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
          {/* Left Column - Photo and Basic Info */}
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
                <Button
                  onClick={() => setIsConfirmDialogOpen(true)}
                  className="w-full bg-[#C33B2A] hover:bg-[#C33B2A]/90 font-heading text-lg h-14"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Apadrinar a {child.nombre}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
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
                  {child.necesidades.map((necesidad, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 p-1 bg-[#5CA244] rounded-full">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-muted-foreground">{necesidad}</span>
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
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">Educación completa: matrícula, uniforme, útiles y transporte</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">Atención médica y odontológica anual</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">Vestido, calzado y artículos de aseo</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">Actividades de esparcimiento y desarrollo integral</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">Comunicación directa con administradores sobre el progreso</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Confirmation Dialog */}
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
                  <p className="text-sm text-muted-foreground">
                    {child.edad} años - {child.municipio}
                  </p>
                </div>
              </div>

              <Alert className="bg-[#F6C344]/10 border-[#F6C344]">
                <Heart className="h-4 w-4 text-[#C33B2A]" />
                <AlertDescription className="text-foreground">
                  Al confirmar, {child.nombre} será asignado a tu cuenta y recibirás un correo de confirmación con los
                  próximos pasos.
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-heading font-semibold text-sm">Tu compromiso incluye:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Apoyo mensual para las necesidades del niño</li>
                  <li>• Seguimiento del progreso educativo</li>
                  <li>• Comunicación con administradores</li>
                </ul>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsConfirmDialogOpen(false)}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmSponsorship}
                disabled={loading}
                className="w-full sm:w-auto bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading"
              >
                {loading ? "Procesando..." : "Confirmar Apadrinamiento"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="mx-auto w-16 h-16 bg-[#5CA244] rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <DialogTitle className="text-2xl font-heading text-[#1C4E9A] text-center">
                ¡Apadrinamiento Confirmado!
              </DialogTitle>
              <DialogDescription className="text-center">
                Gracias por transformar la vida de {child.nombre}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Alert className="bg-[#5CA244]/10 border-[#5CA244]">
                <Mail className="h-4 w-4 text-[#5CA244]" />
                <AlertDescription className="text-foreground">
                  Hemos enviado un correo de confirmación con toda la información sobre tu apadrinamiento.
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-heading font-semibold text-sm mb-2">Próximos pasos:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>1. Revisa tu correo para detalles del apadrinamiento</li>
                  <li>2. Accede al perfil completo de {child.nombre}</li>
                  <li>3. Comunícate con administradores cuando lo necesites</li>
                </ul>
              </div>
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
