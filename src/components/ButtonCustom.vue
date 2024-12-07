<template>
  <button :type="type" @click="$emit('click')"
    :class="type.includes('submit') ? 'dark:bg-green-600 md:py-2 py-4 px-3 rounded-lg md:w-32 w-full text-sm dark:text-white dark:hover:bg-green-800 font-semibold' :
      'dark:bg-blue-600 md:py-2 py-4 px-3 rounded-lg dark:text-white md:w-32 text-sm dark:hover:bg-blue-800 w-full font-semibold'">
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
