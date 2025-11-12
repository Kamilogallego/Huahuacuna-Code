"use client";
import React from 'react';

export interface TabItem { key: string; label: string; }

export function Tabs({ items, active, onChange }: { items: TabItem[]; active: string; onChange: (k: string) => void; }) {
  return (
    <div style={{
      display: 'flex',
      gap: 8,
      background: 'var(--gray-100)',
      padding: 4,
      borderRadius: 9999,
      fontSize: '.75rem'
    }}>
      {items.map(it => {
        const is = it.key === active;
        return (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            style={{
              border: 'none',
              background: is ? 'white' : 'transparent',
              color: is ? 'var(--primary-blue-dark)' : 'var(--gray-600)',
              padding: '0.5rem 1.1rem',
              borderRadius: 9999,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >{it.label}</button>
        );
      })}
    </div>
  );
}
