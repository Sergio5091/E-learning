<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  tabCourses: Array
})

const tabCoursesLocal = ref([...props.tabCourses]) // copie locale

function removeCours(id) {
  tabCoursesLocal.value = tabCoursesLocal.value.filter(course => course.id !== id)
}

const tabFilter = computed(() => tabCoursesLocal.value)

const showModal = ref(false)
const isEditing = ref(false) // état édition ou ajout
let idNew = 200

const newCourse = ref({
  id: null,
  title: '',
  category: '',
  instructor: '',
  duration: '',
  price: null,
  thumbnail: '',
  description: ''
})

function openModal(course = null) {
  if (course) {
    // mode édition
    isEditing.value = true
    newCourse.value = { ...course }
  } else {
    // mode ajout
    isEditing.value = false
    newCourse.value = {
      id: null,
      title: '',
      category: '',
      instructor: '',
      duration: '',
      price: null,
      thumbnail: '',
      description: ''
    }
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function handleSubmit(event) {
  event.preventDefault()

  if (isEditing.value) {
    // mise à jour
    tabCoursesLocal.value = tabCoursesLocal.value.map(course =>
      course.id === newCourse.value.id ? { ...newCourse.value } : course
    )
  } else {
    // ajout
    const courseToAdd = {
      ...newCourse.value,
      id: idNew++
    }
    tabCoursesLocal.value.unshift(courseToAdd)
  }

  closeModal()
}

function handleThumbnail(e) {
  const file = e.target.files[0]
  if (file) {
    newCourse.value.thumbnail = URL.createObjectURL(file)
  }
}
</script>

<template>
  <div class="relative">
    <!-- Header -->
    <div class="flex justify-between items-center py-5 mx-4 md:mx-10">
      <h2 class="text-xl font-bold">Gestion des Cours</h2>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
        @click="openModal()"
      >
        + Ajouter un nouveau cours
      </button>
    </div>

    <!-- Tableau -->
    <div class="overflow-x-auto">
      <table class="table-auto w-full rounded-lg border border-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 text-center min-w-[80px]">ID</th>
            <th class="p-2 text-left min-w-[200px]">Titre</th>
            <th class="p-2 text-center min-w-[120px]">Catégorie</th>
            <th class="p-2 text-center min-w-[120px]">Durée</th>
            <th class="p-2 text-center min-w-[150px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="el in tabFilter"
            :key="el.id"
            class="border-b border-gray-200 hover:bg-gray-50 transition"
          >
            <td class="p-2 text-center">{{ el.id }}</td>
            <td class="p-2">{{ el.title }}</td>
            <td class="p-2 text-center">{{ el.category }}</td>
            <td class="p-2 text-center">{{ el.duration }}</td>
            <td class="p-2 flex justify-center gap-2">
              <!-- Modifier -->
              <button
                @click="openModal(el)"
                class="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded transition-transform duration-200 hover:scale-105 hover:bg-gray-300"
              >
                <img src="../../public/lucide-SquarePen-Outlined.svg" alt="Modifier" class="h-4 w-4" />
                Modifier
              </button>
              <!-- Supprimer -->
              <button
                @click="removeCours(el.id)"
                class="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded transition-transform duration-200 hover:scale-105 hover:bg-red-700"
              >
                <img src="../../public/lucide-Trash2-Outlined.svg" alt="Supprimer" class="h-4 w-4" />
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal avec animation -->
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 scale-90"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-90"
  >
    <div
      v-if="showModal"
      class="fixed inset-0 bg-[rgba(0,0,0,0.55)] flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 w-full max-w-[500px] max-h-[90vh] overflow-y-auto"
      >
        <!-- Titre modal -->
        <h2 class="text-lg font-bold mb-4 text-center">
          {{ isEditing ? "Modifier le cours" : "Ajouter un nouveau cours" }}
        </h2>

        <!-- Formulaire -->
        <form @submit="handleSubmit" class="space-y-4">
          <!-- Titre -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
            <input
              type="text"
              id="title"
              v-model="newCourse.title"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Catégorie -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700">Catégorie</label>
            <select
              id="category"
              v-model="newCourse.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="Programmation">Programmation</option>
              <option value="Informatique">Informatique</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
              <option value="Langues">Langues</option>
            </select>
          </div>

          <!-- Instructeur -->
          <div>
            <label for="instructor" class="block text-sm font-medium text-gray-700">Instructeur</label>
            <input
              type="text"
              id="instructor"
              v-model="newCourse.instructor"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Durée -->
          <div>
            <label for="duration" class="block text-sm font-medium text-gray-700">Durée</label>
            <input
              type="text"
              id="duration"
              v-model="newCourse.duration"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Prix -->
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Prix (€)</label>
            <input
              type="number"
              id="price"
              v-model="newCourse.price"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Vignette -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Vignette</label>
            <div class="flex flex-col items-center">
              <img
                v-if="newCourse.thumbnail"
                :src="newCourse.thumbnail"
                alt="thumbnail"
                class="w-64 h-40 object-cover rounded-lg mb-3"
              />
              <input
                id="thumbnail"
                type="file"
                @change="handleThumbnail"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              v-model="newCourse.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Boutons -->
          <div class="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <button
              type="submit"
              class="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {{ isEditing ? "Mettre à jour" : "Ajouter" }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="w-full sm:w-auto px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>
