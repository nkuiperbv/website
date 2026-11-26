import './globals.css';

export const metadata = {
  title: {
    default: 'N. Kuiper B.V. Installatietechniek | Totaalinstallateur in de Achterhoek',
    template: '%s | N. Kuiper B.V. Installatietechniek',
  },
  description: 'Familiebedrijf uit Breedenbroek voor verwarming, elektra, sanitair, warmtepompen en zonnepanelen. Voor particulieren en bedrijven in de Achterhoek.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
