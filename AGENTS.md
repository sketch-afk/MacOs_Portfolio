# AGENTS.md

## Commands
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — ESLint check (`eslint .`)
- No test framework installed; no typecheck script

## Vite path aliases
- `#*` → `src/*` (desktop): `#components`, `#constants`, `#store`, `#windows`, `#hooks`, `#hoc`
- `@*` → `src/mobile/*` (mobile): `@components`, `@constants`, `@store`, `@apps`, `@hoc`
- Also declared in `jsconfig.json` for editor intellisense

## Architecture
- **Dual app**: `src/App.jsx` lazy-loads `DesktopApp` or `MobileApp` based on `useIsMobile` hook (768px breakpoint from `src/constants/index.js:1`)
- **Desktop**: `src/DesktopApp.jsx` renders Navbar, Welcome, Dock, Home + 12 macOS-style window components
- **Mobile**: `src/MobileApp.jsx` renders mobile-specific variants (NavbarMob, WelcomeMob, DockMob, Terminalmob, ControlMob, LaunchpadMob, WeatherMob)
- **State**: Zustand stores in `src/store/` — `window.js` (window open/close/minimize/maximize/focus with z-index management) and `location.js` (Finder sidebar navigation). Both use `immer` middleware.
- **GSAP**: `Draggable` plugin registered in `App.jsx:8`. Used for window dragging.
- **Dark mode**: `next-themes` via `<ThemeProvider>` wrapping `<App>` in `main.jsx` with `class` strategy. CSS uses `.dark *` variant via `@custom-variant dark`.
- **Barrel exports**: `src/components/index.js` and `src/windows/index.js` re-export all components/windows.
- **CSS**: Tailwind CSS v4 (`@import "tailwindcss"`) with no `tailwind.config.js`. Custom theme tokens via `@theme {}`, custom utilities via `@utility`, custom variant via `@custom-variant`.
- **Env**: `VITE_WEATHER_API_KEY` must be set in `.env.local` for Weather window to work.
- **Boot sequence**: `BootScreen` component plays before desktop appears; `App` state `isBooted` controls transition.
