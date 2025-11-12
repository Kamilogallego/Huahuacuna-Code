'use client';

import Card from '@components/Card';

export default function PadrinoDashboard() {
  return (
    <section className="container section">
      <h2>Dashboard del Padrino</h2>
      <div className="row" style={{ marginTop: '1rem' }}>
        <div className="col">
          <Card title="Estado de Apadrinamiento">
            Aquí verás información de tu apadrinamiento cuando esté disponible.
          </Card>
        </div>
      </div>
    </section>
  );
}