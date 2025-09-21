<script setup>
import { ref, computed } from 'vue'
import { useAlertesStore, useQuizStore } from '@/store' // Ajoutez useQuizStore

const courseStore = useAlertesStore()
const quizStore = useQuizStore() // Initialisez le store quiz

const showModal = ref(false)
const showQuizModal = ref(false) // Nouveau modal pour les quiz
const isEditing = ref(false)
const isEditingQuiz = ref(false) // Édition de quiz

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

const newQuiz = ref({ // Nouvel objet pour les quiz
  id: null,
  title: '',
  minimum_score: 3,
  success_message: 'Félicitations ! Vous avez réussi le quiz !',
  failure_message: 'Dommage ! Essayez encore.',
  questions: []
})

const currentQuestion = ref({ // Pour gérer les questions
  question: '',
  choices: ['', '', '', ''],
  correct_answer: ''
})

const tabFilter = computed(() => courseStore.courses)

// Fonctions pour les cours (existantes)
function openModal(course = null) {
  if (course) {
    isEditing.value = true
    newCourse.value = { ...course }
  } else {
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
    courseStore.updateCourse({ ...newCourse.value })
  } else {
    courseStore.addCourse({ ...newCourse.value })
  }
  closeModal()
}

function removeCours(id) {
  courseStore.removeCourse(id)
}

function handleThumbnail(e) {
  const file = e.target.files[0]
  if (file) {
    newCourse.value.thumbnail = URL.createObjectURL(file)
  }
}

// NOUVELLES FONCTIONS POUR LES QUIZ
function openQuizModal(course = null) {
  if (course) {
    isEditingQuiz.value = true
    // Vérifier si un quiz existe déjà pour ce cours
    const existingQuiz = quizStore.getQuizByCourseId(course.id)
    if (existingQuiz) {
      newQuiz.value = { ...existingQuiz, questions: [...existingQuiz.questions] }
    } else {
      newQuiz.value = {
        id: course.id, // Utiliser l'ID du cours
        title: `Quiz - ${course.title}`,
        minimum_score: 3,
        success_message: 'Félicitations ! Vous avez réussi le quiz !',
        failure_message: 'Dommage ! Essayez encore.',
        questions: []
      }
    }
  } else {
    isEditingQuiz.value = false
    newQuiz.value = {
      id: null,
      title: '',
      minimum_score: 3,
      success_message: 'Félicitations ! Vous avez réussi le quiz !',
      failure_message: 'Dommage ! Essayez encore.',
      questions: []
    }
  }
  showQuizModal.value = true
}

function closeQuizModal() {
  showQuizModal.value = false
}

function handleQuizSubmit(event) {
  event.preventDefault()
  if (isEditingQuiz.value) {
    quizStore.updateQuiz({ ...newQuiz.value })
  } else {
    quizStore.addQuiz({ ...newQuiz.value })
  }
  closeQuizModal()
}

function removeQuiz(id) {
  quizStore.removeQuiz(id)
}

function addQuestion() {
  if (currentQuestion.value.question && 
      currentQuestion.value.choices.every(c => c.trim() !== '') && 
      currentQuestion.value.correct_answer) {
    
    newQuiz.value.questions.push({ ...currentQuestion.value })
    currentQuestion.value = {
      question: '',
      choices: ['', '', '', ''],
      correct_answer: ''
    }
  }
}

function removeQuestion(index) {
  newQuiz.value.questions.splice(index, 1)
}

function updateChoice(index, value) {
  currentQuestion.value.choices[index] = value
}

// Vérifier si un cours a un quiz
function hasQuiz(courseId) {
  return quizStore.getQuizzes().some(quiz => quiz.id === courseId)
}
</script>

<template>
<div class="relative w-full bg-white dark:bg-[#23272f] transition-colors duration-300">
  <div class="flex flex-col sm:flex-row justify-between items-center py-5 mx-2 sm:mx-4 md:mx-10 gap-3">
    <h2 class="text-xl font-bold dark:text-gray-100">Gestion des Cours</h2>
    <div class="flex gap-2">
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 hover:bg-blue-700 transition-transform duration-300"
        @click="openModal()"
      >
        + Ajouter un cours
      </button>
    </div>
  </div>

  <!-- Tableau -->
  <div class="overflow-x-auto w-full">
    <table class="table-auto w-full border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-[#23272f]">
      <thead class="bg-gray-100 dark:bg-[#2c3140]">
        <tr>
          <th class="p-2 text-center dark:text-gray-100">ID</th>
          <th class="p-2 text-left dark:text-gray-100">Titre</th>
          <th class="p-2 text-center dark:text-gray-100">Catégorie</th>
          <th class="p-2 text-center dark:text-gray-100">Durée</th>
          <th class="p-2 text-center dark:text-gray-100">Quiz</th>
          <th class="p-2 text-center dark:text-gray-100">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="el in tabFilter"
          :key="el.id"
          class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2c3140] transition"
        >
          <td class="p-2 text-center dark:text-gray-200">{{ el.id }}</td>
          <td class="p-2 dark:text-gray-200">{{ el.title }}</td>
          <td class="p-2 text-center dark:text-gray-200">{{ el.category }}</td>
          <td class="p-2 text-center dark:text-gray-200">{{ el.duration }}</td>
          <td class="p-2 text-center dark:text-gray-200">
            <span v-if="hasQuiz(el.id)" class="text-green-600">✓</span>
            <span v-else class="text-red-600">✗</span>
          </td>
          <td class="p-2 flex flex-col sm:flex-row justify-center gap-2">
            <button
              @click="openModal(el)"
              class="flex items-center gap-2 bg-green-500 text-white dark:bg-green-500 dark:text-gray-100 px-3 py-1 rounded hover:scale-105 hover:bg-gray-300 dark:hover:bg-[#23272f]"
            >
              <img src="../../public/lucide-SquarePen-Outlined.svg" alt="Modifier" class="h-4 w-4" />
              Modifier
            </button>
            <button
              @click="openQuizModal(el)"
              class="flex items-center gap-2 bg-purple-500 text-white px-3 py-1 rounded hover:scale-105 hover:bg-purple-600"
            >
              <img src="../../public/lucide-SquarePen-Outlined.svg" alt="Quiz" class="h-4 w-4" />
              Quiz
            </button>
            <button
              @click="removeCours(el.id)"
              class="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:scale-105 hover:bg-red-700"
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

  <!-- Modal pour les cours (existant) -->
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
      <!-- Contenu du modal cours (garder le même) -->
    </div>
  </transition>

  <!-- NOUVEAU MODAL POUR LES QUIZ -->
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 scale-90"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-90"
  >
    <div
      v-if="showQuizModal"
      class="fixed inset-0 bg-[rgba(0,0,0,0.55)] flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white dark:bg-[#23272f] rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto transition-colors duration-300">
        <h2 class="text-lg font-bold mb-4 text-center dark:text-gray-100">
          {{ isEditingQuiz ? "Modifier le quiz" : "Gérer le quiz" }}
        </h2>

        <form @submit="handleQuizSubmit" class="space-y-4">
          <!-- Informations de base du quiz -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="quizTitle" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Titre du quiz</label>
              <input type="text" id="quizTitle" v-model="newQuiz.title" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-[#2c3140] dark:text-gray-100" />
            </div>

            <div>
              <label for="minimumScore" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Score minimum</label>
              <input type="number" id="minimumScore" v-model="newQuiz.minimum_score" min="1" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-[#2c3140] dark:text-gray-100" />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <div>
              <label for="successMessage" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Message de réussite</label>
              <input type="text" id="successMessage" v-model="newQuiz.success_message" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-[#2c3140] dark:text-gray-100" />
            </div>

            <div>
              <label for="failureMessage" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Message d'échec</label>
              <input type="text" id="failureMessage" v-model="newQuiz.failure_message" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-[#2c3140] dark:text-gray-100" />
            </div>
          </div>

          <!-- Gestion des questions -->
          <div class="border-t pt-4 mt-4">
            <h3 class="text-md font-semibold mb-3 dark:text-gray-100">Questions</h3>

            <!-- Formulaire pour une nouvelle question -->
            <div class="bg-gray-50 dark:bg-[#2c3140] p-4 rounded-lg mb-4">
              <h4 class="font-medium mb-2 dark:text-gray-200">Ajouter une question</h4>
              
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Question</label>
                  <input type="text" v-model="currentQuestion.question" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-[#2c3140] dark:text-gray-100" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div v-for="(choice, index) in currentQuestion.choices" :key="index">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Option {{ index + 1 }}
                    </label>
                    <input type="text" :value="choice" @input="updateChoice(index, $event.target.value)"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-[#2c3140] dark:text-gray-100" />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Réponse correcte</label>
                  <select v-model="currentQuestion.correct_answer" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-[#2c3140] dark:text-gray-100">
                    <option value="">Sélectionnez la réponse correcte</option>
                    <option v-for="(choice, index) in currentQuestion.choices" :key="index" :value="choice">
                      Option {{ index + 1 }}
                    </option>
                  </select>
                </div>

                <button type="button" @click="addQuestion" 
                  class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Ajouter cette question
                </button>
              </div>
            </div>

            <!-- Liste des questions existantes -->
            <div v-if="newQuiz.questions.length > 0">
              <h4 class="font-medium mb-2 dark:text-gray-200">Questions ajoutées</h4>
              <div v-for="(question, index) in newQuiz.questions" :key="index" 
                   class="border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-2">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-medium dark:text-gray-200">{{ question.question }}</p>
                    <p class="text-sm text-green-600 dark:text-green-400">Réponse correcte: {{ question.correct_answer }}</p>
                  </div>
                  <button type="button" @click="removeQuestion(index)" 
                    class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button type="submit"
              class="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {{ isEditingQuiz ? "Mettre à jour" : "Ajouter" }}
            </button>
            <button v-if="isEditingQuiz" type="button" @click="removeQuiz(newQuiz.id)"
              class="w-full sm:w-auto px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Supprimer le quiz
            </button>
            <button type="button" @click="closeQuizModal"
              class="w-full sm:w-auto px-5 py-2 bg-gray-400 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-500 dark:hover:bg-gray-800 transition">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>