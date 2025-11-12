"use client";
import React from 'react';
import Button from '@components/Button';

export default function ApadrinamientoConfirmado({ open, onClose, nombre, onVer }: { open: boolean; onClose: () => void; nombre: string; onVer: () => void; }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', display: 'grid', placeItems: 'center', zIndex: 200 }} onClick={onClose}>
      <div style={{
        width: '100%', maxWidth: 460,
        background: 'white',
        borderRadius: 18,
        padding: '1.5rem 1.7rem',
        border: '1px solid var(--gray-200)',
        display: 'flex', flexDirection: 'column', gap: '1rem'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#1e8c3a', display: 'grid', placeItems: 'center', margin: '0 auto', color: 'white', fontSize: '1.9rem' }}>✔</div>
        <h3 style={{ margin: '0 0 .25rem', textAlign: 'center', color: 'var(--primary-blue-dark)' }}>¡Apadrinamiento Confirmado!</h3>
        <p style={{ margin: 0, fontSize: '.8rem', color: 'var(--gray-700)', textAlign: 'center' }}>Gracias por transformar la vida de {nombre}.</p>
        <div style={{
          background: '#f2fbf4',
          border: '1px solid #c6e9d2',
          borderRadius: 12,
          padding: '.75rem .9rem',
          fontSize: '.7rem'
        }}>📧 Hemos enviado un correo con la información del apadrinamiento.</div>
        <div style={{
          background: 'var(--gray-100)',
          borderRadius: 12,
          padding: '.9rem',
          fontSize: '.7rem',
          lineHeight: 1.4
        }}>
          <b>Próximos pasos:</b>
          <ol style={{ margin: '.4rem 0 0', paddingLeft: '1rem' }}>
            <li>Revisa tu correo para detalles.</li>
            <li>Accede al perfil completo.</li>
            <li>Contacta administradores cuando lo necesites.</li>
          </ol>
        </div>
        <Button variant="primary" onClick={onVer}>Ver Mis Apadrinamientos</Button>
      </div>
    </div>
  );
}
