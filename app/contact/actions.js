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

  if (!aanvraag.naam || (!aanvraag.email && !aanvraag.telefoon) || !aanvraag.bericht) {
    return { ok: false, fout: 'Vul uw naam, een e-mailadres of telefoonnummer en uw vraag in.' };
  }
  if (formData.get('akkoord') !== 'ja') {
    return { ok: false, fout: 'Geef aan dat wij uw gegevens mogen gebruiken om contact met u op te nemen.' };
  }

  const { error } = await publicClient().from('offerteaanvragen').insert(aanvraag);
  if (error) {
    console.error('aanvraag', error);
    return { ok: false, fout: 'Versturen is niet gelukt. Probeer het later opnieuw of bel ons.' };
  }
  return { ok: true };
}
