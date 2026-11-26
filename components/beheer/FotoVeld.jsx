'use client';
import { useState } from 'react';
import { browserClient } from '@/lib/supabase/browser';

// Uploadt een foto of filmpje rechtstreeks naar Supabase Storage (bucket "media") en bewaart het adres in een verborgen veld.
export default function FotoVeld({ naam, label, waarde, uitleg, soort = 'foto' }) {
  const isVideo = soort === 'video';
  const max = isVideo ? 50 : 10;
  const [url, setUrl] = useState(waarde || '');
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState('');

  async function kies(e) {
    const bestand = e.target.files?.[0];
    if (!bestand) return;
    if (bestand.size > max * 1024 * 1024) { setFout(`Dit bestand is groter dan ${max} MB. Kies een kleiner bestand.`); return; }
    setBezig(true); setFout('');
    const ext = (bestand.name.split('.').pop() || (isVideo ? 'mp4' : 'jpg')).toLowerCase().replace(/[^a-z0-9]/g, '');
    const pad = `${naam}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const supabase = browserClient();
    const { error } = await supabase.storage.from('media').upload(pad, bestand, { cacheControl: '31536000', contentType: bestand.type });
    if (error) { setFout('Uploaden mislukt: ' + error.message); setBezig(false); return; }
    const { data } = supabase.storage.from('media').getPublicUrl(pad);
    setUrl(data.publicUrl);
    setBezig(false);
  }

  const voorbeeld = { width: 200, height: 120, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--lijn)' };

  return (
    <div className="veld">
      <label htmlFor={`f-${naam}`}>{label}</label>
      <div className="b-foto">
        {url
          ? (isVideo ? <video src={url} muted loop autoPlay playsInline style={voorbeeld} /> : <img src={url} alt="" />)
          : <div className="ph" style={{ width: 200, height: 120 }}>{isVideo ? 'Geen filmpje' : 'Geen foto'}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input id={`f-${naam}`} type="file" accept={isVideo ? 'video/mp4,video/webm' : 'image/*'} onChange={kies} disabled={bezig} />
          {bezig && <small>Bezig met uploaden{isVideo ? ', dit kan even duren' : ''}…</small>}
          {url && !bezig && <button type="button" className="b-knop-licht" onClick={() => setUrl('')}>{isVideo ? 'Filmpje weghalen' : 'Foto weghalen'}</button>}
        </div>
      </div>
      {uitleg && <small>{uitleg}</small>}
      {fout && <div className="melding fout">{fout}</div>}
      <input type="hidden" name={naam} value={url} />
    </div>
  );
}
