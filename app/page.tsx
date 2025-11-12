'use client';

import Link from 'next/link';
import { Heart, Gift, Users, Phone } from 'lucide-react';
import Button from '@components/Button';
import Card from '@components/Card';

export default function HomePage() {
  return (
    <>
      <section className="container section" style={{ background: 'transparent' }}>
        <div className="card" style={{ background: 'var(--bg-secondary)' }}>
          <h1 className="heroTitle">Fundación Huahuacuna</h1>
          <p className="subtitle">Juntos construimos un mejor futuro para nuestros niños.</p>
          <div className="row" style={{ marginTop: '1.5rem' }}>
            <Link href="/apadrinar">
              <Button variant="yellow" size="lg">Apadrinar un Niño</Button>
            </Link>
            <Link href="/donar">
              <Button variant="primary" size="lg">Hacer una Donación</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="gridCards">
          <Card title="Apadrinamiento" icon={<Heart color="#E91E63" />}>Ayuda a un niño con educación, salud y bienestar. Tu apoyo marca la diferencia.</Card>
          <Card title="Donaciones" icon={<Gift color="#1976d2" />}>Aporta en dinero o en especie. Cada contribución nos acerca a más sonrisas.</Card>
          <Card title="Comunidad" icon={<Users color="#4caf50" />}>Únete a nuestra red de padrinos y voluntarios comprometidos.</Card>
        </div>
      </section>

      <section className="container section">
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem' }}>
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>¿Deseas saber más?</h2>
            <p className="subtitle">Escríbenos por WhatsApp, estaremos felices de ayudarte.</p>
          </div>
          <a className="whatsappButton" href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">
            <Phone size={18} />
            Contactar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}