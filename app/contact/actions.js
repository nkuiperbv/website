'use server';
import { publicClient } from '@/lib/supabase/public';

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

  const terug = (fout) => ({ ok: false, fout, waarden: { ...aanvraag, akkoord: formData.get('akkoord') === 'ja' }, t: Date.now() });
  if (!aanvraag.naam || !aanvraag.bericht) return terug('Vul uw naam en uw vraag in.');
  if (!aanvraag.email && !aanvraag.telefoon) return terug('Vul een e-mailadres of telefoonnummer in, zodat we u kunnen bereiken.');
  if (aanvraag.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aanvraag.email)) return terug('Controleer uw e-mailadres.');
  if (formData.get('akkoord') !== 'ja') return terug('Geef aan dat wij uw gegevens mogen gebruiken om contact met u op te nemen.');

  const { error } = await publicClient().from('offerteaanvragen').insert(aanvraag);
  if (error) {
    console.error('aanvraag', error);
    return terug('Versturen is niet gelukt. Probeer het later opnieuw of bel ons.');
  }
  return { ok: true };
}
