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
        <div className="wrap tekst" style={{ maxWidth: 860 }}>{alineas(i.privacy_tekst).map((p, n) => <p key={n}>{p}</p>)}</div>
      </section>
    </Kader>
  );
}
