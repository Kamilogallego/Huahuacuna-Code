import Image from "next/image"
import Link from "next/link"

export function AuthHeader() {
  return (
    <header className="w-full py-6 px-4 border-b border-border bg-background">
      <div className="container mx-auto flex items-center justify-between max-w-6xl">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Fundación Huahuacuna" width={60} height={60} className="object-contain" />
          <div className="flex flex-col">
            <span className="text-xl font-heading font-bold text-[#1C4E9A]">Fundación Huahuacuna</span>
            <span className="text-xs text-muted-foreground">Sembrando Futuro en la Niñez</span>
          </div>
        </Link>
      </div>
    </header>
  )
}
