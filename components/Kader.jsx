import Link from 'next/link';
import { getInstellingen, telLink } from '@/lib/data';

function Logo({ src, wit }) {
  if (src) return <img src={src} alt="N. Kuiper B.V. Installatietechniek" className={wit ? 'logo-wit' : ''} style={{ height: 54, width: 'auto' }} />;
  return (
    <div className="logo-tekst" style={wit ? { color: '#fff' } : undefined}>
      N. Kuiper B.V.<span style={wit ? { color: '#CFCAC5' } : undefined}>Installatietechniek</span>
    </div>
  );
}

// Topbalk, header en footer rond elke openbare pagina.
export default async function Kader({ children }) {
  const i = await getInstellingen();
  const tel = telLink(i.telefoon);
  const jaar = new Date().getFullYear();

  return (
    <>
      <div className="topbalk">
        <div className="wrap">
          <div>Storing aan uw cv-ketel of warmtepomp? Bel direct <a href={tel} style={{ fontWeight: 600, textDecoration: 'underline' }}>{i.telefoon}</a></div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <a href={`mailto:${i.email}`}>{i.email}</a>
            <a href={i.klantenportaal}>Klantenportaal →</a>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="wrap">
          <Link href="/" aria-label="Naar de homepage"><Logo src={i.logo} /></Link>
          <nav className="nav" aria-label="Hoofdmenu">
            <Link href="/#diensten">Diensten</Link>
            <Link href="/#duurzaam">Duurzaam</Link>
            <Link href="/diensten/service-onderhoud">Service &amp; onderhoud</Link>
            <Link href="/over-ons">Over ons</Link>
            <Link href="/actueel">Actueel</Link>
            <Link href="/werken-bij">Werken bij</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <Link href="/contact#offerte" className="btn" style={{ fontSize: 15, padding: '13px 22px' }}>Offerte aanvragen</Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="wrap kolommen">
          <div className="kolom" style={{ gap: 16 }}>
            <Logo src={i.logo} wit />
            <span>Een begrip in de Achterhoek.</span>
          </div>
          <div className="kolom">
            <span className="lbl">Bezoekadres</span>
            <span>{i.adres}</span>
            <span>{i.postcode_plaats}</span>
          </div>
          <div className="kolom">
            <span className="lbl">Contact</span>
            <a href={tel}>{i.telefoon}</a>
            <a href={`mailto:${i.email}`}>{i.email}</a>
            {i.facebook && <a href={i.facebook}>Facebook</a>}
          </div>
          <div className="kolom">
            <span className="lbl">Snel naar</span>
            <a href={i.klantenportaal}>Klantenportaal</a>
            <Link href="/contact#offerte">Offerte aanvragen</Link>
            <Link href="/werken-bij">Werken bij</Link>
          </div>
        </div>
        <div className="onder">
          <div className="wrap">
            <span>© {jaar} N. Kuiper B.V. Installatietechniek{i.kvk ? ` · KvK ${i.kvk}` : ''}</span>
            <span style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <Link href="/privacy">Privacy</Link>
              <Link href="/inloggen">Beheer</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
