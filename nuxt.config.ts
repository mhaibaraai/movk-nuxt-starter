// https://nuxt.com/docs/api/configuration/nuxt-config
import { startCase } from '@movk/core'
import pkg from './package.json'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@movk/nuxt'
  ],

  $env: {
    spa: {
      ssr: false,
      nitro: {
        compressPublicAssets: true
      },
      image: {
        provider: 'none',
        alias: { '/': process.env.NUXT_APP_BASE_URL || '/' }
      }
    }
  },

  devtools: {
    enabled: true
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/'
  },

  css: ['~/assets/css/main.css'],

  site: {
    name: startCase(pkg.name)
  },

  ui: {
    experimental: {
      componentDetection: true
    }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    customCollections: [
      { prefix: 'custom', dir: './app/assets/icons' }
    ],
    clientBundle: {
      scan: { globInclude: ['**/*.{vue,ts}'] }
    }
  },

  image: {
    quality: 80
  }
})
