"use client";
import Link from 'next/link';
import { Badge } from '@components/ui/Badge';
import React from 'react';
import { Child } from '@lib/childrenMock';

export default function ChildCard({ child }: { child: Child }) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--gray-200)',
      borderRadius: 16,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ position: 'relative' }}>
        <img src={child.foto} alt={child.nombre} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <Badge status={child.estado} label={child.estado === 'disponible' ? 'Disponible' : 'Apadrinado'} />
        </div>
      </div>
      <div style={{ padding: '0.9rem 1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h4 style={{ margin: 0, color: 'var(--primary-blue-dark)' }}>{child.nombre}</h4>
        <div style={{ fontSize: '.75rem', color: 'var(--gray-700)', display: 'flex', gap: 12 }}>
          <span>🗓️ {child.edad} años</span>
          <span>📍 {child.municipio}</span>
        </div>
        <p style={{ fontSize: '.75rem', lineHeight: 1.3, color: 'var(--gray-700)', margin: '4px 0 0' }}>{child.descripcion}</p>
        <Link href={`/padrino/catalogo/${child.id}`} style={{
          marginTop: 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          background: 'var(--primary-blue-dark)',
          color: 'white',
          borderRadius: 10,
          padding: '0.55rem 0.75rem',
          fontSize: '.8rem'
        }}>❤️ Ver Perfil</Link>
      </div>
    </div>
  );
}
