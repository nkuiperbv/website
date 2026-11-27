const PADEN = {
  vlam: <path d="M12 3c3 4 5 6.5 5 10a5 5 0 0 1-10 0c0-3.5 2-6 5-10z" />,
  bliksem: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  bad: <path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM7 12V5a2 2 0 0 1 4 0" />,
  leiding: <path d="M3 10h18M3 14h18M7 6v12M17 6v12" />,
  airco: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><circle cx="12" cy="12" r="5" /></>,
  laadpaal: <><rect x="6" y="3" width="10" height="18" rx="2" /><path d="M16 9h2a2 2 0 0 1 2 2v5M11 8l-2 4h3l-2 4" /></>,
  zon: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  warmtepomp: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="15" cy="12" r="3.5" /><path d="M6 9h3M6 12h3M6 15h3" /></>,
  ventilatie: <><circle cx="12" cy="12" r="2" /><path d="M12 10c0-4 3-6 5-4s-1 5-5 4zM14 12c4 0 6 3 4 5s-5-1-4-5zM12 14c0 4-3 6-5 4s1-5 5-4zM10 12c-4 0-6-3-4-5s5 1 4 5z" /></>,
  fabriek: <path d="M3 21V10l5 3V10l5 3V10l5 3V4h3v17zM7 17h2M11 17h2M15 17h2" />,
  verdeler: <><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7v4M12 7v4M15 7v4M8 15h8M8 18h8" /></>,
  perslucht: <><circle cx="8" cy="14" r="5" /><path d="M8 14l2-2M13 14h8M18 11v6M3 6h6" /></>,
  vloeistof: <><path d="M3 8h6v8H3M9 12h6M15 8h6v8h-6" /><path d="M18 3c1 1.3 1.6 2.2 1.6 3a1.6 1.6 0 0 1-3.2 0c0-.8.6-1.7 1.6-3z" /></>,
  moersleutel: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />,
};

export default function Icoon({ naam, grootte = 32 }) {
  return (
    <svg width={grootte} height={grootte} viewBox="0 0 24 24" fill="none" stroke="#EA1F26" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PADEN[naam] || PADEN.moersleutel}
    </svg>
  );
}
