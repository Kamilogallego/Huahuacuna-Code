'use client';
import React, { useState } from 'react';
import { apadrinamientosMock } from '@lib/apadrinamientosMock';
import { useParams, useRouter } from 'next/navigation';
import { Tabs } from '@components/ui/tabs';

export default function PerfilApadrinadoPage() {
  const { id } = useParams();
  const router = useRouter();
  const ap = apadrinamientosMock.find(a => a.child.id === Number(id));
  const [tab, setTab] = useState('historia');

  if (!ap) return <div>Apadrinamiento no encontrado.</div>;
  const { child } = ap;

  return (
    <div style={{ display: 'grid', gap: '1.4rem', gridTemplateColumns: '340px 1fr' }}>
      <div style={{
        background: 'white',
        border: '1px solid var(--gray-200)',
        borderRadius: 16,
        padding: '1rem 1rem 1.4rem',
        display: 'flex', flexDirection: 'column', gap: 12
      }}>
        <img src={child.foto} alt={child.nombre} style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 12 }} />
        <h2 style={{ margin: 0 }}>{child.nombre}</h2>
        <div style={{ fontSize: '.7rem', color: 'var(--gray-700)', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span>🗓️ {child.edad} años</span>
          <span>📍 {child.municipio}, Quindío</span>
          <span>Apadrinado desde {new Date(ap.fechaInicio).toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href={`/padrino/apadrinamientos/${child.id}/chat`} style={{
            background: '#198f55',
            color: 'white',
            textAlign: 'center',
            padding: '.7rem .8rem',
            borderRadius: 12,
            fontSize: '.75rem',
            fontWeight: 600
          }}>Abrir Chat</a>
          <button style={{
            background: 'white',
            border: '1px solid var(--gray-300)',
            color: 'var(--gray-700)',
            padding: '.7rem .8rem',
            borderRadius: 12,
            fontSize: '.7rem',
            cursor: 'pointer'
          }}>Descargar Bitácora (demo)</button>
        </div>
        <a onClick={() => router.back()} style={{ fontSize: '.65rem', cursor: 'pointer', color: 'var(--primary-blue-dark)', marginTop: 4 }}>← Volver a Mis Apadrinamientos</a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Tabs
          items={[
            { key: 'historia', label: 'Historia' },
            { key: 'educacion', label: 'Educación' },
            { key: 'salud', label: 'Salud' },
            { key: 'actualizaciones', label: 'Actualizaciones' }
          ]}
          active={tab}
          onChange={setTab}
        />

        {tab === 'historia' && (
          <>
            <Panel title={`Historia de ${child.nombre}`}>{child.historia}</Panel>
            <Panel title="Situación Familiar">Vive con su abuela. Contexto socioeconómico limitado; se prioriza apoyo escolar y nutricional.</Panel>
            <Panel title="Ubicación">Barrio La Esperanza, Armenia, Quindío</Panel>
            <Panel title="Necesidades Actuales">
              <ul style={ulStyle}>{child.necesidades.map(n => <li key={n}>✅ {n}</li>)}</ul>
            </Panel>
          </>
        )}

        {tab === 'educacion' && child.educacion && (
          <Panel title="Información Educativa">
            <div style={{ fontSize: '.7rem', display: 'grid', gap: 8 }}>
              <div><b>Grado Actual:</b> {child.educacion.grado}</div>
              <div><b>Institución Educativa:</b> {child.educacion.institucion}</div>
              <div style={{
                marginTop: 8,
                background: '#e9f9ec',
                border: '1px solid #c6e9d2',
                padding: '.55rem .7rem',
                borderRadius: 10,
                fontSize: '.65rem'
              }}><b>Rendimiento:</b> {child.educacion.rendimiento}</div>
              <div style={{
                marginTop: 8,
                background: '#fff8e1',
                border: '1px solid #f1dc9c',
                padding: '.55rem .7rem',
                borderRadius: 10,
                fontSize: '.65rem'
              }}>
                <b>Apoyo Educativo Proporcionado:</b>
                <ul style={ulStyle}>{child.educacion.apoyo.map(a => <li key={a}>{a}</li>)}</ul>
              </div>
            </div>
          </Panel>
        )}

        {tab === 'salud' && child.salud && (
          <Panel title="Salud">
            <div style={{ fontSize: '.7rem', display: 'grid', gap: 8 }}>
              <div><b>Resumen:</b> {child.salud.resumen}</div>
              <div><b>Controles:</b>
                <ul style={ulStyle}>{child.salud.controles.map(c => <li key={c}>{c}</li>)}</ul>
              </div>
            </div>
          </Panel>
        )}

        {tab === 'actualizaciones' && (
          <Panel title="Actualizaciones">
            {child.actualizaciones && child.actualizaciones.length > 0 ? (
              <ul style={ulStyle}>
                {child.actualizaciones.map(u => (
                  <li key={u.fecha}>
                    <b>{new Date(u.fecha).toLocaleDateString('es-CO')}</b>: {u.texto}
                  </li>
                ))}
              </ul>
            ) : <small style={{ fontSize: '.65rem' }}>Sin actualizaciones todavía.</small>}
          </Panel>
        )}
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'white',
      border: '1px solid var(--gray-200)',
      borderRadius: 16,
      padding: '1rem 1.25rem',
      fontSize: '.75rem',
      lineHeight: 1.4
    }}>
      <h3 style={{ margin: '0 0 .5rem', fontSize: '1rem', color: 'var(--primary-blue-dark)' }}>{title}</h3>
      {children}
    </div>
  );
}

const ulStyle: React.CSSProperties = { margin: '.4rem 0 0', paddingLeft: '1rem', display: 'grid', gap: 4, fontSize: '.65rem' };