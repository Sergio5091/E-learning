<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import coursesData from '@/newCourses.json';

const route = useRoute();
const courseId = ref(route.params.id);

const courseData = coursesData.courses.find(c => c.id == courseId.value);
// On utilise ref() pour créer une copie réactive et modifiable du cours.
const course = ref(courseData ? JSON.parse(JSON.stringify(courseData)) : null);

const currentLessonIndex = ref(0);
const openedLessonId = ref(null);

const currentLesson = computed(() => {
  if (course.value && course.value.lessons) {
    return course.value.lessons[currentLessonIndex.value];
  }
  return null;
});

const progress = computed(() => {
  if (!course.value) return 0;
  const completedLessons = course.value.lessons.filter(l => l.completed).length;
  return Math.round((completedLessons / course.value.lessons.length) * 100);
});

function nextLesson() {
  // Marque la leçon actuelle comme terminée
//   if (course.value && course.value.lessons[currentLessonIndex.value]) {
//     course.value.lessons[currentLessonIndex.value].completed = true;
//   }
  if (currentLessonIndex.value < course.value.lessons.length - 1) {
    currentLessonIndex.value++;
  }
}

function previousLesson() {
  if (currentLessonIndex.value > 0) {
    currentLessonIndex.value--;
  }
}

function toggleLesson(lessonId) {
  openedLessonId.value = openedLessonId.value === lessonId ? null : lessonId;
}

function selectLesson(index) {
  currentLessonIndex.value = index;
  openedLessonId.value = course.value.lessons[index].id;
}
</script>

<template>
  <div v-if="course" class="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
    <div class="max-w-4xl mx-auto">
      
 
      <div class="mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">{{ course.title }}</h1>
        <div class="mt-2">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">{{ progress }}% Terminé</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: progress + '%' }"></div>
          </div>
        </div>
      </div>


      <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
        <div class="p-4 border-b">
          <h2 class="text-lg font-semibold text-gray-700">Vidéo de la Leçon: {{ currentLesson.title }}</h2>
        </div>
        <div class="aspect-w-16 aspect-h-9 bg-black">
          <iframe v-if="currentLesson" :src="currentLesson.videoUrl" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen class="w-full h-full"></iframe>
        </div>
      </div>

      <div class="flex justify-between items-center mb-8">
        <button @click="previousLesson" :disabled="currentLessonIndex === 0" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">Précédent</button>
        <span class="text-sm font-medium text-gray-600">Leçon {{ currentLessonIndex + 1 }} sur {{ course.lessons.length }}</span>
        <button @click="nextLesson" :disabled="currentLessonIndex === course.lessons.length - 1" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">Suivant </button>
      </div>

      <!-- Lessons List -->
      <div class="bg-white shadow-md rounded-lg">
        <h3 class="text-xl font-semibold text-gray-800 p-4 border-b">Liste des leçons</h3>
        <ul>
          <li v-for="(lesson, index) in course.lessons" :key="lesson.id" class="border-b last:border-b-0">
            <div @click="selectLesson(index)" class="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100" :class="{'bg-gray-100': currentLessonIndex === index}">
              <div class="flex items-center">
                <span class="text-blue-600 font-semibold mr-3">{{ index + 1 }}.</span>
                <span class="font-medium text-gray-800">{{ lesson.title }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm text-gray-500 mr-4">{{ lesson.duration }}</span>
                <button @click.stop="toggleLesson(lesson.id)" class="focus:outline-none">
                  <svg class="w-5 h-5 text-gray-500 transform transition-transform" :class="{'rotate-180': openedLessonId === lesson.id}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              </div>
            </div>
            <div v-if="openedLessonId === lesson.id" class="p-4 bg-gray-50 border-t">
              <p class="text-sm text-gray-600 mb-4">{{ lesson.description }}</p>
              <div class="flex items-center">
                <input type="checkbox" :id="'lesson-' + lesson.id" v-model="lesson.completed" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <label :for="'lesson-' + lesson.id" class="ml-2 block text-sm text-gray-900">Marquer comme terminé</label>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
  <div v-else class="text-center p-10">
    <p class="text-xl">Chargement du cours...</p>
  </div>
</template>

<style scoped>

.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; 
}

.aspect-w-16 > iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
