<script setup>
import NavbarComponent from './components/NavbarComponent.vue';
import AssistantIA from './components/AssistantIAComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

</script>

<template>
  <header>
     <NavbarComponent/>
   </header>
  
  <div>
    <RouterView />
    <AssistantIA />
  </div>

  <footer>
    <FooterComponent />
  </footer>
</template>

<style scoped>

</style>
