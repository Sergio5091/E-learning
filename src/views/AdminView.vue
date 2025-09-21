<script setup>
import GestionCoursComponent from '@/components/GestionCoursComponent.vue';
import GestionQuizComponent from '@/components/GestionQuizComponent.vue'; // Ajoutez cette ligne
import { useAlertesStore } from '@/store';

const { courses } = useAlertesStore()
</script>

<template>
  <div class="bg-adminBg dark:bg-neutral-600 pb-[50px] pt-4 px-4 transition-colors duration-300">
    <h1 class="font-archivo text-[30px] font-extrabold py-[2] dark:text-blue-100">
      Bienvenue, Administrateur!
    </h1>
    <p class="w-[1056px] font-inter text-[16px] leading-[24px] font-normal text-para2Color dark:text-gray-300 ">
      Utilisez cette interface pour gérer le catalogue de cours et les quiz d'EduMaster.
    </p>
  </div>

  <div class="space-y-6 p-4">
    <GestionCoursComponent />
    <GestionQuizComponent /> <!-- Ajoutez cette ligne -->
  </div>
</template>
<style>
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
}
</style>

