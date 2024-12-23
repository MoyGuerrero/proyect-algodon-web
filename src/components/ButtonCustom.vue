<template>
  <button :type="type" @click="$emit('click')" :class="type.includes('submit') ? 'bg-green-600 md:py-2 py-4 px-3 rounded-lg md:w-32 w-full text-sm text-white hover:bg-green-800 font-semibold' :
    'bg-blue-600 md:py-2 py-4 px-3 rounded-lg text-white md:w-32 text-sm hover:bg-blue-800 w-full font-semibold'">
    {{ text }}
  </button>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  type: 'submit' | 'button' | 'reset';
  text: string
}>(), {
  type: 'submit'
});

defineEmits(['click']);

</script>

<style scoped></style>
