# Glassmorphism Landing System

Use this skill when designing or rebuilding product landing pages that should feel premium, minimalist, and glassmorphic while still being practical to implement in React and Tailwind.

## Core direction

- Use a strong first fold with a real hero visual or dashboard-style mockup.
- Combine minimalism with glassmorphism: translucent surfaces, soft borders, blur, layered gradients, restrained shadows.
- Keep layouts clean and premium, not crowded or neon-heavy.
- Preserve the real auth and navigation flow already present in the app.
- Make the three sites feel related in quality, not duplicated in structure.

## Shared visual rules

- Use 2 or 3 dominant colors plus white translucent layers.
- Prefer `bg-white/10` to `bg-white/20`, subtle white borders, and `backdrop-blur-xl` or stronger.
- Keep typography crisp and upscale with short headings and compact supporting copy.
- Use one primary CTA and one secondary CTA in the hero.
- Keep motion subtle: fades, slow float, soft glow, simple stagger.
- Design for mobile and desktop from the start.

## Hero requirements

Every landing page should include:

- one clear value proposition headline
- one concise supporting paragraph
- one primary CTA tied to the real user flow
- one secondary CTA
- one visual that resembles the product experience
- one compact proof strip, stats row, or trust chips area

## Product-specific page briefs

### Tutor App

Audience: tutors and coaching operators.

Promise: manage day-to-day tutoring operations from one dashboard.

Recommended sections:

1. Hero with dashboard preview
2. Stats or trust strip
3. Feature grid for students, attendance, fees, performance
4. Workflow section showing capture, monitor, report
5. Testimonial or operator quote
6. CTA banner

Palette:

- sapphire
- cyan
- soft teal

### Parent Dashboard

Audience: parents viewing student progress.

Promise: understand the child's learning progress clearly and quickly.

Recommended sections:

1. Hero with mobile or report preview
2. Reassurance row for attendance, fees, performance
3. What-you-can-see card section
4. Timeline or recent progress snapshot
5. Secure report access section
6. CTA banner

Palette:

- sky blue
- aqua
- small warm coral accents

### Admin App

Audience: operators or owners overseeing tutors and reporting.

Promise: see the whole tutoring business from one control layer.

Recommended sections:

1. Hero with control-center dashboard preview
2. KPI strip
3. Capabilities section for teacher management, reports, settings
4. Monitoring or oversight section
5. System workflow overview
6. Admin CTA banner

Palette:

- indigo
- steel blue
- emerald or teal accents

## Implementation notes

- Check the current `Landing.jsx`, `index.css`, and auth modal pattern before editing.
- Reuse Lucide icons already in the app where possible.
- Add landing-specific CSS utilities in the app `src/index.css` if needed.
- Keep code straightforward. Avoid unnecessary abstractions for a single page.
- Do not clone the same section order across all three apps.

