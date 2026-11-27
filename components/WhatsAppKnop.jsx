'use client';
import { useState } from 'react';

// Zwevende chatknop rechtsonder: opent een klein venster en daarna WhatsApp met kantoor.
export default function WhatsAppKnop({ nummer, tekst, bericht, telefoon, telHref }) {
  const [open, setOpen] = useState(false);
  const link = `https://wa.me/${nummer}${bericht ? `?text=${encodeURIComponent(bericht)}` : ''}`;

  return (
    <div className="wa">
      {open && (
        <div className="wa-venster" role="dialog" aria-label="Chat met kantoor">
          <div className="wa-kop">
            <div>
              <b>Chat met kantoor</b>
              <span>N. Kuiper B.V. Installatietechniek</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Chatvenster sluiten" className="wa-sluit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <div className="wa-body">
            <p className="wa-ballon">{tekst || 'Hallo! Heeft u een vraag? Stuur ons een WhatsApp-bericht, dan reageren we zo snel mogelijk tijdens kantooruren.'}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="wa-start">
              <WaIcoon grootte={20} /> Start chat in WhatsApp
            </a>
            <a href={telHref} className="wa-bel">Liever bellen? {telefoon}</a>
          </div>
        </div>
      )}
      <button className="wa-knop" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Chatvenster sluiten' : 'Chat met ons via WhatsApp'}>
        <WaIcoon grootte={30} />
      </button>
    </div>
  );
}

function WaIcoon({ grootte }) {
  return (
    <svg width={grootte} height={grootte} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}
