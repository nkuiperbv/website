'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  ['/#diensten', 'Diensten'],
  ['/#duurzaam', 'Duurzaam'],
  ['/diensten/service-onderhoud', 'Service & onderhoud'],
  ['/over-ons', 'Over ons'],
  ['/actueel', 'Actueel'],
  ['/werken-bij', 'Werken bij'],
  ['/contact', 'Contact'],
];

// Hoofdmenu: op een groot scherm een rij links, op telefoon en iPad een uitklapmenu.
export default function Menu({ telefoon, telHref }) {
  const [open, setOpen] = useState(false);
  const pad = usePathname();
  useEffect(() => { setOpen(false); }, [pad]);

  return (
    <>
      <button className="menu-knop" aria-expanded={open} aria-controls="hoofdmenu" aria-label={open ? 'Menu sluiten' : 'Menu openen'} onClick={() => setOpen(!open)}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <nav id="hoofdmenu" className={`nav${open ? ' open' : ''}`} aria-label="Hoofdmenu">
        {LINKS.map(([href, tekst]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{tekst}</Link>)}
        <div className="nav-mobiel-extra">
          <Link href="/contact#offerte" className="btn" onClick={() => setOpen(false)}>Offerte aanvragen</Link>
          <a href={telHref} className="btn-rand">Bel {telefoon}</a>
        </div>
      </nav>
    </>
  );
}
