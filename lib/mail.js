// Stuurt een melding naar kantoor bij een nieuw bericht via het contactformulier.
// Werkt via Resend (resend.com). Nodig in Vercel: RESEND_API_KEY.
// Optioneel: MAIL_NAAR (ontvanger, standaard het e-mailadres uit het beheer)
// en MAIL_VAN (afzender; alleen nodig na het verifiëren van het domein bij Resend).

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function meldNieuwBericht(a, { naar, siteUrl }) {
  const sleutel = process.env.RESEND_API_KEY;
  if (!sleutel) return { verstuurd: false, reden: 'geen RESEND_API_KEY' };

  const ontvanger = process.env.MAIL_NAAR || naar;
  if (!ontvanger) return { verstuurd: false, reden: 'geen ontvanger' };

  const regels = [
    ['Onderwerp', a.onderwerp],
    ['Naam', a.naam],
    ['E-mail', a.email],
    ['Telefoon', a.telefoon],
    ['Adres', a.adres],
  ].filter(([, v]) => v);

  const tekst = [
    `Nieuw bericht via de website (${a.onderwerp || 'contactformulier'})`,
    '',
    ...regels.map(([k, v]) => `${k}: ${v}`),
    '',
    'Bericht:',
    a.bericht,
    '',
    siteUrl ? `Bekijk alle berichten: ${siteUrl}/beheer/aanvragen` : '',
  ].join('\n');

  const html = `
  <div style="font-family:Arial,sans-serif;color:#1D1B1C;max-width:600px">
    <div style="border-left:6px solid #EA1F26;padding:4px 0 4px 14px;margin-bottom:18px">
      <div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#C8141B;font-weight:bold">Nieuw bericht via de website</div>
      <div style="font-size:20px;font-weight:bold;margin-top:4px">${esc(a.onderwerp || 'Contactformulier')}</div>
    </div>
    <table style="border-collapse:collapse;font-size:15px;margin-bottom:16px">
      ${regels.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#55504C">${esc(k)}</td><td style="padding:4px 0"><b>${
        k === 'E-mail' ? `<a href="mailto:${esc(v)}">${esc(v)}</a>` : k === 'Telefoon' ? `<a href="tel:${esc(String(v).replace(/[^0-9+]/g, ''))}">${esc(v)}</a>` : esc(v)
      }</b></td></tr>`).join('')}
    </table>
    <div style="background:#F4F2EF;border-radius:6px;padding:14px 16px;font-size:15px;line-height:1.55;white-space:pre-line">${esc(a.bericht)}</div>
    ${siteUrl ? `<p style="margin-top:18px"><a href="${esc(siteUrl)}/beheer/aanvragen" style="background:#EA1F26;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:bold">Bekijk in het beheer</a></p>` : ''}
    <p style="font-size:12px;color:#8A847F;margin-top:20px">Tip: klik op Beantwoorden om de klant direct te mailen${a.email ? '' : ' (de klant heeft geen e-mailadres opgegeven)'}.</p>
  </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${sleutel}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.MAIL_VAN || 'Website N. Kuiper <onboarding@resend.dev>',
        to: [ontvanger],
        reply_to: a.email || undefined,
        subject: `Website: ${a.onderwerp || 'nieuw bericht'} van ${a.naam}`,
        text: tekst,
        html,
      }),
    });
    if (!res.ok) {
      console.error('mail mislukt', res.status, await res.text());
      return { verstuurd: false, reden: 'status ' + res.status };
    }
    return { verstuurd: true };
  } catch (e) {
    console.error('mail fout', e);
    return { verstuurd: false, reden: 'netwerk' };
  }
}
