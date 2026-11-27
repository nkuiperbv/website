import Link from 'next/link';
import Kader from '@/components/Kader';
import { getNieuws, datumNL } from '@/lib/data';

export const revalidate = 60;
export const metadata = { title: 'Actueel' };

export default async function Actueel() {
  const nieuws = await getNieuws();
  return (
    <Kader>
      <section className="paginakop"><div className="wrap"><div className="lbl">Actueel</div><h1>Nieuws en tips</h1></div></section>
      <section className="sectie">
        <div className="wrap grid-auto" style={{ gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {nieuws.length === 0 && <p>Er zijn nog geen berichten.</p>}
          {nieuws.map((n) => (
            <Link key={n.id} href={`/actueel/${n.slug}`} className="bericht">
              {n.foto_url && <div style={{ height: 200 }}><img src={n.foto_url} alt="" className="foto" /></div>}
              <span className="lbl" style={{ color: 'var(--grijs-tekst)' }}>{[n.categorie, datumNL(n.gepubliceerd_op)].filter(Boolean).join(' · ')}</span>
              <span className="bericht-titel">{n.titel}</span>
              {n.samenvatting && <span className="card-tekst">{n.samenvatting}</span>}
            </Link>
          ))}
        </div>
      </section>
    </Kader>
  );
}
