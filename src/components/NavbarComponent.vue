<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

let isOpen = ref(false)
let isDark = ref(false)

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

// Raccourci clavier Ctrl+K
function search(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault()
    isOpen.value = !isOpen.value
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

    <!-- logo -->
    <div class="flex items-center space-x-2">
      <i class="fas fa-graduation-cap text-blue-500 text-2xl"></i>
      <span class="text-2xl font-extrabold text-blue-500">
        HighFive <span class="text-gray-800 dark:text-gray-100">Academy</span>
      </span>
    </div>

    <!-- navigation -->
    <div class="hidden md:flex space-x-6">
      <RouterLink to="/" class="hover:text-blue-500">Accueil</RouterLink>
      <RouterLink to="/lessons/:id" class="hover:text-blue-500">Cours</RouterLink>
      <RouterLink to="/a-propos" class="hover:text-blue-500">À propos</RouterLink>
      <RouterLink to="/admin" class="hover:text-blue-500">Admin</RouterLink>
    </div>

    <!-- recherche/profil/mode dark&light -->
    <div class="flex items-center justify-end space-x-4 w-[400px]">

      <!-- Recherche -->
      <div class="flex items-center relative">
        <div v-if="isOpen" class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 transition-[0.3s]">
          <input
            type="text"
            placeholder="Rechercher..."
            class="bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 w-32 transition-[0.3s]"
          >
        </div>
        <button class="ml-2 text-gray-500 hover:text-blue-500" @click="isOpen = !isOpen">
          <i class="fas fa-search transition-[0.3s]"></i>
        </button>
      </div>

      <!-- Mode dark/light -->
      <button @click="toggleDarkMode"
        class="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        <!-- Soleil si mode clair -->
        <i v-if="!isDark" class="fas fa-sun"></i>
        <!-- Lune si mode sombre -->
        <i v-else class="fas fa-moon"></i>
      </button>

      <!-- Profil -->
      <div class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <i class="fas fa-user"></i>
        </div>
        <span class="text-gray-700 dark:text-gray-300 text-sm">Profil</span>
      </div>
    </div>
  </nav>
</template>
