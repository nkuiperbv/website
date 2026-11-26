import Link from 'next/link';
import Kader from '@/components/Kader';
import { getInstellingen, getVacatures, alineas } from '@/lib/data';

export const revalidate = 60;
export const metadata = { title: 'Werken bij' };

export default async function WerkenBij() {
  const [i, vacatures] = await Promise.all([getInstellingen(), getVacatures()]);
  return (
    <Kader>
      <section className="paginakop">
        <div className="wrap">
          <div className="lbl">Werken bij Kuiper</div>
          <h1>{i.werken_titel || 'Monteur worden in de Achterhoek?'}</h1>
          {i.werken_tekst && <p style={{ margin: '16px 0 0', fontSize: 19, color: 'var(--tekst2)', maxWidth: 640 }}>{i.werken_tekst}</p>}
        </div>
      </section>
      <section className="sectie">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
          {vacatures.length === 0 && (
            <div className="card">
              <span className="card-titel">Op dit moment geen openstaande vacatures</span>
              <span className="card-tekst">Een open sollicitatie is altijd welkom. Mail ons via <a href={`mailto:${i.email}`} style={{ textDecoration: 'underline' }}>{i.email}</a>.</span>
            </div>
          )}
          {vacatures.map((v) => (
            <article key={v.id} id={v.slug} className="card" style={{ gap: 16 }}>
              <div className="kop-rij">
                <h2 className="card-titel" style={{ fontSize: 24 }}>{v.titel}</h2>
                {v.uren && <span className="lbl" style={{ color: 'var(--grijs-tekst)' }}>{v.uren}</span>}
              </div>
              <div className="tekst">{alineas(v.inhoud).map((p, n) => <p key={n}>{p}</p>)}</div>
              <div><Link href={`/contact?onderwerp=${encodeURIComponent('Sollicitatie ' + v.titel)}#offerte`} className="btn">Reageren</Link></div>
            </article>
          ))}
        </div>
      </section>
    </Kader>
  );
}
