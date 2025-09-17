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

function toggleDarkMode() {

  const html = document.documentElement

  isDark.value = !isDark.value

  if (isDark.value) {

    html.classList.add("dark")

    localStorage.setItem("theme", "dark")

  } else {

    html.classList.remove("dark")

    localStorage.setItem("theme", "light")

  }

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
  <nav class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0">
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <i class="fas fa-graduation-cap text-blue-500 text-2xl"></i>
      <span class="text-2xl font-extrabold text-blue-500">

        HighFive <span class="text-gray-800 dark:text-gray-100">Academy</span>
      </span>
    </div>

    <!-- Liens de navigation -->
    <div class="hidden md:flex space-x-6">
      <RouterLink to="/" class="hover:text-blue-500">Accueil</RouterLink>
      <!-- <RouterLink to="/lessons/:id" class="hover:text-blue-500">Cours</RouterLink> -->
      <RouterLink to="/a-propos" class="hover:text-blue-500">À propos</RouterLink>
      <RouterLink to="/admin" class="hover:text-blue-500">Admin</RouterLink>
    </div>

    <!-- Zone droite : recherche, dark mode, profil -->
    <div class="flex items-center justify-end space-x-4 w-[400px]">

      <!-- Recherche -->
      <div class="flex items-center relative">
        <div v-if="isOpenSearch"
          class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 transition-[0.3s]">
          <input type="text" placeholder="Rechercher..."
            class="bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 w-32 transition-[0.3s]" />
        </div>
        <button class="ml-2 text-gray-500 hover:text-blue-500" @click="isOpenSearch = !isOpenSearch">
          <i class="fas fa-search transition-[0.3s]"></i>
        </button>
      </div>

      <!-- Dark mode toggle -->
      <button @click="toggleDarkMode"
        class="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        <i v-if="!isDark" class="fas fa-sun"></i>
        <i v-else class="fas fa-moon"></i>
      </button>

      <!-- Menu Profil déroulant -->
      <div class="relative">
        <button @click="store.toggleMenu"
          class="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <i class="fas fa-user"></i>
          </div>
          <span class="hidden md:block text-gray-700 dark:text-gray-300">Profil</span>
        </button>

        <!-- Menu déroulant -->
        <div v-if="store.isOpen"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <ul class="py-2">
            <li>
              <RouterLink to="/profil" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="store.toggleMenu">

                Mon compte
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/parametres" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="store.toggleMenu">

                Paramètres
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/logout" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
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