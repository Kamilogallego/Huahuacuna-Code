"use client"

import { useState } from "react"
import { AuthHeader } from "@/components/auth-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function VoluntariadoPage() {
  const [areas, setAreas] = useState<string[]>([])
  const [disponibilidad, setDisponibilidad] = useState<string>("finDeSemana")

  const toggleArea = (id: string, checked: boolean) => {
    setAreas((prev) => (checked ? [...prev, id] : prev.filter((a) => a !== id)))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      nombre: form.get("nombre") as string,
      email: form.get("email") as string,
      telefono: form.get("telefono") as string,
      areas,
      disponibilidad,
    }
    console.log("[voluntariado] payload:", payload)
    alert("¡Gracias por registrarte como voluntario! Te contactaremos pronto.")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1C4E9A] mb-2">Únete como Voluntario</h1>
          <p className="text-muted-foreground">Tu tiempo y talento pueden transformar vidas. Regístrate hoy.</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#1C4E9A]">Información Personal</CardTitle>
            <CardDescription>Cuéntanos sobre ti</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input id="nombre" name="nombre" required placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" name="email" required placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input id="telefono" name="telefono" required placeholder="+57 300 000 0000" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-heading text-[#1C4E9A]">Áreas de Interés</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: "educacion", label: "Educación y Tutoría" },
                    { id: "deportes", label: "Deportes y Recreación" },
                    { id: "salud", label: "Salud" },
                    { id: "cultura", label: "Artes y Cultura" },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-3 rounded-md border border-border px-3 py-2">
                      <Checkbox
                        checked={areas.includes(opt.id)}
                        onCheckedChange={(c) => toggleArea(opt.id, Boolean(c))}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-heading text-[#1C4E9A]">Disponibilidad</h3>
                <RadioGroup
                  value={disponibilidad}
                  onValueChange={setDisponibilidad}
                  className="grid sm:grid-cols-3 gap-3"
                >
                  {[
                    { id: "finDeSemana", label: "Fines de semana" },
                    { id: "entreSemana", label: "Entre semana" },
                    { id: "flexible", label: "Flexible" },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-3 rounded-md border border-border px-3 py-2 cursor-pointer"
                    >
                      <RadioGroupItem value={opt.id} id={opt.id} />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full md:w-auto bg-[#F6C344] hover:bg-[#F6C344]/90 text-black font-heading">
                Registrarse como Voluntario
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

