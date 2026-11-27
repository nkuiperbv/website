'use client';
import { useEffect, useState } from 'react';

// Facebook-tijdlijn via de officiële Page Plugin. Pas na toestemming laden,
// omdat Facebook dan cookies kan plaatsen (AVG).
export default function FacebookFeed({ pagina }) {
  const [aan, setAan] = useState(false);
  useEffect(() => {
    try { if (localStorage.getItem('fb-feed') === 'ja') setAan(true); } catch {}
  }, []);

  function toestaan() {
    setAan(true);
    try { localStorage.setItem('fb-feed', 'ja'); } catch {}
  }

  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pagina)}&tabs=timeline&width=500&height=640&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`;

  if (!aan) {
    return (
      <div className="fb-toestemming">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z" /></svg>
        <b>Onze laatste berichten op Facebook</b>
        <span>Om de berichten te tonen, laden we ze van Facebook. Facebook kan daarbij cookies plaatsen.</span>
        <button className="btn" onClick={toestaan}>Facebook-berichten tonen</button>
        <a href={pagina} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, textDecoration: 'underline' }}>Of bekijk onze Facebook-pagina ↗</a>
      </div>
    );
  }

  return (
    <iframe
      title="Facebook-berichten van N. Kuiper"
      src={src}
      width="500"
      height="640"
      style={{ border: 0, overflow: 'hidden', width: '100%', maxWidth: 500, borderRadius: 8, background: '#fff' }}
      scrolling="no"
      allow="encrypted-media"
      loading="lazy"
    />
  );
}
