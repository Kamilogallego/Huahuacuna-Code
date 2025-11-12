'use client';

import { useMemo, useState } from 'react';
import { solicitudesMock } from '@lib/mockData';
import Table from '@components/Table';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Textarea from '@components/Textarea';
import { Badge } from '@components/ui/Badge';

type Solicitud = typeof solicitudesMock[number];
type Estado = 'pendiente' | 'aprobada' | 'rechazada';

export default function AdminSolicitudesPage() {
  const [data, setData] = useState<Solicitud[]>(solicitudesMock);
  const [filtro, setFiltro] = useState<Estado | 'todos'>('todos');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [detalle, setDetalle] = useState<Solicitud | null>(null);
  const [rechazarId, setRechazarId] = useState<number | null>(null);
  const [motivo, setMotivo] = useState('');

  const filtered = useMemo(() => {
    let arr = data;
    if (filtro !== 'todos') arr = arr.filter(d => d.estado === filtro);
    if (q.trim()) {
      const t = q.toLowerCase();
      arr = arr.filter(d =>
        d.nombre.toLowerCase().includes(t) ||
        d.documento.includes(q) ||
        d.correo.toLowerCase().includes(t) ||
        d.telefono.includes(q)
      );
    }
    return arr;
  }, [data, filtro, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  const setEstado = (id: number, estado: Estado) => {
    setData(prev => prev.map(s => s.id === id ? { ...s, estado } : s));
  };

  const columns = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'documento', header: 'Documento' },
    { key: 'correo', header: 'Correo' },
    { key: 'telefono', header: 'Teléfono' },
    { key: 'fecha', header: 'Fecha' },
    {
      key: 'estado', header: 'Estado',
      render: (row: Solicitud) => <Badge status={row.estado} />
    },
    {
      key: 'acciones', header: 'Acciones',
      render: (row: Solicitud) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" onClick={() => setDetalle(row)}>Ver</Button>
          <Button variant="primary" onClick={() => setEstado(row.id, 'aprobada')}>Aprobar</Button>
          <Button variant="danger" onClick={() => setRechazarId(row.id)}>Rechazar</Button>
        </div>
      )
    }
  ] as const;

  return (
    <>
      <h2 style={{ marginBottom: '1rem' }}>Gestión de Solicitudes</h2>
      <div className="row" style={{ marginBottom: '1rem' }}>
        <div className="col">
          <input className="input" placeholder="Buscar por nombre, documento, correo, teléfono..." value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <div className="col" style={{ display: 'flex', gap: 8 }}>
          {(['todos', 'pendiente', 'aprobada', 'rechazada'] as const).map(f => (
            <button key={f} className="btn" style={{ background: filtro === f ? 'var(--primary-blue)' : 'var(--gray-200)', color: filtro === f ? 'white' : 'var(--gray-900)' }} onClick={() => setFiltro(f)}>{f}</button>
          ))}
        </div>
      </div>

      <Table columns={columns as any} data={pageData} />

      <div className="row" style={{ justifyContent: 'space-between', marginTop: '1rem' }}>
        <div>Página {page} de {totalPages}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" onClick={() => setPage(p => Math.max(1, p - 1))}>Anterior</Button>
          <Button variant="secondary" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Siguiente</Button>
        </div>
      </div>

      <Modal isOpen={!!detalle} onClose={() => setDetalle(null)} title="Detalles de la Solicitud">
        {detalle && (
          <div style={{ display: 'grid', gap: 8 }}>
            <div><strong>Nombre:</strong> {detalle.nombre}</div>
            <div><strong>Documento:</strong> {detalle.documento}</div>
            <div><strong>Correo:</strong> {detalle.correo}</div>
            <div><strong>Teléfono:</strong> {detalle.telefono}</div>
            <div><strong>Fecha:</strong> {detalle.fecha}</div>
            <div><strong>Estado:</strong> <Badge status={detalle.estado} /></div>
          </div>
        )}
      </Modal>

      <Modal isOpen={rechazarId !== null} onClose={() => { setRechazarId(null); setMotivo(''); }} title="Rechazar Solicitud">
        <p className="subtitle">Por favor indica el motivo del rechazo.</p>
        <Textarea label="Motivo" value={motivo} onChange={e => setMotivo(e.target.value)} rows={4} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button variant="secondary" onClick={() => { setRechazarId(null); setMotivo(''); }}>Cancelar</Button>
          <Button variant="danger" onClick={() => { if (rechazarId !== null) { setEstado(rechazarId, 'rechazada'); } setRechazarId(null); setMotivo(''); }}>Rechazar</Button>
        </div>
      </Modal>
    </>
  );
}