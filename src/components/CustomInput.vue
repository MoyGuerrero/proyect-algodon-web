<template>
  <div>
    <input :type="type" :value="modelValue" :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value ?? '')" @blur="$emit('blur')"
      :class="['form-control', { 'border-red-500': error }]">
    <span class="text-red-400" v-if="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
  modelValue?: string | number;
  type?: 'text' | 'email' | 'number';
  placeholder?: string;
  title?: string;
  error?: string;
}>(), {
  type: 'text'
})


defineEmits(['update:modelValue', 'blur'])

</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
