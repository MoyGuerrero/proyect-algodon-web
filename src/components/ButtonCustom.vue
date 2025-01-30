<template>
  <button :type="type" @click="$emit('click')"
    class="md:py-2 py-4 px-3 rounded-lg md:w-32 w-full text-sm text-white font-semibold" :class="[bgColor, hover]">
    {{ text }}
    <slot name="icon" />
  </button>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  type: 'submit' | 'button' | 'reset';
  text: string,
  bgColor?: string,
  hover?: string,
  w?: string,
  h?: string,
  r?: string
}>(), {
  type: 'submit',
  bgColor: 'bg-green-600',
  hover: 'hover:bg-green-800',
});

defineEmits(['click']);

</script>

<style scoped></style>
