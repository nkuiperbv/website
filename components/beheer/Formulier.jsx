'use client';
import { useActionState } from 'react';

// Formulier dat een server action aanroept en de melding toont.
export default function Formulier({ actie, children, knop = 'Opslaan', startMelding }) {
  const [staat, uitvoeren, bezig] = useActionState(actie, startMelding ? { ok: startMelding } : null);
  return (
    <form action={uitvoeren} className="form">
      {children}
      {staat?.fout && <div className="melding fout" role="alert">{staat.fout}</div>}
      {staat?.ok && <div className="melding ok" role="status">{staat.ok}</div>}
      <div className="b-acties"><button className="btn" disabled={bezig}>{bezig ? 'Bezig met opslaan…' : knop}</button></div>
    </form>
  );
}
