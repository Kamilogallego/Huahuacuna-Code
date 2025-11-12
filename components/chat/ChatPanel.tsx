"use client";
import React, { useState } from 'react';
import { MessageBubble, ChatMessage } from './MessageBubble';

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', autor: 'admin', nombre: 'María González', texto: '¡Hola! Bienvenido al chat, estoy aquí para cualquier duda.', fecha: new Date().toISOString() },
    { id: '2', autor: 'padrino', nombre: 'Juan Pérez', texto: 'Muchas gracias. ¿Cómo va en la escuela?', fecha: new Date().toISOString() }
  ]);
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: String(Date.now()), autor: 'padrino', nombre: 'Juan Pérez', texto: text.trim(), fecha: new Date().toISOString() }]);
    setText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '1rem 1rem .5rem' }}>
        <h4 style={{ margin: 0 }}>Chat sobre Sofia</h4>
        <small style={{ color: 'var(--gray-600)' }}>Comunicación con administradores</small>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18, padding: '0 1rem 1rem' }}>
        {messages.map(m => <MessageBubble key={m.id} m={m} />)}
      </div>
      <div style={{ borderTop: '1px solid var(--gray-200)', padding: '.6rem .8rem', display: 'flex', gap: 8 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{ flex: 1, border: '1px solid var(--gray-300)', borderRadius: 12, padding: '.6rem .75rem', fontSize: '.75rem' }}
        />
        <button onClick={send} style={{ background: 'var(--primary-green)', color: 'white', border: 'none', borderRadius: 12, padding: '.6rem 1rem', fontSize: '.75rem', fontWeight: 600 }}>Enviar</button>
      </div>
    </div>
  );
}
