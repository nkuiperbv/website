import Link from 'next/link';
import Kader from '@/components/Kader';

export default function NietGevonden() {
  return (
    <Kader>
      <section className="paginakop">
        <div className="wrap">
          <div className="lbl">Pagina niet gevonden</div>
          <h1>Deze pagina bestaat niet (meer).</h1>
          <p style={{ marginTop: 24 }}><Link href="/" className="btn">Naar de homepage</Link></p>
        </div>
      </section>
    </Kader>
  );
}
