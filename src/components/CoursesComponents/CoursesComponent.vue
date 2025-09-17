<script setup>
import data from '@/newCourses.json'
import { ref } from 'vue';
import CoursesListComponent from './CoursesListComponent.vue';
import SideBarFilterComponent from './SideBarFilterComponent.vue';
import { computed } from 'vue';
import { useAlertesStore } from '@/store';
const MainCourses = ref(data.courses)
const { courses } = useAlertesStore()
// const coursesTable = ref([...MainCourses.value])

const selectedCategory = ref('')


const filteredCourses = computed(() => {
    if (!selectedCategory.value) return courses
    return courses.filter((el) => el.category === selectedCategory.value)
})







</script>


<template>
    <div class="flex">
        <SideBarFilterComponent :tabCourses="courses" @update:category="selectedCategory = $event" />
        <CoursesListComponent :tabCourses="filteredCourses" />
    </div>


</template>


<style scoped></style>