<template>
  <button :type="type" :class="type.includes('submit') ? 'dark:bg-green-600 md:py-2 py-4 px-3 rounded-xl dark:text-white dark:hover:bg-green-800 w-full font-semibold' :
    'dark:bg-blue-600 md:py-2 py-4 px-3 rounded-xl dark:text-white dark:hover:bg-blue-800 w-full font-semibold'">
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
