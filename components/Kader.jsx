import Link from 'next/link';
import { getInstellingen, telLink } from '@/lib/data';
import Menu from './Menu';
import Social from './Social';
import WhatsAppKnop from './WhatsAppKnop';

// 06 12345678 / 0315 617555 / +31 6 ... → 316... (formaat voor wa.me)
function waNummer(n) {
  let c = String(n || '').replace(/[^0-9+]/g, '');
  if (c.startsWith('+')) c = c.slice(1);
  else if (c.startsWith('00')) c = c.slice(2);
  else if (c.startsWith('0')) c = '31' + c.slice(1);
  return c.length >= 10 ? c : '';
}

function Logo({ src, wit }) {
  if (src) return <img src={src} alt="N. Kuiper B.V. Installatietechniek" className={wit ? 'logo-wit' : ''} style={{ height: 'clamp(40px, 6vw, 54px)', width: 'auto' }} />;
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
          <div><span className="alleen-groot">Storing aan uw cv-ketel of warmtepomp? </span><span className="alleen-klein">Storing? </span>Bel direct <a href={tel} style={{ fontWeight: 600, textDecoration: 'underline' }}>{i.telefoon}</a></div>
          <div className="alleen-groot" style={{ gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <Social instellingen={i} licht />
            <a href={`mailto:${i.email}`}>{i.email}</a>
            <a href={i.klantenportaal}>Klantenportaal →</a>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="wrap">
          <Link href="/" aria-label="Naar de homepage"><Logo src={i.logo} /></Link>
          <Menu telefoon={i.telefoon} telHref={tel} />
          <Link href="/contact#offerte" className="btn header-cta" style={{ fontSize: 15, padding: '13px 22px' }}>Offerte aanvragen</Link>
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
            {waNummer(i.whatsapp) && <a href={`https://wa.me/${waNummer(i.whatsapp)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
            <div style={{ marginTop: 14 }}><Social instellingen={i} licht /></div>
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

      {waNummer(i.whatsapp) && (
        <WhatsAppKnop nummer={waNummer(i.whatsapp)} tekst={i.whatsapp_tekst} bericht={i.whatsapp_bericht} telefoon={i.telefoon} telHref={tel} />
      )}
    </>
  );
}
