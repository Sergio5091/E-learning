<script setup>

import { useAlertesStore } from '@/store'

import { ref, onMounted, onUnmounted } from 'vue'

import { RouterLink } from 'vue-router'

const store = useAlertesStore()

const isDark = ref(false)

const isOpenSearch = ref(false) // pour la recherche

// Charger le thème initial depuis localStorage

onMounted(() => {

  if (localStorage.getItem("theme") === "dark") {

    document.documentElement.classList.add("dark")

    isDark.value = true

  }

})

// document.documentElement.classList.toggle(
//   "dark",
//   localStorage.theme === "dark" ||
//     (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
// );
// // Whenever the user explicitly chooses light mode
// localStorage.theme = "light";
// // Whenever the user explicitly chooses dark mode
// localStorage.theme = "dark";
// // Whenever the user explicitly chooses to respect the OS preference
// localStorage.removeItem("theme");

function toggleDarkMode() {

  

  isDark.value = !isDark.value

  if (isDark.value) {

   

    localStorage.setItem("theme", "dark")
  } else {

   

    localStorage.setItem("theme", "light")
  }
  document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),);

  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  );

}

// Raccourci clavier Ctrl+K pour ouvrir recherche

function search(e) {

  if ((e.ctrlKey || e.metaKey) && e.key === "k") {

    e.preventDefault()

    isOpenSearch.value = !isOpenSearch.value

  }

}

onMounted(() => {

  window.addEventListener("keydown", search)

})

onUnmounted(() => {

  window.removeEventListener("keydown", search)

})
</script>

<template>

  <nav
    class="flex items-center justify-between p-4 bg-white dark:bg-[#23272f] shadow-md sticky top-0 z-[100] border-b border-blue-100 dark:border-[#3a4152] transition-colors duration-300">
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <i class="fas fa-graduation-cap text-blue-500 dark:text-blue-500 text-2xl"></i>
      <span class="text-2xl font-extrabold text-blue-500 dark:text-blue-500">
        HighFive <span class="text-gray-800 dark:text-blue-100">Academy</span>
      </span>
    </div>

    <!-- Liens de navigation -->
    <div class="hidden md:flex space-x-6">
      <RouterLink to="/" class="text-gray-700 dark:text-blue-100 hover:text-blue-500 dark:hover:text-blue-300 border border-transparent dark:border-[#2c3140]">Accueil
      </RouterLink>
      <!-- <RouterLink to="/lessons/:id" class="hover:text-blue-500">Cours</RouterLink> -->
      <RouterLink to="/a-propos" class="text-gray-700 dark:text-blue-100 hover:text-blue-500 dark:hover:text-blue-300 border border-transparent dark:border-[#2c3140]">
        À propos</RouterLink>
      <RouterLink to="/admin" class="text-gray-700 dark:text-blue-100 hover:text-blue-500 dark:hover:text-blue-300 border border-transparent dark:border-[#2c3140]">
        Admin</RouterLink>
    </div>

    <!-- Zone droite : recherche, dark mode, profil -->
  <div class="flex items-center justify-end space-x-4 w-[400px]">

      <!-- Recherche -->
      <div class="flex items-center relative">
        <div v-if="isOpenSearch"
          class="flex items-center bg-blue-100 dark:bg-[#2c3140] rounded-full px-3 py-1 transition-colors duration-300">
          <input type="text" placeholder="Rechercher..."
            class="bg-transparent outline-none text-sm text-gray-700 dark:text-blue-100 placeholder-gray-400 dark:placeholder-gray-400 w-32 transition-colors duration-300" />
        </div>
        <button class="ml-2 text-gray-500 dark:text-blue-100 hover:text-blue-500 dark:hover:text-blue-300"
          @click="isOpenSearch = !isOpenSearch">
          <i class="fas fa-search transition-colors duration-300"></i>
        </button>
      </div>

      <!-- Dark mode toggle -->
      <button @click="toggleDarkMode"
        class="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-[#2c3140] text-gray-600 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-[#3a4152] transition-colors duration-300">
        <i v-if="!isDark" class="fas fa-sun"></i>
        <i v-else class="fas fa-moon"></i>
      </button>

      <!-- Menu Profil déroulant -->
      <div class="relative">
        <button @click="store.toggleMenu"
          class="flex items-center gap-2 p-2 rounded-full bg-blue-100 dark:bg-[#2c3140] hover:bg-blue-200 dark:hover:bg-[#3a4152] transition-colors duration-300">
          <div
            class="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-700 flex items-center justify-center text-white dark:text-blue-100">
            <i class="fas fa-user"></i>
          </div>
          <span class="hidden md:block text-gray-700 dark:text-blue-100">Profil</span>
        </button>

        <!-- Menu déroulant -->
        <div v-if="store.isOpen"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-[#23272f] border border-blue-100 dark:border-[#3a4152] rounded-lg shadow-lg transition-colors duration-300">
          <ul class="py-2">
            <li>
              <RouterLink to="/profil"
                class="block px-4 py-2 text-gray-700 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-[#3a4152]"
                @click="store.toggleMenu">
                Mon compte
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/parametres"
                class="block px-4 py-2 text-gray-700 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-[#3a4152]"
                @click="store.toggleMenu">
                Paramètres
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/logout"
                class="block px-4 py-2 text-gray-700 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-[#3a4152]"
                @click="store.toggleMenu">
                Déconnexion
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </nav>
</template>