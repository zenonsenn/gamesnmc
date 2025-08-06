<script setup lang="ts">
import { onMounted, ref } from 'vue'
import moment from 'moment-timezone'
import MagazineCutout from '@/components/common/MagazineCutout.vue'

const isOpen = ref(false)
const timeRn = ref('')
const hoverLi = ref([false, false, false, false, false, false])

const liveTime = () => {
  timeRn.value = "it's " + moment().tz('Antarctica/Davis').format('LT') + ' for me'
}

onMounted(() => {
  liveTime()
  setInterval(liveTime, 60000)

  const hitBox = document.getElementById('hit-box')!
  const mainBar = document.getElementById('main-bar')!
  hitBox.addEventListener('mouseenter', () => {
    mainBar.classList.remove('opacity-0')
    mainBar.classList.add('opacity-100')
  })
  hitBox.addEventListener('mouseleave', () => {
    mainBar.classList.remove('opacity-100')
    mainBar.classList.add('opacity-0')
  })
  mainBar.addEventListener('mouseenter', () => {
    mainBar.classList.remove('opacity-0')
    mainBar.classList.add('opacity-100')
  })
  mainBar.addEventListener('mouseleave', () => {
    mainBar.classList.remove('opacity-100')
    mainBar.classList.add('opacity-0')
  })
})

const removeLi = (index: number) => {
  setTimeout(() => {
    hoverLi.value[index] = false
  }, 1000)
}
</script>

<template>
  <div
    class="sticky top-0 z-[100] flex w-full items-center justify-end font-anybody sm:text-xl md:text-2xl"
  >
    <!-- PC, laptop -->
    <div id="hit-box" class="absolute top-0 h-[20vh] w-[50%]"></div>
    <span class="material-symbols-outlined absolute top-8 right-8 text-black"> menu </span>
    <div
      id="main-bar"
      class="absolute top-4 right-4 hidden w-[800px] items-center justify-between gap-x-4 bg-white p-4 opacity-0 transition-opacity lg:flex"
    >
      <div class="font-inter text-xl">{{ timeRn }}</div>
      <div id="desktop-nav" class="flex flex-row gap-x-4 text-right">
        <div class="flex-shrink-0" @mouseenter="hoverLi[0] = true" @mouseleave="removeLi(0)">
          <router-link to="/">
            <template v-if="$route.path === '/'">home</template>
            <MagazineCutout v-else text="home" :hover="hoverLi[0]">home</MagazineCutout>
          </router-link>
        </div>
        <div @mouseenter="hoverLi[2] = true" @mouseleave="removeLi(2)">
          <router-link to="/gallery">
            <template v-if="$route.path === '/gallery'">gallery</template
            ><MagazineCutout v-else text="gallery" :hover="hoverLi[2]"
              >gallery</MagazineCutout
            ></router-link
          >
        </div>
        <!-- <div @mouseenter="hoverLi[5] = true" @mouseleave="removeLi(5)">
          <router-link to="/inspo">
            <template v-if="$route.path === '/inspo'">inspo</template
            ><MagazineCutout v-else text="inspo" :hover="hoverLi[5]"
              >inspo</MagazineCutout
            ></router-link
          >
        </div> -->
      </div>
    </div>

    <!-- Tablet, phone -->
    <div
      class="xs:w-fit xs:rounded-bl-2xl flex w-full flex-row justify-between gap-x-4 bg-gao-white p-4 lg:hidden"
      :class="[isOpen ? 'absolute top-0 opacity-80' : 'absolute top-0']"
    >
      <div v-if="!isOpen" class="font-inter text-base sm:text-lg">{{ timeRn }}</div>
      <button @click="isOpen = !isOpen" :class="[isOpen ? 'hidden' : 'flex items-end']">
        <span class="material-symbols-outlined"> menu </span>
      </button>
      <ul
        :class="[isOpen ? 'flex flex-col rounded-bl-2xl bg-gao-white p-4 text-right' : 'hidden']"
        class="gap-y-4"
      >
        <button @click="isOpen = !isOpen" :class="[isOpen ? 'flex justify-end' : 'hidden']">
          <span class="material-symbols-outlined"> arrow_forward </span>
        </button>
        <div class="flex flex-col">
          <router-link to="/">home</router-link>
          <router-link to="/gallery">gallery</router-link>
          <!-- <router-link to="/inspo">inspo</router-link> -->
        </div>
        <div v-if="isOpen" class="font-inter text-base sm:text-lg">{{ timeRn }}</div>
      </ul>
    </div>
  </div>
</template>
