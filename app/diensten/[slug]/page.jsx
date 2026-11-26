import Link from 'next/link';
import { notFound } from 'next/navigation';
import Kader from '@/components/Kader';
import { getDienst, getInstellingen, alineas, telLink } from '@/lib/data';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = await getDienst(slug);
  return d ? { title: d.titel, description: d.korte_tekst } : {};
}

export default async function DienstPagina({ params }) {
  const { slug } = await params;
  const [d, i] = await Promise.all([getDienst(slug), getInstellingen()]);
  if (!d) notFound();

  return (
    <Kader>
      <section className="paginakop">
        <div className="wrap">
          <div className="lbl">{d.categorie === 'duurzaam' ? 'Duurzaam' : 'Diensten'}</div>
          <h1>{d.titel}</h1>
          {d.korte_tekst && <p style={{ margin: '16px 0 0', fontSize: 19, color: 'var(--tekst2)', maxWidth: 640 }}>{d.korte_tekst}</p>}
        </div>
      </section>
      <section className="sectie">
        <div className="wrap split" style={{ alignItems: 'flex-start' }}>
          <div className="tekst">
            {alineas(d.inhoud).map((p, n) => <p key={n}>{p}</p>)}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
              <Link href={`/contact?onderwerp=${encodeURIComponent(d.titel)}#offerte`} className="btn">Offerte aanvragen</Link>
              <a href={telLink(i.telefoon)} className="btn-rand">Bel {i.telefoon}</a>
            </div>
          </div>
          <div style={{ height: 420 }}>
            {d.foto_url ? <img src={d.foto_url} alt={d.titel} className="foto" /> : <div className="ph" style={{ height: '100%' }}>Foto volgt</div>}
          </div>
        </div>
      </section>
    </Kader>
  );
}
