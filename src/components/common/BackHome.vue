<script setup lang="ts">
const props = defineProps({
  class: String,
})
</script>

<template>
  <div>
    <router-link to="/"><button :class="props.class">Home</button></router-link>
  </div>
</template>
