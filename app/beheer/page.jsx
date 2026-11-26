import Link from 'next/link';
import { getBeheerder } from '@/lib/supabase/server';

export default async function Overzicht() {
  const { supabase } = await getBeheerder();
  const tel = async (tabel, filter) => {
    let q = supabase.from(tabel).select('id', { count: 'exact', head: true });
    if (filter) q = filter(q);
    const { count } = await q;
    return count ?? 0;
  };
  const [nieuweAanvragen, diensten, nieuws, vacatures] = await Promise.all([
    tel('offerteaanvragen', (q) => q.eq('status', 'nieuw')),
    tel('diensten'),
    tel('nieuws'),
    tel('vacatures', (q) => q.eq('zichtbaar', true)),
  ]);

  return (
    <>
      <div className="b-kop"><h1>Overzicht</h1></div>
      <div className="b-tegels">
        <Link href="/beheer/aanvragen" className="b-tegel"><b>{nieuweAanvragen}</b><span>Nieuwe offerteaanvragen</span></Link>
        <Link href="/beheer/diensten" className="b-tegel"><b>{diensten}</b><span>Diensten</span></Link>
        <Link href="/beheer/nieuws" className="b-tegel"><b>{nieuws}</b><span>Nieuwsberichten</span></Link>
        <Link href="/beheer/vacatures" className="b-tegel"><b>{vacatures}</b><span>Open vacatures</span></Link>
      </div>
      <div className="b-paneel">
        <h2>Zo werkt het</h2>
        <p style={{ margin: 0, lineHeight: 1.7 }}>
          Kies links wat u wilt aanpassen. Na <b>Opslaan</b> staat de wijziging binnen enkele seconden op de website.
          Foto&apos;s uploadt u direct bij het onderdeel waar ze horen. Gebruik bij voorkeur liggende foto&apos;s van minstens 1600 pixels breed.
        </p>
      </div>
    </>
  );
}
