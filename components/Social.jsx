// Iconen met links naar de social media-kanalen. Lege kanalen worden niet getoond.
const KANALEN = [
  ['facebook', 'Facebook', <path key="f" d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z" />],
  ['instagram', 'Instagram', <g key="i" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></g>],
  ['linkedin', 'LinkedIn', <path key="l" d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 6h4v1.7c.6-1 1.9-2 3.8-2 4 0 4.2 2.6 4.2 6V21h-4v-5.4c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4z" />],
  ['youtube', 'YouTube', <path key="y" d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.2.4-3.8.4-3.8s0-2.6-.4-3.8zM10 15V9l5.2 3z" />],
  ['tiktok', 'TikTok', <path key="t" d="M16.5 3c.3 2.2 1.6 3.6 3.8 3.8v3.1a7 7 0 0 1-3.7-1.1v6.4A5.8 5.8 0 1 1 10.8 9.5v3.2a2.7 2.7 0 1 0 2.5 2.7V3z" />],
];

export default function Social({ instellingen, licht }) {
  const actief = KANALEN.filter(([sleutel]) => instellingen[sleutel]);
  if (actief.length === 0) return null;
  return (
    <div className={`social${licht ? ' licht' : ''}`}>
      {actief.map(([sleutel, naam, icoon]) => (
        <a key={sleutel} href={instellingen[sleutel]} target="_blank" rel="noopener noreferrer" aria-label={`N. Kuiper op ${naam}`} title={naam}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{icoon}</svg>
        </a>
      ))}
    </div>
  );
}
