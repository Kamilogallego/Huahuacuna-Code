'use client';

import { useMemo, useState } from 'react';
import { donacionesMock } from '@lib/mockData';
import Table from '@components/Table';
import Button from '@components/Button';
import { Badge } from '@components/ui/Badge';

type Don = typeof donacionesMock[number];

export default function AdminDonacionesPage() {
  const [data] = useState<Don[]>(donacionesMock);
  const [tipo, setTipo] = useState<'todas' | 'dinero' | 'especie'>('todas');
  const [fecha, setFecha] = useState<string>('');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    let arr = data;
    if (tipo !== 'todas') arr = arr.filter(d => d.tipo === tipo);
    if (fecha) arr = arr.filter(d => d.fecha.startsWith(fecha));
    if (q.trim()) {
      const t = q.toLowerCase();
      arr = arr.filter(d => (d.descripcion || '').toLowerCase().includes(t) || (d.metodo || '').toLowerCase().includes(t));
    }
    return arr;
  }, [data, tipo, fecha, q]);

  const columns = [
    { key: 'tipo', header: 'Tipo', render: (row: Don) => <Badge status={row.tipo === 'dinero' ? 'aprobada' : 'pendiente'} label={row.tipo} /> },
    { key: 'monto', header: 'Monto/Desc', render: (row: Don) => row.tipo === 'dinero' ? `$${row.monto?.toFixed(2)}` : (row.descripcion || '-') },
    { key: 'metodo', header: 'Método', render: (row: Don) => row.metodo || '-' },
    { key: 'fecha', header: 'Fecha' },
    { key: 'estado', header: 'Estado', render: (row: Don) => <Badge status={row.estado} /> }
  ] as const;

  const exportCSV = () => {
    const headers = ['tipo', 'monto', 'descripcion', 'metodo', 'fecha', 'estado'];
    const rows = filtered.map(d => [d.tipo, d.monto ?? '', d.descripcion ?? '', d.metodo ?? '', d.fecha, d.estado]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'donaciones.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <> 
      <h2 style={{ marginBottom: '1rem' }}>Gestión de Donaciones</h2>

      <div className="row" style={{ marginBottom: '1rem' }}>
        <div className="col"><input className="input" placeholder="Buscar por descripción o método..." value={q} onChange={e => setQ(e.target.value)} /></div>
        <div className="col" style={{ display: 'flex', gap: 8 }}>
          {(['todas', 'dinero', 'especie'] as const).map(t => (
            <button key={t} className="btn" onClick={() => setTipo(t)} style={{ background: tipo === t ? 'var(--primary-blue)' : 'var(--gray-200)', color: tipo === t ? 'white' : 'var(--gray-900)' }}>
              {t}
            </button>
          ))}
        </div>
        <div className="col" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label className="label">Fecha:</label>
          <input type="date" className="input" value={fecha} onChange={e => setFecha(e.target.value)} />
        </div>
        <div className="col" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={exportCSV}>Exportar CSV</Button>
        </div>
      </div>

      <Table columns={columns as any} data={filtered} />
    </>
  );
}