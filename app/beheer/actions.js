'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getBeheerder } from '@/lib/supabase/server';
import { COLLECTIES, INSTELLINGEN, maakSlug } from '@/lib/collecties';

async function beheerder() {
  const b = await getBeheerder();
  if (!b.isBeheerder) throw new Error('Geen toegang');
  return b.supabase;
}

function leesVeld(veld, formData) {
  const v = formData.get(veld.naam);
  if (veld.type === 'vinkje') return v === 'aan';
  if (veld.type === 'getal') return v === '' || v === null ? null : Number(v);
  if (veld.type === 'datum') return v ? String(v) : null;
  return v === null ? null : String(v).trim();
}

export async function bewaarItem(_vorige, formData) {
  const naam = String(formData.get('_collectie'));
  const id = String(formData.get('_id') || '');
  const c = COLLECTIES[naam];
  if (!c) return { fout: 'Onbekende collectie.' };
  const supabase = await beheerder();

  const rij = {};
  for (const veld of c.velden) rij[veld.naam] = leesVeld(veld, formData);
  if (!rij.titel) return { fout: 'Vul een titel in.' };
  rij.slug = maakSlug(rij.slug || rij.titel);
  if ('gepubliceerd_op' in rij && !rij.gepubliceerd_op) rij.gepubliceerd_op = new Date().toISOString().slice(0, 10);

  const res = id
    ? await supabase.from(c.tabel).update(rij).eq('id', id).select('id').single()
    : await supabase.from(c.tabel).insert(rij).select('id').single();
  if (res.error) {
    if (res.error.code === '23505') return { fout: 'Dit webadres is al in gebruik. Kies een ander webadres.' };
    return { fout: 'Opslaan mislukt: ' + res.error.message };
  }
  revalidatePath('/', 'layout');
  if (!id) redirect(`/beheer/${naam}/${res.data.id}?opgeslagen=1`);
  return { ok: 'Opgeslagen. De website is bijgewerkt.' };
}

export async function verwijderItem(formData) {
  const naam = String(formData.get('_collectie'));
  const id = String(formData.get('_id'));
  const c = COLLECTIES[naam];
  if (!c) return;
  const supabase = await beheerder();
  await supabase.from(c.tabel).delete().eq('id', id);
  revalidatePath('/', 'layout');
  redirect(`/beheer/${naam}`);
}

export async function bewaarInstellingen(_vorige, formData) {
  const supabase = await beheerder();
  const rijen = INSTELLINGEN.flatMap((g) => g.velden).map((v) => ({ sleutel: v.naam, waarde: String(formData.get(v.naam) ?? '').trim() }));
  const { error } = await supabase.from('instellingen').upsert(rijen, { onConflict: 'sleutel' });
  if (error) return { fout: 'Opslaan mislukt: ' + error.message };
  revalidatePath('/', 'layout');
  return { ok: 'Opgeslagen. De website is bijgewerkt.' };
}

export async function zetStatus(formData) {
  const supabase = await beheerder();
  await supabase.from('offerteaanvragen').update({ status: String(formData.get('status')) }).eq('id', String(formData.get('_id')));
  revalidatePath('/beheer', 'layout');
}

export async function nieuwWachtwoord(_vorige, formData) {
  const ww = String(formData.get('wachtwoord') || '');
  const ww2 = String(formData.get('wachtwoord2') || '');
  if (ww.length < 10) return { fout: 'Kies een wachtwoord van minstens 10 tekens.' };
  if (ww !== ww2) return { fout: 'De twee wachtwoorden zijn niet gelijk.' };
  const { supabase, user } = await getBeheerder();
  if (!user) return { fout: 'U bent niet ingelogd.' };
  const { error } = await supabase.auth.updateUser({ password: ww });
  if (error) return { fout: 'Wijzigen mislukt: ' + error.message };
  return { ok: 'Uw wachtwoord is gewijzigd.' };
}
