# Picky — Exquisite Catering for Your Finest Occasions

> A modern, high-performance catering & luxury dining landing page meticulously cloned from Figma with pixel-perfect fidelity, rich GSAP scroll-driven interactions, and interactive booking & menu features.

---

## 🌟 Overview

**Picky** (Catered Plate) delivers an editorial dining experience for high-end corporate summits, weddings, and private events. Designed with bold turquoise backgrounds, deep forest teal accents, and warm sunny yellow call-outs, the interface combines architectural arch motifs with smooth micro-interactions.

---

## 🎨 Design System & Color Tokens

| Token Name | Hex Code | Visual Preview | Purpose |
| :--- | :--- | :--- | :--- |
| **Brand Cyan / Turquoise** | `#1BD6D3` | `rgb(27, 214, 211)` | Primary canvas & section background |
| **Brand Dark Teal** | `#00383D` | `rgb(0, 56, 61)` | Primary typography, dark containers, button fills |
| **Brand Accent Yellow** | `#FFDF00` | `rgb(255, 223, 0)` | Accent CTA badges, star ratings, CTA banner |
| **Muted Forest Teal** | `#005057` | `rgb(0, 80, 87)` | Subheadings, secondary body text |
| **Footer Dark Teal** | `#03484C` | `rgb(3, 72, 76)` | Giant repeating wordmarks across footer |
| **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | Text on dark backgrounds |

### Typography
- **Headings & Badges**: [`Sedan`](https://fonts.google.com/specimen/Sedan) (Regular 400, serifs, luxury editorial tone).
- **Body & Captions**: [`Inter`](https://fonts.google.com/specimen/Inter) (Light, Regular, Medium, crisp readability).

---

## ✨ Creative GSAP & Scroll-Driven Animations

The site leverages **GSAP 3** and **ScrollTrigger** via a memory-safe, hardware-accelerated `lib/gsap.ts` architecture designed with zero CSS-transition conflicts:

1. **Synchronized Hero Timeline**:
   - The headline (`"Exquisite Catering for / Your Finest Occasions"`) reveals via masked split-lines (`yPercent: 110 -> 0`, `power4.out`).
   - Editorial subtext slides up concurrently with seamless overlap (`-=0.55s`).
   - The floating 14s rotating menu badge pops in with dynamic spring physics (`back.out(1.7)`).
   - The 5-item showcase gallery row glides up smoothly with subtle scale elevation (`scale: 0.96 -> 1`).
2. **Rotating "Explore Menu" Badge**:
   - Seamless 14-second circular text rotation around the center arrow with pause-on-hover capability and instant smooth-scroll navigation.
3. **Decoupled Hover & Entrance Architecture**:
   - Animated elements separate GSAP entrance targets from inner hover containers (`transition-[transform,box-shadow] duration-300`). This completely eliminates the "slow low opacity fade" bug caused by CSS transitions fighting GSAP tweens.
4. **Statement Sequential Reveal**:
   - 4-line staggered emergence triggered via coordinated timeline with spring-loaded CTA pill button.
5. **Events We Serve Staggered Rise**:
   - Header smoothly introduces the section followed by a rhythmic card rise (`stagger: 0.12s`, `power3.out`).
   - Diagonal arrow icon slides smoothly from `opacity: 0, -translate-x-2, translate-y-2` to `opacity: 1, 0, 0` on card hover.
6. **Guest Favorite Dishes Carousel**:
   - Arched cards and circular navigation buttons enter via timeline choreography (`start: "top 80%"`).
7. **Photo Gallery Grid Entrance**:
   - Asymmetric 7-column grid items scale from `0.96` to `1` with subtle lift (`y: 35 -> 0`).
8. **Reviews Testimonials Entrance**:
   - Arch-top cards enter with staggered lift and subtle scale pop, followed by instant interactive hover elevation.
9. **CTA Multi-Layered Scrubbed Parallax**:
   - Bottom-left culinary plate floats upwards (`y: 40 -> -30`, `rotate: -3 -> 4`) with smooth scroll scrub.
   - Top-right golden cutlery floats downwards (`y: -30 -> 30`, `rotate: 3 -> -4`).
   - Container has `overflow-hidden` so images clip seamlessly along the 50px rounded corners.
10. **Footer Wordmark Organic Wave**:
    - 5 giant repeated "PICKY" vector wordmarks slide up with an organic stagger wave (`0.06s` offset).

---

## 🚀 Key Functional Features

- 📅 **Interactive Catering Booking System**:
  - Full modal with event type selection (*Business*, *Wedding*, *Private Event*, *Gala Dinner*, *Cocktail Party*).
  - Target date picker, guest tier selector, dietary checkbox accommodations, and instant confirmation screen with unique reference IDs.
- 🍽️ **Interactive Seasonal Menu Viewer**:
  - Multi-category navigation (*Canapés*, *Entrées*, *Stations*, *Desserts*) and dietary filtering (*Gluten-Free*, *Vegetarian*, *Pescatarian*, *Halal*).
  - Multi-dish selection with "Inquire with Selected Dishes" direct handoff to the booking modal.
- 🖼️ **Fullscreen Photo Gallery Lightbox**:
  - High-resolution modal with previous/next slide navigation, keyboard controls (`Esc`, `←`, `→`), image counters, category labels, and thumbnail quick-jump bar.
- 📋 **Event Package Detail Inspector**:
  - Detailed package breakdown for each event category showing included services, chef sample courses, and starting rates.
- ⭐ **Live Review Submission Modal**:
  - Allows visitors to choose star ratings (1 to 5), input feedback, and immediately see their review appended to the page.
- 📜 **Legal Information Modals**:
  - Working popups for *Terms & Conditions*, *Privacy Policy*, and *Licenses & Health Certifications*.
- 📱 **Adaptive Mobile & Full-Width Viewport Experience**:
  - Full touch-swipe support on the dishes carousel and hero gallery, mobile navigation drawer, and fluid responsive typography.
  - **Full-Width Edge-to-Edge Sections**: Faithful to Figma (`width: 1440px`), the **Hero Showcase Gallery**, **Events We Serve** container, **Guest Favorite Dishes Carousel**, and the bottom **5 Giant Wordmarks Track** flow edge-to-edge without artificial container constraints.
  - **Centered Grid Sections**: The **Photo Gallery**, **Reviews**, **CTA Banner**, and **Legal Bar** maintain clean 1320px content alignment.

---

## 📁 Project Structure

```bash
picky/
├── app/
│   ├── favicon.svg       # Custom branded SVG favicon
│   ├── globals.css       # Tailwind v4 theme, custom keyframes & scrollbar
│   ├── icon.svg          # High-DPI Next.js app icon
│   ├── layout.tsx        # HTML shell, metadata, Google Fonts preconnect
│   └── page.tsx          # Root landing page orchestrating all sections
├── components/
│   ├── BookingModal.tsx  # Catering reservation inquiry dialog
│   ├── CtaBanner.tsx     # Yellow CTA card with dual parallax food assets
│   ├── EventsWeServe.tsx # 3 event cards + package detail modal
│   ├── FavoriteDishes.tsx# Dishes carousel with custom nav controls
│   ├── Footer.tsx        # Legal links, modals, 5 repeating wordmarks
│   ├── Hero.tsx          # Headline split reveal, rotating badge, gallery
│   ├── LightboxModal.tsx # Fullscreen photo gallery lightbox
│   ├── MenuModal.tsx     # Full multi-course catering menu browser
│   ├── Navbar.tsx        # Fixed blur header, navigation, mobile drawer
│   ├── PhotoGallery.tsx  # 7-column asymmetric photo gallery grid
│   ├── Reviews.tsx       # Arch-top review cards + review submission
│   └── Statement.tsx     # 4-line editorial brand statement
├── lib/
│   └── gsap.ts           # Client-safe GSAP & ScrollTrigger initializer
├── public/
│   ├── favicon.svg       # Branded vector icon
│   └── images/           # 27 downloaded high-res images & vector assets
└── package.json          # Dependencies & build scripts
```

---

## 💻 Tech Stack

- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org) with App Router
- **UI Library**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Animations**: [GSAP 3](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Icons**: [Lucide React](https://lucide.dev)
- **Language**: TypeScript 5
- **Package Manager**: pnpm

---

## 🛠️ Getting Started

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd picky
pnpm install
```

### 2. Run the Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
pnpm build
pnpm start
```

---

## 📄 License & Credits

- Designed with inspiration from the **Picky / Catered Plate** Figma concept.
- © 2026 Picky Catering. All rights reserved.
