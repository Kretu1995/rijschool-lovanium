# Rijschool Lovanium — Website

Premium, cinematic driving school website built with Next.js 15, Tailwind CSS, Framer Motion, and next-intl (NL/EN/FR).

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 15** | App Router, SSR, i18n routing |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Scroll animations, page transitions |
| **next-intl** | NL/EN/FR multilingual support |
| **Lucide React** | Icons |
| **TypeScript** | Type safety |

## Project Structure

```
rijschool-lovanium/
├── app/
│   ├── [locale]/          # Per-locale routes (/nl, /en, /fr)
│   │   ├── layout.tsx     # Per-locale layout with fonts + providers
│   │   └── page.tsx       # Homepage
│   ├── api/contact/       # Form submission API route
│   └── globals.css        # Global styles + Tailwind
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx # Sticky nav + mobile menu
│   │   └── Footer.tsx     # Full footer with contact info
│   ├── sections/
│   │   ├── Hero.tsx       # Cinematic fullscreen hero
│   │   ├── SocialProof.tsx# Testimonials + Google rating
│   │   ├── Services.tsx   # Service cards
│   │   ├── WhyUs.tsx      # Benefits + stats
│   │   ├── Pricing.tsx    # Pricing table
│   │   └── Booking.tsx    # Contact form + info
│   └── ui/
│       ├── AnimatedSection.tsx   # Framer Motion scroll reveals
│       ├── LanguageSwitcher.tsx  # NL/EN/FR switcher
│       └── StickyMobileCTA.tsx   # Mobile bottom CTA bar
├── messages/
│   ├── nl.json            # Dutch (default)
│   ├── en.json            # English
│   └── fr.json            # French
├── lib/utils.ts           # cn() utility
├── middleware.ts          # Locale detection + routing
└── next.config.ts         # Next.js + next-intl config
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm / pnpm / yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:3000
# Redirects to /nl automatically
```

### Language URLs

| Language | URL |
|----------|-----|
| Dutch (default) | `/nl` |
| English | `/en` |
| French | `/fr` |

## Adding the Hero Video

Place a video file at `/public/hero-bg.mp4` for the cinematic background effect.
Place a poster image at `/public/hero-poster.jpg` as a fallback.

Recommended specs:
- Resolution: 1920×1080 or 3840×2160
- Duration: 15–30s loop
- Size: under 10MB (compress with HandBrake or FFmpeg)
- Content: driving through city, sunset road, Audi interior

```bash
# Compress with FFmpeg
ffmpeg -i input.mp4 -vf scale=1920:-1 -c:v libx264 -crf 23 -preset slow -an public/hero-bg.mp4
```

## Email Integration

Edit `app/api/contact/route.ts` to connect your email provider.

**Resend (recommended):**
```bash
npm install resend
```

```ts
// .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
```

```ts
// app/api/contact/route.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@rijschoollovanium.be',
  to: 'info@rijschoollovanium.be',
  subject: `Nieuwe aanvraag van ${name}`,
  html: `<p>Naam: ${name}</p>...`,
});
```

## Deployment on Vercel

### Step 1: Push to GitHub

```bash
cd rijschool-lovanium
git init
git add .
git commit -m "feat: initial cinematic website"
git remote add origin https://github.com/yourname/rijschool-lovanium.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Add environment variables if needed (e.g., `RESEND_API_KEY`)
5. Click **Deploy**

### Step 3: Custom Domain

In Vercel project settings → **Domains** → Add `rijschoollovanium.be`

Configure DNS at your registrar:
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Optional | For form email delivery |

## Customization

### Colors

Edit `tailwind.config.ts` → `theme.extend.colors`:
```ts
gold: {
  DEFAULT: '#C8963E',  // Main gold accent
  light: '#E5B668',    // Hover gold
}
```

### Contact Info

Update `messages/nl.json`, `messages/en.json`, `messages/fr.json` → `booking.contactInfo`

### Pricing

Update pricing in the three language files under `pricing.plans`.

## Commit Convention

```
feat:     New feature
fix:      Bug fix
style:    CSS/design changes
content:  Copy/translations
chore:    Config, deps
```

Example commit history:
```
feat: initial project setup with Next.js + next-intl
feat: add cinematic hero with video background
feat: add testimonials carousel with framer-motion
feat: add pricing table with popular highlight
feat: add contact form with API route
style: refine mobile navigation and sticky CTA
content: add French translations
chore: configure Vercel deployment
```

## License

Private — Rijschool Lovanium © 2024
