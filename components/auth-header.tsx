import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AuthHeader() {
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
          <Link href="/acerca-de" className="text-foreground/80 hover:text-foreground transition-colors">Acerca de</Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <Button asChild className="bg-[#F6C344] hover:bg-[#F6C344]/90 text-black font-heading">
            <Link href="/perfil-apadrinador">Soy Padrino</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}