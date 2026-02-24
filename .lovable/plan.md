# Harsha Vardhan NJ — Premium Animated Portfolio

## Overview

A visually stunning, award-winning-level portfolio website with immersive animations, smooth scroll interactions, and a polished light purple / dark theme. All content is driven dynamically from your JSON data file — no hardcoded content.

---

## 🎨 Theme & Design System

- **Light mode**: Off-white background (#f9f9f9), light purple accent (#D3B0FF), dark text, glassmorphism cards with soft shadows
- **Dark mode**: Deep gray (#121212), purple accents, light text, subtle glow effects
- **Smooth animated toggle** in the header with Framer Motion transitions between modes
- Creative typography pairing (sans-serif headings + clean body font)
- Asymmetric layouts, floating gradient blobs, and particle-like background elements

---

## 📄 Sections

### 1. Loading Screen

- Animated intro with your name/initials morphing into view
- Smooth reveal transition into the main site

### 2. Hero Section

- Your name with staggered letter animation
- Rotating titles ("Software Engineer", "Full Stack Developer", etc.) with typewriter/morph effect
- Short intro text fading in
- Animated CTA buttons (View Projects, Contact Me) with magnetic hover effect
- Floating animated gradient blobs and decorative elements in the background

### 3. About Section

- Creative asymmetric layout with your bio text
- Animated stat counters (3+ years, 15+ projects, 15+ clients, ∞ coffee)
- Roles displayed as animated cards with hover effects
- Scroll-triggered entrance animations

### 4. Skills Section

- Technical skills grouped by category (Languages, Frameworks, APIs, Platforms, Databases, AI, Messaging)
- Animated skill tags/chips with staggered entrance
- Hover glow/lift effects
- Driven from the `technical_skills` object in your JSON

### 5. Projects Section

- Filterable by project type (Full Stack, Mobile App, Backend)
- Animated project cards with glassmorphism styling
- Click opens an **animated modal** with full project details, tech stack, and links
- Staggered card entrance on scroll

### 6. Experience Section

- Creative vertical timeline with animated connectors
- Each entry animates in on scroll with slide + fade
- Company, role, period, location, and achievement bullets
- Visual indicator for current position

### 7. Education Section

- Compact timeline-style display for your degrees
- Scroll-triggered animations

### 8. Contact Section

- Animated form with micro-interactions on focus/type
- Fields: Name, Email, Message with Zod validation
- **Email sending** via an edge function (e.g., Resend or EmailJS integration)
- Smooth submit button animation and success/error feedback
- Your contact links (email, LinkedIn, GitHub, phone) displayed alongside

### 9. Footer

- Social links (LinkedIn, GitHub, Email) with animated hover effects
- Smooth scroll-to-top button
- Copyright with your name

---

## 🎬 Animations & Interactions

- **Framer Motion** for component transitions, page entrance, modal animations, and staggered reveals
- **CSS/Tailwind animations** for background blobs, floating elements, and parallax-like scroll effects
- Smooth scroll with scroll-triggered section reveals
- Magnetic button hover effects
- Interactive card hover (lift, glow, tilt)
- Dark/light mode transition animation

---

## ⚙️ Technical Approach

- All data loaded from a central JSON file — fully dynamic and reusable components
- Dark mode via Tailwind's `dark` class with next-themes
- Framer Motion for all animation needs
- Contact form sends real emails via a Supabase Edge Function
- Clean component structure: `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Education`, `Contact`, `Footer`, `LoadingScreen`, `ThemeToggle`
- Responsive across mobile, tablet, and desktop
- SEO-friendly meta tags and accessible markup