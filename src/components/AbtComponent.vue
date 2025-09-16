<script setup>
import { ref, onMounted } from 'vue'
import coursesData from '../../newCourses.json'

const instructors = ref([])

onMounted(() => {
  // Extraire les formateurs uniques et leurs cours
  const map = new Map()
  coursesData.courses.forEach((course) => {
    if (!map.has(course.instructor)) {
      map.set(course.instructor, {
        name: course.instructor,
        courses: [course.title],
        experience: Math.floor(Math.random() * 8) + 3, // Expérience fictive 3-10 ans
        contact: `${course.instructor.toLowerCase().replace(/ /g,'.')}@elearn.fr`,
      })
    } else {
      map.get(course.instructor).courses.push(course.title)
    }
  })
  instructors.value = Array.from(map.values())
})

const objectif = `Notre plateforme E-Learning vise à rendre l'apprentissage accessible à tous, partout et à tout moment. Découvrez des cours variés, suivez votre progression, gagnez des badges et apprenez avec les meilleurs formateurs francophones !`

const heroImages = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
]
const sidebarImages = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
  
]
</script>

<template>
  <div class="relative min-h-screen bg-white dark:bg-neutral-800 transition-colors duration-300 overflow-x-hidden">

    <!-- Sidebars défilantes -->
    <div class="hidden md:block fixed left-0 top-0 h-full w-20 z-20">
      <div class="h-full flex flex-col justify-center items-center overflow-hidden">
        <div class="animate-slide-vertical1 space-y-8">
          <img
            v-for="(img, i) in sidebarImages"
            :key="'left' + i"
            :src="img"
            class="rounded-xl shadow-lg w-16 h-16 object-cover mb-4 border-2 border-blue-100 dark:border-white"
          />
        </div>
      </div>
    </div>



    <div class="hidden md:block fixed right-0 top-0 h-full w-20 z-20">
      <div class="h-full flex flex-col justify-center items-center overflow-hidden">
        <div class="animate-slide-vertical2 space-y-8">
          <img
            v-for="(img, i) in sidebarImages"
            :key="'right' + i"
            :src="img"
            class="rounded-xl shadow-lg w-16 h-16 object-cover mb-4 border-2 border-blue-100 dark:border-white"
          />
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="relative flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-32 mb-12">
      <div class="flex-1 z-10">
        <h1 class="text-4xl md:text-5xl font-extrabold text-blue-500 dark:text-white mb-4 drop-shadow-lg">
          Plateforme E-Learning Moderne
        </h1>
        <p class="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6 max-w-xl">
          {{ objectif }}
        </p>
        <span class="inline-block px-4 py-2 bg-blue-500 dark:bg-blue-400 text-white rounded-full font-semibold shadow-lg animate-bounce">
          🖥🖥 Rejoignez-nous dès aujourd'hui !
        </span>
      </div>
      <!-- Slider d'images -->
      <div class="flex-1 flex items-center justify-center mt-8 md:mt-0">
        <div class="relative w-72 h-56 overflow-hidden rounded-2xl shadow-2xl border-4 border-blue-100 dark:border-gray-400 bg-white dark:bg-black">
          <div class="absolute inset-0 flex animate-slide-horizontal">
            <img
              v-for="(img, i) in heroImages"
              :key="i"
              :src="img"
              class="w-72 h-56 object-cover flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Section Formateurs -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <h2 class="text-3xl font-bold mb-8 text-blue-600 dark:text-white text-center tracking-tight">
        Nos Formateurs
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="instructor in instructors"
          :key="instructor.name"
          class="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 border-t-4 border-blue-200 dark:border-white hover:scale-105 transition-transform duration-300"
        >
          <div class="flex items-center mb-3">
            <div
              class="w-14 h-14 rounded-full bg-blue-100 dark:bg-white flex items-center justify-center text-2xl font-bold text-blue-700 dark:text-blue-500 mr-4 shadow-lg"
            >
              {{
                instructor.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
              }}
            </div>
            <div>
              <div class="font-bold text-lg text-gray-900 dark:text-white">
                {{ instructor.name }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Expérience : {{ instructor.experience }} ans
              </div>
            </div>
          </div>
          <div class="mb-2">
            <span class="font-semibold text-gray-700 dark:text-gray-100">Cours :</span>
            <ul class="list-disc ml-5 text-gray-600 dark:text-gray-300">
              <li v-for="course in instructor.courses" :key="course">{{ course }}</li>
            </ul>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-200">
            <span class="font-semibold">Contact :</span>
            <a
              :href="`mailto:${instructor.contact}`"
              class="text-blue-600 dark:text-gray-200 hover:underline"
              >{{ instructor.contact }}</a
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Section Promos -->
    <section
      class="max-w-5xl mx-auto px-4 py-12 mt-10 rounded-3xl bg-neutral-100 dark:bg-neutral-300 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden border border-blue-100 dark:border-blue"
    >
      <h3 class="text-2xl md:text-3xl font-extrabold text-blue-700 dark:text-neutral-800 mb-4 drop-shadow-lg">
        🎉 Promotions & Réductions à venir !
      </h3>
      <p class="text-lg text-gray-700 dark:text-neutral-600 mb-6 text-center max-w-2xl">
        Profitez bientôt de nos offres exceptionnelles sur de nombreux cours : jusqu'à
        <span class="font-bold text-pink-600 dark:text-pink-500">-80%</span> sur les nouveautés, des packs exclusifs, et des badges
        bonus pour les premiers inscrits ! Restez connectés 🚨
      </p>
      <span
        class="inline-block px-6 py-2 bg-blue-600 dark:bg-blue-400 text-white font-bold rounded-full shadow-lg animate-bounce"
      >
        Bientôt disponible !
      </span>
    </section>
  </div>
</template>

<style scoped>
@keyframes slide-horizontal {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
.animate-slide-horizontal {
  display: flex;
  width: 200%;
  animation: slide-horizontal 8s  infinite;
}

@keyframes slide-vertical1 {
  0% {
    transform: translateY(200%);
  }
  100% {
    transform: translateY(-100%);
  }
}
@keyframes slide-vertical2 {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(200%);
  }
}
.animate-slide-vertical1 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  animation: slide-vertical1 15s linear infinite;
}
.animate-slide-vertical2 {
  display: flex;
  flex-direction: column;
  height: 100vh;
  animation: slide-vertical2 15s linear infinite;
}
</style>
