import Kader from '@/components/Kader';
import OfferteFormulier from '@/components/OfferteFormulier';
import { getInstellingen, telLink } from '@/lib/data';

export const metadata = { title: 'Contact en offerte' };

export default async function Contact({ searchParams }) {
  const sp = await searchParams;
  const i = await getInstellingen();
  const onderwerp = typeof sp?.onderwerp === 'string' ? sp.onderwerp.slice(0, 120) : '';

  return (
    <Kader>
      <section className="paginakop"><div className="wrap"><div className="lbl">Contact</div><h1>Offerte of vraag? Wij helpen u graag.</h1></div></section>
      <section className="sectie">
        <div className="wrap split" style={{ alignItems: 'flex-start' }}>
          <div id="offerte" style={{ flex: '2 1 520px' }}>
            <h2 className="h2" style={{ fontSize: 28, marginBottom: 24 }}>Offerte aanvragen</h2>
            <OfferteFormulier onderwerp={onderwerp} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card">
              <span className="lbl">Bellen</span>
              <a href={telLink(i.telefoon)} className="card-titel" style={{ fontSize: 26 }}>{i.telefoon}</a>
              <span className="card-tekst">Ook voor storingen.</span>
            </div>
            <div className="card">
              <span className="lbl">Mailen</span>
              <a href={`mailto:${i.email}`} className="card-titel">{i.email}</a>
            </div>
            <div className="card">
              <span className="lbl">Bezoekadres</span>
              <span className="card-titel">{i.adres}<br />{i.postcode_plaats}</span>
            </div>
          </div>
        </div>
      </section>
    </Kader>
  );
}
