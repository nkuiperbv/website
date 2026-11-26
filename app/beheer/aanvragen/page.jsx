import { getBeheerder } from '@/lib/supabase/server';
import { zetStatus } from '@/app/beheer/actions';

const STATUS = [['nieuw', 'Nieuw'], ['in_behandeling', 'In behandeling'], ['afgehandeld', 'Afgehandeld']];

export default async function Aanvragen() {
  const { supabase } = await getBeheerder();
  const { data: rijen } = await supabase.from('offerteaanvragen').select('*').order('created_at', { ascending: false }).limit(200);

  return (
    <>
      <div className="b-kop"><h1>Offerteaanvragen</h1></div>
      {(rijen || []).length === 0 && <div className="b-paneel">Nog geen aanvragen binnengekomen.</div>}
      {(rijen || []).map((r) => (
        <div key={r.id} className="b-paneel" style={{ gap: 12 }}>
          <div className="b-kop">
            <h2>{r.naam} <span style={{ fontWeight: 400, color: 'var(--grijs-tekst)' }}>· {r.onderwerp}</span></h2>
            <span className={`b-label ${r.status === 'nieuw' ? 'nieuw' : r.status === 'afgehandeld' ? 'aan' : ''}`}>{STATUS.find(([s]) => s === r.status)?.[1] || r.status}</span>
          </div>
          <div style={{ fontSize: 14, color: 'var(--grijs-tekst)', display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
            <span>{new Date(r.created_at).toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })}</span>
            {r.email && <a href={`mailto:${r.email}`} style={{ textDecoration: 'underline' }}>{r.email}</a>}
            {r.telefoon && <a href={`tel:${r.telefoon}`} style={{ textDecoration: 'underline' }}>{r.telefoon}</a>}
            {r.adres && <span>{r.adres}</span>}
          </div>
          <p style={{ margin: 0, whiteSpace: 'pre-line', lineHeight: 1.6 }}>{r.bericht}</p>
          <form action={zetStatus} className="b-acties">
            <input type="hidden" name="_id" value={r.id} />
            {STATUS.filter(([s]) => s !== r.status).map(([s, l]) => (
              <button key={s} name="status" value={s} className="b-knop-licht">Zet op: {l}</button>
            ))}
          </form>
        </div>
      ))}
    </>
  );
}
