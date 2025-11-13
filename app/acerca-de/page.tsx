import { AuthHeader } from "@/components/auth-header"

export default function AcercaDePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-heading font-bold text-[#1C4E9A] mb-4">Acerca de Huahuacuna</h1>
        <p className="text-muted-foreground">
          Somos una fundación dedicada a transformar la vida de niños y niñas a través del apadrinamiento, la educación y programas de desarrollo integral.
        </p>
      </main>
    </div>
  )
}