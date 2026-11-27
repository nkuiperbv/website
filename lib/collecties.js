// Beschrijving van wat er in de beheeromgeving te bewerken is.
// Een veld: { naam, label, type: 'tekst' | 'tekstvak' | 'foto' | 'getal' | 'vinkje' | 'keuze' | 'datum', opties?, uitleg? }

export const ICONEN = ['vlam', 'bliksem', 'bad', 'leiding', 'airco', 'laadpaal', 'zon', 'warmtepomp', 'ventilatie', 'moersleutel'];

export const COLLECTIES = {
  diensten: {
    tabel: 'diensten',
    titel: 'Diensten',
    enkelvoud: 'dienst',
    sorteer: { kolom: 'volgorde', oplopend: true },
    lijstKolommen: ['titel', 'categorie', 'zichtbaar'],
    pad: (r) => `/diensten/${r.slug}`,
    velden: [
      { naam: 'titel', label: 'Titel', type: 'tekst' },
      { naam: 'slug', label: 'Webadres', type: 'tekst', uitleg: 'Alleen kleine letters en streepjes, bijvoorbeeld "warmtepomp". Wordt /diensten/warmtepomp.' },
      { naam: 'categorie', label: 'Waar op de homepage', type: 'keuze', opties: [['dienst', 'Blok "Alles onder één dak"'], ['duurzaam', 'Blok "Duurzaam"'], ['onderhoud', 'Service & onderhoud']] },
      { naam: 'korte_tekst', label: 'Korte omschrijving (op de homepage)', type: 'tekst' },
      { naam: 'inhoud', label: 'Tekst op de dienstpagina', type: 'tekstvak', uitleg: 'Laat een lege regel tussen alinea\'s.' },
      { naam: 'foto_url', label: 'Foto', type: 'foto' },
      { naam: 'icoon', label: 'Icoon', type: 'keuze', opties: ICONEN.map((i) => [i, i]) },
      { naam: 'volgorde', label: 'Volgorde', type: 'getal', uitleg: 'Lager getal staat eerder.' },
      { naam: 'zichtbaar', label: 'Zichtbaar op de website', type: 'vinkje' },
    ],
    nieuw: { categorie: 'dienst', icoon: 'moersleutel', volgorde: 100, zichtbaar: true },
  },
  nieuws: {
    tabel: 'nieuws',
    titel: 'Nieuws',
    enkelvoud: 'bericht',
    sorteer: { kolom: 'gepubliceerd_op', oplopend: false },
    lijstKolommen: ['titel', 'gepubliceerd_op', 'zichtbaar'],
    pad: (r) => `/actueel/${r.slug}`,
    velden: [
      { naam: 'titel', label: 'Titel', type: 'tekst' },
      { naam: 'slug', label: 'Webadres', type: 'tekst', uitleg: 'Alleen kleine letters en streepjes. Leeg laten: wordt gemaakt uit de titel.' },
      { naam: 'categorie', label: 'Label', type: 'tekst', uitleg: 'Bijvoorbeeld Besparen, Subsidie of Bedrijf.' },
      { naam: 'gepubliceerd_op', label: 'Datum', type: 'datum' },
      { naam: 'samenvatting', label: 'Samenvatting', type: 'tekst' },
      { naam: 'inhoud', label: 'Tekst', type: 'tekstvak', uitleg: 'Laat een lege regel tussen alinea\'s.' },
      { naam: 'foto_url', label: 'Foto', type: 'foto' },
      { naam: 'zichtbaar', label: 'Zichtbaar op de website', type: 'vinkje' },
    ],
    nieuw: { zichtbaar: true },
  },
  vacatures: {
    tabel: 'vacatures',
    titel: 'Vacatures',
    enkelvoud: 'vacature',
    sorteer: { kolom: 'volgorde', oplopend: true },
    lijstKolommen: ['titel', 'uren', 'zichtbaar'],
    pad: () => '/werken-bij',
    velden: [
      { naam: 'titel', label: 'Functie', type: 'tekst' },
      { naam: 'slug', label: 'Webadres', type: 'tekst', uitleg: 'Leeg laten: wordt gemaakt uit de functie.' },
      { naam: 'uren', label: 'Uren', type: 'tekst', uitleg: 'Bijvoorbeeld 32 – 40 uur.' },
      { naam: 'inhoud', label: 'Omschrijving', type: 'tekstvak', uitleg: 'Laat een lege regel tussen alinea\'s.' },
      { naam: 'volgorde', label: 'Volgorde', type: 'getal' },
      { naam: 'zichtbaar', label: 'Zichtbaar op de website', type: 'vinkje' },
    ],
    nieuw: { volgorde: 100, zichtbaar: true },
  },
};

// Vaste teksten en foto's van de website (tabel "instellingen").
export const INSTELLINGEN = [
  { groep: 'Logo', velden: [
    { naam: 'logo', label: 'Logo (kleur, op wit)', type: 'foto', uitleg: 'Bij voorkeur een SVG- of PNG-bestand met transparante achtergrond. Onderaan de website wordt automatisch een witte versie getoond.' },
  ]},
  { groep: 'Bovenaan de homepage', velden: [
    { naam: 'hero_label', label: 'Klein rood label', type: 'tekst' },
    { naam: 'hero_titel', label: 'Grote kop', type: 'tekstvak', uitleg: 'Een nieuwe regel = een nieuwe regel in de kop.' },
    { naam: 'hero_tekst', label: 'Introductietekst', type: 'tekstvak' },
    { naam: 'hero_video', label: 'Openingsfilmpje (over de volle breedte)', type: 'video', uitleg: 'MP4-bestand, liggend, 15 tot 30 seconden, zonder geluid en bij voorkeur kleiner dan 20 MB (maximaal 50 MB). Het filmpje speelt automatisch en herhaalt zich.' },
    { naam: 'hero_foto', label: 'Openingsfoto', type: 'foto', uitleg: 'Wordt getoond als er geen filmpje is, en als stilstaand beeld terwijl het filmpje laadt. Bijvoorbeeld een grote teamfoto.' },
    { naam: 'sinds_jaar', label: 'Sinds (jaartal)', type: 'tekst', uitleg: 'Leeg laten: het blokje "Sinds" verdwijnt.' },
  ]},
  { groep: 'Ons team', velden: [
    { naam: 'team_titel', label: 'Kop', type: 'tekst' },
    { naam: 'team_tekst', label: 'Tekst', type: 'tekstvak' },
    { naam: 'team_foto', label: 'Teamfoto (groot, over de volle breedte)', type: 'foto' },
  ]},
  { groep: 'Duurzaam', velden: [
    { naam: 'duurzaam_titel', label: 'Kop', type: 'tekst' },
    { naam: 'duurzaam_tekst', label: 'Tekst', type: 'tekstvak' },
    { naam: 'duurzaam_foto', label: 'Foto', type: 'foto' },
  ]},
  { groep: 'Service & onderhoud', velden: [
    { naam: 'onderhoud_tekst', label: 'Tekst', type: 'tekstvak' },
  ]},
  { groep: 'Werken bij', velden: [
    { naam: 'werken_titel', label: 'Kop', type: 'tekst' },
    { naam: 'werken_tekst', label: 'Tekst', type: 'tekstvak' },
  ]},
  { groep: 'Over ons', velden: [
    { naam: 'over_ons_tekst', label: 'Tekst op de pagina Over ons', type: 'tekstvak', uitleg: 'Laat een lege regel tussen alinea\'s.' },
    { naam: 'over_ons_foto', label: 'Foto', type: 'foto' },
  ]},
  { groep: 'Privacy', velden: [
    { naam: 'privacy_tekst', label: 'Privacyverklaring', type: 'tekstvak', uitleg: 'Laat een lege regel tussen alinea\'s.' },
  ]},
  { groep: 'Contactgegevens', velden: [
    { naam: 'telefoon', label: 'Telefoonnummer', type: 'tekst' },
    { naam: 'email', label: 'E-mailadres', type: 'tekst' },
    { naam: 'adres', label: 'Straat en huisnummer', type: 'tekst' },
    { naam: 'postcode_plaats', label: 'Postcode en plaats', type: 'tekst' },
    { naam: 'kvk', label: 'KvK-nummer', type: 'tekst' },
    { naam: 'klantenportaal', label: 'Adres klantenportaal', type: 'tekst' },
  ]},
  { groep: 'WhatsApp-chat (knop rechtsonder)', velden: [
    { naam: 'whatsapp', label: 'WhatsApp-nummer van kantoor', type: 'tekst', uitleg: 'Bijvoorbeeld 06 12345678 of 0315 617555 (als dat nummer WhatsApp Business heeft). Leeg laten: de chatknop verdwijnt.' },
    { naam: 'whatsapp_tekst', label: 'Tekst in het chatvenster', type: 'tekstvak', uitleg: 'Bijvoorbeeld wanneer jullie reageren.' },
    { naam: 'whatsapp_bericht', label: 'Bericht dat alvast klaarstaat voor de klant', type: 'tekst' },
  ]},
  { groep: 'Social media', velden: [
    { naam: 'facebook', label: 'Facebook', type: 'tekst', uitleg: 'Het volledige adres, bijvoorbeeld https://www.facebook.com/NKuiperBv. Leeg laten: het icoon verdwijnt.' },
    { naam: 'instagram', label: 'Instagram', type: 'tekst', uitleg: 'Bijvoorbeeld https://www.instagram.com/accountnaam' },
    { naam: 'linkedin', label: 'LinkedIn', type: 'tekst' },
    { naam: 'youtube', label: 'YouTube', type: 'tekst' },
    { naam: 'tiktok', label: 'TikTok', type: 'tekst' },
  ]},
];

export function maakSlug(tekst) {
  return String(tekst || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' en ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
