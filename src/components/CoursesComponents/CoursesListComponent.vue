<script setup>
const props = defineProps({
    tabCourses: Array
})


</script>


<template>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 md:grid-cols-2">
        <div v-for="cours in tabCourses" :key="cours.id"
            class=" rounded-lg shadow-sm hover:shadow-md transition w-[fit-content]  bg-white">
            <!-- Image -->
            <img :src="cours.thumbnail" alt="Image cours" class=" rounded-lg object-cover max-w-[300px] max-h-[500px]" />

            <div class="p-4 space-y-2">
                <!-- Badge catégorie -->
                <span
                    class="inline-block bg-pink-200 bg-redColor text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {{ cours.category }}
                </span>

                <!-- Titre -->
                <h3 class="text-lg font-semibold text-gray-900">{{ cours.title }}</h3>

                <!-- Niveau -->
                <p class="text-sm text-gray-600"><span class="font-semibold ">Niveau :</span> {{ cours.level }}</p>

                <!-- Auteur -->
                <p class="text-sm text-gray-500"><span class="font-semibold ">Auteur :</span> {{ cours.instructor }}</p>

                <!-- Bouton détails -->
                <div class="flex gap-5">
                    <button type="button"
                        class="mt-3  text-center border border-blueColor text-indigo-600 rounded-md p-2 text-sm font-medium hover:bg-redColor hover:border-redColor hover:text-white transition">
                        Détails du cours
                    </button>
                    <button type="button"
                        class="mt-3  text-center border border-indigo-600 text-indigo-600 rounded-md p-2 text-sm font-medium hover:bg-blueColor hover:text-white transition">
                        Commencer
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>