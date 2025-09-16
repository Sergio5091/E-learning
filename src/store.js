import { defineStore } from "pinia";
import data from '@/newCourses.json'
import { ref } from "vue";

export const courses = ref([...data.courses])
export const usesCoursesStore = defineStore('courses' , () => {

    function addCourse(course){
        courses.value.push(course)
    }
    
    function removeCourses(id){
        courses.value = courses.value.filter( c => c.id !== id)
    }

    const filterByCategory = (category) =>  {
        if(!category) return courses.value
        return courses.value.filter( c => c.category === category)
    }

    return {courses , addCourse,removeCourses,filterByCategory}
})
