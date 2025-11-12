'use client';
import React from 'react';
import ChatPanel from '@components/chat/ChatPanel';
import SettingsPanel from '@components/chat/SettingsPanel';
import { useRouter, useParams } from 'next/navigation';

export default function ChatApadrinadoPage() {
  const router = useRouter();
  const { id } = useParams();
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 260px',
      background: 'white',
      border: '1px solid var(--gray-200)',
      borderRadius: 16,
      height: 'calc(100vh - 160px)'
    }}>
      <ChatPanel />
      <SettingsPanel />
      <a onClick={() => router.back()} style={{
        position: 'absolute',
        top: 12,
        left: 18,
        fontSize: '.65rem',
        cursor: 'pointer',
        color: 'var(--primary-blue-dark)'
      }}>← Volver al Perfil ({id})</a>
    </div>
  );
}