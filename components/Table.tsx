import React from 'react';

type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

export default function Table<T extends Record<string, any>>({
  columns,
  data,
  onRowClick
}: {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}) {
  return (
    <div className="tableWrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map(col => <th key={String(col.key)}>{col.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} onClick={() => onRowClick?.(row)} style={{ cursor: onRowClick ? 'pointer' : 'default' }}>
              {columns.map(col => (
                <td key={String(col.key)}>
                  {col.render ? col.render(row) : String(row[col.key as string] ?? '')}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr><td colSpan={columns.length} style={{ textAlign: 'center', color: 'var(--gray-600)' }}>Sin datos</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}