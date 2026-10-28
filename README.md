# Movk Nuxt Starter

简体中文 | [English](./README.en.md)

[![Movk Nuxt](https://img.shields.io/badge/Made%20with-Movk%20Nuxt-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.mhaibaraai.cn)

基于 [Nuxt 4](https://nuxt.com)、[Nuxt UI](https://ui.nuxt.com) 与 [Movk Nuxt](https://nuxt.mhaibaraai.cn) 的最简启动模版：开箱即用的主题、ESLint 与类型检查，支持 Node、Docker 与静态托管三种部署方式。

[在线预览](https://movk-nuxt-starter.vercel.app) · [Movk Nuxt 文档](https://nuxt.mhaibaraai.cn) · [Nuxt UI 文档](https://ui.nuxt.com)

## 快速开始

```bash
npm create nuxt@latest -- -t gh:mhaibaraai/movk-nuxt-starter
```

```bash
pnpm install
pnpm dev
```

也可以在 GitHub 上点击 [Use this template](https://github.com/new?template_name=movk-nuxt-starter&template_owner=mhaibaraai) 创建仓库。替换为自己的项目时，只需修改 `package.json` 的 `name` 与 `description`，页面标题与描述会随之更新。

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动开发服务器（`http://localhost:3000`） |
| `pnpm build` | 构建 SSR 产物至 `.output` |
| `pnpm preview` | 本地预览 SSR 构建 |
| `pnpm generate` | 构建 SPA 静态产物至 `.output/public` |
| `pnpm lint` | ESLint 检查 |
| `pnpm typecheck` | 类型检查 |
| `pnpm clean` | 清理 `node_modules`、`.nuxt`、`.output` 等产物 |

## 部署

| 方式 | 构建 | 运行 | 适用场景 |
| --- | --- | --- | --- |
| Node | `pnpm build` | `node .output/server/index.mjs` | 需要 SSR 与服务端接口 |
| Docker | `docker build` | `docker run` | 容器化部署 |
| 静态托管 | `pnpm generate` | nginx 等静态服务器 | 纯前端，对接独立后端 |

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

镜像中的图片处理依赖（sharp）与构建机架构一致，部署到不同架构的服务器时，请通过 `--platform` 指定目标架构，如 `docker build --platform linux/amd64 -t movk-nuxt-starter .`。

#### 多环境

镜像只构建一次，不同环境在运行时通过 `--env-file` 注入变量，无需重新构建。仓库提供 [`.env.production`](./.env.production) 作为演示：

```bash
pnpm docker:build
pnpm docker:prod
```

其他环境可复制 `.env.production` 为 `.env.staging` 等（默认被 git 忽略），再执行 `docker run -p 3000:3000 --env-file .env.staging movk-nuxt-starter`。

变量名为 `NUXT_` 加 `runtimeConfig` 路径的大写下划线形式，如 `runtimeConfig.public.movkApi.endpoints.default.baseURL` 对应 `NUXT_PUBLIC_MOVK_API_ENDPOINTS_DEFAULT_BASE_URL`，仅对已在 `runtimeConfig`（或 `movk.api`）中声明的键生效。真实密钥请在部署环境中注入，不要提交到仓库。

### 静态托管

1. 执行 `pnpm generate`。
2. 将 `.output/public` 中的内容放到站点目录。
3. 使用仓库中的 [`nginx.conf`](./nginx.conf)，它已包含：
   - 带哈希的 `/_nuxt/` 资源长期缓存，入口页不缓存；
   - 前端路由回退到 `200.html`，缺失的静态资源直接返回 404；
   - 优先发送构建时生成的 gzip 预压缩文件。

> [!NOTE]
> 静态托管没有服务端：`server/` 接口、会话认证与图片实时处理均不可用，`NuxtImg` 直接输出原图。接口请通过 `movk.api.endpoints` 指向独立后端。

### 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-name=movk-nuxt-starter&repository-url=https%3A%2F%2Fgithub.com%2Fmhaibaraai%2Fmovk-nuxt-starter&demo-url=https%3A%2F%2Fmovk-nuxt-starter.vercel.app%2F&demo-title=Movk%20Nuxt%20Starter&demo-description=A%20minimal%20starter%20template%20for%20Nuxt%204%2C%20Nuxt%20UI%20and%20Movk%20Nuxt.)

## 子路径部署

通过 `NUXT_APP_BASE_URL` 设置基础路径（以 `/` 结尾，如 `/admin/`），favicon 与 `NuxtImg` 的图片地址会自动带上前缀。

| 方式 | 设置时机 | 示例 |
| --- | --- | --- |
| Node | 运行时 | `NUXT_APP_BASE_URL=/admin/ node .output/server/index.mjs` |
| Docker | 运行时，同一镜像无需重新构建 | `docker run -p 3000:3000 -e NUXT_APP_BASE_URL=/admin/ movk-nuxt-starter` |
| 静态托管 | 构建时 | `NUXT_APP_BASE_URL=/admin/ pnpm generate` |

静态托管时，将产物放到站点目录的 `admin/` 下，并把 `nginx.conf` 中的 `location` 前缀改为 `/admin/`、回退地址改为 `/admin/200.html`。

## 环境变量

| 变量 | 说明 |
| --- | --- |
| `NUXT_APP_BASE_URL` | 部署基础路径，默认 `/` |
| `NUXT_PUBLIC_MOVK_API_ENDPOINTS_DEFAULT_BASE_URL` | 默认接口地址，默认 `/api` |
| `NUXT_SESSION_PASSWORD` | 仅在开启 `movk.api.auth` 会话认证时必填，至少 32 个字符 |

## Renovate 集成

在仓库中安装 [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) 即可自动更新依赖。

## 许可证

[MIT](./LICENSE)
