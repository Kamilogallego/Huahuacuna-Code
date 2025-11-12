import React from 'react';

export default function Card({ title, children, icon }: { title?: string; children?: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="card">
      {(title || icon) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          {icon}
          {title && <h3 style={{ margin: 0 }}>{title}</h3>}
        </div>
      )}
      {children}
    </div>
  );
}