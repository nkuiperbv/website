import FotoVeld from './FotoVeld';

export function Veld({ veld, waarde }) {
  const id = `v-${veld.naam}`;
  if (veld.type === 'foto' || veld.type === 'video') return <FotoVeld naam={veld.naam} label={veld.label} waarde={waarde} uitleg={veld.uitleg} soort={veld.type} />;
  if (veld.type === 'vinkje') {
    return (
      <label style={{ display: 'flex', gap: 10, alignItems: 'center', fontWeight: 600, fontSize: 14 }}>
        <input type="checkbox" name={veld.naam} value="aan" defaultChecked={!!waarde} style={{ width: 20, height: 20 }} />
        {veld.label}
      </label>
    );
  }
  let invoer;
  if (veld.type === 'tekstvak') invoer = <textarea id={id} name={veld.naam} rows={veld.naam.includes('inhoud') || veld.naam.includes('tekst') ? 8 : 3} defaultValue={waarde ?? ''} />;
  else if (veld.type === 'keuze') invoer = (
    <select id={id} name={veld.naam} defaultValue={waarde ?? ''}>
      {veld.opties.map(([w, l]) => <option key={w} value={w}>{l}</option>)}
    </select>
  );
  else invoer = <input id={id} name={veld.naam} type={veld.type === 'getal' ? 'number' : veld.type === 'datum' ? 'date' : 'text'} defaultValue={waarde ?? ''} />;

  return (
    <div className="veld">
      <label htmlFor={id}>{veld.label}</label>
      {invoer}
      {veld.uitleg && <small>{veld.uitleg}</small>}
    </div>
  );
}
