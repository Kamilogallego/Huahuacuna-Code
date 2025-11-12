"use client";
import React, { useState } from 'react';

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '.7rem' }}>
      {label}
      <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />
    </label>
  );
}

export default function SettingsPanel() {
  const [sonido, setSonido] = useState(true);
  const [desktop, setDesktop] = useState(false);
  const [email, setEmail] = useState(true);
  return (
    <div style={{
      width: 260,
      borderLeft: '1px solid var(--gray-200)',
      background: 'white',
      display: 'flex', flexDirection: 'column',
      padding: '1rem',
      gap: 16
    }}>
      <h4 style={{ margin: 0 }}>Configuración</h4>
      <div style={{ display: 'grid', gap: 8 }}>
        <Toggle label="Sonido" value={sonido} onChange={setSonido} />
        <Toggle label="Escritorio" value={desktop} onChange={setDesktop} />
        <Toggle label="Email (24h)" value={email} onChange={setEmail} />
      </div>
      {email && (
        <div style={{ background: '#fff8e1', border: '1px solid #f1dc9c', borderRadius: 10, padding: '.6rem .7rem', fontSize: '.65rem' }}>
          Si un mensaje no es leído en 24h y email está activo, recibirás una notificación.
        </div>
      )}
      <div style={{ fontSize: '.65rem', color: 'var(--gray-600)', lineHeight: 1.4 }}>
        <b>Información:</b><br />
        Seguridad: Los mensajes están encriptados extremo a extremo.<br />
        Privacidad: Solo administradores ven esta conversación.<br />
        Historial: Se guarda de forma permanente.
      </div>
    </div>
  );
}