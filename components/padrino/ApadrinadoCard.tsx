'use client';
import Link from 'next/link';
import React from 'react';
import { Apadrinamiento } from '@lib/apadrinamientosMock';
import Badge from '@components/Badge';

export default function ApadrinadoCard({ data }: { data: Apadrinamiento }) {
  const { child } = data;
  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--gray-200)',
      borderRadius: 16,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <img src={child.foto} alt={child.nombre} style={{ width: '100%', height: 190, objectFit: 'cover' }} />
      <div style={{ position: 'absolute', top: 12, right: 12 }}>
        <Badge status="aprobada" label="Activo" />
      </div>
      <div style={{ padding: '0.9rem 1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h4 style={{ margin: 0 }}>{child.nombre}</h4>
        <div style={{ fontSize: '.7rem', display: 'flex', flexDirection: 'column', gap: 2, color: 'var(--gray-700)' }}>
          <span>🗓️ {child.edad} años</span>
          <span>📍 {child.municipio}</span>
        </div>
        <small style={{ fontSize: '.65rem', color: 'var(--gray-600)', marginTop: 4 }}>
          Apadrinado desde: {new Date(data.fechaInicio).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}
        </small>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
          <Link href={`/padrino/apadrinamientos/${child.id}`} style={{
            flex: 1,
            textAlign: 'center',
            background: 'var(--primary-blue-dark)',
            color: 'white',
            borderRadius: 10,
            padding: '.55rem .7rem',
            fontSize: '.7rem',
            fontWeight: 600
          }}>Ver Perfil</Link>
          {data.mensajesNoLeidos > 0 && (
            <div style={{
              minWidth: 28,
              height: 28,
              background: '#b53324',
              color: 'white',
              fontSize: '.65rem',
              fontWeight: 600,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center'
            }}>{data.mensajesNoLeidos}</div>
          )}
        </div>
      </div>
    </div>
  );
}