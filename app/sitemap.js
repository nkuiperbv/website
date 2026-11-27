import { publicClient } from '@/lib/supabase/public';

export const revalidate = 3600;

export default async function sitemap() {
  const basis = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nkuiperbv.nl';
  const vast = ['', '/contact', '/over-ons', '/actueel', '/werken-bij', '/privacy'].map((p) => ({ url: basis + p, changeFrequency: 'monthly', priority: p === '' ? 1 : 0.6 }));
  try {
    const sb = publicClient();
    const [{ data: d }, { data: n }] = await Promise.all([
      sb.from('diensten').select('slug, bijgewerkt_op').eq('zichtbaar', true),
      sb.from('nieuws').select('slug, bijgewerkt_op').eq('zichtbaar', true),
    ]);
    return [
      ...vast,
      ...(d || []).map((x) => ({ url: `${basis}/diensten/${x.slug}`, lastModified: x.bijgewerkt_op, priority: 0.8 })),
      ...(n || []).map((x) => ({ url: `${basis}/actueel/${x.slug}`, lastModified: x.bijgewerkt_op, priority: 0.5 })),
    ];
  } catch {
    return vast;
  }
}
