<script>
export default {
  
  methods: {
    toggleDarkMode() {
      // Implémentez la logique de basculement du mode sombre/clair ici
      const html = document.documentElement;
      html.classList.toggle('dark');
    }
  }
}
</script>

<template>
  <nav class="container mx-auto px-4 py-3 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md rounded-lg">
    <!-- logo -->
    <div>
      <span class="text-2xl font-extrabold text-blue-400 tracking-wide">
        HighFive <span class="text-gray-800 dark:text-white">Academy</span>
      </span>
    </div>

    <!-- navigation -->
    <div class="flex space-x-6">
      <RouterLink class="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 py-2 px-3 rounded-md" 
                 :class="{ 'text-blue-500 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20': $route.path === '/' }">
        Accueil
      </RouterLink>
      <RouterLink class="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 py-2 px-3 rounded-md" 
                 :class="{ 'text-blue-500 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20': $route.path === '/cours' }">
        Cours
      </RouterLink>
      <RouterLink class="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 py-2 px-3 rounded-md" 
                 :class="{ 'text-blue-500 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20': $route.path === '/about' }">
        À propos
      </RouterLink>
    </div>

    <!-- recherche/profil/mode dark&light -->
    <div class="flex items-center space-x-4">
      <!-- Mode dark/light -->
      <div>
        <button @click="toggleDarkMode" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <i class="fas fa-moon hidden dark:block"></i>
        </button>
      </div>
      
      <!-- Recherche -->
      <div>
        <button class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <i class="fas fa-search"></i>
        </button>
      </div>
      
      <!-- Profil -->
      <div class="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full pl-1 pr-3 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
          <i class="fas fa-user"></i>
        </div>
        <span class="text-gray-700 dark:text-gray-300 text-sm">Profil</span>
      </div>
    </div>
  </nav>
</template>