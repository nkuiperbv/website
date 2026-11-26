'use client';
import { useEffect } from 'react';
import { browserClient } from '@/lib/supabase/browser';

// Vangt links uit Supabase-mails op die met #access_token=... binnenkomen
// (uitnodiging, wachtwoord herstellen) en logt de gebruiker in.
export default function AuthLink() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes('access_token=') && !hash.includes('error_description=')) return;
    const p = new URLSearchParams(hash.slice(1));

    if (p.get('error_description')) {
      window.location.replace('/inloggen?fout=' + encodeURIComponent(p.get('error_description')));
      return;
    }

    const access_token = p.get('access_token');
    const refresh_token = p.get('refresh_token');
    const type = p.get('type');
    browserClient().auth.setSession({ access_token, refresh_token }).then(({ error }) => {
      if (error) window.location.replace('/inloggen?fout=' + encodeURIComponent('De link is verlopen of al gebruikt.'));
      else window.location.replace(type === 'invite' || type === 'recovery' || type === 'signup' ? '/beheer/wachtwoord' : '/beheer');
    });
  }, []);
  return null;
}
