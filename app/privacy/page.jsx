import Kader from '@/components/Kader';
import { getInstellingen, alineas } from '@/lib/data';

export const revalidate = 60;
export const metadata = { title: 'Privacy' };

export default async function Privacy() {
  const i = await getInstellingen();
  return (
    <Kader>
      <section className="paginakop"><div className="wrap"><div className="lbl">Juridisch</div><h1>Privacyverklaring</h1></div></section>
      <section className="sectie">
        <div className="wrap tekst" style={{ maxWidth: 860 }}>
          {alineas(i.privacy_tekst).map((p, n) => {
            const [eerste, ...rest] = p.split('\n');
            // Een korte eerste regel boven een alinea is een tussenkop
            if (rest.length && eerste.length < 70) {
              return (
                <div key={n}>
                  <h2 style={{ fontSize: 20, margin: '28px 0 8px' }}>{eerste}</h2>
                  <p>{rest.join(' ')}</p>
                </div>
              );
            }
            return <p key={n}>{p}</p>;
          })}
        </div>
      </section>
    </Kader>
  );
}
