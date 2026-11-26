'use client';
import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { inloggen, wachtwoordVergeten } from './actions';

export default function Inloggen() {
  const [vergeten, setVergeten] = useState(false);
  const [staat, actie, bezig] = useActionState(inloggen, null);
  const [staatV, actieV, bezigV] = useActionState(wachtwoordVergeten, null);
  const [linkFout, setLinkFout] = useState('');
  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get('fout');
    if (f) { setLinkFout(f + ' Vraag via "Wachtwoord vergeten?" een nieuwe link aan.'); setVergeten(true); }
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--lichtgrijs)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: 160, background: 'var(--rood)' }} />
      <div className="card" style={{ width: '100%', maxWidth: 420, padding: 36, gap: 20 }}>
        <div>
          <div className="lbl">Beheer</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>N. Kuiper website</h1>
        </div>
        {linkFout && <div className="melding fout" role="alert">{linkFout}</div>}
        {!vergeten ? (
          <form action={actie} className="form">
            <div className="veld"><label htmlFor="email">E-mailadres</label><input id="email" name="email" type="email" required autoComplete="username" /></div>
            <div className="veld"><label htmlFor="wachtwoord">Wachtwoord</label><input id="wachtwoord" name="wachtwoord" type="password" required autoComplete="current-password" /></div>
            {staat?.fout && <div className="melding fout" role="alert">{staat.fout}</div>}
            <button className="btn" disabled={bezig}>{bezig ? 'Bezig…' : 'Inloggen'}</button>
            <button type="button" onClick={() => setVergeten(true)} style={{ background: 'none', border: 0, padding: 0, textAlign: 'left', textDecoration: 'underline', cursor: 'pointer', font: 'inherit', fontSize: 14 }}>Wachtwoord vergeten?</button>
          </form>
        ) : (
          <form action={actieV} className="form">
            <div className="veld"><label htmlFor="email2">E-mailadres</label><input id="email2" name="email" type="email" required autoComplete="username" /></div>
            {staatV?.fout && <div className="melding fout" role="alert">{staatV.fout}</div>}
            {staatV?.ok && <div className="melding ok">{staatV.ok}</div>}
            <button className="btn" disabled={bezigV}>Stuur een link</button>
            <button type="button" onClick={() => setVergeten(false)} style={{ background: 'none', border: 0, padding: 0, textAlign: 'left', textDecoration: 'underline', cursor: 'pointer', font: 'inherit', fontSize: 14 }}>Terug naar inloggen</button>
          </form>
        )}
        <Link href="/" style={{ fontSize: 14, color: 'var(--grijs-tekst)' }}>← Naar de website</Link>
      </div>
    </main>
  );
}
