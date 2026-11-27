import Kader from '@/components/Kader';
import OfferteFormulier from '@/components/OfferteFormulier';
import { getInstellingen, telLink, waNummer } from '@/lib/data';

export const metadata = {
  title: 'Contact',
  description: 'Neem contact op met N. Kuiper B.V. Installatietechniek in Breedenbroek: bel, mail, app of stuur een bericht voor een offerte, onderhoud of storing.',
};

export default async function Contact({ searchParams }) {
  const sp = await searchParams;
  const i = await getInstellingen();
  const onderwerp = typeof sp?.onderwerp === 'string' ? sp.onderwerp.slice(0, 120) : '';
  const wa = waNummer(i.whatsapp);
  const route = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${i.adres}, ${i.postcode_plaats}`)}`;

  return (
    <Kader>
      <section className="paginakop"><div className="wrap"><div className="lbl">Contact</div><h1>Vraag, offerte of onderhoud? Wij helpen u graag.</h1></div></section>
      <section className="sectie">
        <div className="wrap split" style={{ alignItems: 'flex-start' }}>
          <div id="formulier" style={{ flex: '2 1 520px', scrollMarginTop: 24 }}>
            <OfferteFormulier onderwerp={onderwerp} telefoon={i.telefoon} telHref={telLink(i.telefoon)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card">
              <span className="lbl">Bellen</span>
              <a href={telLink(i.telefoon)} className="card-titel" style={{ fontSize: 26 }}>{i.telefoon}</a>
              <span className="card-tekst">Ook voor storingen.</span>
            </div>
            {wa && (
              <div className="card">
                <span className="lbl">WhatsApp</span>
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="card-titel">Stuur ons een appje →</a>
                <span className="card-tekst">Handig voor een korte vraag of om een foto van uw installatie mee te sturen.</span>
              </div>
            )}
            <div className="card">
              <span className="lbl">Mailen</span>
              <a href={`mailto:${i.email}`} className="card-titel">{i.email}</a>
            </div>
            <div className="card">
              <span className="lbl">Bezoekadres</span>
              <span className="card-titel">{i.adres}<br />{i.postcode_plaats}</span>
              <a href={route} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: 15, textDecoration: 'underline' }}>Route plannen ↗</a>
            </div>
            {i.openingstijden && (
              <div className="card">
                <span className="lbl">Openingstijden kantoor</span>
                <span className="card-tekst" style={{ whiteSpace: 'pre-line', color: 'var(--antraciet)' }}>{i.openingstijden}</span>
              </div>
            )}
            {i.kvk && <span style={{ fontSize: 13, color: 'var(--grijs-tekst)', paddingLeft: 4 }}>KvK {i.kvk}</span>}
          </div>
        </div>
      </section>
    </Kader>
  );
}
