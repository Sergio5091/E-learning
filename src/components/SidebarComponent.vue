<script>
import { RouterLink } from 'vue-router';

</script>

<template>
  <aside class="container w-64 min-h-screen bg-white dark:bg-[#23272f] shadow-md transition-colors duration-300 border-r border-blue-100 dark:border-[#3a4152]">
  <div class="flex flex-col h-full py-6">
      <!-- Accueil -->
      <div class="px-4 py-2">
        <RouterLink to="/" class="flex items-center px-3 py-2 text-gray-700 dark:text-blue-100 rounded-lg transition-colors hover:bg-blue-100 dark:hover:bg-[#3a4152] border border-transparent dark:border-[#2c3140]">
          <i class="fas fa-home w-5 h-5 mr-3"></i>
          Accueil
        </RouterLink>
      </div>

      <!-- Cours -->
      <div class="px-4 py-2">
        <RouterLink to="/lessons/:id" class="flex items-center px-3 py-2 text-gray-700 dark:text-blue-100 rounded-lg transition-colors hover:bg-blue-100 dark:hover:bg-[#3a4152] border border-transparent dark:border-[#2c3140]">
          <i class="fas fa-book w-5 h-5 mr-3"></i>
          Cours
        </RouterLink>
      </div>

      <!-- Espace pour séparateur visuel -->
  <div class="border-t border-blue-100 dark:border-[#3a4152] my-2 mx-4"></div>

      <!-- Profil Utilisateur -->
      <div class="px-4 py-2">
        <RouterLink to="/profil" class="flex items-center px-3 py-2 text-gray-700 dark:text-blue-100 rounded-lg transition-colors hover:bg-blue-100 dark:hover:bg-[#3a4152] border border-transparent dark:border-[#2c3140]">
          <i class="fas fa-user w-5 h-5 mr-3"></i>
          Profil Utilisateur
        </RouterLink>
      </div>

      <!-- Espace pour séparateur visuel -->
  <div class="border-t border-blue-100 dark:border-[#3a4152] my-2 mx-4"></div>

      <!-- GESTION -->
      <div class="px-4 py-2">
        <RouterLink to="" class="flex items-center px-3 py-2 text-gray-700 dark:text-blue-100 rounded-lg transition-colors hover:bg-blue-100 dark:hover:bg-[#3a4152] border border-transparent dark:border-[#2c3140]">
          <i class="fas fa-cog w-5 h-5 mr-3"></i>
          GESTION
        </RouterLink>
      </div>

      <!-- Administration -->
      <div class="px-4 py-2">
        <RouterLink to="" class="flex items-center px-3 py-2 text-gray-700 dark:text-blue-100 rounded-lg transition-colors hover:bg-blue-100 dark:hover:bg-[#3a4152] border border-transparent dark:border-[#2c3140]">
          <i class="fas fa-users-cog w-5 h-5 mr-3"></i>
          Administration
        </RouterLink>
      </div>
    </div>
  </aside>
</template>

<style scoped>
  .container {
    margin-top: 0.1rem;
    border-top: 1px solid rgba(128, 128, 128, 0.199);
    /* position: sticky;
    top: 80px; */
  }
  

</style>