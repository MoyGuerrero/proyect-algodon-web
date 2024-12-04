<template>
  <div>
    <textarea :type="type" :value="modelValue" :placeholder="placeholder" :rows="rows"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value ?? '')" @blur="$emit('blur')"
      :class="['form-control resize-none', { 'border-red-500': error }]"></textarea>
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
  rows?: string
}>(), {
  type: 'text',
  rows: "5"
})


defineEmits(['update:modelValue', 'blur'])

</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
