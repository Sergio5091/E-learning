<script setup>
const cours = [
  { titre: "Développement Web Avancé", formateur: "Sophie Martin", progression: 85, date: "2024-07-20", statut: "En cours" },
  { titre: "Design UI/UX pour Débutants", formateur: "Pierre Dupont", progression: 100, date: "2024-06-15", statut: "Terminé" },
  { titre: "Introduction à la Science des Données", formateur: "Marie Leblanc", progression: 60, date: "2024-07-22", statut: "En cours" },
]
</script>

<template>
<div class="my-[60px]">

    <table class="w-[100%] border-1 border-collapse border-para1Color/20 rounded-[100px]">
      <thead class="text-left text-[#171A1FFF] font-medium">
          <th class="py-5 pl-5 text-[#171A1FFF] font-medium">Titre du cours </th>
          <th class="text-[#171A1FFF] font-medium">Formateur </th>
          <th class="text-[#171A1FFF] font-medium">Progression </th>
          <th class="text-[#171A1FFF] font-medium">Dernier accès</th>
          <th class="text-[#171A1FFF] font-medium">Statut</th>
          <th class="text-[#171A1FFF] font-medium">Actions</th>
      </thead>
      <tbody>
        <tr v-for="c in cours" :key="c.titre" class="border-1 border-para1Color/20">
          <td class="p-5 text-[#171A1FFF] font-medium">{{ c.titre }}</td>
          <td class=" text-para1Color">{{ c.formateur }}</td>
          <td>
            <div class="w-32 bg-gray-200 rounded-full h-2">
              <div class="bg-indigo-600 h-2 rounded-full" :style="{ width: c.progression + '%' }"></div>
            </div>
          </td>
          <td class="text-[#565D6DFF] border-para1Color/20">{{ c.date }}</td>
          <td class="">
            <span  :class="[
              'text-xs px-2 py-[2px] rounded-full',
              c.statut === 'En cours' ? 'bg-pink-500 text-white' :
              c.statut === 'Terminé' ? 'bg-indigo-600 font-bold w-2 h-1 text-white' :
              'bg-gray-400 text-white'
            ]" >
              {{ c.statut }}
            </span>
          </td>
          <td >
            <div>
                <button class="bg-sidebarColor border-1 border-para1Color/10 cursor-pointer bg-para1Color/90 text-para1Color px-4 py-1 rounded-md">
                  Voir le cours
                </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</div>
</template>
<style scoped>

table{
    border-radius:100px ;
}
th{
    /* color: #171A1FFF; */
}

tr{
    border-radius: 100px;
    /* border: 1px solid #171A1FFF; */
}
td{
    margin-block: 10px;
}
</style>