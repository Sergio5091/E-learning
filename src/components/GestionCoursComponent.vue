<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    tabCourses: Array
})

// ton tableau des cours
const tabCourses = ref([
  { id: "c1", title: "Introduction au Développement Web", category: "Développement", level: "12", price: 150 }
])


// données du formulaire
const newCourse = ref({
  id: "",
  title: "",
  category: "",
  instructor: "",
  duration: "",
  price: "",
  thumbnail: "",
  description: ""
})

const idToRemove = ref(null)
// état pour afficher ou cacher la div formulaire
const showModal = ref(false)

//  tableau filtré qui se met à jour automatiquement
const tabFilter = computed(() => {
    return props.tabCourses.filter(course => course.id !== idToRemove.value)
})

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

//  fonction qui change juste l’id à supprimer
function removeCours(id) {
    idToRemove.value = id
}
</script>

<template>
    <div class="relative">
        <!-- Contenu principal -->
        <div class="flex justify-center">
            <div class="w-full mt-[20px]">
                <!-- En-tête -->
                <div class="flex justify-between items-center py-[15px] mx-[40px] pb-[50px]">
                    <h2 class="text-xl font-bold">Gestion des Cours</h2>
                    <button
                        class="bg-blue-600 text-white px-4 py-2 rounded transition-transform duration-300 hover:scale-105 hover:bg-blue-700" @click="openModal">
                        + Ajouter un nouveau cours
                    </button>
                </div>

                <!-- Tableau -->
                <div class="overflow-x-auto">
                    <table class="table-auto w-full rounded-lg border border-gray-200">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="p-2 text-center min-w-[80px]">ID</th>
                                <th class="p-2 text-left min-w-[200px]">Titre de Cours</th>
                                <th class="p-2 text-center min-w-[120px]">Catégorie</th>
                                <th class="p-2 text-center min-w-[80px]">Leçons</th>
                                <th class="p-2 text-center min-w-[150px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                         
                            <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                v-for="el in tabFilter" :key="el.id">
                                <td class="p-2 text-center">{{ el.id }}</td>
                                <td class="p-2">{{ el.title }}</td>
                                <td class="p-2 text-center">{{ el.category }}</td>
                                <td class="p-2 text-center">{{ el.level }}</td>
                                <td class="p-2 flex justify-center gap-2">
                                    <!-- Bouton Modifier -->
                                    <!-- <button
                                        class="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded transition-transform duration-200 hover:scale-105 hover:bg-gray-300 w-[105px]">
                                        <img src="../../public/lucide-SquarePen-Outlined.svg" alt="Modifier"
                                            class="h-4 w-4">
                                        Modifier
                                    </button> -->
                                    <!-- Bouton Supprimer -->
                                    <button @click="removeCours(el.id)"
                                        class="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded transition-transform duration-200 hover:scale-105 hover:bg-red-700">
                                        <img src="../../public/lucide-Trash2-Outlined.svg" alt="Supprimer"
                                            class="h-4 w-4">
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Overlay modal -->
    <div class="fixed inset-0 bg-[rgba(0,0,0,0.55)]  flex items-center justify-center backdrop-blur-xs " v-if="showModal">
        <div class="absolute top-8 right-5">
             <button @click="closeModal" class="absolute top- right-1 text-gray-600 hover:text-gray-900 z-[1000]  h-[40px] w-[40px] rounded-full flex justify-center items-center bg-red-500 text-white shadow-md transition-colors hover:bg-white hover:text-red-500">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        </div>
        <!-- Conteneur du formulaire -->
        <div class="bg-white rounded-lg shadow-md p-6 w-[450px] max-h-[60vh] overflow-y-auto">
            <form>
                <!-- Titre -->
                <div class="mb-6">
                    <label for="title" class="block text-gray-700 font-medium mb-2">Titre</label>
                    <input type="text" id="title" value="Go Lang : bases et pratiques #1"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Catégorie -->
                <div class="mb-6">
                    <label for="category" class="block text-gray-700 font-medium mb-2">Catégorie</label>
                    <select id="category"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="Programmation" selected>Programmation</option>
                        <option value="Informatique">Informatique</option>
                        <option value="Business">Business</option>
                        <option value="Design">Design</option>
                        <option value="Langues">Langues</option>
                    </select>
                </div>

                <!-- Instructeur -->
                <div class="mb-6">
                    <label for="instructor" class="block text-gray-700 font-medium mb-2">Instructeur</label>
                    <input type="text" id="instructor" value="Kevin Zhang"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Durée -->
                <div class="mb-6">
                    <label for="duration" class="block text-gray-700 font-medium mb-2">Durée</label>
                    <input type="text" id="duration" value="7h 20min"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Prix -->
                <div class="mb-6">
                    <label for="price" class="block text-gray-700 font-medium mb-2">Prix (€)</label>
                    <input type="number" id="price" value="169"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <!-- Vignette -->
                <div class="mb-6">
                    <label class="block text-gray-700 font-medium mb-2">Vignette du cours</label>
                    <div class="flex flex-col items-center">
                        <img src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=400&h=250&fit=crop"
                            alt="thumbnail" class="w-64 h-40 object-cover rounded-lg mb-3">
                        <input id="thumbnail" type="file"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <!-- Description -->
                <div class="mb-6">
                    <label for="description" class="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea id="description" rows="4"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">Cours sur Go Lang : bases et pratiques #1 dans la catégorie Programmation.</textarea>
                </div>

                <!-- Bouton d'enregistrement -->
                <div class="flex justify-center">
                    <button type="submit"
                        class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                        Enregistrer les modifications
                    </button>
                </div>
            </form>
        </div>
    </div>



</template>

<style></style>
