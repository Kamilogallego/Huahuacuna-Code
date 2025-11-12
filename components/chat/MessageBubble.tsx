"use client";
import React from 'react';

export interface ChatMessage {
  id: string;
  autor: 'admin' | 'padrino';
  nombre: string;
  texto: string;
  fecha: string; // ISO
}

export function MessageBubble({ m }: { m: ChatMessage }) {
  const isUser = m.autor === 'padrino';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '70%',
        background: isUser ? 'var(--primary-blue-dark)' : 'var(--gray-200)',
        color: isUser ? 'white' : 'var(--gray-800)',
        padding: '.55rem .75rem',
        borderRadius: 14,
        fontSize: '.75rem',
        lineHeight: 1.35,
        position: 'relative'
      }}>
        {!isUser && <span style={{ position: 'absolute', top: -16, left: 0, fontSize: '.55rem', fontWeight: 600, color: 'var(--gray-600)' }}>{m.nombre} · Admin</span>}
        {isUser && <span style={{ position: 'absolute', top: -16, right: 0, fontSize: '.55rem', fontWeight: 600, color: 'var(--gray-600)' }}>{m.nombre}</span>}
        <div>{m.texto}</div>
        <div style={{ fontSize: '.55rem', opacity: .7, marginTop: 4 }}>{new Date(m.fecha).toLocaleString('es-CO', { hour: 'numeric', minute: 'numeric', hour12: true, day: 'numeric', month: 'short' })}</div>
      </div>
    </div>
  );
}
