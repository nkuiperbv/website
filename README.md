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

## Gebruikers beheren

In de beheeromgeving onder **Gebruikers** (alleen zichtbaar voor de rol *beheerder*):

- **Toevoegen**: naam, e-mailadres en rol invullen. Je krijgt een uitnodigingslink om te kopiëren of te mailen; daarmee stelt de gebruiker een wachtwoord in.
- **Rollen**: *redacteur* beheert de inhoud (teksten, foto's, diensten, nieuws, vacatures, berichten); *beheerder* kan daarnaast gebruikers beheren.
- **Nieuwe link**: als een link verlopen is of iemand zijn wachtwoord kwijt is.
- **Verwijderen**: de persoon kan daarna niets meer wijzigen. Er blijft altijd minstens één beheerder over.

Technisch: rollen staan in de tabel `beheerders` (`rol`). De links maakt de Supabase Edge Function `gebruiker-link`, die alleen werkt voor ingelogde beheerders.

## Lokaal draaien

```
npm install
npm run dev
```
