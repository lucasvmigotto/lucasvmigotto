# Lucas Vidor Migotto — Portfolio

Senior Software Engineer & Cloud Architect personal portfolio website.

## Stack

- **Runtime:** Bun
- **Language:** TypeScript 5.x (strict, `noUncheckedIndexedAccess`)
- **UI:** React 19
- **Styling:** TailwindCSS v4
- **Build:** Vite 8
- **Linting:** Biome
- **i18n:** react-i18next + i18next (pt-BR, en)
- **Testing:** `bun test` + `@testing-library/react` + `@testing-library/dom` + `happy-dom`
- **PDF:** `@react-pdf/renderer` (client-side CV generation)

## Getting Started

```bash
bun install
bun run dev
```

Visit `http://localhost:5173`

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server |
| `bun run build` | Production build to `dist/` |
| `bun run preview` | Preview production build |
| `bun run lint` | Run Biome checks |
| `bun run lint:fix` | Auto-fix Biome issues |
| `bun run typecheck` | Run TypeScript compiler check |
| `bun run test` | Run unit/component tests (`bun test`) |

## Architecture

All content lives in `/public/locales/{locale}/` — no hardcoded strings in components.

- `resume.{locale}.json` — single source of truth for all portfolio content
- `translation.{locale}.json` — UI strings (labels, buttons, statuses)

### Directory Structure

```
src/
├── components/       # Section and UI components
│   └── ui/           # Atomic primitives (Button, Card, Pill, etc.)
│       └── icons/    # SVG icon components
├── hooks/            # Custom React hooks (scroll reveal, magnetic button, etc.)
├── lib/              # Utilities (i18n init, date formatting, class merge, experience helpers, pdf)
├── styles/           # Global CSS with design tokens and keyframes
├── test/             # Test config (happy-dom setup, in-memory i18n render helper)
└── types/            # TypeScript interfaces for resume and i18n
```

Test runner config lives in `bunfig.toml` (`[test] preload` wires the DOM + cleanup setup).

## Design System

Dark-field engineering aesthetic. Design tokens in `src/styles/globals.css`:

- Colors: custom properties + Tailwind `@theme` block
- Typography: Space Grotesk (headings), Inter (body)
- Spacing: 8px base grid
- Animations: CSS keyframes, `prefers-reduced-motion` guarded
- Mobile-first responsive breakpoints: 480px, 768px, 1024px, 1280px
