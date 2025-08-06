<script setup lang="ts">
import NavBar from '@/components/common/NavBar.vue'
</script>

<template>
  <NavBar v-if="$route.name !== 'lost'" />
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <KeepAlive>
        <Suspense>
          <!-- Main content -->
          <Transition name="fade" mode="out-in">
            <component :is="Component"></component
          ></Transition>

          <!-- Loading state -->
          <template #fallback>
            <!-- Loading icon -->
            <div class="flex h-screen w-full items-center justify-center bg-gao-white">
              <div class="h-12 w-12 animate-loading bg-zendle-orange"></div>
            </div>
          </template>
        </Suspense>
      </KeepAlive>
    </template>
  </RouterView>
</template>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 400ms,
    transform 400ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  /* transform: translateY(-1%); */
}
</style>
