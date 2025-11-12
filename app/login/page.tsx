'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Input from '@components/Input';
import Button from '@components/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(res => setTimeout(res, 400));

    if (email === 'admin@huahuacuna.org' && pass === 'admin123') {
      toast.success('Bienvenido, administrador');
      router.push('/admin');
    } else if (email === 'padrino@test.com' && pass === 'padrino123') {
      toast.success('Bienvenido, padrino');
      router.push('/padrino/dashboard');
    } else {
      toast.error('Credenciales inválidas');
    }
    setLoading(false);
  };

  return (
    <section className="container section" style={{ display: 'grid', placeItems: 'center' }}>
      <form onSubmit={handleSubmit} className="card" style={{ width: '100%', maxWidth: 520 }}>
        <h2 style={{ marginBottom: '1rem' }}>Iniciar Sesión</h2>
        <Input label="Correo Electrónico" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input label="Contraseña" type="password" value={pass} onChange={e => setPass(e.target.value)} required />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0 1rem' }}>
          <input id="remember" type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
          <label htmlFor="remember" className="label">Recordarme</label>
        </div>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <a href="/recuperar-password" style={{ color: 'var(--primary-blue)' }}>¿Olvidaste tu contraseña?</a>
          <a href="/apadrinar" style={{ color: 'var(--primary-blue)' }}>Solicita ser padrino</a>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" size="lg" type="submit" disabled={loading}>
            {loading ? 'Accediendo...' : 'Ingresar'}
          </Button>
        </div>

        <div className="card" style={{ marginTop: '1rem', background: 'var(--gray-50)' }}>
          <strong>Credenciales de prueba</strong>
          <pre style={{ marginTop: '0.5rem', background: 'white', padding: '0.75rem', borderRadius: 8, border: '1px solid var(--gray-200)' }}>
Admin: admin@huahuacuna.org / admin123
Padrino: padrino@test.com / padrino123
          </pre>
        </div>
      </form>
    </section>
  );
}