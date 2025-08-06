<script setup lang="ts">
const props = defineProps({
  text: String,
  hover: Boolean,
})

// Exclusive to the 'Anybody' font
const weights = ['300', '400', '500', '600', '700']
const widths = ['fw-90', 'fw-100', 'fw-110', 'fw-120', 'fw-130', 'fw-140', 'fw-150']

function getRandomInt(max: number) {
  // max value is exclusive
  return Math.floor(Math.random() * max)
}

const randomiseClass = () => {
  // Weight, width
  const weight = 'font-[' + weights[getRandomInt(weights.length)] + ']'
  const width = widths[getRandomInt(getRandomInt(widths.length))]

  if (props.hover) {
    return `${weight} ${width}`
  } else {
    return ''
  }
}
</script>

<template>
  <div class="font-anybody flex flex-row text-center">
    <p
      v-for="char in props.text"
      :key="char"
      :class="randomiseClass()"
      class="linear inline-block transition-all duration-200"
    >
      {{ char }}
    </p>
  </div>
</template>
