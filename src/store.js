import { defineStore } from 'pinia'
import data from '@/newCourses.json'
import { ref } from 'vue'
export const useAlertesStore = defineStore('courses', () => {
  
  const courses = ref([...data.courses])
  let idNew = 200;


  //Fonction pour ajouter un cours
  function addCourse(course){
    const courseToAdd = {...course , id:idNew++}
    courses.value.unshift(courseToAdd)
  }
  
  //Fonction pour modifier un cours
  function updateCourse(course){
    courses.value = courses.value.map(c => c.id === course.id ? {...course} : c)
  }

  //Fonction  pour 
  function removeCourse(id) {
    courses.value = courses.value.filter(c => c.id !== id)
  }

  return { courses, addCourse, updateCourse, removeCourse }
})


