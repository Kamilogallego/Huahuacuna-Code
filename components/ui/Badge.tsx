import React from 'react';

export function Badge({ status, label }: { status: 'pendiente' | 'aprobada' | 'rechazada' | string; label?: string; }) {
  const map: Record<string, string> = {
    pendiente: 'badgeYellow',
    aprobada: 'badgeGreen',
    rechazada: 'badgeRed'
  };
  const cls = map[status] || 'badgeBlue';
  return <span className={['badge', cls].join(' ')}>{label ?? status}</span>;
}