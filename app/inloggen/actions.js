'use server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { serverClient } from '@/lib/supabase/server';

export async function inloggen(_vorige, formData) {
  const supabase = await serverClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get('email') || '').trim(),
    password: String(formData.get('wachtwoord') || ''),
  });
  if (error) return { fout: 'Inloggen mislukt. Controleer uw e-mailadres en wachtwoord.' };
  redirect('/beheer');
}

export async function wachtwoordVergeten(_vorige, formData) {
  const email = String(formData.get('email') || '').trim();
  if (!email) return { fout: 'Vul eerst uw e-mailadres in.' };
  const h = await headers();
  const host = h.get('x-forwarded-host') || h.get('host');
  const proto = h.get('x-forwarded-proto') || 'https';
  const supabase = await serverClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${proto}://${host}/auth/callback?next=/beheer/wachtwoord`,
  });
  return { ok: 'Als dit adres bij ons bekend is, ontvangt u een e-mail met een link om een nieuw wachtwoord in te stellen.' };
}

export async function uitloggen() {
  const supabase = await serverClient();
  await supabase.auth.signOut();
  redirect('/inloggen');
}
