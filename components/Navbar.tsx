'use client';

import Link from 'next/link';
import styles from './Navbar.module.css';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>Huahuacuna</Link>
        <nav className={`${styles.nav} ${open ? styles.open : ''}`}>  
          <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
          <Link href="/apadrinar" onClick={() => setOpen(false)}>Apadrinar</Link>
          <Link href="/donar" onClick={() => setOpen(false)}>Donar</Link>
          <Link href="/login" className={styles.login} onClick={() => setOpen(false)}>Iniciar Sesión</Link>
        </nav>
        <button aria-label="menu" className={styles.burger} onClick={() => setOpen(o => !o)}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}