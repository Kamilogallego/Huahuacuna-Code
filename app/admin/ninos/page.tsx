'use client';

import { useState } from 'react';
import { ninosMock } from '@lib/mockData';
import Table from '@components/Table';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import { Badge } from '@components/ui/Badge';

type Nino = typeof ninosMock[number];

type empty = Nino;

const empty: Nino = {
  id: 0,
  foto: '',
  nombre: '',
  edad: 0,
  descripcion: '',
  necesidades: '',
  apadrinado: false,
  estado: 'disponible'
};

export default function AdminNinosPage() {
  const [data, setData] = useState<Nino[]>(ninosMock);
  const [editing, setEditing] = useState<Nino | null>(null);

  const columns = [
    { key: 'foto', header: 'Foto', render: (row: Nino) => row.foto ? <img src={row.foto} alt={row.nombre} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} /> : '-' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'edad', header: 'Edad', render: (row: Nino) => `${row.edad} años` },
    { key: 'apadrinado', header: 'Apadrinado', render: (row: Nino) => row.apadrinado ? <Badge status="aprobada" label="Sí" /> : <Badge status="pendiente" label="No" /> },
    { key: 'estado', header: 'Estado', render: (row: Nino) => <Badge status={row.estado === 'apadrinado' ? 'aprobada' : 'pendiente'} label={row.estado} /> },
    { key: 'acciones', header: 'Acciones',
      render: (row: Nino) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" onClick={() => setEditing(row)}>Editar</Button>
          <Button variant="danger" onClick={() => setData(prev => prev.filter(n => n.id !== row.id))}>Eliminar</Button>
        </div>
      )
    }
  ] as const;

  const openNew = () => setEditing({ ...empty, id: Date.now() });

  const save = () => {
    if (!editing) return;
    if (!editing.nombre.trim()) return alert('Nombre requerido');
    setData(prev => {
      const exists = prev.some(n => n.id === editing.id);
      return exists ? prev.map(n => n.id === editing.id ? editing : n) : [editing, ...prev];
    });
    setEditing(null);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Gestión de Niños</h2>
        <Button variant="primary" onClick={openNew}>Agregar Nuevo Niño</Button>
      </div>

      <Table columns={columns as any} data={data} />

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title={editing && ninosMock.some(n => n.id === editing.id) ? 'Editar Niño' : 'Agregar Niño'}>
        {editing && (
          <div style={{ display: 'grid', gap: 12 }}>
            <Input label="URL de Foto" value={editing.foto} onChange={e => setEditing({ ...editing, foto: e.target.value })} placeholder="https://..." />
            <div className="row">
              <div className="col">
                <Input label="Nombre" value={editing.nombre} onChange={e => setEditing({ ...editing, nombre: e.target.value })} required />
              </div>
              <div className="col">
                <Input label="Edad" type="number" value={editing.edad.toString()} onChange={e => setEditing({ ...editing, edad: Number(e.target.value) || 0 })} />
              </div>
            </div>
            <Textarea label="Descripción" value={editing.descripcion} onChange={e => setEditing({ ...editing, descripcion: e.target.value })} rows={3} />
            <Textarea label="Necesidades" value={editing.necesidades} onChange={e => setEditing({ ...editing, necesidades: e.target.value })} rows={3} />
            <div className="row">
              <div className="col">
                <label className="label">Estado</label>
                <select className="input" value={editing.estado} onChange={e => setEditing({ ...editing, estado: e.target.value as any, apadrinado: e.target.value === 'apadrinado' })}>
                  <option value="disponible">disponible</option>
                  <option value="apadrinado">apadrinado</option>
                </select>
              </div>
              <div className="col" style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <input type="checkbox" checked={editing.apadrinado} onChange={e => setEditing({ ...editing, apadrinado: e.target.checked, estado: e.target.checked ? 'apadrinado' : 'disponible' })} />
                <label className="label">Apadrinado</label>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button variant="secondary" onClick={() => setEditing(null)}>Cancelar</Button>
              <Button variant="primary" onClick={save}>Guardar</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}