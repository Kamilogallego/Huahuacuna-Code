use client

import { AuthHeader } from "/@/components/auth-header";
import { Button } from "/@/components/ui/button";
import { Card, CardContent } from "/@/components/ui/card";
import { Heart, Users, GraduationCap, Stethoscope } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const goToApadrinar = () => {
    try {
      const role = localStorage.getItem("userRole");
      if (role === "padrino") router.push("/apadrinamientos");
      else router.push("/login?redirect=/apadrinamientos");
    } catch {
      router.push("/login?redirect=/apadrinamientos");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1C4E9A] to-[#5CA244] text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-balance">
                Sembrando Futuro en la Niñez Vulnerable
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed text-pretty">
                Desde 2003, transformando vidas a través del amor y el apadrinamiento. Más de 542 niños han encontrado
                esperanza con nosotros.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#F6C344] hover:bg-[#F6C344]/90 text-[#1E1E1E] font-heading text-lg h-14"
                >
                  <Link href="/registro">Conviértete en Padrino</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-heading text-lg h-14 bg-transparent"
                >
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button
                  onClick={goToApadrinar}
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-heading text-lg h-14 bg-transparent"
                >
                  Apadrinar
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/happy-children-in-colombia.jpg"
                alt="Niños de Fundación Huahuacuna"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 border-[#F6C344]">
              <CardContent className="pt-8">
                <div className="text-5xl font-heading font-bold text-[#1C4E9A] mb-2">542</div>
                <p className="text-muted-foreground font-heading">Niños Apadrinados</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-[#5CA244]">
              <CardContent className="pt-8">
                <div className="text-5xl font-heading font-bold text-[#1C4E9A] mb-2">21</div>
                <p className="text-muted-foreground font-heading">Años de Experiencia</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-[#1C4E9A]">
              <CardContent className="pt-8">
                <div className="text-5xl font-heading font-bold text-[#1C4E9A] mb-2">6+</div>
                <p className="text-muted-foreground font-heading">Municipios Impactados</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-[#1C4E9A] mb-4">Nuestro Programa de Apadrinamiento</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Apoyo integral que transforma vidas</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 bg-[#1C4E9A]/10 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-[#1C4E9A]" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-[#1C4E9A]">Educación Completa</h3>
                <p className="text-sm text-muted-foreground">Matrícula, uniforme, útiles y transporte escolar</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 bg-[#5CA244]/10 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 text-[#5CA244]" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-[#1C4E9A]">Salud Asegurada</h3>
                <p className="text-sm text-muted-foreground">Controles médicos y odontológicos anuales</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 bg-[#F6C344]/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-[#F6C344]" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-[#1C4E9A]">Vestido y Calzado</h3>
                <p className="text-sm text-muted-foreground">Ropa y calzado para todo el año</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-16 h-16 bg-[#C33B2A]/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-[#C33B2A]" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-[#1C4E9A]">Esparcimiento</h3>
                <p className="text-sm text-muted-foreground">Actividades de integración y celebración</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#F6C344] to-[#5CA244]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 text-balance">
            Únete a Nuestra Misión
          </h2>
          <p className="text-xl text-white/90 mb-8 text-pretty">
            Cada donación, cada hora de voluntariado, se traduce en oportunidades reales para los niños y sus familias.
          </p>
          <Button asChild size="lg" className="bg.white hover:bg-white/90 text-[#1C4E9A] font-heading text-lg h-14">
            <Link href="/registro">Comenzar Ahora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
