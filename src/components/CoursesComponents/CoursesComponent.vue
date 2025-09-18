<script setup>
 import data from '@/newCourses.json'
import { ref } from 'vue';
import CoursesListComponent from './CoursesListComponent.vue';
import SideBarFilterComponent from './SideBarFilterComponent.vue';
import { computed } from 'vue';
const MainCourses = ref(data.courses)
console.log(MainCourses.value);

const CoursesTab = ref([...MainCourses.value])
console.log(CoursesTab.value);

const selectedCategory = ref('')

const filteredCourses = computed(() => {
    if(!selectedCategory.value) return MainCourses.value
    return CoursesTab.value.filter((el) => el.category === selectedCategory.value )
})







</script>


<template>
<div class="flex">
    <SideBarFilterComponent :tabCourses="CoursesTab" @update:category="selectedCategory =$event"  />
    <CoursesListComponent :tabCourses="filteredCourses" />
</div>


</template>


<style scoped>


</style>