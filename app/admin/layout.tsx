'use client';

import AdminSidebar from '@components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container section" style={{ paddingTop: 0 }}>
      <div className="sidebarLayout">
        <div className="hiddenOnMobile">
          <AdminSidebar />
        </div>
        <div style={{ minWidth: 0 }}>
          {children}
        </div>
      </div>
    </section>
  );
}