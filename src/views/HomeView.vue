<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import HomeViewHorizontalScroll from '@/components/common/HomeViewHorizontalScroll.vue'
import { useImagePreloader, type ImageInfo } from '@/composables/image-preloader'
import { computed, onMounted, ref } from 'vue'

const imagesToPreload = [
  '/images/neue_header_2025q3.webp',
  '/images/links/bluesky.png',
  '/images/links/xwitter.png',
  '/images/links/pixiv.png',
  '/images/links/musescore.png',
  '/images/links/github.png',
  '/images/links/tumblr.png',
  '/images/links/cara.png',
]

const linkImageHrefs = [
  'https://bsky.app/profile/zenonsenn.bsky.social',
  'https://x.com/zenonsenn',
  'https://www.pixiv.net/en/users/91120744',
  'https://musescore.com/user/55091577',
  'https://github.com/zenonsenn',
  'https://www.tumblr.com/zenonsenn',
  'https://cara.app/zenonsenn',
]

const loadedImageUrls = ref<ImageInfo[]>([])
const isLoading = ref<boolean>(true)
const isError = ref<string | null>(null)
const scaleFactor = ref<number>(0.15)

const headerStyle = computed(() => {
  if (loadedImageUrls.value) {
    return { backgroundImage: `url('${loadedImageUrls.value[0].url}')` }
  }
  // Fallback
  return { backgroundColor: '#FF0000' }
})

const linkImageUrls = computed(() => {
  return loadedImageUrls.value.slice(1)
})

try {
  isLoading.value = true
  isError.value = null
  loadedImageUrls.value = await useImagePreloader(imagesToPreload)
} catch (error) {
  console.error('Failed to preload images:', error)
  isError.value = 'Failed to load the header image'
} finally {
  isLoading.value = false
}

const linkImageClass = computed(() => {
  const classes: string[] = []

  for (let i = 0; i < loadedImageUrls.value.length - 1; i++) {
    // Fix bottom margin for some images so that it's more tight
    if (i === 0) {
      classes.push('bg-contain bg-center bg-no-repeat -mb-3')
      continue
    }
    if (i === 4) {
      classes.push('bg-contain bg-center bg-no-repeat -mb-1')
      continue
    }
    classes.push('bg-contain bg-center bg-no-repeat')
  }

  return classes
})

onMounted(() => {
  const windowWidth = window.innerWidth

  if (windowWidth < 768) {
    scaleFactor.value = 0.1
  }
  if (768 <= windowWidth && windowWidth < 1024) {
    scaleFactor.value = 0.125
  }
})
</script>

<template>
  <div>
    <div class="flex h-full w-full bg-gao-white">
      <div class="relative flex h-screen w-full items-center justify-center">
        <div :style="headerStyle" class="absolute h-4/5 w-full bg-cover bg-center"></div>

        <div class="z-10 flex w-fit bg-white md:px-8 md:py-4">
          <div class="flex h-full w-full flex-col gap-y-3 p-4">
            <a
              v-for="(image, index) in linkImageUrls"
              :key="image.url"
              :style="{
                backgroundImage: `url('${image.url}')`,
                width: `${image.width * scaleFactor}px`,
                height: `${image.height * scaleFactor}px`,
              }"
              :class="
                linkImageClass[index] +
                ` transition-all duration-150 hover:scale-150 hover:cursor-pointer`
              "
              :href="linkImageHrefs[index]"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="relative h-screen">

      <HomeViewHorizontalScroll />
    </div> -->
  </div>
</template>
