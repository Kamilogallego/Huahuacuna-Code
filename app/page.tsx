import Image from "next/image";
import Link from "next/link";
import { AuthHeader } from "@/components/auth-header";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <AuthHeader />

      <section className="bg-gradient-to-br from-[#1C4E9A] to-[#5CA244]/50">
        <div className="px-8 py-16 flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 leading-tight">
              Sembrando
              <br />
              Futuro en la
              <br />
              Niñez Vulnerable
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-xl">
              Desde 2003, transformando vidas a través del amor y el apadrinamiento. Más de 542 niños han encontrado esperanza con nosotros.
            </p>

            <div className="flex gap-3">
              <Link href="/apadrinamientos" className="inline-block bg-[#F6C344] text-[#1C4E9A] font-semibold px-6 py-2 rounded hover:bg-[#FFD062] transition">
                Conviértete en Padrino
              </Link>

              <Link href="/login" className="inline-block bg-white text-[#1C4E9A] font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition">
                Iniciar Sesión
              </Link>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/children-hero.jpg"
              alt="Niños"
              width={520}
              height={320}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center px-4">
          <div className="border rounded-lg py-8">
            <span className="block text-4xl font-bold text-[#1C4E9A]">542</span>
            <span className="block mt-2 text-sm">Niños Apadrinados</span>
          </div>
          <div className="border rounded-lg py-8">
            <span className="block text-4xl font-bold text-[#5CA244]">21</span>
            <span className="block mt-2 text-sm">Años de Experiencia</span>
          </div>
          <div className="border rounded-lg py-8">
            <span className="block text-4xl font-bold text-[#F6C344]">6+</span>
            <span className="block mt-2 text-sm">Municipios impactados</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C4E9A] mb-4">Nuestro Programa de Apadrinamiento</h2>
          <p className="text-muted-foreground mb-8">Apoyo integral que transforma vidas</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/90 rounded-lg p-6 shadow-sm">
              <strong className="block text-[#1C4E9A] mb-2">Educación Completa</strong>
              <span className="text-xs text-muted-foreground">Materiales, uniforme, útiles y transporte escolar</span>
            </div>
            <div className="bg-white/90 rounded-lg p-6 shadow-sm">
              <strong className="block text-[#5CA244] mb-2">Salud Asegurada</strong>
              <span className="text-xs text-muted-foreground">Controles médicos y odontológicos anuales</span>
            </div>
            <div className="bg-white/90 rounded-lg p-6 shadow-sm">
              <strong className="block text-[#FFD062] mb-2">Vestido y Calzado</strong>
              <span className="text-xs text-muted-foreground">Ropa y calzado para todo el año</span>
            </div>
            <div className="bg-white/90 rounded-lg p-6 shadow-sm">
              <strong className="block text-[#CE637C] mb-2">Esparcimiento</strong>
              <span className="text-xs text-muted-foreground">Actividades de integración y celebración</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#F6C344]/70 via-[#1C4E9A]/10 to-[#5CA244]/60">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-[#1C4E9A] mb-4">Únete a Nuestra Misión</h3>
          <p className="text-muted-foreground mb-6">Cada donación, cada hora de voluntariado, se traduce en oportunidades reales para los niños y sus familias.</p>
          <Link href="/donaciones" className="inline-block bg-[#5CA244] text-white px-7 py-3 rounded shadow hover:bg-[#327f3c] transition">
            Comenzar Ahora
          </Link>
        </div>
      </section>
    </main>
  );
}