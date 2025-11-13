"use client"

import { useMemo, useState } from "react"
import { AuthHeader } from "@/components/auth-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Smartphone, Landmark, Banknote, DollarSign, Building2 } from "lucide-react"

export default function DonacionesPage() {
  const [amount, setAmount] = useState<number | null>(50)
  const [method, setMethod] = useState<string>("paypal")
  const [articleTypes, setArticleTypes] = useState<string[]>([])

  const amounts = [10, 25, 50, 100, 250, 500]

  const toggleArticle = (id: string, checked: boolean) => {
    setArticleTypes((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))
  }

  const MoneyGrid = () => (
    <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {amounts.map((a) => {
        const active = amount === a
        return (
          <Button
            key={a}
            type="button"
            variant={active ? "default" : "outline"}
            className={active ? "bg-[#F6C344] text-black hover:bg-[#F6C344]/90" : ""}
            onClick={() => setAmount(a)}
          >
            ${a}
          </Button>
        )
      })}
    </div>
  )

  const PaymentGrid = () => {
    const items = useMemo(
      () => [
        { id: "paypal", label: "PayPal", icon: DollarSign },
        { id: "stripe", label: "Stripe", icon: CreditCard },
        { id: "nequi", label: "Nequi", icon: Smartphone },
        { id: "bancolombia", label: "Bancolombia", icon: Landmark },
        { id: "davivienda", label: "Davivienda", icon: Building2 },
        { id: "pse", label: "PSE", icon: Banknote },
      ],
      []
    )
    return (
      <div className="grid sm:grid-cols-3 gap-3">
        {items.map((opt) => {
          const ActiveIcon = opt.icon
          const active = method === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setMethod(opt.id)}
              className={[
                "rounded-md border px-4 py-4 text-left flex items-center gap-3 transition-colors",
                active ? "border-[#1C4E9A] bg-[#1C4E9A]/5" : "hover:bg-muted",
              ].join(" ")}
            >
              <ActiveIcon className={active ? "text-[#1C4E9A]" : "text-muted-foreground"} />
              <span className="font-medium">{opt.label}</span>
            </button>
          )
        })}
      </div>
    )
  }

  const submitMoney = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      tipo: "dinero",
      amount,
      method,
      nombre: form.get("nombre"),
      email: form.get("email"),
    }
    console.log("[donaciones] dinero:", payload)
    alert("Gracias por tu donación. Te enviaremos las instrucciones de pago.")
  }

  const submitArticles = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      tipo: "articulos",
      categorias: articleTypes,
      descripcion: form.get("descripcion"),
      nombre: form.get("nombre"),
      email: form.get("email"),
    }
    console.log("[donaciones] articulos:", payload)
    alert("Gracias por tu interés en donar artículos. Te contactaremos para coordinar la entrega.")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1C4E9A] mb-2">Donaciones</h1>
          <p className="text-muted-foreground">Elige cómo quieres apoyar: dinero o artículos.</p>
        </div>

        <Tabs defaultValue="dinero" className="space-y-6">
          <TabsList className="grid grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="dinero">Dinero</TabsTrigger>
            <TabsTrigger value="articulos">Artículos</TabsTrigger>
          </TabsList>

          {/* Donaciones con Dinero */}
          <TabsContent value="dinero">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#1C4E9A]">Selecciona un Monto</CardTitle>
                <CardDescription>Elige un monto rápido o ingresa uno personalizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <MoneyGrid />

                <div className="grid md:grid-cols-2 gap-3 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="monto">O ingresa un monto personalizado</Label>
                    <Input
                      id="monto"
                      type="number"
                      inputMode="numeric"
                      placeholder="Monto en USD"
                      onChange={(e) => setAmount(e.currentTarget.value ? Number(e.currentTarget.value) : null)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-heading text-[#1C4E9A]">Método de Pago</h3>
                  <PaymentGrid />
                </div>

                <form onSubmit={submitMoney} className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre Completo *</Label>
                    <Input id="nombre" name="nombre" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" name="email" required />
                  </div>

                  <div className="md:col-span-2">
                    <Button type="submit" className="w-full bg-[#F6C344] hover:bg-[#F6C344]/90 text-black font-heading">
                      Proceder al Pago
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donaciones de Artículos */}
          <TabsContent value="articulos">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#1C4E9A]">¿Qué Artículos Quieres Donar?</CardTitle>
                <CardDescription>Selecciona categorías y descríbelos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: "libros", label: "Libros y Materiales Educativos" },
                    { id: "utiles", label: "Útiles Escolares" },
                    { id: "juguetes", label: "Juguetes" },
                    { id: "ropa", label: "Ropa" },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-3 rounded-md border border-border px-3 py-2">
                      <Checkbox
                        checked={articleTypes.includes(opt.id)}
                        onCheckedChange={(c) => toggleArticle(opt.id, Boolean(c))}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>

                <form onSubmit={submitArticles} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción de los Artículos</Label>
                    <Textarea id="descripcion" name="descripcion" placeholder="Describe los artículos que deseas donar..." />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombreA">Nombre Completo *</Label>
                      <Input id="nombreA" name="nombre" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailA">Email *</Label>
                      <Input id="emailA" type="email" name="email" required />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#F6C344] hover:bg-[#F6C344]/90 text-black font-heading">
                    Enviar Solicitud de Donación
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}