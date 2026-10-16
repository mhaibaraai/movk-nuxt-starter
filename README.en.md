# Movk Nuxt Starter

[简体中文](./README.md) | English

[![Movk Nuxt](https://img.shields.io/badge/Made%20with-Movk%20Nuxt-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.mhaibaraai.cn)

A minimal starter template for [Nuxt 4](https://nuxt.com), [Nuxt UI](https://ui.nuxt.com) and [Movk Nuxt](https://nuxt.mhaibaraai.cn): theming, ESLint and type checking out of the box, deployable to Node, Docker or static hosting.

[Movk Nuxt Documentation](https://nuxt.mhaibaraai.cn) · [Nuxt UI Documentation](https://ui.nuxt.com)

## Quick Start

```bash
npm create nuxt@latest -- -t gh:mhaibaraai/movk-nuxt-starter
```

```bash
pnpm install
pnpm dev
```

You can also click [Use this template](https://github.com/new?template_name=movk-nuxt-starter&template_owner=mhaibaraai) on GitHub. To make it your own project, just update `name` and `description` in `package.json`; the page title and description follow automatically.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server (`http://localhost:3000`) |
| `pnpm build` | Build the SSR output to `.output` |
| `pnpm preview` | Preview the SSR build locally |
| `pnpm generate` | Build the static SPA output to `.output/public` |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run type checking |
| `pnpm clean` | Remove `node_modules`, `.nuxt`, `.output` and other artifacts |

## Deployment

| Target | Build | Run | Use case |
| --- | --- | --- | --- |
| Node | `pnpm build` | `node .output/server/index.mjs` | SSR and server API routes |
| Docker | `docker build` | `docker run` | Containerized deployment |
| Static hosting | `pnpm generate` | nginx or any static server | Frontend only, with a separate backend |

### Node

```bash
pnpm build
node .output/server/index.mjs
```

### Docker

```bash
docker build -t movk-nuxt-starter .
docker run -p 3000:3000 movk-nuxt-starter
```

The image processing dependency (sharp) in the image matches the build machine's architecture. When deploying to a server with a different architecture, specify it with `--platform`, e.g. `docker build --platform linux/amd64 -t movk-nuxt-starter .`.

### Static Hosting

1. Run `pnpm generate`.
2. Copy the contents of `.output/public` to your site directory.
3. Use the [`nginx.conf`](./nginx.conf) in this repository, which already provides:
   - long-term caching for hashed `/_nuxt/` assets, no caching for entry pages;
   - client-side route fallback to `200.html`, with a plain 404 for missing static assets;
   - gzip pre-compressed files generated at build time, served first.

> [!NOTE]
> Static hosting has no server: `server/` API routes, session auth and on-the-fly image processing are unavailable, and `NuxtImg` serves original images. Point your API at a separate backend via `movk.api.endpoints`.

### One-click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-name=movk-nuxt-starter&repository-url=https%3A%2F%2Fgithub.com%2Fmhaibaraai%2Fmovk-nuxt-starter)

## Sub-path Deployment

Set the base path with `NUXT_APP_BASE_URL` (ending with `/`, e.g. `/admin/`). The favicon and `NuxtImg` URLs pick up the prefix automatically.

| Target | When | Example |
| --- | --- | --- |
| Node | Runtime | `NUXT_APP_BASE_URL=/admin/ node .output/server/index.mjs` |
| Docker | Runtime, same image without rebuilding | `docker run -p 3000:3000 -e NUXT_APP_BASE_URL=/admin/ movk-nuxt-starter` |
| Static hosting | Build time | `NUXT_APP_BASE_URL=/admin/ pnpm generate` |

For static hosting, place the output under `admin/` in your site directory, then change the `location` prefixes in `nginx.conf` to `/admin/` and the fallback to `/admin/200.html`.

## Environment Variables

| Variable | Description |
| --- | --- |
| `NUXT_APP_BASE_URL` | Deployment base path, defaults to `/` |
| `NUXT_SESSION_PASSWORD` | Required only when `movk.api.auth` session auth is enabled, at least 32 characters |

## Renovate Integration

Install the [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository to keep dependencies up to date.

## License

[MIT](./LICENSE)
