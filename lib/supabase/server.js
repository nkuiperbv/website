import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Client met de inlog van de beheerder (via cookies), voor de beheeromgeving.
export async function serverClient() {
  const cookieStore = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Aangeroepen vanuit een Server Component: de middleware ververst de sessie.
        }
      },
    },
  });
}

// Geeft de ingelogde gebruiker terug als die beheerder is, anders null.
export async function getBeheerder() {
  const supabase = await serverClient();
  const { data } = await supabase.auth.getUser();
  if (!data?.user) return { supabase, user: null, isBeheerder: false };
  const { data: ok } = await supabase.rpc('is_beheerder');
  const isBeheerder = ok === true;
  let rol = null;
  if (isBeheerder) {
    const { data: rij } = await supabase.from('beheerders').select('rol').eq('email', data.user.email.toLowerCase()).maybeSingle();
    rol = rij?.rol || 'redacteur';
  }
  // rol 'beheerder' mag ook gebruikers beheren, 'redacteur' alleen de inhoud van de website.
  return { supabase, user: data.user, isBeheerder, rol, magGebruikersBeheren: rol === 'beheerder' };
}
