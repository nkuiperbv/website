import Link from 'next/link';
import { notFound } from 'next/navigation';
import Kader from '@/components/Kader';
import { getDienst, getDiensten, getInstellingen, alineas, telLink } from '@/lib/data';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = await getDienst(slug);
  return d ? { title: d.titel, description: d.korte_tekst } : {};
}

export default async function DienstPagina({ params }) {
  const { slug } = await params;
  const [d, i, alle] = await Promise.all([getDienst(slug), getInstellingen(), getDiensten()]);
  if (!d) notFound();
  const verwant = alle.filter((x) => x.categorie === d.categorie && x.slug !== d.slug);

  return (
    <Kader>
      <section className="paginakop">
        <div className="wrap">
          <div className="lbl">{d.categorie === 'duurzaam' ? 'Duurzaam' : d.categorie === 'zakelijk' ? 'Zakelijk' : 'Diensten'}</div>
          <h1>{d.titel}</h1>
          {d.korte_tekst && <p style={{ margin: '16px 0 0', fontSize: 19, color: 'var(--tekst2)', maxWidth: 640 }}>{d.korte_tekst}</p>}
        </div>
      </section>
      <section className="sectie">
        <div className="wrap split" style={{ alignItems: 'flex-start' }}>
          <div className="tekst">
            {alineas(d.inhoud).map((p, n) => <p key={n}>{p}</p>)}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
              <Link href={`/contact?onderwerp=${encodeURIComponent(d.categorie === 'zakelijk' ? 'Zakelijk project' : d.titel)}#formulier`} className="btn">{d.categorie === 'zakelijk' ? 'Project bespreken' : 'Offerte aanvragen'}</Link>
              <a href={telLink(i.telefoon)} className="btn-rand">Bel {i.telefoon}</a>
            </div>
          </div>
          {d.foto_url && <div style={{ height: 420 }}><img src={d.foto_url} alt={d.titel} className="foto" /></div>}
        </div>
      </section>
      {verwant.length > 0 && (
        <section className="sectie" style={{ background: 'var(--lichtgrijs)', paddingTop: 64, paddingBottom: 64 }}>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="h2" style={{ fontSize: 26 }}>{d.categorie === 'duurzaam' ? 'Meer duurzame technieken' : d.categorie === 'zakelijk' ? 'Meer voor bedrijven' : 'Andere diensten'}</h2>
            <div className="grid-auto">
              {verwant.map((x) => (
                <Link key={x.id} href={`/diensten/${x.slug}`} className="card">
                  <span className="card-titel" style={{ fontSize: 18 }}>{x.titel} →</span>
                  <span className="card-tekst">{x.korte_tekst}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Kader>
  );
}
