# Website N. Kuiper B.V. Installatietechniek

Next.js-website met een beheeromgeving, gekoppeld aan Supabase en gehost op Vercel.

## Onderdelen

- **Website**: homepage, dienstpagina's (`/diensten/...`), actueel, werken bij, over ons, contact met offerteformulier.
- **Beheer** (`/beheer`, inloggen via `/inloggen`): teksten en foto's, diensten, nieuws, vacatures en binnengekomen offerteaanvragen.
- **Supabase**: tabellen `instellingen`, `diensten`, `nieuws`, `vacatures`, `offerteaanvragen`, `beheerders` en de opslag `media` voor foto's. Alleen e-mailadressen in `beheerders` kunnen iets wijzigen.

## Omgevingsvariabelen (in Vercel)

```
NEXT_PUBLIC_SUPABASE_URL=https://zvnsvsxkctcjdvrpqqaq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable key uit Supabase>
```

## Een beheerder toevoegen

1. Supabase → Authentication → Users → **Add user** (of **Invite user**).
2. Voeg het e-mailadres toe aan de tabel `beheerders` (Table Editor).

## Lokaal draaien

```
npm install
npm run dev
```
