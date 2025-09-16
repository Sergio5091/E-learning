<script setup>
import CoursesComponent from './components/CoursesComponents/CoursesComponent.vue';
import ProductsView from './views/ProductsView.vue';

</script>

<template>
  <router-view />
  <div class="p-4">
    <h1 class="bg-blueColor">Salut</h1>
    <div class="bg-bgColor text-white p-4">Couleur brand</div>
    <div class="bg-redColor text-black p-4">Couleur brand light</div>
    <div class="bg-[#FAFAFBFF]">Couleur brand dark</div>
  </div>
  <ProductsView />

</template>



<style scoped>

</style>
