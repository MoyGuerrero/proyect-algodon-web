<template>
  <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar"
    aria-controls="sidebar-multi-level-sidebar" type="button" @click="isVisibleAside = false"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-blue-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
      </path>
    </svg>
  </button>

  <aside id="sidebar-multi-level-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-full transition-transform sm:translate-x-0 flex flex-col justify-between"
    :class="{ '-translate-x-full': isVisibleAside }" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-600">
      <div class="mb-5 sm:hidden block">
        <h5 id="drawer-navigation-label" class="text-base font-semibold text-white uppercase dark:text-gray-400">Menu
        </h5>
        <button type="button" @click="isVisibleAside = true" data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
      </div>
      <div class="mb-5 block">
        <span class="block text-white text-sm font-bold mb-2">Usuario</span>
        <label class="block text-sm text-white font-bold mb-2">{{ authStore.username }}</label>
      </div>

      <ul class="space-y-2 font-medium">
        <template v-for="menu in menus" :key="menu.id">
          <template v-if="menu.subpath && menu.subpath.length > 0">
            <button type="button" @click="openOptions(menu.id)"
              class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
              <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{{ menu.name }}</span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <ul :id="'dropdown-example-' + menu.id" class="hidden py-2 space-y-2">
              <li v-for="children in menu.subpath" :key="children.id">
                <template v-if="children.children && children.children?.length > 0">
                  <button id="doubleDropdownButton" @click="openOptions2(children.id)"
                    data-dropdown-toggle="doubleDropdown" data-dropdown-placement="right-start" type="button"
                    class="flex items-center justify-between w-full text-white px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-white">{{
                      children.name }}<svg class="w-2.5 h-2.5 ms-3 rtl:rotate-180" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 9 4-4-4-4" />
                    </svg></button>

                  <div id="doubleDropdown"
                    class="z-10 sticky top-0 left-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul :id="'hijos_' + children.id" class="py-2 hidden text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="doubleDropdownButton">
                      <li v-for="hijos in children.children" :key="hijos.id">
                        <a href="#"
                          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{
                            hijos.name }}</a>
                      </li>
                    </ul>
                  </div>
                </template>
                <template v-else>
                  <RouterLink :to="{ name: children.path }" @click="isVisibleAside = true"
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    {{
                      children.name }}</RouterLink>

                </template>
              </li>
            </ul>
          </template>
        </template>
      </ul>
    </div>
    <div class="p-4 bg-gray-200 dark:bg-gray-600">
      <button type="button" @click="authStore.onLogout()"
        class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
        </svg>
        <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Cerrar sesión</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/module/auth/stores/auth.stores';
import { useSideBar } from '../composables/useSideBar';
const authStore = useAuthStore();

const { menus, isVisibleAside, openOptions, openOptions2 } = useSideBar();
</script>

<style scoped></style>
