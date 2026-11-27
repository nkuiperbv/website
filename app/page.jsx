import Link from 'next/link';
import Kader from '@/components/Kader';
import Icoon from '@/components/Icoon';
import { getInstellingen, getDiensten, getNieuws, getKeurmerken, telLink } from '@/lib/data';

export const revalidate = 60;

function Foto({ src, alt, hoogte, label, donker }) {
  if (src) return <div style={{ height: hoogte }}><img src={src} alt={alt} className="foto" /></div>;
  return <div className="ph" style={{ height: hoogte, ...(donker ? { background: '#3A3634', color: '#CFCAC5' } : {}) }}>{label}</div>;
}

export default async function Home() {
  const [i, alle, nieuws, keurmerken] = await Promise.all([getInstellingen(), getDiensten(), getNieuws(3), getKeurmerken()]);
  const diensten = alle.filter((d) => d.categorie === 'dienst');
  const duurzaam = alle.filter((d) => d.categorie === 'duurzaam');
  const zakelijk = alle.filter((d) => d.categorie === 'zakelijk');
  const tel = telLink(i.telefoon);

  return (
    <Kader>
      {/* Groot openingsbeeld: filmpje, anders foto */}
      <section className="beeld" aria-label="Openingsbeeld">
        {i.hero_foto && <img src={i.hero_foto} alt="Het team van N. Kuiper" className="beeld-media" />}
        {i.hero_video && (
          <video className="beeld-media" src={i.hero_video} poster={i.hero_foto || undefined} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        )}
        {!i.hero_video && !i.hero_foto && <span className="beeld-leeg">Hier komt het openingsfilmpje of de teamfoto (te uploaden via het beheer)</span>}
        <a href="#intro" className="beeld-pijl" aria-label="Naar beneden">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </a>
      </section>

      {/* Kop en introductie, onder het beeld */}
      <section id="intro" className="intro">
        <div className="wrap intro-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="lbl">{i.hero_label}</div>
            <h1>{i.hero_titel}</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {i.hero_tekst && <p>{i.hero_tekst}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <Link href="/contact?onderwerp=Offerte#formulier" className="btn">Offerte aanvragen</Link>
              <a href={tel} className="btn-rand">Bel {i.telefoon}</a>
            </div>
            {i.sinds_jaar && <span style={{ fontSize: 15, color: 'var(--grijs-tekst)' }}>Familiebedrijf sinds {i.sinds_jaar}</span>}
          </div>
        </div>
      </section>

      {/* Snelkeuze */}
      <section className="snelkeuze">
        <div className="wrap grid-auto">
          <Link href="/contact?onderwerp=Offerte#formulier" className="card">
            <span className="lbl">Nieuw</span>
            <span className="card-titel" style={{ fontSize: 22 }}>Ik wil een offerte →</span>
            <span className="card-tekst">Nieuwe ketel, warmtepomp, badkamer of laadpaal.</span>
          </Link>
          <Link href="/contact?onderwerp=Onderhoud#formulier" className="card">
            <span className="lbl">Onderhoud</span>
            <span className="card-titel" style={{ fontSize: 22 }}>Onderhoud plannen →</span>
            <span className="card-tekst">Afspraak voor uw jaarlijkse beurt of een onderhoudscontract.</span>
          </Link>
          <a href={tel} className="card">
            <span className="lbl">Storing</span>
            <span className="card-titel" style={{ fontSize: 22 }}>Storing melden →</span>
            <span className="card-tekst">Geen warmte of warm water? Bel ons, we helpen u snel verder.</span>
          </a>
        </div>
      </section>

      {/* Duurzaam */}
      <section id="duurzaam" className="donker">
        <div className="wrap" style={{ paddingTop: 96, paddingBottom: 96, display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div className="split">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="lbl">Duurzaam</div>
              <h2 className="h2" style={{ color: '#fff' }}>{i.duurzaam_titel || 'Stap voor stap van het gas af'}</h2>
              {i.duurzaam_tekst && <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65 }}>{i.duurzaam_tekst}</p>}
              <div><Link href="/contact?onderwerp=Warmtepomp#formulier" className="btn">Advies aanvragen</Link></div>
            </div>
            <Foto src={i.duurzaam_foto} alt="Duurzame installatie" hoogte={380} label="Foto volgt" donker />
          </div>
          {duurzaam.length > 0 && (
            <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {duurzaam.map((d) => (
                <Link key={d.id} href={`/diensten/${d.slug}`} className="card card-donker">
                  <Icoon naam={d.icoon} />
                  <span className="card-titel">{d.titel}</span>
                  <span className="card-tekst">{d.korte_tekst}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Diensten */}
      <section id="diensten" className="sectie">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div className="kop-rij">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="streep" />
              <h2 className="h2">Alles onder één dak</h2>
            </div>
            <p style={{ margin: 0, maxWidth: 440, fontSize: 17, lineHeight: 1.6, color: 'var(--grijs-tekst)' }}>Verwarming, elektra, sanitair en meer. Van een lekkende kraan tot een complete nieuwe installatie.</p>
          </div>
          <div className="grid-auto">
            {diensten.map((d) => (
              <Link key={d.id} href={`/diensten/${d.slug}`} className="card">
                <Icoon naam={d.icoon} />
                <span className="card-titel">{d.titel}</span>
                <span className="card-tekst">{d.korte_tekst}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Voor bedrijven en industrie */}
      {zakelijk.length > 0 && (
        <section id="zakelijk" className="sectie" style={{ background: 'var(--lichtgrijs)' }}>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            <div className="split">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="lbl">Zakelijk</div>
                <h2 className="h2">{i.zakelijk_titel || 'Voor bedrijven en industrie'}</h2>
                {i.zakelijk_tekst && <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: 'var(--tekst2)' }}>{i.zakelijk_tekst}</p>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <Link href="/contact?onderwerp=Zakelijk%20project#formulier" className="btn">Project bespreken</Link>
                  <a href={tel} className="btn-rand">Bel {i.telefoon}</a>
                </div>
              </div>
              <Foto src={i.zakelijk_foto} alt="Installatie in een fabriek" hoogte={380} label="Foto volgt: installatie bij een bedrijf" />
            </div>
            <div className="grid-auto">
              {zakelijk.map((d) => (
                <Link key={d.id} href={`/diensten/${d.slug}`} className="card">
                  <Icoon naam={d.icoon} />
                  <span className="card-titel">{d.titel}</span>
                  <span className="card-tekst">{d.korte_tekst}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ons team */}
      <section id="team" className="sectie">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div className="team-foto">
            {i.team_foto
              ? <img src={i.team_foto} alt="Het team van N. Kuiper" />
              : <div className="ph" style={{ height: '100%', borderRadius: 0 }}>Hier komt de grote teamfoto (te uploaden via het beheer)</div>}
          </div>
          <div className="kop-rij" style={{ alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="streep" />
              <h2 className="h2">{i.team_titel || 'Ons team'}</h2>
            </div>
            <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {i.team_tekst && <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: 'var(--tekst2)' }}>{i.team_tekst}</p>}
              <Link href="/over-ons" style={{ fontWeight: 600 }}>Meer over ons →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Onderhoud */}
      <section id="onderhoud" className="sectie">
        <div className="wrap split">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="streep" />
            <h2 className="h2">Service &amp; onderhoud</h2>
            {i.onderhoud_tekst && <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: 'var(--tekst2)' }}>{i.onderhoud_tekst}</p>}
            <ul className="vinkjes">
              <li>DEKRA-gecertificeerd volgens BRL 6000-25 (CO-vrij) en BRL 100 (F-gassen)</li>
              <li>Eigen monteurs uit de regio</li>
              <li>Afspraken en facturen terug te zien in het klantenportaal</li>
            </ul>
            <div><Link href="/contact?onderwerp=Onderhoud#formulier" className="btn">Onderhoud aanvragen</Link></div>
          </div>
          <div className="keurmerken">
            {keurmerken.map((k) => {
              const inhoud = (
                <>
                  {k.foto_url ? <img src={k.foto_url} alt={k.titel} className="keurmerk-logo" /> : <b>{k.titel}</b>}
                  {k.omschrijving && <span>{k.omschrijving}</span>}
                </>
              );
              return k.link
                ? <a key={k.id} href={k.link} target="_blank" rel="noopener noreferrer" className="keurmerk">{inhoud}</a>
                : <div key={k.id} className="keurmerk">{inhoud}</div>;
            })}
          </div>
        </div>
      </section>

      {/* Actueel */}
      {nieuws.length > 0 && (
        <section id="actueel" className="sectie" style={{ background: 'var(--lichtgrijs)' }}>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div className="kop-rij">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div className="streep" />
                <h2 className="h2">Actueel</h2>
              </div>
              <Link href="/actueel" style={{ fontWeight: 600 }}>Alle berichten →</Link>
            </div>
            <div className="grid-auto" style={{ gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {nieuws.map((n) => (
                <Link key={n.id} href={`/actueel/${n.slug}`} className="bericht">
                  <Foto src={n.foto_url} alt="" hoogte={200} label="" />
                  {n.categorie && <span className="lbl" style={{ color: 'var(--grijs-tekst)' }}>{n.categorie}</span>}
                  <span className="bericht-titel">{n.titel}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Werken bij */}
      <section id="werken" className="sectie">
        <div className="wrap">
          <div className="werken-blok">
            <div style={{ flex: '1 1 480px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="lbl">Werken bij Kuiper</div>
              <h2 className="h2">{i.werken_titel || 'Monteur worden in de Achterhoek?'}</h2>
              {i.werken_tekst && <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6 }}>{i.werken_tekst}</p>}
            </div>
            <Link href="/werken-bij" className="wit">Bekijk vacatures</Link>
          </div>
        </div>
      </section>
    </Kader>
  );
}
