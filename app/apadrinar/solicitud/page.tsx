'use client';
import React, { useState } from 'react';
import StepIndicator from '@components/ui/StepIndicator';

export default function SolicitudApadrinamientoWizard() {
  const [step, setStep] = useState(1);
  const total = 3;
  const next = () => setStep(s => Math.min(total, s + 1));
  const prev = () => setStep(s => Math.max(1, s - 1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < total) next(); else alert('Solicitud enviada (demo).');
  };

  return (
    <div style={{ maxWidth: 760, margin: '2rem auto', background: 'white', border: '1px solid var(--gray-200)', borderRadius: 22, padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '.5rem' }}>❤</div>
      <h1 style={{ textAlign: 'center', margin: 0 }}>Solicitud de Apadrinamiento</h1>
      <div style={{ textAlign: 'center', fontSize: '.75rem', marginTop: '4px', color: 'var(--gray-600)' }}>Paso {step} de {total} - {subtitle(step)}</div>
      <StepIndicator current={step} total={total} />
      <form onSubmit={submit} style={{ display: 'grid', gap: 16, marginTop: '.5rem' }}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <button type="button" disabled={step === 1} onClick={prev} style={btnOutline}>Anterior</button>
          {step < total && <button type="submit" style={btnDanger}>Siguiente →</button>}
          {step === total && <button type="submit" style={btnSuccess}>Enviar Solicitud</button>}
        </div>
      </form>
    </div>
  );
}

function subtitle(step: number) {
  if (step === 1) return 'Datos Personales';
  if (step === 2) return 'Información Profesional';
  return 'Motivación';
}

const input: React.CSSProperties = { border: '1px solid var(--gray-300)', borderRadius: 14, padding: '.7rem .9rem', fontSize: '.75rem', width: '100%' };
const btnDanger: React.CSSProperties = { background: '#b53324', color: 'white', border: 'none', borderRadius: 12, padding: '.75rem 1.1rem', fontSize: '.75rem', fontWeight: 600 };
const btnOutline: React.CSSProperties = { background: 'white', color: 'var(--gray-700)', border: '1px solid var(--gray-300)', borderRadius: 12, padding: '.75rem 1.1rem', fontSize: '.75rem', fontWeight: 600 };
const btnSuccess: React.CSSProperties = { background: '#198f55', color: 'white', border: 'none', borderRadius: 12, padding: '.75rem 1.1rem', fontSize: '.75rem', fontWeight: 600 };

function Group({ children }: { children: React.ReactNode }) { return <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{children}</div>; }
function Label({ children }: { children: React.ReactNode }) { return <label style={{ fontSize: '.65rem', fontWeight: 600 }}>{children}</label>; }

function Step1() {
  return (
    <>    
      <Group><Label>Nombre Completo *</Label><input required style={input} placeholder="Tu nombre" /></Group>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))' }}>
        <Group><Label>Tipo de Documento *</Label><select required style={input}><option>Cédula</option><option>Pasaporte</option></select></Group>
        <Group><Label>Número de Documento *</Label><input required style={input} placeholder="123456" /></Group>
      </div>
      <Group><Label>Foto o Documento *</Label><input required type="file" style={input} /></Group>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))' }}>
        <Group><Label>Fecha de Nacimiento *</Label><input required type="date" style={input} /></Group>
        <Group><Label>Ciudad *</Label><input required style={input} placeholder="Ciudad" /></Group>
      </div>
      <Group><Label>Dirección *</Label><input required style={input} placeholder="Dirección" /></Group>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))' }}>
        <Group><Label>Teléfono *</Label><input required style={input} placeholder="+57" /></Group>
        <Group><Label>Correo Electrónico *</Label><input required type="email" style={input} placeholder="tu@email.com" /></Group>
      </div>
    </>
  );
}

function Step2() {
  return (
    <>  
      <Group><Label>Ocupación *</Label><input required style={input} placeholder="Cargo" /></Group>
      <Group><Label>Empresa o Trabajo Actual *</Label><input required style={input} placeholder="Empresa" /></Group>
      <Group><Label>Años de Experiencia *</Label><input required style={input} type="number" min={0} placeholder="0" /></Group>
      <Group><Label>Referencia Personal *</Label><input required style={input} placeholder="Nombre y Teléfono" /></Group>
    </>
  );
}  

function Step3() {
  const [motivo, setMotivo] = useState('');
  const [t, setT] = useState(false);
  return (
    <>  
      <Group><Label>¿Por qué deseas apadrinar un niño? *</Label><textarea required style={{ ...input, minHeight: 140 }} value={motivo} onChange={e => setMotivo(e.target.value)} placeholder="Comparte tu motivación..." /></Group>
      <label style={{ fontSize: '.65rem', display: 'flex', alignItems: 'center', gap: 6 }}>
        <input type="checkbox" required checked={t} onChange={e => setT(e.target.checked)} /> Acepto los términos y condiciones
      </label>
    </>
  );
}