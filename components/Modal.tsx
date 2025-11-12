import React from 'react';

export default function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title?: string; children?: React.ReactNode; }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'grid', placeItems: 'center', zIndex: 50, padding: '1rem'
    }}
      onClick={onClose}
    >
      <div className="card" style={{ width: '100%', maxWidth: 640 }} onClick={e => e.stopPropagation()}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}