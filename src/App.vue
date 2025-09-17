<script setup>
import NavbarComponent from './components/NavbarComponent.vue';

import AssistantIA from './components/AssistantIAComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

</script>

<template>
  <div class="min-h-screen">
    <header> <NavbarComponent/> </header>
    
    <div>
      <RouterView />
    
       <AssistantIA />
    </div>

    <footer>
      <FooterComponent />
    </footer>
  </div>

</template>

<style scoped>

</style>
