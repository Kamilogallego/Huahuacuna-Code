'use client';

import { useMemo, useState } from 'react';
import { donacionesMock, Donacion } from '@lib/mockData';
import Table from '@components/Table';
import Button from '@components/Button';
import Badge from '@components/Badge';

export default function AdminDonacionesPage() {
  // Creamos un estado mutable copiando el mock (ya no es readonly el array).
  const [data] = useState<Donacion[]>(() => [...donacionesMock]);
  const [tipo, setTipo] = useState<'todas' | 'dinero' | 'especie'>('todas');
  const [fecha, setFecha] = useState('');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    let arr = data;
    if (tipo !== 'todas') arr = arr.filter(d => d.tipo === tipo);
    if (fecha) arr = arr.filter(d => d.fecha.startsWith(fecha));
    if (q.trim()) {
      const t = q.toLowerCase();
      arr = arr.filter(d => {
        if (d.tipo === 'dinero') {
          return d.metodo.toLowerCase().includes(t);
        } else {
          return d.descripcion.toLowerCase().includes(t);
        }
      });
    }
    return arr;
  }, [data, tipo, fecha, q]);

  // Columnas con render seguro usando el discriminante d.tipo
  const columns = [
    {
      key: 'tipo',
      header: 'Tipo',
      render: (row: Donacion) => <Badge status={row.tipo === 'dinero' ? 'aprobada' : 'pendiente'} label={row.tipo} />
    },
    {
      key: 'montoDesc',
      header: 'Monto / Desc.',
      render: (row: Donacion) => {
        if (row.tipo === 'dinero') return `$${row.monto.toFixed(2)}`;
        return row.descripcion;
      }
    },
    {
      key: 'metodo',
      header: 'Método',
      render: (row: Donacion) => (row.tipo === 'dinero' ? row.metodo : '—')
    },
    { key: 'fecha', header: 'Fecha' },
    {
      key: 'estado',
      header: 'Estado',
      render: (row: Donacion) => <Badge status={row.estado} />
    }
  ] as const;

  const exportCSV = () => {
    const headers = ['tipo', 'monto', 'descripcion', 'metodo', 'fecha', 'estado'];
    const rows = filtered.map(d => [
      d.tipo,
      d.tipo === 'dinero' ? d.monto : '',
      d.tipo === 'especie' ? d.descripcion : '',
      d.tipo === 'dinero' ? d.metodo : '',
      d.fecha,
      d.estado
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.map(v => String(v).replaceAll('"', '""')).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'donaciones.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <h2 style={{ marginBottom: '1rem' }}>Gestión de Donaciones</h2>

      <div className="row" style={{ marginBottom: '1rem', gap: '0.75rem', alignItems: 'flex-end' }}>
        <div className="col">
          <input
            className="input"
            placeholder="Buscar por descripción o método..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
        <div className="col" style={{ display: 'flex', gap: 8 }}>
          {(['todas', 'dinero', 'especie'] as const).map(t => (
            <button
              key={t}
              className="btn"
              onClick={() => setTipo(t)}
              style={{
                background: tipo === t ? 'var(--primary-blue)' : 'var(--gray-200)',
                color: tipo === t ? 'white' : 'var(--gray-900)'
              }}
            >
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