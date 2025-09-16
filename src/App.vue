<script setup>
import NavbarComponent from './components/NavbarComponent.vue';

import AssistantIA from './components/AssistantIAComponent.vue';

</script>

<template>
  <header> <NavbarComponent/> </header>
  
  <RouterView />
  
 <AssistantIA />

</template>

<style scoped>

</style>
