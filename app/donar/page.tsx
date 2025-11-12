'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@components/Button';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import Card from '@components/Card';
import { Wallet, Gift, Phone } from 'lucide-react';

type TipoDonacion = 'dinero' | 'especie';
type MetodoPago = 'PayPal' | 'Stripe' | 'Nequi' | 'Bancolombia' | 'Davivienda' | 'PSE';

export default function DonarPage() {
  const [tipo, setTipo] = useState<TipoDonacion>('dinero');
  const [monto, setMonto] = useState<string>('');
  const [metodo, setMetodo] = useState<MetodoPago | null>(null);
  const [especie, setEspecie] = useState<string[]>([]);
  const [descripcion, setDescripcion] = useState('');

  const toggleEspecie = (item: string) => {
    setEspecie(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const procesarDonacionDinero = () => {
    if (!monto || Number(monto) <= 0) {
      toast.error('Ingresa un monto válido en USD.');
      return;
    }
    if (!metodo) {
      toast.error('Selecciona un método de pago.');
      return;
    }
    console.log('Donación en dinero:', { monto: Number(monto), metodo });
    toast.success(`Donación de $${Number(monto).toFixed(2)} por ${metodo} registrada. ¡Gracias!`);
    setMonto(''); setMetodo(null);
  };

  const registrarEspecie = () => {
    if (especie.length === 0 && !descripcion.trim()) {
      toast.error('Selecciona al menos una opción o describe tu donación.');
      return;
    }
    console.log('Donación en especie:', { especie, descripcion });
    toast.success('Donación en especie registrada. ¡Gracias!');
    setEspecie([]); setDescripcion('');
  };

  const botonesPago: MetodoPago[] = ['PayPal', 'Stripe', 'Nequi', 'Bancolombia', 'Davivienda', 'PSE'];

  return (
    <section className="container section">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="row" style={{ alignItems: 'center' }}>
              <Button variant={tipo === 'dinero' ? 'primary' : 'secondary'} onClick={() => setTipo('dinero')}> 
                <Wallet size={18} style={{ marginRight: 8 }} /> Donación en Dinero
              </Button>
              <Button variant={tipo === 'especie' ? 'primary' : 'secondary'} onClick={() => setTipo('especie')}> 
                <Gift size={18} style={{ marginRight: 8 }} /> Donación en Especie
              </Button>
            </div>

            {tipo === 'dinero' ? (
              <div style={{ marginTop: '1.5rem' }}>
                <Input label="Monto en USD" type="number" value={monto} onChange={e => setMonto(e.target.value)} placeholder="Ej: 50" />
                <div className="separator" />
                <h3 style={{ marginBottom: '0.5rem' }}>Métodos de pago</h3>
                <div className="row">
                  {botonesPago.map(b => (
                    <button
                      key={b}
                      type="button"
                      className="btn"
                      onClick={() => setMetodo(b)}
                      style={{
                        background: metodo === b ? 'var(--primary-blue)' : 'var(--gray-200)',
                        color: metodo === b ? 'white' : 'var(--gray-900)'
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                  <Button variant="primary" size="lg" onClick={procesarDonacionDinero}>Procesar Donación</Button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>¿Qué deseas donar?</h3>
                <div className="row">
                  {['Mercados', 'Ropa', 'Útiles Escolares', 'Otros'].map(o => (
                    <button
                      key={o}
                      type="button"
                      className="btn"
                      onClick={() => toggleEspecie(o)}
                      style={{
                        background: especie.includes(o) ? 'var(--primary-blue)' : 'var(--gray-200)',
                        color: especie.includes(o) ? 'white' : 'var(--gray-900)'
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                <div className="separator" />
                <Textarea label="Descripción (opcional)" value={descripcion} onChange={e => setDescripcion(e.target.value)} rows={4} placeholder="Ej: Ropa para niños de 6 a 10 años" />
                <div style={{ marginTop: '1rem' }}>
                  <Button variant="primary" size="lg" onClick={registrarEspecie}>Registrar Donación en Especie</Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col">
          <Card
            title="Contacto"
            icon={<Phone color="#25D366" />}
          >
            <p><strong>Encargada:</strong> María López</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/573001234567" target="_blank" rel="noreferrer">+57 300 123 4567</a></p>
            <a className="whatsappButton" href="https://wa.me/573001234567" target="_blank" rel="noreferrer">
              <Phone size={18} />
              Enviar Mensaje
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
}