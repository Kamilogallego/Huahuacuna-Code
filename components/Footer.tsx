export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--gray-200)', marginTop: '3rem' }}>
      <div className="container" style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3,1fr)' }}>
        <div>
          <h4>Fundación Huahuacuna</h4>
          <p className="subtitle">Comprometidos con la niñez.</p>
        </div>
        <div>
          <h4>Contacto</h4>
          <p>info@huahuacuna.org</p>
          <p>+57 300 123 4567</p>
        </div>
        <div>
          <h4>Redes</h4>
          <p><a href="#">Facebook</a> · <a href="#">Instagram</a> · <a href="#">X</a></p>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--gray-600)' }}>
        © {new Date().getFullYear()} Fundación Huahuacuna. Todos los derechos reservados.
      </div>
    </footer>
  );
}