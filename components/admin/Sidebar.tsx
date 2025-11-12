'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/solicitudes', label: 'Solicitudes' },
  { href: '/admin/donaciones', label: 'Donaciones' },
  { href: '/admin/ninos', label: 'Niños' },
  { href: '/admin/usuarios', label: 'Usuarios' }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      position: 'sticky', top: 80, alignSelf: 'start',
      border: '1px solid var(--gray-200)', borderRadius: 12, padding: 12, background: 'white'
    }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Admin</div>
      <nav style={{ display: 'grid', gap: 6 }}>
        {links.map(l => {
          const active = pathname === l.href;
          return (
            <Link key={l.href} href={l.href} style={{
              padding: '0.6rem 0.8rem',
              borderRadius: 8,
              background: active ? 'var(--primary-blue)' : 'transparent',
              color: active ? 'white' : 'var(--gray-900)'
            }}>
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}