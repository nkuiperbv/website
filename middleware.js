import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Houdt de inlogsessie van de beheeromgeving actueel en stuurt niet-ingelogde bezoekers naar /inloggen.
export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data } = await supabase.auth.getUser();

  if (!data?.user && request.nextUrl.pathname.startsWith('/beheer')) {
    const url = request.nextUrl.clone();
    url.pathname = '/inloggen';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/beheer/:path*', '/inloggen'],
};
