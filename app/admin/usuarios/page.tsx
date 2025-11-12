'use client';

import { useState } from 'react';
import { usuariosMock } from '@lib/mockData';
import Table from '@components/Table';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import { Badge } from '@components/ui/Badge';

type User = typeof usuariosMock[number];

export default function AdminUsuariosPage() {
  const [data, setData] = useState<User[]>(usuariosMock);
  const [creating, setCreating] = useState<User | null>(null);

  const columns = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'email', header: 'Email' },
    { key: 'rol', header: 'Rol', render: (row: User) => <Badge status={row.rol === 'admin' ? 'aprobada' : 'pendiente'} label={row.rol} /> },
    { key: 'estado', header: 'Estado', render: (row: User) => <Badge status={row.estado === 'activo' ? 'aprobada' : 'rechazada'} label={row.estado} /> },
    { key: 'fechaRegistro', header: 'Fecha registro' },
    {
      key: 'acciones', header: 'Acciones',
      render: (row: User) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" onClick={() => toggleRol(row.id)}>Cambiar Rol</Button>
          <Button variant="primary" onClick={() => toggleEstado(row.id)}>{row.estado === 'activo' ? 'Desactivar' : 'Activar'}</Button>
          <Button variant="danger" onClick={() => remove(row.id)}>Eliminar</Button>
        </div>
      )
    }
  ] as const;

  const toggleRol = (id: number) => setData(prev => prev.map(u => u.id === id ? { ...u, rol: u.rol === 'admin' ? 'padrino' : 'admin' } : u));
  const toggleEstado = (id: number) => setData(prev => prev.map(u => u.id === id ? { ...u, estado: u.estado === 'activo' ? 'inactivo' : 'activo' } : u));
  const remove = (id: number) => setData(prev => prev.filter(u => u.id !== id));

  const saveAdmin = () => {
    if (!creating) return;
    if (!creating.nombre || !creating.email) return alert('Nombre y Email requeridos');
    setData(prev => [{ ...creating, id: Date.now(), rol: 'admin', estado: 'activo', fechaRegistro: new Date().toISOString().slice(0,10) }, ...prev]);
    setCreating(null);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Gestión de Usuarios</h2>
        <Button variant="primary" onClick={() => setCreating({ id: 0, nombre: '', email: '', rol: 'admin', estado: 'activo', fechaRegistro: '' })}>Crear Nuevo Administrador</Button>
      </div>

      <Table columns={columns as any} data={data} />

      <Modal isOpen={!!creating} onClose={() => setCreating(null)} title="Nuevo Administrador">
        {creating && (
          <div style={{ display: 'grid', gap: 12 }}>
            <Input label="Nombre" value={creating.nombre} onChange={e => setCreating({ ...creating, nombre: e.target.value })} />
            <Input label="Email" type="email" value={creating.email} onChange={e => setCreating({ ...creating, email: e.target.value })} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button variant="secondary" onClick={() => setCreating(null)}>Cancelar</Button>
              <Button variant="primary" onClick={saveAdmin}>Crear</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}