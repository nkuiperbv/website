import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getBeheerder } from '@/lib/supabase/server';
import { uitloggen } from '@/app/inloggen/actions';
import './beheer.css';

export const metadata = { title: 'Beheer', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function BeheerLayout({ children }) {
  const { user, isBeheerder } = await getBeheerder();
  if (!user) redirect('/inloggen');

  return (
    <div className="beheer">
      <aside className="b-zij">
        <div style={{ padding: '24px 20px 16px' }}>
          <div className="lbl">Beheer</div>
          <div style={{ fontFamily: 'var(--kop)', fontWeight: 800, fontSize: 20, marginTop: 4 }}>N. Kuiper website</div>
        </div>
        <nav className="b-nav" aria-label="Beheermenu">
          <Link href="/beheer">Overzicht</Link>
          <Link href="/beheer/aanvragen">Offerteaanvragen</Link>
          <Link href="/beheer/teksten">Teksten &amp; foto&apos;s</Link>
          <Link href="/beheer/diensten">Diensten</Link>
          <Link href="/beheer/nieuws">Nieuws</Link>
          <Link href="/beheer/vacatures">Vacatures</Link>
          <Link href="/beheer/wachtwoord">Wachtwoord wijzigen</Link>
        </nav>
        <div style={{ padding: 20, marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--grijs-tekst)' }}>
          <span>{user.email}</span>
          <a href="/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>Website bekijken ↗</a>
          <form action={uitloggen}><button className="b-knop-licht">Uitloggen</button></form>
        </div>
      </aside>
      <div className="b-inhoud">
        {isBeheerder ? children : (
          <div className="melding fout">U bent ingelogd als {user.email}, maar dit adres staat niet in de lijst met beheerders. Vraag een beheerder om u toe te voegen.</div>
        )}
      </div>
    </div>
  );
}
