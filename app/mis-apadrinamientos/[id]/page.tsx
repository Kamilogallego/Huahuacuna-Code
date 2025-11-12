"use client"

import { useState } from "react"
import { AuthHeader } from "@/components/auth-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  MapPin,
  Calendar,
  ArrowLeft,
  MessageCircle,
  Download,
  GraduationCap,
  Stethoscope,
  Home,
  Users,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type SponsoredChildDetail = {
  id: string
  nombre: string
  nombreCompleto: string
  fechaNacimiento: string
  edad: number
  genero: "M" | "F"
  municipio: string
  direccion: string
  foto: string
  historia: string
  necesidades: string[]
  situacionFamiliar: string
  educacion: {
    grado: string
    institucion: string
    rendimiento: string
  }
  salud: {
    estado: string
    ultimoControl: string
    observaciones: string
  }
  fechaApadrinamiento: string
  actualizaciones: Array<{
    fecha: string
    tipo: string
    descripcion: string
  }>
}

const MOCK_CHILD: SponsoredChildDetail = {
  id: "1",
  nombre: "Sofía",
  nombreCompleto: "Sofía Valentina Rodríguez García",
  fechaNacimiento: "2016-03-15",
  edad: 8,
  genero: "F",
  municipio: "Armenia",
  direccion: "Barrio La Esperanza, Armenia, Quindío",
  foto: "/young-colombian-girl-smiling.jpg",
  historia:
    "Sofía es una niña alegre y creativa de 8 años que vive en Armenia con su abuela materna, doña Rosa. Su madre trabaja en otra ciudad y la visita cada mes. Desde pequeña ha mostrado un talento especial para el dibujo y la pintura, pasando horas creando hermosas obras de arte con los pocos materiales que tiene. A pesar de las dificultades económicas de su familia, Sofía mantiene su espíritu positivo y sueña con algún día poder estudiar arte en una universidad. Le encanta ir a la escuela, donde es muy aplicada en sus estudios y ayuda a sus compañeros. Su profesora la describe como una niña sensible, responsable y con un gran corazón. En su tiempo libre, le gusta leer cuentos y crear historias ilustradas. Su mayor deseo es poder tener materiales de arte profesionales para desarrollar su talento y algún día exponer sus obras.",
  necesidades: [
    "Matrícula y pensión escolar",
    "Uniforme completo y calzado escolar",
    "Útiles escolares y materiales de arte",
    "Apoyo nutricional mensual",
    "Controles médicos y odontológicos",
    "Vestido y calzado para uso diario",
  ],
  situacionFamiliar:
    "Vive con su abuela Rosa (65 años) quien se dedica a labores del hogar. Su madre, María, trabaja como empleada doméstica en Bogotá y envía ayuda económica mensual limitada. Sofía es hija única y mantiene contacto telefónico regular con su madre. La familia vive en una casa arrendada de dos habitaciones en el barrio La Esperanza.",
  educacion: {
    grado: "3° de Primaria",
    institucion: "Institución Educativa Simón Bolívar",
    rendimiento: "Excelente - Promedio académico: 4.5/5.0. Destaca en artes y español.",
  },
  salud: {
    estado: "Bueno",
    ultimoControl: "15 de febrero de 2024",
    observaciones:
      "Desarrollo físico y mental acorde a su edad. Requiere control odontológico para ortodoncia preventiva.",
  },
  fechaApadrinamiento: "2024-01-15",
  actualizaciones: [
    {
      fecha: "2024-03-10",
      tipo: "Educación",
      descripcion:
        "Sofía obtuvo el primer puesto en el concurso de dibujo escolar. Su obra será exhibida en la biblioteca municipal.",
    },
    {
      fecha: "2024-02-20",
      tipo: "Salud",
      descripcion: "Control médico realizado. Peso y talla adecuados para su edad. Vacunas al día.",
    },
    {
      fecha: "2024-02-01",
      tipo: "General",
      descripcion: "Recibió kit escolar completo y uniforme nuevo. Muy emocionada por sus nuevos materiales de arte.",
    },
    {
      fecha: "2024-01-15",
      tipo: "Apadrinamiento",
      descripcion: "Inicio del apadrinamiento. Sofía y su familia muy agradecidos por el apoyo recibido.",
    },
  ],
}

export default function SponsoredChildProfilePage({ params }: { params: { id: string } }) {
  const [downloading, setDownloading] = useState(false)

  const child = MOCK_CHILD

  const handleDownloadBitacora = () => {
    setDownloading(true)
    // Simulate download
    setTimeout(() => {
      console.log("[v0] Downloading bitácora for child:", child.id)
      setDownloading(false)
      // In real implementation, this would trigger a PDF download
    }, 1500)
  }

  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <Button variant="ghost" asChild className="mb-6 text-[#1C4E9A] hover:text-[#1C4E9A]/80">
          <Link href="/mis-apadrinamientos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Mis Apadrinamientos
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Photo and Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <div className="relative h-80 overflow-hidden rounded-t-lg">
                <Image src={child.foto || "/placeholder.svg"} alt={child.nombre} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#5CA244] hover:bg-[#5CA244]/90 text-base px-4 py-2">Activo</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-[#1C4E9A]">{child.nombreCompleto}</CardTitle>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {calcularEdad(child.fechaNacimiento)} años (
                      {new Date(child.fechaNacimiento).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      )
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{child.municipio}, Quindío</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-[#C33B2A]" />
                    <span>
                      Apadrinado desde{" "}
                      {new Date(child.fechaApadrinamiento).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading">
                  <Link href={`/chat/${child.id}`}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Abrir Chat
                  </Link>
                </Button>
                <Button
                  onClick={handleDownloadBitacora}
                  disabled={downloading}
                  variant="outline"
                  className="w-full border-[#1C4E9A] text-[#1C4E9A] font-heading bg-transparent"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {downloading ? "Descargando..." : "Descargar Bitácora"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="historia" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="historia">Historia</TabsTrigger>
                <TabsTrigger value="educacion">Educación</TabsTrigger>
                <TabsTrigger value="salud">Salud</TabsTrigger>
                <TabsTrigger value="actualizaciones">Actualizaciones</TabsTrigger>
              </TabsList>

              <TabsContent value="historia" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Historia de {child.nombre}</CardTitle>
                    <CardDescription>Conoce su vida, sueños y aspiraciones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{child.historia}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-[#1C4E9A]" />
                      <CardTitle className="text-xl font-heading text-[#1C4E9A]">Situación Familiar</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{child.situacionFamiliar}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-[#1C4E9A]" />
                      <CardTitle className="text-xl font-heading text-[#1C4E9A]">Ubicación</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{child.direccion}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-heading text-[#1C4E9A]">Necesidades Actuales</CardTitle>
                    <CardDescription>Áreas donde tu apadrinamiento está ayudando</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {child.necesidades.map((necesidad, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1 p-1 bg-[#5CA244] rounded-full flex-shrink-0">
                            <Heart className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-muted-foreground">{necesidad}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="educacion" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-6 w-6 text-[#1C4E9A]" />
                      <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Información Educativa</CardTitle>
                    </div>
                    <CardDescription>Progreso académico y desarrollo escolar</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-heading font-semibold text-[#1C4E9A]">Grado Actual</h4>
                        <p className="text-muted-foreground">{child.educacion.grado}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-heading font-semibold text-[#1C4E9A]">Institución Educativa</h4>
                        <p className="text-muted-foreground">{child.educacion.institucion}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-heading font-semibold text-[#1C4E9A]">Rendimiento Académico</h4>
                      <Alert className="bg-[#5CA244]/10 border-[#5CA244]">
                        <GraduationCap className="h-4 w-4 text-[#5CA244]" />
                        <AlertDescription className="text-foreground">{child.educacion.rendimiento}</AlertDescription>
                      </Alert>
                    </div>

                    <div className="bg-gradient-to-r from-[#F6C344]/10 to-[#5CA244]/10 p-6 rounded-lg">
                      <h4 className="font-heading font-semibold text-[#1C4E9A] mb-3">Apoyo Educativo Proporcionado</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>✓ Matrícula y pensión escolar cubierta</li>
                        <li>✓ Uniforme completo y calzado escolar</li>
                        <li>✓ Útiles escolares y materiales educativos</li>
                        <li>✓ Transporte escolar diario</li>
                        <li>✓ Refrigerio escolar</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="salud" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-6 w-6 text-[#1C4E9A]" />
                      <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Información de Salud</CardTitle>
                    </div>
                    <CardDescription>Estado de salud y controles médicos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-heading font-semibold text-[#1C4E9A]">Estado General</h4>
                        <Badge className="bg-[#5CA244] hover:bg-[#5CA244]/90">{child.salud.estado}</Badge>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-heading font-semibold text-[#1C4E9A]">Último Control</h4>
                        <p className="text-muted-foreground">
                          {new Date(child.salud.ultimoControl).toLocaleDateString("es-CO", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-heading font-semibold text-[#1C4E9A]">Observaciones Médicas</h4>
                      <Alert className="bg-[#1C4E9A]/10 border-[#1C4E9A]">
                        <Stethoscope className="h-4 w-4 text-[#1C4E9A]" />
                        <AlertDescription className="text-foreground">{child.salud.observaciones}</AlertDescription>
                      </Alert>
                    </div>

                    <div className="bg-gradient-to-r from-[#1C4E9A]/10 to-[#5CA244]/10 p-6 rounded-lg">
                      <h4 className="font-heading font-semibold text-[#1C4E9A] mb-3">Atención Médica Proporcionada</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>✓ Control médico general anual</li>
                        <li>✓ Control odontológico anual</li>
                        <li>✓ Vacunación completa según esquema</li>
                        <li>✓ Atención médica especializada cuando se requiere</li>
                        <li>✓ Medicamentos necesarios</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="actualizaciones" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading text-[#1C4E9A]">Actualizaciones Recientes</CardTitle>
                    <CardDescription>Últimas novedades sobre {child.nombre}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {child.actualizaciones.map((actualizacion, index) => (
                        <div key={index} className="border-l-4 border-[#5CA244] pl-4 py-3 bg-muted/30 rounded-r-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge
                              variant="secondary"
                              className={
                                actualizacion.tipo === "Educación"
                                  ? "bg-[#1C4E9A]/20 text-[#1C4E9A]"
                                  : actualizacion.tipo === "Salud"
                                    ? "bg-[#5CA244]/20 text-[#5CA244]"
                                    : "bg-[#F6C344]/20 text-[#1E1E1E]"
                              }
                            >
                              {actualizacion.tipo}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(actualizacion.fecha).toLocaleDateString("es-CO", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{actualizacion.descripcion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Alert className="bg-[#F6C344]/10 border-[#F6C344]">
                  <MessageCircle className="h-4 w-4 text-[#1C4E9A]" />
                  <AlertDescription className="text-foreground">
                    ¿Tienes preguntas sobre {child.nombre}? Usa el chat para comunicarte directamente con nuestros
                    administradores.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
