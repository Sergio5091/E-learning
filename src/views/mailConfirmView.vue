<script setup>
import { ref, inject } from "vue";
import { useRouter} from "vue-router"

const val = inject('val')
const code=ref('')
const route=useRouter()
function verification() {
    if (val.code===code.value) {
        route.push('/auth')
    } else {
        alert('Mauvais code')
    }
}

</script>

<template>
  <!-- <div class="p-4">
    <h1 class="bg-blueColor">Salut</h1>
    <div class="bg-bgColor text-white p-4">Couleur brand</div>
    <div class="bg-redColor text-blueColor p-4">Couleur brand light</div>
    <div class="bg-[#FAFAFBFF]">Couleur brand dark</div>
  </div> -->
  <div class="flex justify-center h-screen w-full border-gray-200">
    <div class="relative left-[120px] top-[-20px] z-[2] rotate-[25deg]">
      <img src="./assets/image/aunthentication/pocha-removebg-preview.png" alt="">
    </div>
  </div>
  <div class="para">
    <transition name="para">
      <div class="min-w-[400px] bg-[#eaeaeeaf] rounded-2xl p-[15px]">
      <div class="form">

<!-- Formulaire d'inscription -->
        <transition name="slide-fade">
            <div class="duration-[1s]">
              <h1 class="text-3xl text-gray-800 ">
                **
                Vous y êtes presque
              </h1>
            <form class="py-[30px]">
              <div>
                <p class="text-xl text-gray-500 ">
                  Veuillez entrer le code de vérification contenu dans le mail que nous avons envoyez à:<br>  *******************@gmail.com
                </p>
              </div>
              <div>
                <input v-model="code" class="bg-bgColor "  type="text"
                  placeholder="Tapez le code ici..." required>
              </div>
              <button @click="verification" class="bg-blueColor">Vérifier</button>
            </form>
          </div>
        </transition>
<!--fin Formulaire d'inscription -->

      </div>
    </div>
    </transition>
  </div>
</template>



<style scoped>
/* transition formulaire d'inscription */

.slide-fade-enter-active {
  transition: all 2s;
  /* transition-delay: 0.5s; */
}

.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.page{
 display: flex;
 align-items: center;
 flex-direction: column;
 gap: 20px;
 padding-bottom: 20px;
}
.page>div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.para {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -1px;
  /* background-color: rgba(0, 0, 0, 0.13); */

}

.layout {
  display: flex;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(97, 81, 81, 0.541);
}

.form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
}
h1{
  padding-block: 30px;
}

form input {
  font-size: 1.5rem;
  height: 60px;
  width: 100%;
  border-radius: 15px;
  padding: 12px;
  outline: none;
  margin-block: 20px;
}

button {
  font-size: 1.8rem;
  color: white;
  width: 70%;
  height: 50px;
  border-radius: 40px;
  box-shadow: inset 0 -10px 20px 1px rgba(97, 81, 81, 0.541);
}
</style>
