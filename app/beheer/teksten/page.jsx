import { getBeheerder } from '@/lib/supabase/server';
import { INSTELLINGEN } from '@/lib/collecties';
import { bewaarInstellingen } from '@/app/beheer/actions';
import Formulier from '@/components/beheer/Formulier';
import { Veld } from '@/components/beheer/Velden';

export default async function Teksten() {
  const { supabase } = await getBeheerder();
  const { data } = await supabase.from('instellingen').select('sleutel, waarde');
  const w = Object.fromEntries((data || []).map((r) => [r.sleutel, r.waarde]));

  return (
    <>
      <div className="b-kop"><h1>Teksten &amp; foto&apos;s</h1></div>
      <Formulier actie={bewaarInstellingen} knop="Alles opslaan">
        {INSTELLINGEN.map((g) => (
          <div key={g.groep} className="b-paneel">
            <h2>{g.groep}</h2>
            {g.velden.map((v) => <Veld key={v.naam} veld={v} waarde={w[v.naam]} />)}
          </div>
        ))}
      </Formulier>
    </>
  );
}
