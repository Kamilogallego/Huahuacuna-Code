'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '@components/Input';
import Button from '@components/Button';
import Link from 'next/link';

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error('Ingresa un correo válido'); return; }
    setLoading(true);
    await new Promise(res => setTimeout(res, 700));
    toast.success('Hemos enviado un enlace de recuperación a tu correo');
    setLoading(false);
  };

  return (
    <section className="container section" style={{ display: 'grid', placeItems: 'center' }}>
      <form onSubmit={onSubmit} className="card" style={{ width: '100%', maxWidth: 520 }}>
        <h2>Recuperar Contraseña</h2>
        <p className="subtitle">Ingresa tu correo y te enviaremos un enlace de recuperación.</p>
        <Input label="Correo Electrónico" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <Link href="/login"><Button variant="secondary">Volver</Button></Link>
          <Button variant="primary" type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar enlace'}</Button>
        </div>
      </form>
    </section>
  );
}