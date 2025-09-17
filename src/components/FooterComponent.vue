<script setup>

</script>

<template>
  <footer class="bg-white border-t py-6 z-[100] relative">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
      <!-- Menu -->
      <nav class="flex space-x-6 mb-4 md:mb-0">
        <RouterLink to="/" class="text-gray-700 hover:text-blue-600">Apprendre</RouterLink>
        <RouterLink to="" class="text-gray-700 hover:text-blue-600">Entreprise</RouterLink>
        <RouterLink to="" class="text-gray-700 hover:text-blue-600">Ressources</RouterLink>
      </nav>

      <!-- Réseaux sociaux -->
      <div class="flex space-x-5">
        <RouterLink to="" class="text-gray-500 hover:text-blue-600">
          <i class="fab fa-facebook-f"></i>
        </RouterLink>
        <RouterLink to="" class="text-gray-500 hover:text-blue-400">
          <i class="fab fa-twitter"></i>
        </RouterLink>
        <RouterLink to="" class="text-gray-500 hover:text-blue-700">
          <i class="fab fa-linkedin-in"></i>
        </RouterLink>
        <RouterLink to="" class="text-gray-500 hover:text-gray-900">
          <i class="fab fa-github"></i>
        </RouterLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
i {
  font-size: 1.2rem;
}
</style>


