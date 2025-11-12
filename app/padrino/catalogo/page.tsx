'use client';
import React, { useState } from 'react';
import { childrenMock, Child } from '@lib/childrenMock';
import ChildCard from '@components/padrino/ChildCard';
import Link from 'next/link';

export default function CatalogoPage() {
  const [edadMin, setEdadMin] = useState<number | ''>('');
  const [edadMax, setEdadMax] = useState<number | ''>('');
  const [genero, setGenero] = useState<'Todos' | 'F' | 'M'>('Todos');
  const [municipio, setMunicipio] = useState<string>('Todos');

  const filtered = childrenMock.filter(c => {
    if (edadMin !== '' && c.edad < edadMin) return false;
    if (edadMax !== '' && c.edad > edadMax) return false;
    if (genero !== 'Todos' && c.genero !== genero) return false;
    if (municipio !== 'Todos' && c.municipio !== municipio) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0 }}>Niños Disponibles para Apadrinamiento</h1>
          <p style={{ margin: '.25rem 0 0', color: 'var(--gray-600)' }}>Conoce a los niños que esperan tu apoyo para transformar sus vidas</p>
        </div>
        <Link href="/padrino" style={{ border: '1px solid var(--primary-blue)', padding: '.6rem 1rem', borderRadius: 10, fontSize: '.75rem' }}>Ir al Dashboard</Link>
      </div>

      <div style={{
        background: 'white', border: '1px solid var(--gray-200)', borderRadius: 18, padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 12
      }}>
        <div style={{ fontWeight: 600, fontSize: '.8rem' }}>Filtros de Búsqueda</div>
        <small style={{ color: 'var(--gray-600)' }}>{filtered.length} niños encontrados</small>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))' }}>
          <input placeholder="Edad Mínima" value={edadMin} onChange={e => setEdadMin(e.target.value ? Number(e.target.value) : '')} style={inputStyle} />
          <input placeholder="Edad Máxima" value={edadMax} onChange={e => setEdadMax(e.target.value ? Number(e.target.value) : '')} style={inputStyle} />
          <select value={genero} onChange={e => setGenero(e.target.value as any)} style={inputStyle}>
            <option>Todos</option><option value="F">F</option><option value="M">M</option>
          </select>
          <select value={municipio} onChange={e => setMunicipio(e.target.value)} style={inputStyle}>
            <option>Todos</option><option>Armenia</option><option>Calarcá</option><option>Circasia</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
        {filtered.map(c => <ChildCard key={c.id} child={c} />)}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  border: '1px solid var(--gray-300)',
  borderRadius: 12,
  padding: '.55rem .75rem',
  fontSize: '.75rem'
};
