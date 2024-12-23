<template>
  <div :class="{ 'hidden': !props.open }">
    <div id="default-modal" tabindex="-1"
      class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <slot name="header" />
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
            <slot name="body" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="props.open" class="fixed top-0 left-0 z-10 bg-black opacity-40 w-screen h-screen"></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean;
}>();

</script>

<style scoped></style>
