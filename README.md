# Neatify Solutions — Premium Cleaning Services Web Platform

[![Vercel Deployment Ready](https://img.shields.io/badge/Vercel-Deployment%20Ready-black?style=flat&logo=vercel)](https://vercel.com)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com)

A high-performance, modern web application for **Neatify Solutions Inc.**, serving homeowners, businesses, and short-term Airbnb/vacation rental hosts across Lindsay, Bobcaygeon, Fenelon Falls, and the greater Kawartha Lakes region in Ontario, Canada.

---

## 🌟 Key Features

* **CleanSpace Visual Design:** Modern containerized card frame (`rounded-[2.5rem]`), glassmorphic floating header, custom "NS" brand monogram, and feathered Scandinavian hero layout.
* **3-Step Lead Generation Engine:** High-converting quote inquiry funnel capturing service category, property scope, and contact details with instant routing to `neatifysolutionsinc@gmail.com`.
* **Verified NAP Integrity:** Consistent business info (164 Colborne St. West, Lindsay, ON • 416-910-5281 • `neatifysolutionsinc@gmail.com`).
* **Mobile-First Experience:** Sticky bottom quick-action bar with one-tap native calling and quote access.
* **Local SEO & Schema.org:** Pre-configured JSON-LD structured data for `LocalBusiness` / `CleaningService` geo-targeted for Kawartha Lakes.
* **100% PRD Compliant:** Strictly avoids unsubstantiated claims; focuses on dependable service, local presence, and transparent communication.

---

## 🛠️ Technology Stack

* **Framework:** React 19 + Vite 8
* **Styling:** Tailwind CSS v4 with bespoke design tokens:
  * Primary Sage: `#526D55`
  * Soft Sage: `#E5EBDD`
  * Warm White: `#F8F7F1`
  * Brand Leaf Green: `#72B743`
  * Charcoal: `#303B32`
* **Icons:** Lucide React
* **Deployment Target:** Vercel / Cloudflare Pages

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Open your browser
# Server runs at http://localhost:5173
```

---

## 📦 Production Build

```bash
# Compile and optimize for production
npm run build

# Preview production build locally
npm run preview
```

Output is bundled into the `dist/` directory with static asset compression and sub-second load performance.

---

## 🚢 Deploying to Vercel

1. Import this repository into [Vercel](https://vercel.com/new).
2. Framework Preset will automatically detect **Vite**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**. Vercel will build and assign an instant production URL with global CDN edge caching.
6. Connect custom domain `neatifysolutions.ca` in Vercel Project Settings > Domains.

---

## 📄 License & Ownership
Copyright © 2026 Neatify Solutions Inc. All rights reserved.
