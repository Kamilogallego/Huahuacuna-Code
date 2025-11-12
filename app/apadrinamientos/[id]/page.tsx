"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChildProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/apadrinamientos">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Apadrinamientos
          </Button>
        </Link>
        
        <Card>
          <CardHeader>
            <CardTitle>Perfil del Niño/Niña #{params.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Información detallada del niño o niña próximamente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}