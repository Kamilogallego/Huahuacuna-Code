"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function AuthHeader() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const role = localStorage.getItem("userRole")
      const email = localStorage.getItem("userEmail")
      setUserRole(role)
      setUserEmail(email)
    } catch (error) {
      console.warn("No se pudo leer el estado de sesión desde localStorage:", error)
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userRole")
        localStorage.removeItem("userId")
      } catch (error) {
        console.warn("No se pudo limpiar el estado de sesión:", error)
      }
      window.location.href = "/"
    }
  }

  const isLoggedIn = Boolean(userRole)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between max-w-7xl px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Fundación Huahuacuna" width={48} height={48} className="object-contain" />
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-heading font-bold text-[#1C4E9A]">Fundación Huahuacuna</span>
            <span className="text-[11px] text-muted-foreground">Sembrando Futuro en la Niñez</span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">Inicio</Link>
          <Link href="/apadrinamientos" className="text-foreground/80 hover:text-foreground transition-colors">Apadrinamientos</Link>
          <Link href="/donaciones" className="text-foreground/80 hover:text-foreground transition-colors">Donaciones</Link>
          <Link href="/voluntariado" className="text-foreground/80 hover:text-foreground transition-colors">Voluntariado</Link>
          <Link href="/eventos" className="text-foreground/80 hover:text-foreground transition-colors">Eventos</Link>
          <Link href="/acerca-de" className="text-foreground/80 hover:text-foreground transition-colors">Acerca de</Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              {userEmail && (
                <span className="hidden sm:inline text-xs text-muted-foreground mr-2">
                  Sesión iniciada como <span className="font-semibold">{userEmail}</span>
                </span>
              )}
              <Button
                type="button"
                onClick={handleLogout}
                className="bg-[#C33B2A] hover:bg-[#C33B2A]/90 text-white font-heading"
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Button asChild className="bg-[#1C4E9A] hover:bg-[#1C4E9A]/90 text-white font-heading">
              <Link href="/login">Iniciar sesión</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
