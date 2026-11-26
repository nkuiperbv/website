import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBeheerder } from '@/lib/supabase/server';
import { COLLECTIES } from '@/lib/collecties';
import { bewaarItem, verwijderItem } from '@/app/beheer/actions';
import Formulier from '@/components/beheer/Formulier';
import { Veld } from '@/components/beheer/Velden';

export default async function Bewerken({ params, searchParams }) {
  const { collectie, id } = await params;
  const sp = await searchParams;
  const c = COLLECTIES[collectie];
  if (!c) notFound();

  const isNieuw = id === 'nieuw';
  let rij = c.nieuw || {};
  if (!isNieuw) {
    const { supabase } = await getBeheerder();
    const { data } = await supabase.from(c.tabel).select('*').eq('id', id).maybeSingle();
    if (!data) notFound();
    rij = data;
  }

  return (
    <>
      <div className="b-kop">
        <div>
          <Link href={`/beheer/${collectie}`} style={{ fontSize: 14, color: 'var(--grijs-tekst)' }}>← {c.titel}</Link>
          <h1 style={{ marginTop: 6 }}>{isNieuw ? `Nieuwe ${c.enkelvoud}` : rij.titel}</h1>
        </div>
        {!isNieuw && <a href={c.pad(rij)} target="_blank" rel="noreferrer" className="b-knop-licht">Bekijk op de website ↗</a>}
      </div>
      <div className="b-paneel">
        <Formulier actie={bewaarItem} startMelding={sp?.opgeslagen ? 'Opgeslagen. De website is bijgewerkt.' : undefined}>
          <input type="hidden" name="_collectie" value={collectie} />
          <input type="hidden" name="_id" value={isNieuw ? '' : rij.id} />
          {c.velden.map((v) => <Veld key={v.naam} veld={v} waarde={rij[v.naam]} />)}
        </Formulier>
      </div>
      {!isNieuw && (
        <form action={verwijderItem} className="b-acties">
          <input type="hidden" name="_collectie" value={collectie} />
          <input type="hidden" name="_id" value={rij.id} />
          <button className="b-knop-weg">Verwijderen</button>
          <small style={{ color: 'var(--grijs-tekst)' }}>Liever tijdelijk verbergen? Haal dan het vinkje bij &quot;Zichtbaar&quot; weg.</small>
        </form>
      )}
    </>
  );
}
