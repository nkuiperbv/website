import { getBeheerder } from '@/lib/supabase/server';
import { NieuweGebruiker, GebruikerRij } from '@/components/beheer/Gebruikers';

export const metadata = { title: 'Gebruikers' };

export default async function Gebruikers() {
  const { supabase, user, magGebruikersBeheren } = await getBeheerder();
  if (!magGebruikersBeheren) {
    return <div className="melding fout">Alleen een beheerder kan gebruikers toevoegen of wijzigen.</div>;
  }
  const { data: gebruikers, error } = await supabase.rpc('gebruikers_overzicht');

  return (
    <>
      <div className="b-kop"><h1>Gebruikers</h1></div>

      <div className="b-paneel">
        <h2>Nieuwe gebruiker</h2>
        <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--grijs-tekst)' }}>
          Na het toevoegen krijgt u een uitnodigingslink. Stuur die naar de nieuwe gebruiker; daarmee stelt hij of zij een eigen wachtwoord in.
          Een <b>redacteur</b> kan teksten, foto&apos;s, diensten, nieuws, vacatures en berichten beheren.
          Een <b>beheerder</b> kan daarnaast gebruikers toevoegen en verwijderen.
        </p>
        <NieuweGebruiker />
      </div>

      {error && <div className="melding fout">De lijst kon niet worden geladen: {error.message}</div>}
      {(gebruikers || []).map((g) => (
        <GebruikerRij key={g.email} g={g} isIkzelf={g.email === user.email.toLowerCase()} />
      ))}
    </>
  );
}
