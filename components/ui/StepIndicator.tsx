"use client";
import React from 'react';

export default function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 16, margin: '0.75rem 0 1.25rem' }}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i < current;
        return (
          <div key={i} style={{
            flex: 1,
            height: 6,
            borderRadius: 6,
            background: active ? '#b53324' : 'var(--gray-200)',
            transition: 'background .3s'
          }} />
        );
      })}
    </div>
  );
}
