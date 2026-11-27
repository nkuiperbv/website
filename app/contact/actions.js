'use server';
import { headers } from 'next/headers';
import { publicClient } from '@/lib/supabase/public';
import { getInstellingen } from '@/lib/data';
import { meldNieuwBericht } from '@/lib/mail';

const max = (v, n) => String(v || '').trim().slice(0, n);

export async function verstuurAanvraag(_vorige, formData) {
  // Spamval: dit veld is onzichtbaar voor mensen
  if (formData.get('website')) return { ok: true };

  const aanvraag = {
    naam: max(formData.get('naam'), 120),
    email: max(formData.get('email'), 200),
    telefoon: max(formData.get('telefoon'), 40),
    adres: max(formData.get('adres'), 200),
    onderwerp: max(formData.get('onderwerp'), 120),
    bericht: max(formData.get('bericht'), 4000),
  };

  // Robots die het formulier binnen 3 seconden invullen, stil negeren
  const gestart = Number(formData.get('gestart'));
  if (gestart && Date.now() - gestart < 3000) return { ok: true };

  const terug = (fout) => ({ ok: false, fout, waarden: { ...aanvraag, akkoord: formData.get('akkoord') === 'ja' }, t: Date.now() });
  if (!aanvraag.naam || !aanvraag.bericht) return terug('Vul uw naam en uw vraag in.');
  if (!aanvraag.email && !aanvraag.telefoon) return terug('Vul een e-mailadres of telefoonnummer in, zodat we u kunnen bereiken.');
  if (aanvraag.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aanvraag.email)) return terug('Controleer uw e-mailadres.');
  if (formData.get('mens') !== 'ja') return terug('Vink "Ik ben geen robot" aan om het bericht te versturen.');
  if (formData.get('akkoord') !== 'ja') return terug('Geef aan dat wij uw gegevens mogen gebruiken om contact met u op te nemen.');

  const { error } = await publicClient().from('offerteaanvragen').insert(aanvraag);
  if (error) {
    console.error('aanvraag', error);
    return terug('Versturen is niet gelukt. Probeer het later opnieuw of bel ons.');
  }

  // Melding per mail naar kantoor. Mislukt dit, dan staat het bericht nog steeds in het beheer.
  try {
    const [i, h] = await Promise.all([getInstellingen(), headers()]);
    const host = h.get('x-forwarded-host') || h.get('host');
    await meldNieuwBericht(aanvraag, { naar: i.email, siteUrl: host ? `https://${host}` : '' });
  } catch (e) {
    console.error('melding', e);
  }
  return { ok: true };
}
