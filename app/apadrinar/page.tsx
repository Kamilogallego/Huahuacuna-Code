'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import Button from '@components/Button';

type FormState = {
  nombre: string;
  documento: string;
  direccion: string;
  telefono: string;
  correo: string;
  motivo: string;
};

const initialState: FormState = {
  nombre: '',
  documento: '',
  direccion: '',
  telefono: '',
  correo: '',
  motivo: ''
};

export default function ApadrinarPage() {
  const [data, setData] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    return Object.values(data).every(v => v.trim().length > 0);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Por favor completa todos los campos requeridos.');
      return;
    }
    setLoading(true);
    try {
      console.log('Solicitud de apadrinamiento:', data);
      await new Promise(res => setTimeout(res, 900));
      toast.success('Tu solicitud fue enviada con éxito, pronto te contactaremos');
      setData(initialState);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container section" style={{ display: 'grid', placeItems: 'center' }}>
      <form onSubmit={onSubmit} className="card" style={{ width: '100%', maxWidth: 720 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Heart color="#E91E63" />
          <h2 style={{ margin: 0 }}>Solicitud de Apadrinamiento</h2>
        </div>
        <div className="row">
          <div className="col">
            <Input label="Nombre Completo" name="nombre" required value={data.nombre} onChange={onChange} />
          </div>
          <div className="col">
            <Input label="Documento de Identidad" name="documento" required value={data.documento} onChange={onChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input label="Dirección" name="direccion" required value={data.direccion} onChange={onChange} />
          </div>
          <div className="col">
            <Input label="Teléfono" name="telefono" required value={data.telefono} onChange={onChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Input label="Correo Electrónico" type="email" name="correo" required value={data.correo} onChange={onChange} />
          </div>
        </div>
        <Textarea label="Motivo del Apadrinamiento" name="motivo" required value={data.motivo} onChange={onChange} rows={5} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button variant="primary" size="lg" type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Solicitud'}
          </Button>
        </div>
      </form>
    </section>
  );
}