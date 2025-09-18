<script setup>
import { useAlertesStore } from '@/store';
import { computed } from 'vue';

const props = defineProps({
    tabCourses: Array
})
const emit = defineEmits(['show-details'])


const store = useAlertesStore()
const filteredCourses = computed(() => {
    if (!store.searchTerm) return store.courses

    return store.courses.filter(course =>
        course.title.toLowerCase().includes(store.searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(store.searchTerm.toLowerCase()) ||
        course.level.toLowerCase().includes(store.searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(store.searchTerm.toLowerCase())
    )
})

</script>


<template>
    <!-- <div class="grid grid-cols-1 "> -->

    <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full" v-if="filteredCourses.length > 0">
            <div v-for="cours in filteredCourses" :key="cours.id"
                class="rounded-lg shadow-sm hover:shadow-md transition w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
                <!-- Image -->
                <img :src="cours.thumbnail" alt="Image cours"
                    class="rounded-lg object-cover w-full h-48 sm:h-56 md:h-64 lg:h-72 max-w-full" />

                <div class="p-4 space-y-2">
                    <!-- Badge catégorie -->
                    <span
                        class="inline-block bg-pink-200 dark:bg-pink-700 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {{ cours.category }}
                    </span>

                    <!-- Titre -->
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-blue-100">{{ cours.title }}</h3>

                    <!-- Niveau -->
                    <p class="text-sm text-gray-600 dark:text-gray-300"><span class="font-semibold">Niveau :</span> {{
                        cours.level }}</p>

                    <!-- Auteur -->
                    <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Auteur :</span> {{
                        cours.instructor }}
                    </p>

                    <!-- Bouton détails -->
                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-5">
                        <button @click="emit('show-details', cours.id)" type="button"
                            class="mt-3 text-center border border-blue-500 dark:border-pink-700 text-indigo-600 dark:text-pink-300 rounded-md p-2 text-sm font-medium hover:bg-pink-200 dark:hover:bg-pink-700 hover:border-pink-200 dark:hover:border-pink-700 hover:text-white transition">
                            Détails du cours
                        </button>
                        <router-link :to="`/lessons/${cours.id}`"
                            class="mt-3 text-center border border-indigo-600 dark:border-blue-400 text-indigo-600 dark:text-blue-300 rounded-md p-2 text-sm font-medium hover:bg-blue-500 dark:hover:bg-blue-400 hover:text-white transition">
                            Commencer
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-else
            class="flex justify-center items-center h-64 text-center text-2xl font-bold text-gray-700 dark:text-gray-300 w-[100%]">
            Aucun cours trouvé
        </div>
    </div>
    <!-- </div> -->





</template>


<style scoped></style>