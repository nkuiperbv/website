import Link from 'next/link';
import { notFound } from 'next/navigation';
import Kader from '@/components/Kader';
import { getBericht, alineas, datumNL } from '@/lib/data';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const b = await getBericht(slug);
  return b ? { title: b.titel, description: b.samenvatting } : {};
}

export default async function Bericht({ params }) {
  const { slug } = await params;
  const b = await getBericht(slug);
  if (!b) notFound();
  return (
    <Kader>
      <section className="paginakop">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="lbl">{[b.categorie, datumNL(b.gepubliceerd_op)].filter(Boolean).join(' · ')}</div>
          <h1>{b.titel}</h1>
        </div>
      </section>
      <section className="sectie">
        <div className="wrap tekst" style={{ maxWidth: 860 }}>
          {b.foto_url && <img src={b.foto_url} alt="" style={{ width: '100%', borderRadius: 8, marginBottom: 32 }} />}
          {alineas(b.inhoud).map((p, n) => <p key={n}>{p}</p>)}
          <p><Link href="/actueel" style={{ fontWeight: 600, color: 'var(--antraciet)' }}>← Alle berichten</Link></p>
        </div>
      </section>
    </Kader>
  );
}
