'use client';
import { useActionState, useState } from 'react';
import { voegGebruikerToe, nieuweLink, wijzigRol, verwijderGebruiker } from '@/app/beheer/gebruikers/actions';

export const ROL_LABEL = { beheerder: 'Beheerder', redacteur: 'Redacteur' };

// Toont een uitnodigings- of inloglink met knoppen om hem te kopiëren of te mailen.
function LinkKaart({ staat }) {
  const [gekopieerd, setGekopieerd] = useState(false);
  if (!staat?.link) return null;
  const site = new URL(staat.link).origin;
  const aanhef = staat.naam ? `Hoi ${staat.naam.split(' ')[0]},` : 'Hoi,';
  const nieuw = staat.type === 'invite';
  const onderwerp = nieuw ? 'Uitnodiging beheer website N. Kuiper' : 'Inloglink beheer website N. Kuiper';
  const tekst = [
    aanhef,
    '',
    nieuw
      ? 'Je bent toegevoegd aan de beheeromgeving van de website van N. Kuiper. Via deze link stel je je wachtwoord in:'
      : 'Via deze link stel je een nieuw wachtwoord in voor de beheeromgeving van de website:',
    '',
    staat.link,
    '',
    'De link werkt maar één keer en is beperkte tijd geldig. Werkt hij niet meer, vraag dan een nieuwe aan.',
    `Daarna log je voortaan in via ${site}/inloggen met je e-mailadres en wachtwoord.`,
  ].join('\n');

  async function kopieer() {
    try { await navigator.clipboard.writeText(staat.link); setGekopieerd(true); } catch { setGekopieerd(false); }
  }

  return (
    <div className="melding ok" role="status" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <b>{nieuw ? 'Uitnodigingslink' : 'Nieuwe inloglink'} voor {staat.email}</b>
      <span>Stuur deze link naar de gebruiker. Daarmee stelt hij of zij een wachtwoord in.</span>
      <input readOnly value={staat.link} onFocus={(e) => e.target.select()} aria-label="Link"
        style={{ font: 'inherit', fontSize: 13, padding: '10px 12px', border: '1px solid #C9C4BF', borderRadius: 6, background: '#fff', color: 'var(--antraciet)' }} />
      <div className="b-acties">
        <button type="button" className="b-knop-licht" onClick={kopieer}>{gekopieerd ? 'Gekopieerd ✓' : 'Kopieer link'}</button>
        <a className="b-knop-licht" style={{ display: 'inline-flex', alignItems: 'center' }}
          href={`mailto:${staat.email}?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(tekst)}`}>Open in e-mail</a>
      </div>
    </div>
  );
}

export function NieuweGebruiker() {
  const [staat, actie, bezig] = useActionState(voegGebruikerToe, null);
  return (
    <form action={actie} className="form">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="veld"><label htmlFor="g-naam">Naam</label><input id="g-naam" name="naam" autoComplete="off" /></div>
        <div className="veld"><label htmlFor="g-email">E-mailadres</label><input id="g-email" name="email" type="email" required autoComplete="off" /></div>
        <div className="veld">
          <label htmlFor="g-rol">Rol</label>
          <select id="g-rol" name="rol" defaultValue="redacteur">
            <option value="redacteur">Redacteur – teksten, foto&apos;s en berichten</option>
            <option value="beheerder">Beheerder – alles, ook gebruikers</option>
          </select>
        </div>
      </div>
      {staat?.fout && <div className="melding fout" role="alert">{staat.fout}</div>}
      {staat?.ok && !staat.link && <div className="melding ok" role="status">{staat.ok}</div>}
      <LinkKaart staat={staat} />
      <div className="b-acties"><button className="btn" disabled={bezig}>{bezig ? 'Bezig…' : 'Gebruiker toevoegen'}</button></div>
    </form>
  );
}

export function GebruikerRij({ g, isIkzelf }) {
  const [linkStaat, linkActie, linkBezig] = useActionState(nieuweLink, null);
  const [rolStaat, rolActie] = useActionState(wijzigRol, null);
  const [wegStaat, wegActie, wegBezig] = useActionState(verwijderGebruiker, null);
  const fout = linkStaat?.fout || rolStaat?.fout || wegStaat?.fout;

  return (
    <div className="b-paneel" style={{ gap: 12, padding: 20 }}>
      <div className="b-kop">
        <div>
          <h2>{g.naam || g.email}{isIkzelf && <span style={{ fontWeight: 400, color: 'var(--grijs-tekst)' }}> (uzelf)</span>}</h2>
          <div style={{ fontSize: 14, color: 'var(--grijs-tekst)', marginTop: 4 }}>
            {g.naam && <>{g.email} · </>}
            {g.heeft_wachtwoord ? 'Account actief' : 'Nog geen wachtwoord ingesteld'}
            {g.toegevoegd_op && <> · toegevoegd {new Date(g.toegevoegd_op).toLocaleDateString('nl-NL', { timeZone: 'Europe/Amsterdam' })}</>}
          </div>
        </div>
        <span className={`b-label ${g.rol === 'beheerder' ? 'nieuw' : ''}`}>{ROL_LABEL[g.rol] || g.rol}</span>
      </div>
      <div className="b-acties">
        <form action={linkActie}>
          <input type="hidden" name="email" value={g.email} />
          <input type="hidden" name="naam" value={g.naam || ''} />
          <button className="b-knop-licht" disabled={linkBezig}>{linkBezig ? 'Bezig…' : g.heeft_wachtwoord ? 'Wachtwoord-link' : 'Nieuwe uitnodigingslink'}</button>
        </form>
        {!isIkzelf && (
          <form action={rolActie}>
            <input type="hidden" name="email" value={g.email} />
            <input type="hidden" name="rol" value={g.rol === 'beheerder' ? 'redacteur' : 'beheerder'} />
            <button className="b-knop-licht">Maak {g.rol === 'beheerder' ? 'redacteur' : 'beheerder'}</button>
          </form>
        )}
        {!isIkzelf && (
          <form action={wegActie} onSubmit={(e) => { if (!confirm(`${g.naam || g.email} verwijderen? Deze persoon kan daarna niets meer wijzigen op de website.`)) e.preventDefault(); }}>
            <input type="hidden" name="email" value={g.email} />
            <button className="b-knop-weg" disabled={wegBezig}>Verwijderen</button>
          </form>
        )}
      </div>
      {fout && <div className="melding fout" role="alert">{fout}</div>}
      <LinkKaart staat={linkStaat} />
    </div>
  );
}
