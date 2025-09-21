import { defineStore } from 'pinia'
import { ref } from 'vue'
import data from '@/newCourses.json'
import quizData from '@/quizzes.json'

export const useAlertesStore = defineStore('courses', () => {
  const courses = ref([...data.courses])
  let idNew = 200

  const isOpen = ref(false)
  const searchTerm = ref('')

  // Fonction pour ouvrir et fermer le menu
  function toggleMenu() {
    isOpen.value = !isOpen.value
  }

  // Fonction pour ajouter un cours
  function addCourse(course) {
    const courseToAdd = { ...course, id: idNew++ }
    courses.value.unshift(courseToAdd)
  }

  // Fonction pour modifier un cours
  function updateCourse(course) {
    courses.value = courses.value.map((c) => (c.id === course.id ? { ...course } : c))
  }

  // Fonction pour supprimer un cours
  function removeCourse(id) {
    courses.value = courses.value.filter((c) => c.id !== id)
  }

  // Fonction pour filtrer automatiquement les cours 
  function setSearchTerm(term) {
    searchTerm.value = term
  }

  return { 
    courses, 
    addCourse, 
    updateCourse, 
    removeCourse, 
    isOpen, 
    toggleMenu, 
    searchTerm, 
    setSearchTerm 
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('token'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  }),
  actions: {
    login(token, user) {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      this.isAuthenticated = true
      this.user = user
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.isAuthenticated = false
      this.user = null
    },
    refresh() {
      this.isAuthenticated = !!localStorage.getItem('token')
      this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    }
  }
})

export const useQuizStore = defineStore('quiz', () => {
  const quizzes = ref([...quizData.quizzes])
  let quizIdCounter = ref(1000) // ID starting point for new quizzes

  // Fonctions pour gérer les quiz
  function addQuiz(quiz) {
    const quizToAdd = { ...quiz, id: quizIdCounter.value++ }
    quizzes.value.push(quizToAdd)
  }

  function updateQuiz(quiz) {
    quizzes.value = quizzes.value.map(q => 
      q.id === quiz.id ? { ...quiz } : q
    )
  }

  function removeQuiz(id) {
    quizzes.value = quizzes.value.filter(q => q.id !== id)
  }

  function getQuizByCourseId(courseId) {
    return quizzes.value.find(q => q.id === courseId)
  }

  function getQuizzes() {
    return quizzes.value
  }

  return {
    quizzes,
    addQuiz,
    updateQuiz,
    removeQuiz,
    getQuizByCourseId,
    getQuizzes
  }
})