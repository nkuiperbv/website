import Kader from '@/components/Kader';
import { getInstellingen, alineas } from '@/lib/data';

export const revalidate = 60;
export const metadata = { title: 'Over ons' };

export default async function OverOns() {
  const i = await getInstellingen();
  return (
    <Kader>
      <section className="paginakop"><div className="wrap"><div className="lbl">Over ons</div><h1>Een begrip in de Achterhoek</h1></div></section>
      <section className="sectie">
        <div className="wrap split" style={{ alignItems: 'flex-start' }}>
          <div className="tekst">{alineas(i.over_ons_tekst).map((p, n) => <p key={n}>{p}</p>)}</div>
          <div style={{ height: 420 }}>
            {i.over_ons_foto ? <img src={i.over_ons_foto} alt="Het team van N. Kuiper" className="foto" /> : <div className="ph" style={{ height: '100%' }}>Foto volgt</div>}
          </div>
        </div>
      </section>
    </Kader>
  );
}
