export default function robots() {
  const basis = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nkuiperbv.nl';
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/beheer', '/inloggen', '/auth'] },
    sitemap: `${basis}/sitemap.xml`,
  };
}
