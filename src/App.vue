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
          <component :is="Component"></component>

          <!-- Loading state -->
          <template #fallback>
            <!-- Loading icon -->
            <div class="bg-gao-white flex h-screen w-full items-center justify-center">
              <div class="animate-loading bg-zendle-orange h-12 w-12"></div>
            </div>
          </template>
        </Suspense>
      </KeepAlive>
    </template>
  </RouterView>
</template>
