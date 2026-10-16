<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'

const appConfig = useAppConfig()
const { app } = useRuntimeConfig()
const { color, style } = useTheme()
const site = useSiteConfig()

useHead({
  title: site.name,
  meta: [{ key: 'theme-color', name: 'theme-color', content: color }],
  link: [{ rel: 'icon', href: `${app.baseURL}favicon.ico` }],
  htmlAttrs: { lang: 'zh-CN' },
  style
})

useSeoMeta({
  description: site.description
})
</script>

<template>
  <UApp :locale="zh_cn" :toaster="appConfig.toaster">
    <NuxtPage />
  </UApp>
</template>
