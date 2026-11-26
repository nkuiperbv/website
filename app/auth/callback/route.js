import { NextResponse } from 'next/server';
import { serverClient } from '@/lib/supabase/server';

// Verwerkt de link uit e-mails van Supabase (wachtwoord herstellen, uitnodiging).
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  let next = searchParams.get('next') || '/beheer';
  if (!next.startsWith('/')) next = '/beheer';

  const supabase = await serverClient();
  let error = null;
  if (code) {
    ({ error } = await supabase.auth.exchangeCodeForSession(code));
  } else if (tokenHash && type) {
    ({ error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type }));
    if (!error && (type === 'invite' || type === 'recovery')) next = '/beheer/wachtwoord';
  } else {
    error = new Error('geen code');
  }

  return NextResponse.redirect(`${origin}${error ? '/inloggen' : next}`);
}
