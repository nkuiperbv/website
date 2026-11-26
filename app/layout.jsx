import { Archivo, Inter } from 'next/font/google';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-archivo' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: {
    default: 'N. Kuiper B.V. Installatietechniek | Totaalinstallateur in de Achterhoek',
    template: '%s | N. Kuiper B.V. Installatietechniek',
  },
  description: 'Familiebedrijf uit Breedenbroek voor verwarming, elektra, sanitair, warmtepompen en zonnepanelen. Voor particulieren en bedrijven in de Achterhoek.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className={`${archivo.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
