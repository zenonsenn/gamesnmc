<script setup lang="ts">
import HomeViewHorizontalScroll from '@/components/HomeViewHorizontalScroll.vue'
import { useImagePreloader } from '@/composables/image-preloader'
import { computed, ref } from 'vue'

const imagesToPreload = ['/images/header.webp']
const isLoading = ref<boolean>(false)
const isError = ref<string | null>(null)

const loadedImages = await useImagePreloader(imagesToPreload, isLoading, isError)

const headerStyle = computed(() => {
  const imageUrl = '/images/header.webp'
  if (loadedImages.has(imageUrl)) {
    return { backgroundImage: `url('${imageUrl}')` }
  }
  return {}
})
</script>

<template>
  <div>
    <div class="relative h-screen">
      <div :style="headerStyle" class="absolute bottom-0 h-4/5 w-full bg-cover bg-center"></div>

      <HomeViewHorizontalScroll />
    </div>
  </div>
</template>
