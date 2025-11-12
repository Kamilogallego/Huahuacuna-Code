'use client';
import React from 'react';
import { apadrinamientosMock } from '@lib/apadrinamientosMock';
import ApadrinadoCard from '@components/padrino/ApadrinadoCard';
import Link from 'next/link';

export default function MisApadrinamientosPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'flex-start', gap: 16 }}>
        <div>
          <h1 style={{ margin: 0 }}>Mis Apadrinamientos</h1>
          <p style={{ margin: '.25rem 0 0', color: 'var(--gray-600)' }}>Los niños que estás ayudando a transformar</p>
        </div>
        <Link href="/padrino" style={{ border: '1px solid var(--primary-blue)', padding: '.6rem 1rem', borderRadius: 10, fontSize: '.7rem' }}>
          Ir al Dashboard
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
        {apadrinamientosMock.map(a => <ApadrinadoCard key={a.id} data={a} />)}
      </div>
    </div>
  );
}