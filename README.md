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

### 1. Supabase Secrets
V Supabase Dashboarde nastavte nasledujúce premenné:
```sh
SMTP_HOST=smtp.m1.websupport.sk
SMTP_PORT=465
SMTP_USERNAME=info@fastransfer.sk
SMTP_PASSWORD=VašeHeslo
```

### 2. Vercel Environment Variables
V nastaveniach Vercel pridajte:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📄 Licencia
Všetky práva vyhradené © 2025 FastTransfer.
dev & design by Pali Mrázek | #save4web

