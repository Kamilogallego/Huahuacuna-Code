'use client';

import * as React from 'react';

interface TabItem {
  key: string;
  label: string;
}

interface TabsWrapperProps {
  items: TabItem[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}

export function Tabs({ items, active, onChange, className }: TabsWrapperProps) {
  return (
    <div className={className} style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #e5e7eb' }}>
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          style={{
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
            fontWeight: active === item.key ? 600 : 400,
            color: active === item.key ? '#1c4e9a' : '#6b7280',
            borderBottom: active === item.key ? '2px solid #1c4e9a' : 'none',
            marginBottom: '-2px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
