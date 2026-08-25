# AmbientZero Web

> Open-source smart-home dashboard for monitoring ambient temperature data collected by IoT sensors.  
> Built with **Angular 21**, **TaigaUI** and **Apache ECharts** — fully zoneless, standalone, and SSR-ready.

---

## Quick-reference table

| Topic | Consumer | Contributor |
|---|---|---|
| Goal | Self-host the dashboard | Improve the platform |
| Prerequisites | Node ≥ 22, pnpm ≥ 11 | Same + Git |
| Install | `pnpm install` | `pnpm install` |
| Run locally | `pnpm start` | `pnpm start` |
| Run tests | `pnpm test` | `pnpm test` |
| Lint | — | `pnpm lint` |
| Build for production | `pnpm build` | `pnpm build` |
| API proxy target | `proxy.conf.json` | `proxy.conf.json` |

---

## About AmbientZero

**AmbientZero** is part of the [OpenHome Project](https://openhomeproject.com) — an open-source initiative to give homeowners full control over their home-automation data without relying on proprietary cloud services.

The web interface lets you:

- Visualise real-time and historical temperature readings per sensor.
- Manage sensor metadata (names, settings, etc.).
- Configure application preferences (timezone, temperature unit).
- Switch between light / dark / automatic themes.

The backend API is a separate .NET service; this repo is the SPA front-end only.

---

## For Consumers

Consumers download the built artefact and host it behind any static HTTP server (nginx, Caddy, Apache, etc.) alongside the AmbientZero backend.

### Prerequisites

| Tool | Minimum version |
|---|---|
| Node.js | 22 LTS |
| pnpm | 11 |

### Build for production

```bash
# Install dependencies
pnpm install

# Produce an optimised build
pnpm build
```

The output lands in `dist/open-home.ambient-zero.web/browser/`.  
Copy that directory's contents to the document root of your HTTP server.

### Configure the API proxy (development only)

The file `proxy.conf.json` routes `/api/*` to the backend. Edit the `target` to point at your AmbientZero API instance:

```json
{
  "/api": {
    "target": "https://<your-backend-host>",
    "secure": true,
    "changeOrigin": true
  }
}
```

> **Note:** `"secure": false` is provided for local development against a self-signed certificate only. Set it to `true` (or remove the key) in any environment that uses a valid TLS certificate.

### Environment variables

There are no runtime environment variables. API endpoints are resolved through the Angular HTTP client using relative paths, which are handled by your reverse-proxy / web-server configuration in production.

---

## For Contributors

Contributors fork the repo, make changes on a feature branch, and open a Pull Request.

### Getting started

```bash
# 1. Fork & clone
git clone https://github.com/<your-fork>/OpenHome.AmbientZero.Web.git
cd OpenHome.AmbientZero.Web

# 2. Install dependencies (exact versions, no range specifiers)
pnpm install

# 3. Start the dev server (proxies /api to localhost:7127 by default)
pnpm start
```

Open `http://localhost:4200` in your browser.

### Project structure

```
src/
├── app/
│   ├── app.config.ts          # Root providers (zoneless, router, HTTP, TaigaUI)
│   ├── app.routes.ts          # Lazy-loaded route tree
│   ├── core/
│   │   ├── interceptors/      # HTTP interceptors (loading)
│   │   └── services/          # App-wide services (loading state)
│   ├── features/
│   │   └── pages/             # Route-level components (chart, list, settings, layout)
│   └── shared/
│       ├── components/        # Reusable UI components
│       ├── interfaces/        # TypeScript interfaces for API DTOs
│       ├── models/            # Domain models
│       ├── resolvers/         # Route resolvers
│       └── services/          # Feature services (sensors, settings, theme, …)
└── styles.less                # Global styles
```

### Development commands

| Command | Description |
|---|---|
| `pnpm start` | Dev server at `http://localhost:4200` with API proxy |
| `pnpm build` | Production build |
| `pnpm test` | Unit tests via Vitest (Angular build runner) |
| `pnpm lint` | ESLint + Prettier checks |
| `pnpm watch` | Incremental dev build |

### Code conventions

- **Zoneless change detection** — all components use `ChangeDetectionStrategy.OnPush`. Avoid `markForCheck()` / `detectChanges()` in favour of signals and async pipe.
- **Standalone components only** — no NgModules.
- **Lazy loading** — every route uses `loadComponent` with a dynamic `import()`. Keep resolvers lightweight.
- **Styling** — LESS only (`.less`). No SCSS.
- **Signals** — prefer Angular signals (`signal`, `computed`, `toSignal`) over imperative subscriptions.
- **Exact dependency versions** — `package.json` uses pinned versions (no `^` or `~`).
- **Single quotes, 100-char print width** — enforced by Prettier (`.prettierrc`).

### Running and writing tests

Tests use **Vitest** via `@angular/build:unit-test`.

```bash
pnpm test
```

- Test files live next to the unit they test (`*.spec.ts`).
- Use `vi.spyOn` / `vi.fn()`.
- Use Angular `TestBed` for components, services, and resolvers.

### Linting

```bash
pnpm lint
```

ESLint (flat config, `eslint.config.mjs`) runs `typescript-eslint` + `@angular-eslint` + `prettier`. Fix auto-fixable issues with:

```bash
pnpm lint --fix
```

### Opening a Pull Request

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make your changes, keeping commits atomic and descriptive.
3. Ensure `pnpm test` and `pnpm lint` both pass.
4. Push and open a PR against `main`.
5. Fill in the PR description (what changed and why).

### Security

- Do **not** commit secrets, API keys, or credentials.
- Keep dependencies up-to-date; all versions are pinned — bump them intentionally via PR.

---

## License

[MIT](LICENSE.txt)
