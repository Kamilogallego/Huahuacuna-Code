'use client';

import Card from '@components/Card';
import { useMemo } from 'react';
import { solicitudesMock, donacionesMock, ninosMock, usuariosMock } from '@lib/mockData';

export default function AdminDashboardPage() {
  const stats = useMemo(() => {
    const pendientes = solicitudesMock.filter(s => s.estado === 'pendiente').length;
    const donaciones = donacionesMock.length;
    const ninos = ninosMock.length;
    const padrinosActivos = usuariosMock.filter(u => u.rol === 'padrino' && u.estado === 'activo').length;
    return { pendientes, donaciones, ninos, padrinosActivos };
  }, []);

  return (
    <>
      <h2 style={{ marginBottom: '1rem' }}>Panel de Administración</h2>
      <div className="row">
        <div className="col"><Card title="Solicitudes Pendientes">{stats.pendientes}</Card></div>
        <div className="col"><Card title="Donaciones Recibidas">{stats.donaciones}</Card></div>
        <div className="col"><Card title="Niños Registrados">{stats.ninos}</Card></div>
        <div className="col"><Card title="Padrinos Activos">{stats.padrinosActivos}</Card></div>
      </div>
    </>
  );
}