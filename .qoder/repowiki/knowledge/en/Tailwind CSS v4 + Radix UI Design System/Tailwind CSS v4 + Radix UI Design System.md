---
kind: frontend_style
name: Tailwind CSS v4 + Radix UI Design System
category: frontend_style
scope:
    - '**'
source_files:
    - src/index.css
    - package.json
    - vite.config.ts
    - src/components/Sidebar.tsx
---

The frontend styling is built on **Tailwind CSS v4** with the new `@tailwindcss/vite` plugin and a single import-based stylesheet. The entire UI follows an atomic utility-first approach using Tailwind classes directly in JSX, with no custom CSS beyond the Tailwind import.

**Core styling stack:**
- **Tailwind CSS v4** (`tailwindcss@^4.1.14`, `@tailwindcss/vite@^4.1.14`) configured via Vite plugin
- **Radix UI primitives** (`@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-slot`) for accessible, unstyled component foundations
- **class-variance-authority (cva)** and **clsx/tailwind-merge** for conditional class composition patterns
- **Lucide React** icons throughout the interface
- **Framer Motion** (`motion` package) for animations

**Architecture & conventions:**
- Styling lives entirely in JSX via Tailwind utility classes — there are no component-specific CSS files
- Dark theme design system using slate color palette (`slate-900`, `slate-800`, `slate-700`) as base with indigo/emerald/purple/amber/cyan accent colors per feature section
- Consistent spacing scale using Tailwind's default spacing (p-3, p-4, gap-2, etc.)
- Responsive design through Tailwind's responsive prefixes and mobile-first approach
- Component state-driven styling via conditional className concatenation rather than CSS classes
- Gradient backgrounds and glass-morphism effects using Tailwind's gradient utilities
- Custom scrollbar styling via CSS custom properties

**Design tokens & theming:**
- Color system organized by functional areas: indigo (primary), emerald (success/actions), purple (AI features), amber (campaigns), cyan (SEO tools)
- Consistent border treatments with `border-slate-800/60` and subtle opacity borders
- Shadow system using Tailwind's shadow utilities with colored shadows (`shadow-indigo-500/30`, `shadow-emerald-600/20`)
- Typography hierarchy using Tailwind's font sizes and weights with consistent tracking and line-height

**Build configuration:**
- Vite config includes Tailwind plugin and React plugin
- Path alias `@` pointing to project root for imports
- HMR disabled in AI Studio environments via environment variables
- Single entry point CSS file (`src/index.css`) that only imports Tailwind