"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AuthHeader } from "@/components/auth-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Child = {
  id: string
  name: string
  age: number
  community: string
  interests: string[]
  image?: string
}

const MOCK_CHILDREN: Child[] = [
  { id: "sofia", name: "Sofía", age: 8, community: "Inzá, Cauca", interests: ["arte", "lectura", "dibujo"] },
  { id: "mateo", name: "Mateo", age: 10, community: "Totoró, Cauca", interests: ["fútbol", "ciencia"] },
  { id: "valentina", name: "Valentina", age: 7, community: "Popayán, Cauca", interests: ["música", "pintura"] },
]

export default function ApadrinamientosPage() {
  const [query, setQuery] = useState("")
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MOCK_CHILDREN
    return MOCK_CHILDREN.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.community.toLowerCase().includes(q) ||
        c.interests.some((i) => i.toLowerCase().includes(q)),
    )
  }, [query])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-heading text-[#1C4E9A]">Apadrinamientos</h1>
            <p className="text-muted-foreground">Conoce a los niños y niñas que esperan tu apoyo.</p>
          </div>
          <div className="w-full sm:w-[360px]">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, comunidad o interés..."
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((child) => (
            <Card key={child.id} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={child.image ?? "/placeholder.svg"} alt={child.name} />
                  <AvatarFallback className="bg-[#5CA244] text-white">
                    {child.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-[#1C4E9A]">{child.name}</CardTitle>
                  <CardDescription>
                    {child.age} años • {child.community}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {child.interests.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-[#F6C344]/20 text-[#1C4E9A]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex gap-2">
                  <Button asChild className="bg-[#5CA244] hover:bg-[#5CA244]/90 font-heading">
                    <Link href={`/apadrinamientos/${child.id}`}>Ver perfil</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/apadrinamientos/${child.id}`}>Apadrinar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center text-muted-foreground">No encontramos resultados para “{query}”.</div>
        )}
      </main>
    </div>
  )
}