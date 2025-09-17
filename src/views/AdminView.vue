<script setup>
import GestionCoursComponent from '@/components/GestionCoursComponent.vue';
import { useAlertesStore } from '@/store';
import { ref } from 'vue';
// const TabCourses = courses.value
// console.log(TabCourses.value);
const { courses } = useAlertesStore()

</script>

<template>
    <!-- <pre>{{   courses  }}</pre> -->
    
<div class="bg-adminBg rounded-[10px] pb-[50px] pt-4 px-4">
    <h1 class="font-archivo text-[30px] font-extrabold py-[2]">
        Bienvenue, Administrateur!
    </h1>
    <p class="w-[1056px] font-inter text-[16px] leading-[24px] font-normal text-para2Color ">
        Utilisez cette interface pour gérer le catalogue de cours d'EduMaster. Vous pouvez ajouter, <br/>modifier ou supprimer des cours en toute simplicité.
    </p>
</div>

    <div class="pb-[100px]">
        <GestionCoursComponent :tabCourses="courses"/>
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

e>
gi