import { AuthHeader } from "@/components/auth-header"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">Acerca de Nosotros</h1>
          <p className="text-xl text-muted-foreground">Transformando vidas desde el corazón</p>
        </div>

        {/* Mission */}
        <Card className="p-8 mb-8 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-4">Nuestra Misión</h2>
          <p className="text-lg text-foreground leading-relaxed">
            Fundación Huahuacuna se dedica a transformar las vidas de niños en situación de vulnerabilidad en Colombia.
            A través del apadrinamiento, donaciones y voluntariado, creamos oportunidades de educación, salud y
            desarrollo integral que les permitan soñar y alcanzar sus metas.
          </p>
        </Card>

        {/* Vision */}
        <Card className="p-8 mb-8 border border-border bg-secondary">
          <h2 className="text-3xl font-bold text-foreground mb-4">Nuestra Visión</h2>
          <p className="text-lg text-foreground leading-relaxed">
            Un Colombia donde cada niño, sin importar su situación económica, tenga acceso a educación de calidad,
            oportunidades de desarrollo y la posibilidad de vivir una infancia digna y feliz.
          </p>
        </Card>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Compasión", desc: "Actuamos con empatía y amor genuino" },
              { title: "Integridad", desc: "Transparencia en todas nuestras acciones" },
              { title: "Compromiso", desc: "Dedicados a hacer una diferencia real" },
              { title: "Inclusión", desc: "Oportunidades para todos sin discriminación" },
            ].map((value, idx) => (
              <Card key={idx} className="p-6 border border-border">
                <h3 className="text-xl font-semibold text-primary mb-2">{value.title}</h3>
                <p className="text-foreground">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <Card className="p-8 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-6">Nuestro Equipo</h2>
          <p className="text-foreground leading-relaxed mb-6">
            Estamos conformados por profesionales apasionados que trabajan incansablemente por mejorar la vida de los
            niños. Nuestro equipo está presente en varias ciudades de Colombia, coordinando programas de apadrinamiento,
            donaciones y voluntariado.
          </p>
          <p className="text-foreground leading-relaxed">
            Contamos con el apoyo de donantes, voluntarios y padrinos de todo el mundo que comparten nuestra visión de
            transformación social.
          </p>
        </Card>
      </div>
    </div>
    </div>
  )
}
