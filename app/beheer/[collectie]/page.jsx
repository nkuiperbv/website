import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBeheerder } from '@/lib/supabase/server';
import { COLLECTIES } from '@/lib/collecties';

const KOP = { titel: 'Titel', categorie: 'Plek', zichtbaar: 'Zichtbaar', gepubliceerd_op: 'Datum', uren: 'Uren', omschrijving: 'Omschrijving' };

export default async function Lijst({ params }) {
  const { collectie } = await params;
  const c = COLLECTIES[collectie];
  if (!c) notFound();
  const { supabase } = await getBeheerder();
  const { data: rijen } = await supabase.from(c.tabel).select('*').order(c.sorteer.kolom, { ascending: c.sorteer.oplopend });

  return (
    <>
      <div className="b-kop">
        <h1>{c.titel}</h1>
        <Link href={`/beheer/${collectie}/nieuw`} className="btn">+ Nieuwe {c.enkelvoud}</Link>
      </div>
      <div className="b-tabel-box">
        <table className="b-tabel">
          <thead><tr>{c.lijstKolommen.map((k) => <th key={k}>{KOP[k] || k}</th>)}<th /></tr></thead>
          <tbody>
            {(rijen || []).length === 0 && <tr><td colSpan={c.lijstKolommen.length + 1}>Nog niets toegevoegd.</td></tr>}
            {(rijen || []).map((r) => (
              <tr key={r.id}>
                {c.lijstKolommen.map((k) => (
                  <td key={k}>
                    {k === 'titel' ? <Link href={`/beheer/${collectie}/${r.id}`}>{r.titel}</Link>
                      : k === 'zichtbaar' ? <span className={`b-label ${r.zichtbaar ? 'aan' : ''}`}>{r.zichtbaar ? 'Ja' : 'Nee'}</span>
                      : String(r[k] ?? '')}
                  </td>
                ))}
                <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}><a href={c.pad(r)} target="_blank" rel="noreferrer">Bekijk ↗</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
