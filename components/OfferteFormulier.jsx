'use client';
import { useActionState, useState } from 'react';
import { verstuurAanvraag } from '@/app/contact/actions';

const ONDERWERPEN = ['Algemene vraag', 'Offerte', 'Onderhoud', 'Storing (geen spoed)', 'Verwarming', 'Warmtepomp', 'Zonnepanelen', 'Elektra', 'Sanitair', 'Airco', 'Laadpaal', 'Zakelijk project', 'Sollicitatie', 'Iets anders'];

// Kop, knop en hulptekst per soort bericht
function soort(onderwerp) {
  const o = String(onderwerp || '').toLowerCase();
  if (o.startsWith('onderhoud') || o.startsWith('service')) return { kop: 'Onderhoud aanvragen', knop: 'Onderhoudsaanvraag versturen', vraag: 'Welk toestel of welke installatie? Merk en type, als u dat weet', placeholder: 'Bijvoorbeeld: jaarlijks onderhoud aan onze cv-ketel (Remeha Tzerra). Voorkeur voor een ochtend.' };
  if (o.startsWith('storing')) return { kop: 'Storing doorgeven', knop: 'Storing doorgeven', vraag: 'Wat is er aan de hand?', placeholder: 'Omschrijf de storing. Heeft u spoed, bel dan direct.' };
  if (o.startsWith('zakelijk')) return { kop: 'Zakelijk project bespreken', knop: 'Bericht versturen', vraag: 'Waar gaat het project over?', placeholder: 'Bijvoorbeeld: nieuwe persluchtvoorziening en hoofdverdeler voor onze productiehal. Vermeld ook uw bedrijfsnaam.' };
  if (o.startsWith('sollicitatie')) return { kop: 'Solliciteren', knop: 'Sollicitatie versturen', vraag: 'Vertel iets over uzelf', placeholder: 'Voor welke functie, uw ervaring en wanneer we u kunnen bellen.' };
  if (o.startsWith('algemene') || o.startsWith('iets anders')) return { kop: 'Contactformulier', knop: 'Bericht versturen', vraag: 'Uw vraag of bericht', placeholder: '' };
  return { kop: 'Offerte aanvragen', knop: 'Offerteaanvraag versturen', vraag: 'Waar wilt u een offerte voor?', placeholder: 'Bijvoorbeeld: een hybride warmtepomp voor een woning uit 1975, met vloerverwarming beneden.' };
}

export default function OfferteFormulier({ onderwerp, telefoon, telHref }) {
  const [staat, actie, bezig] = useActionState(verstuurAanvraag, null);
  const start = onderwerp || 'Algemene vraag';
  const opties = !ONDERWERPEN.includes(start) ? [start, ...ONDERWERPEN] : ONDERWERPEN;
  const [gekozen, setGekozen] = useState(start);
  const s = soort(gekozen);
  const w = staat?.waarden || {};
  const [clientFout, setClientFout] = useState('');

  function controleer(e) {
    const f = e.currentTarget;
    if (!f.email.value.trim() && !f.telefoon.value.trim()) {
      e.preventDefault();
      setClientFout('Vul een e-mailadres of telefoonnummer in, zodat we u kunnen bereiken.');
      f.telefoon.focus();
      return;
    }
    setClientFout('');
  }

  if (staat?.ok) {
    return (
      <div className="melding ok" role="status">
        Bedankt, uw bericht is binnen! We nemen zo snel mogelijk contact met u op.
      </div>
    );
  }

  return (
    <>
      <h2 className="h2" style={{ fontSize: 28, marginBottom: 24 }}>{s.kop}</h2>
      <form key={staat?.t || 0} action={actie} onSubmit={controleer} className="form">
        <div className="rij2">
          <div className="veld">
            <label htmlFor="onderwerp">Waar gaat het over?</label>
            <select id="onderwerp" name="onderwerp" value={gekozen} onChange={(e) => setGekozen(e.target.value)}>
              {opties.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="veld"><label htmlFor="naam">Naam *</label><input id="naam" name="naam" required autoComplete="name" defaultValue={w.naam || ''} /></div>
        </div>
        {gekozen.toLowerCase().startsWith('storing') && (
          <div className="melding fout">Heeft u spoed, bijvoorbeeld geen verwarming of warm water? Bel dan direct <a href={telHref} style={{ fontWeight: 600, textDecoration: 'underline' }}>{telefoon}</a>.</div>
        )}
        <small style={{ color: 'var(--grijs-tekst)', marginBottom: -8 }}>Vul een e-mailadres of telefoonnummer in (of allebei).</small>
        <div className="rij2">
          <div className="veld"><label htmlFor="email">E-mailadres</label><input id="email" name="email" type="email" autoComplete="email" defaultValue={w.email || ''} /></div>
          <div className="veld"><label htmlFor="telefoon">Telefoonnummer</label><input id="telefoon" name="telefoon" type="tel" autoComplete="tel" defaultValue={w.telefoon || ''} /></div>
        </div>
        <div className="veld"><label htmlFor="adres">Adres en woonplaats</label><input id="adres" name="adres" autoComplete="street-address" defaultValue={w.adres || ''} /></div>
        <div className="veld">
          <label htmlFor="bericht">{s.vraag} *</label>
          <textarea id="bericht" name="bericht" rows={6} required placeholder={s.placeholder} defaultValue={w.bericht || ''} />
        </div>
        <div className="verborgen" aria-hidden="true"><label htmlFor="website">Laat leeg</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14 }}>
          <input type="checkbox" name="akkoord" value="ja" required defaultChecked={!!w.akkoord} style={{ marginTop: 4, width: 18, height: 18 }} />
          <span>Ik ga akkoord dat N. Kuiper B.V. mijn gegevens gebruikt om contact met mij op te nemen over dit bericht (zie de <a href="/privacy" style={{ textDecoration: 'underline' }}>privacyverklaring</a>).</span>
        </label>
        {(clientFout || staat?.fout) && <div className="melding fout" role="alert">{clientFout || staat.fout}</div>}
        <div><button className="btn" disabled={bezig}>{bezig ? 'Bezig met versturen…' : s.knop}</button></div>
      </form>
    </>
  );
}
