'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { CHILDREN } from './mockData';
import Table from '@components/Table';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import Badge from '@components/Badge';

interface Nino {
  id: number;
  foto: string;
  nombre: string;
  edad: number;
  descripcion: string;
  necesidades: string;            // Texto multi‑línea (una necesidad por línea)
  apadrinado: boolean;
  estado: 'disponible' | 'apadrinado';
}

const nuevoNino: Nino = {
  id: 0,
  foto: '',
  nombre: '',
  edad: 0,
  descripcion: '',
  necesidades: '',
  apadrinado: false,
  estado: 'disponible'
};

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export default function AdminNinosPage() {
  // Normaliza CHILDREN (mock) a la forma usada en esta página.
  const inicial: Nino[] = useMemo(
    () =>
      CHILDREN.map((n): Nino => ({
        id: n.id,
        foto: n.foto ?? '',
        nombre: n.nombre ?? '',
        edad: n.edad ?? 0,
        descripcion: n.descripcion ?? '',
        necesidades: Array.isArray(n.necesidades) ? n.necesidades.join('\n') : (n.necesidades as any as string) ?? '',
        estado: ((n as any).estado === 'apadrinado' || (n as any).estado === 'activo' ? 'apadrinado' : 'disponible') as 'apadrinado' | 'disponible',
        apadrinado: (n as any).estado === 'apadrinado' || (n as any).estado === 'activo'
      })),
    []
  );

  const [data, setData] = useState<Nino[]>(inicial);
  const [editing, setEditing] = useState<Nino | null>(null);

  const necesidadesToList = (text: string) =>
    text
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);

  const columns: Column<Nino>[] = [
    {
      key: 'foto',
      header: 'Foto',
      render: (row) =>
        row.foto ? (
          <img
            src={row.foto}
            alt={row.nombre || 'Foto'}
            style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }}
          />
        ) : (
          '—'
        )
    },
    { key: 'nombre', header: 'Nombre' },
    {
      key: 'edad',
      header: 'Edad',
      render: (row) => `${row.edad} años`
    },
    {
      key: 'apadrinado',
      header: 'Apadrinado',
      render: (row) => (row.apadrinado ? <Badge status="aprobada" label="Sí" /> : <Badge status="pendiente" label="No" />)
    },
    {
      key: 'estado',
      header: 'Estado',
      render: (row) => (
        <Badge status={row.estado === 'apadrinado' ? 'aprobada' : 'pendiente'} label={row.estado} />
      )
    },
    {
      key: 'necesidades',
      header: 'Necesidades',
      render: (row) => {
        const list = necesidadesToList(row.necesidades);
        if (!list.length) return '—';
        return (
          <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '.55rem' }}>
            {list.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        );
      }
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (row) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" onClick={() => editar(row)}>
            Editar
          </Button>
          <Button
            variant="danger"
            onClick={() => setData((prev) => prev.filter((n) => n.id !== row.id))}
          >
            Eliminar
          </Button>
        </div>
      )
    }
  ];

  const editar = useCallback((row: Nino) => {
    setEditing({ ...row });
  }, []);

  const openNew = () => {
    setEditing({ ...nuevoNino, id: Date.now() });
  };

  const cancelar = () => {
    setEditing(null);
  };

  const validar = (nino: Nino) => {
    if (!nino.nombre.trim()) return 'Nombre requerido';
    if (nino.edad <= 0) return 'La edad debe ser mayor a 0';
    return null;
  };

  const save = () => {
    if (!editing) return;
    const err = validar(editing);
    if (err) {
      alert(err);
      return;
    }
    setData((prev) => {
      const exists = prev.some((n) => n.id === editing.id);
      const normalizado: Nino = {
        ...editing,
        apadrinado: editing.estado === 'apadrinado'
      };
      return exists
        ? prev.map((n) => (n.id === normalizado.id ? normalizado : n))
        : [normalizado, ...prev];
    });
    setEditing(null);
  };

  const tituloModal = editing ? (data.some((n) => n.id === editing.id) ? 'Editar Niño' : 'Agregar Niño') : '';

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          gap: 16,
          flexWrap: 'wrap'
        }}
      >
        <h2 style={{ margin: 0 }}>Gestión de Niños</h2>
        <Button variant="primary" onClick={openNew}>
          Agregar Nuevo Niño
        </Button>
      </div>

      <Table columns={columns} data={data} />

      <Modal isOpen={!!editing} onClose={cancelar} title={tituloModal}>
        {editing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
            style={{ display: 'grid', gap: 12 }}
          >
            <Input
              label="URL de Foto"
              value={editing.foto}
              onChange={(e) => setEditing((prev) => prev && { ...prev, foto: e.target.value })}
              placeholder="https://..."
            />

            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <Input
                  label="Nombre"
                  value={editing.nombre}
                  required
                  onChange={(e) => setEditing((prev) => prev && { ...prev, nombre: e.target.value })}
                />
              </div>
              <div style={{ width: 140 }}>
                <Input
                  label="Edad"
                  type="number"
                  value={editing.edad.toString()}
                  onChange={(e) =>
                    setEditing((prev) => prev && { ...prev, edad: Number(e.target.value) || 0 })
                  }
                />
              </div>
            </div>

            <Textarea
              label="Descripción"
              rows={3}
              value={editing.descripcion}
              onChange={(e) => setEditing((prev) => prev && { ...prev, descripcion: e.target.value })}
            />

            <Textarea
              label="Necesidades (una por línea)"
              rows={4}
              value={editing.necesidades}
              onChange={(e) => setEditing((prev) => prev && { ...prev, necesidades: e.target.value })}
            />

            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label className="label">Estado</label>
                <select
                  className="input"
                  value={editing.estado}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev && {
                        ...prev,
                        estado: e.target.value as Nino['estado'],
                        apadrinado: e.target.value === 'apadrinado'
                      }
                    )
                  }
                  style={{
                    width: '100%',
                    border: '1px solid var(--gray-300)',
                    borderRadius: 10,
                    padding: '.55rem .7rem',
                    fontSize: '.7rem'
                  }}
                >
                  <option value="disponible">disponible</option>
                  <option value="apadrinado">apadrinado</option>
                </select>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'flex-end', gap: 8, paddingBottom: 4 }}
              >
                <input
                  type="checkbox"
                  checked={editing.apadrinado}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev && {
                        ...prev,
                        apadrinado: e.target.checked,
                        estado: e.target.checked ? 'apadrinado' : 'disponible'
                      }
                    )
                  }
                />
                <label className="label" style={{ fontSize: '.7rem' }}>
                  Apadrinado
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
              <Button variant="secondary" type="button" onClick={cancelar}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}