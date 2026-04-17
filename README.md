# FastTransfer VIP Preprava 🚗🏆

Prémiová taxi služba a letiskové transfery so zameraním na VIP komfort, diskrétnosť a profesionalitu.

## 🌟 Hlavné Funkcie

- **VIP Rezervačný Systém**: Integrovaný formulár s automatickou notifikáciou cez SMTP.
- **PWA (Progressive Web App)**: Aplikácia je plne inštalovateľná na iOS a Android s prémiovým bannerom.
- **Ultra-Responzívny Dizajn**: Optimalizované pre mobilné zariadenia s vysokým rozlíšením (Retina).
- **Luxury Look & Feel**: Zlaté gradienty, 4D parallax efekty a plynulé animácie.
- **SEO Ready**: Optimalizované meta tagy, robots.txt a automaticky generovaná sitemap.xml.

## 🛠️ Použité Technológie

- **Frontend**: React 18, TypeScript, Vite.
- **Styling**: Tailwind CSS, Framer Motion (animácie).
- **Backend**: Supabase Edge Functions (Deno).
- **Email**: SMTP Client (Websupport integrácia).
- **Deployment**: Vercel.

## 🚀 Rýchly Štart (Lokálne)

1. **Inštalácia**: `npm install`
2. **Vývoj**: `npm run dev`
3. **Build**: `npm run build`

## 📦 Produkčné Nasadenie

Aplikácia je pripravená na nasadenie cez **Vercel** a **Supabase**.

### 1. Vercel Environment Variables
V nastaveniach Vercel (Project → Settings → Environment Variables) pridajte:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM` *(voliteľné, default = SMTP_USER)*
- `ADMIN_EMAIL` *(voliteľné, default = SMTP_USER)*

### 2. Supabase Secrets
V Supabase Dashboarde (Edge Functions → Manage secrets) nastavte:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USERNAME`
- `SMTP_PASSWORD`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ Nikdy nepridávajte skutočné hodnoty hesiel do kódu alebo dokumentácie.

## 📄 Licencia
Všetky práva vyhradené © 2025 FastTransfer.
dev & design by Pali Mrázek | #save4web
