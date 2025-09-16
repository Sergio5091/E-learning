<script setup>

</script>

<template>
  <!-- <div class="p-4">
    <h1 class="bg-blueColor">Salut</h1>
    <div class="bg-bgColor text-white p-4">Couleur brand</div>
    <div class="bg-redColor text-blueColor p-4">Couleur brand light</div>
    <div class="bg-[#FAFAFBFF]">Couleur brand dark</div>
  </div> -->
  <div class="flex justify-center h-screen w-full border-gray-200">
    <div class="relative left-[160px] top-[10px] z-[2] rotate-[25deg]">
      <img src="./assets/image/aunthentication/pocha-removebg-preview.png" alt="">
    </div>
  </div>
  <div class="para">
    <transition name="para">
      <div class="min-w-[400px] justify-center rounded-4xl bg-[#eaeaeeaf]">
      <div class="form">
        <!-- <span class="material-symbols-outlined">
lock
</span> -->

<!-- Formulaire d'inscription -->
        <transition name="slide-fade">
            <div class="duration-[1s] flex ">
              <h1 class="text-3xl text-gray-800  ">
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
                <input class="bg-bgColor " v-model="mdp2" name="mdp2" type="password"
                  placeholder="Tapez le code ici..." required>
              </div>
              <button class="bg-blueColor">Vérifier</button>
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

/* .page{
  height: 100vh;
  width: 100vw;
} */
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

form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
}
h1{
  padding-top: 30px;
}

form input {
  font-size: 1.5rem;
  height: 60px;
  width: 100%;
  border-radius: 15px;
  padding: 12px;
  outline: none;
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
