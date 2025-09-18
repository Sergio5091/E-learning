<script setup>
import { computed, ref } from 'vue';


const props = defineProps({
  tabCourses: Array
})

const selectedCategory = ref('')
const emits = defineEmits(['update:category'])

const categories = computed(() => [...new Set(props.tabCourses.map(el => el.category))])

function selectCategory(cour) {
  selectedCategory.value = cour
  emits('update:category', cour)
}


</script>


<template>
  <div
    class="p-4 bg-white rounded-lg shadow-md w-full lg:w-[25%] h-auto lg:h-[50vh] sticky top-[80px] flex flex-col justify-center items-center ml-0 lg:ml-[16px] dark:text-white dark:border dark:border-white transition-all duration-300">
    <h3 class="font-semibold mb-2 text-3xl">Catégories</h3>

    <div class="flex flex-col gap-2">
      <!-- Bouton Tout -->
      <button @click="selectCategory('')" :class="[
        'px-4 py-1 rounded-lg border text-sm font-medium transition w-full',
        selectedCategory === ''
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
      ]">
        Tout
      </button>

      <!-- Boutons catégories -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <button v-for="cat in categories" :key="cat" @click="selectCategory(cat)" :class="[
          'px-4 py-1 rounded-lg border text-sm font-medium transition w-full',
          selectedCategory === cat
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        ]">
          {{ cat }}
        </button>
      </div>
    </div>
  </div>

</template>


<style scoped></style>