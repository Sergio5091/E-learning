<script setup>
import { ref, onMounted } from 'vue';

const cours = ref([]);



onMounted(() => {
  const history = JSON.parse(localStorage.getItem('courseHistory') || '{}');
  cours.value = Object.values(history);
});
</script>

<template>
<div class="my-[60px] w-full">
  <table v-if="cours.length > 0" class="w-full overflow-scroll border-1 border-collapse rounded-[20px] bg-white dark:bg-[#23272f] dark:border-gray-700">
    <thead class="text-left font-medium bg-gray-100 dark:bg-[#2c3140]">
      <tr>
        <th class="py-5 pl-5 text-[#171A1FFF] dark:text-gray-100 font-medium">Titre du cours</th>
        <th class="text-[#171A1FFF] dark:text-gray-100 font-medium">Formateur</th>
        <th class="text-[#171A1FFF] dark:text-gray-100 font-medium">Progression</th>
        <th class="text-[#171A1FFF] dark:text-gray-100 font-medium">Dernier accès</th>
        <th class="text-[#171A1FFF] dark:text-gray-100 font-medium">Statut</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="c in cours" :key="c.titre" class="border-1 border-para1Color/20 dark:border-gray-700">
        <td class="p-5 text-[#171A1FFF] dark:text-gray-100 font-medium">{{ c.titre }}</td>
        <td class="text-para1Color dark:text-gray-300">{{ c.formateur }}</td>
        <td>
          <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="bg-indigo-600 dark:bg-blue-500 h-2 rounded-full" :style="{ width: c.progression + '%' }"></div>
          </div>
        </td>
        <td class="text-[#565D6DFF] dark:text-gray-400 border-para1Color/20">{{ c.date }}</td>
        <td>
          <span :class="[
            'text-xs px-2 py-[2px] rounded-full',
            c.statut === 'En cours' ? 'bg-pink-500 text-white' :
            c.statut === 'Terminé' ? 'bg-indigo-600 dark:bg-blue-500 font-bold w-2 h-1 text-white' :
            'bg-gray-400 dark:bg-gray-700 text-white'
          ]">
            {{ c.statut }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else class="text-center p-10 text-gray-500 dark:text-gray-300 bg-white dark:bg-[#23272f] rounded-lg">
    Vous n'avez pas encore commencé de cours.
  </div>
</div>
</template>
<style scoped>

table{
    border-radius:100px ;
}


tr{
    border-radius: 100px;
    /* border: 1px solid #171A1FFF; */
}
td{
    margin-block: 10px;
}
</style>