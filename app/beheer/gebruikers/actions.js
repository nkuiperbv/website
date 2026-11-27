'use server';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getBeheerder } from '@/lib/supabase/server';

const ROLLEN = ['beheerder', 'redacteur'];

async function alleenBeheerder() {
  const b = await getBeheerder();
  if (!b.user || !b.magGebruikersBeheren) throw new Error('Alleen een beheerder mag gebruikers beheren.');
  return b;
}

async function siteAdres() {
  const h = await headers();
  const host = h.get('x-forwarded-host') || h.get('host');
  const proto = h.get('x-forwarded-proto') || 'https';
  return `${proto}://${host}`;
}

// Vraagt bij Supabase een uitnodigings- of inloglink op (Edge Function "gebruiker-link").
async function maakLink(supabase, email) {
  const { data, error } = await supabase.functions.invoke('gebruiker-link', {
    body: { email, site: await siteAdres() },
  });
  if (error) {
    let melding = error.message;
    try { melding = (await error.context.json()).fout || melding; } catch {}
    return { fout: melding };
  }
  return { link: data.link, type: data.type };
}

export async function voegGebruikerToe(_vorige, formData) {
  let b;
  try { b = await alleenBeheerder(); } catch (e) { return { fout: e.message }; }
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const naam = String(formData.get('naam') || '').trim();
  const rol = String(formData.get('rol') || 'redacteur');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { fout: 'Vul een geldig e-mailadres in.' };
  if (!ROLLEN.includes(rol)) return { fout: 'Kies een rol.' };

  const { error } = await b.supabase.from('beheerders').insert({ email, naam: naam || null, rol, toegevoegd_door: b.user.email });
  if (error) {
    if (error.code === '23505') return { fout: 'Dit e-mailadres staat al in de lijst. Gebruik daar "Nieuwe inloglink".' };
    return { fout: 'Toevoegen mislukt: ' + error.message };
  }
  revalidatePath('/beheer/gebruikers');

  const res = await maakLink(b.supabase, email);
  if (res.fout) return { fout: `${email} is toegevoegd, maar de uitnodigingslink kon niet worden gemaakt: ${res.fout}` };
  return { ok: `${naam || email} is toegevoegd.`, link: res.link, email, naam, type: res.type };
}

export async function nieuweLink(_vorige, formData) {
  let b;
  try { b = await alleenBeheerder(); } catch (e) { return { fout: e.message }; }
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const naam = String(formData.get('naam') || '');
  const res = await maakLink(b.supabase, email);
  if (res.fout) return { fout: res.fout };
  return { link: res.link, email, naam, type: res.type };
}

export async function wijzigRol(_vorige, formData) {
  let b;
  try { b = await alleenBeheerder(); } catch (e) { return { fout: e.message }; }
  const email = String(formData.get('email') || '').toLowerCase();
  const rol = String(formData.get('rol') || '');
  if (!ROLLEN.includes(rol)) return { fout: 'Onbekende rol.' };
  const { error } = await b.supabase.from('beheerders').update({ rol }).eq('email', email);
  if (error) return { fout: error.message.includes('minstens één beheerder') ? 'Er moet minstens één beheerder overblijven.' : 'Wijzigen mislukt: ' + error.message };
  revalidatePath('/beheer', 'layout');
  return { ok: 'Rol gewijzigd.' };
}

export async function verwijderGebruiker(_vorige, formData) {
  let b;
  try { b = await alleenBeheerder(); } catch (e) { return { fout: e.message }; }
  const email = String(formData.get('email') || '').toLowerCase();
  if (email === b.user.email.toLowerCase()) return { fout: 'U kunt uzelf niet verwijderen.' };
  const { error } = await b.supabase.from('beheerders').delete().eq('email', email);
  if (error) return { fout: error.message.includes('minstens één beheerder') ? 'Er moet minstens één beheerder overblijven.' : 'Verwijderen mislukt: ' + error.message };
  revalidatePath('/beheer/gebruikers');
  return { ok: 'Verwijderd.' };
}
