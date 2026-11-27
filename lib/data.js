import { publicClient } from './supabase/public';

// Standaardwaarden, voor als iets nog niet in de database staat.
const STANDAARD = {
  hero_label: 'Totaalinstallateur in de Achterhoek',
  hero_titel: 'Vakwerk dichtbij huis.\nVoor warmte, stroom en water.',
  hero_tekst: '',
  telefoon: '0315 - 61 75 55',
  email: 'info@nkuiperbv.nl',
  adres: 'Molenweg 5',
  postcode_plaats: '7084 AX Breedenbroek',
  klantenportaal: 'https://portal.syntess.net',
};

export async function getInstellingen() {
  try {
    const { data, error } = await publicClient().from('instellingen').select('sleutel, waarde');
    if (error) throw error;
    const uit = { ...STANDAARD };
    for (const r of data || []) if (r.waarde !== null && r.waarde !== '') uit[r.sleutel] = r.waarde;
    return uit;
  } catch (e) {
    console.error('instellingen', e);
    return { ...STANDAARD };
  }
}

export async function getDiensten(categorie) {
  try {
    let q = publicClient().from('diensten').select('*').eq('zichtbaar', true).order('volgorde');
    if (categorie) q = q.eq('categorie', categorie);
    const { data, error } = await q;
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('diensten', e);
    return [];
  }
}

export async function getDienst(slug) {
  const { data } = await publicClient().from('diensten').select('*').eq('slug', slug).eq('zichtbaar', true).maybeSingle();
  return data;
}

export async function getNieuws(aantal) {
  try {
    let q = publicClient().from('nieuws').select('*').eq('zichtbaar', true).order('gepubliceerd_op', { ascending: false });
    if (aantal) q = q.limit(aantal);
    const { data, error } = await q;
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('nieuws', e);
    return [];
  }
}

export async function getBericht(slug) {
  const { data } = await publicClient().from('nieuws').select('*').eq('slug', slug).eq('zichtbaar', true).maybeSingle();
  return data;
}

export async function getVacatures() {
  try {
    const { data, error } = await publicClient().from('vacatures').select('*').eq('zichtbaar', true).order('volgorde');
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('vacatures', e);
    return [];
  }
}

export function telLink(nummer) {
  const cijfers = String(nummer || '').replace(/[^0-9]/g, '');
  return cijfers.startsWith('0') ? `tel:+31${cijfers.slice(1)}` : `tel:${cijfers}`;
}

export function alineas(tekst) {
  return String(tekst || '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
}

export function datumNL(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
}

export async function getKeurmerken() {
  try {
    const { data, error } = await publicClient().from('keurmerken').select('*').eq('zichtbaar', true).order('volgorde');
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.error('keurmerken', e);
    return [];
  }
}

// Laatste Instagram-berichten via een feed-adres (bijvoorbeeld van Behold.so). Elke 10 minuten ververst.
export async function getInstagram(feedUrl, aantal = 8) {
  if (!feedUrl || !/^https:\/\//.test(feedUrl)) return [];
  try {
    const res = await fetch(feedUrl, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error('status ' + res.status);
    const json = await res.json();
    const posts = Array.isArray(json) ? json : (json.posts || json.data || []);
    return posts.slice(0, aantal).map((p) => ({
      id: p.id,
      link: p.permalink,
      beeld: p.sizes?.medium?.mediaUrl || p.thumbnailUrl || p.thumbnail_url || p.mediaUrl || p.media_url,
      tekst: (p.prunedCaption || p.caption || '').slice(0, 140),
      video: (p.mediaType || p.media_type) === 'VIDEO',
    })).filter((p) => p.beeld && p.link);
  } catch (e) {
    console.error('instagram', e);
    return [];
  }
}
