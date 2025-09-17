<script setup>
import NavbarComponent from './components/NavbarComponent.vue';

import AssistantIA from './components/AssistantIAComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

</script>

<template>
  <header class="sticky top-0 z-[100000000]">
    <NavbarComponent />
  </header>

  <div>
    <RouterView />

    <AssistantIA />
  </div>


  <footer>
    <FooterComponent />
  </footer>


</template>

<style scoped></style>
