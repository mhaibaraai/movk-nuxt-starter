<script setup lang="ts">
const site = useSiteConfig()
</script>

<template>
  <UPageHero
    :title="site.name"
    :description="site.description"
    :links="[{
      label: '开始使用',
      to: 'https://nuxt.mhaibaraai.cn/docs/getting-started',
      target: '_blank',
      trailingIcon: 'i-lucide-arrow-right',
      size: 'xl'
    }, {
      label: 'GitHub',
      to: 'https://github.com/mhaibaraai/movk-nuxt-starter',
      target: '_blank',
      icon: 'i-simple-icons-github',
      size: 'xl',
      color: 'neutral',
      variant: 'subtle'
    }]"
  >
    <template #headline>
      <UIcon name="i-custom-nuxt" class="size-16 text-primary" />
    </template>

    <NuxtImg
      src="/nuxt.png"
      alt="Nuxt"
      width="256"
      height="256"
      format="webp"
      class="mx-auto size-32"
    />
  </UPageHero>
</template>
