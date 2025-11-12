import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

export const metadata = {
  title: 'Fundación Huahuacuna',
  description: 'Apoyo a la infancia mediante apadrinamientos y donaciones'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}