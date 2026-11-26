'use client';
import { useActionState } from 'react';
import { verstuurAanvraag } from '@/app/contact/actions';

const ONDERWERPEN = ['Offerte', 'Onderhoud', 'Verwarming', 'Warmtepomp', 'Zonnepanelen', 'Elektra', 'Sanitair', 'Airco', 'Laadpaal', 'Iets anders'];

export default function OfferteFormulier({ onderwerp }) {
  const [staat, actie, bezig] = useActionState(verstuurAanvraag, null);
  const opties = onderwerp && !ONDERWERPEN.includes(onderwerp) ? [onderwerp, ...ONDERWERPEN] : ONDERWERPEN;

  if (staat?.ok) {
    return <div className="melding ok">Bedankt! Uw aanvraag is binnen. We nemen zo snel mogelijk contact met u op.</div>;
  }

  return (
    <form action={actie} className="form">
      <div className="rij2">
        <div className="veld"><label htmlFor="naam">Naam *</label><input id="naam" name="naam" required autoComplete="name" /></div>
        <div className="veld">
          <label htmlFor="onderwerp">Onderwerp</label>
          <select id="onderwerp" name="onderwerp" defaultValue={onderwerp || 'Offerte'}>
            {opties.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div className="rij2">
        <div className="veld"><label htmlFor="email">E-mailadres</label><input id="email" name="email" type="email" autoComplete="email" /></div>
        <div className="veld"><label htmlFor="telefoon">Telefoonnummer</label><input id="telefoon" name="telefoon" type="tel" autoComplete="tel" /></div>
      </div>
      <div className="veld"><label htmlFor="adres">Adres en woonplaats</label><input id="adres" name="adres" autoComplete="street-address" /></div>
      <div className="veld"><label htmlFor="bericht">Uw vraag *</label><textarea id="bericht" name="bericht" rows={6} required /></div>
      <div className="verborgen" aria-hidden="true"><label htmlFor="website">Laat leeg</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14 }}>
        <input type="checkbox" name="akkoord" value="ja" required style={{ marginTop: 4, width: 18, height: 18 }} />
        <span>Ik ga akkoord dat N. Kuiper B.V. mijn gegevens gebruikt om contact met mij op te nemen over deze aanvraag (zie de <a href="/privacy" style={{ textDecoration: 'underline' }}>privacyverklaring</a>).</span>
      </label>
      {staat?.fout && <div className="melding fout" role="alert">{staat.fout}</div>}
      <div><button className="btn" disabled={bezig}>{bezig ? 'Bezig met versturen…' : 'Aanvraag versturen'}</button></div>
    </form>
  );
}
