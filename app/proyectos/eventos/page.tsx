import { AuthHeader } from "@/components/auth-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6C344]/10 via-background to-[#5CA244]/10">
      <AuthHeader />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#1C4E9A] mb-8">Eventos</h1>
        <p className="text-muted-foreground mb-8">Próximas actividades y presentaciones abiertas a la comunidad.</p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1C4E9A]">Evento de Teatro: “Sueños en Escena”</CardTitle>
              <CardDescription>Viernes 7:00 p.m. — Auditorio Comunitario</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Presentación teatral preparada por los niños para compartir sus sueños y aprendizajes con sus familias y padrinos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#1C4E9A]">Muestra artística</CardTitle>
              <CardDescription>Sábado 10:00 a.m. — Parque Central</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Exposición de pinturas y manualidades realizadas en los talleres de arte. Entrada libre.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}