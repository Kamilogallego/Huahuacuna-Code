'use client';
import React, { useState } from 'react';
import { childrenMock } from '@lib/childrenMock';
import { useParams, useRouter } from 'next/navigation';
import ApadrinamientoConfirmado from '@components/modals/ApadrinamientoConfirmado';

export default function ChildDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const child = childrenMock.find(c => c.id === Number(id));
  const [confirm, setConfirm] = useState(false);
  if (!child) return <div>Niño no encontrado.</div>;

  const apadrinar = () => {
    setConfirm(true);
  };

  return (
    <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: '340px 1fr' }}>
      <div style={{
        background: 'white', border: '1px solid var(--gray-200)', borderRadius: 16, padding: '1rem 1rem 1.4rem', display: 'flex', flexDirection: 'column', gap: 12
      }}>
        <img src={child.foto} alt={child.nombre} style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 12 }} />
        <h2 style={{ margin: 0 }}>{child.nombre}</h2>
        <div style={{ fontSize: '.75rem', color: 'var(--gray-700)', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span>🗓️ {child.edad} años</span>
          <span>📍 {child.municipio}, Quindío</span>
        </div>
        <button onClick={apadrinar} style={{
          background: '#b53324', color: 'white', border: 'none', borderRadius: 12, padding: '.85rem 1rem', fontWeight: 600, fontSize: '.8rem'
        }}>❤ Apadrinar a {child.nombre}</button>
        <a onClick={() => router.back()} style={{ fontSize: '.7rem', cursor: 'pointer', color: 'var(--primary-blue-dark)' }}>← Volver al catálogo</a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Panel title={`Historia de ${child.nombre}`}>{child.historia}</Panel>
        <Panel title="Necesidades Actuales">
          <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '.75rem', display: 'grid', gap: 4 }}>
            {child.necesidades.map(n => <li key={n}>✅ {n}</li>)}
          </ul>
        </Panel>
        <div style={{
          background: 'linear-gradient(135deg,#0d74df,#198f55)', color: 'white', borderRadius: 18, padding: '1.25rem 1.4rem', display: 'flex', flexDirection: 'column', gap: 8
        }}>
          <h3 style={{ margin: 0 }}>¿Qué incluye el apadrinamiento?</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '.7rem', display: 'grid', gap: 4 }}>
            <li>Educación completa</li>
            <li>Atención médica y odontológica</li>
            <li>Vestido y artículos de aseo</li>
            <li>Actividades de esparcimiento</li>
            <li>Comunicación directa con administradores</li>
          </ul>
        </div>
      </div>
      <ApadrinamientoConfirmado open={confirm} nombre={child.nombre} onClose={() => setConfirm(false)} onVer={() => { setConfirm(false); router.push('/padrino/apadrinamientos'); }} />
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 16, padding: '1rem 1.25rem', fontSize: '.75rem', lineHeight: 1.4 }}>
      <h3 style={{ margin: '0 0 .5rem', fontSize: '1rem', color: 'var(--primary-blue-dark)' }}>{title}</h3>
      {children}
    </div>
  );
}