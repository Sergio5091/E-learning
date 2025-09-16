<script setup>
import { ref } from 'vue';

let showInput = ref(false)

function toggleInput() {
  showInput.value = !showInput.value
  console.log("gvju")
}


// function toggleDarkMode() {
//   const html = document.documentElement;
//   html.classList.toggle('dark');
// }

</script>

<template>
  <nav class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">

    <!-- logo -->
    <div class="flex items-center space-x-2">
      <i class="fas fa-graduation-cap text-blue-500 text-2xl"></i>
      <span class="text-2xl font-extrabold text-blue-500">
        HighFive <span class="text-gray-800 dark:text-gray-100">Academy</span>
      </span>
    </div>

    <!-- navigation -->
    <div class="hidden md:flex space-x-6">
      <RouterLink to="" class="hover:text-blue-500">
        Accueil
      </RouterLink>
      <RouterLink to="" class="hover:text-blue-500">
        Cours
      </RouterLink>
      <RouterLink to="" class="hover:text-blue-500">
        À propos
      </RouterLink>
    </div>

    <!-- recherche/profil/mode dark&light -->
    <div class="flex items-center space-x-4">
      <!-- Mode dark/light -->
      <button class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
>
        <i class="fas fa-moon dark:hidden"></i>
        <!-- <i class="fas fa-sun hidden dark:inline"></i> -->
      </button>

      <!-- Recherche -->
      <div class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        <input v-if="showInput === true" type="text" class="border"> 
        <button class="hover:text-blue-500" @click="toggleInput">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <!-- Profil -->
      <div class="w-18 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
          <i class="fas fa-user"></i>
        </div>
        <span class="text-gray-700 dark:text-gray-300 text-sm">Profil</span>
      </div>
    </div>
  </nav>
</template>