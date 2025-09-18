<script setup>
const connecter=ref(false)
const route=useRoute()
if (route.params.user){
    connecter.value=true;
}else{
    connecter.value=true;
}


const admin=ref(false)
if (route.params.user==="moodolion"){
    connecter.value=true;
}else{
   connecter.value=false;
}
</script>

<template>
  
</template>
