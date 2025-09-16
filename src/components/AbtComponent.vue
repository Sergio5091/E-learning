<script setup>
import { ref, computed, onMounted } from 'vue'

// Importation dynamique du JSON local
import coursesData from '../../newCourses.json'

const instructors = ref([])

onMounted(() => {
  // Extraire les formateurs uniques et leurs cours
  const map = new Map()
  coursesData.courses.forEach(course => {
    if (!map.has(course.instructor)) {
      map.set(course.instructor, {
        name: course.instructor,
        courses: [course.title],
        experience: Math.floor(Math.random() * 8) + 3, // Expérience fictive 3-10 ans
        contact: `${course.instructor.toLowerCase().replace(/ /g, '.')}@elearn.fr`
      })
    } else {
      map.get(course.instructor).courses.push(course.title)
    }
  })
  instructors.value = Array.from(map.values())
})

const objectif = `Notre plateforme E-Learning vise à rendre l'apprentissage accessible à tous, partout et à tout moment. Découvrez des cours variés, suivez votre progression, gagnez des badges et apprenez avec les meilleurs formateurs francophones !`
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4 text-blue-700 dark:text-blue-300">À propos de nous</h1>
    <p class="mb-8 text-lg text-gray-700 dark:text-gray-200">{{ objectif }}</p>

    <h2 class="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-200">Nos formateurs</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div v-for="instructor in instructors" :key="instructor.name" class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div class="flex items-center mb-2">
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700 mr-3">
            {{ instructor.name.split(' ').map(n => n[0]).join('') }}
          </div>
          <div>
            <div class="font-bold text-lg text-gray-900 dark:text-gray-100">{{ instructor.name }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Expérience : {{ instructor.experience }} ans</div>
          </div>
        </div>
        <div class="mb-2">
          <span class="font-semibold text-gray-700 dark:text-gray-200">Cours :</span>
          <ul class="list-disc ml-5 text-gray-600 dark:text-gray-300">
            <li v-for="course in instructor.courses" :key="course">{{ course }}</li>
          </ul>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-300">
          <span class="font-semibold">Contact :</span>
          <a :href="`mailto:${instructor.contact}`" class="text-blue-600 hover:underline">{{ instructor.contact }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajoute ici des styles personnalisés si besoin */
</style>