<script setup>
import { ref, computed, provide } from "vue";
import { useRouter } from 'vue-router';
import * as emailjs from '@emailjs/browser';
import bd from "../../Users.json";
import mailConfirm from "../views/mailConfirmView.vue"


// initialise EmailJS avec ta clé publique
emailjs.init("DVu2Au30trEgw5z2u");

console.log(JSON.parse(localStorage.getItem('base'))); 

// console.log(localStorage.removeItem('base'));
const stored = localStorage.getItem('base');
let baseDD = ref([])
if (stored) {
    try {
      baseDD.value=JSON.parse(stored);
    } catch (e) {
      console.error("❌ Erreur JSON.parse :", e);
      // réinitialise si jamais c’est corrompu
      localStorage.removeItem('base');
      baseDD.value= bd.Users;
    }
  } else {
    baseDD.value= bd.Users;
  }

const code=ref(''); // cet variable va contenir le code générer et sera envoyer par props au composant de vérification
const route=useRouter();
const pseudo=ref();
const mdp=ref();
let formState=ref('connect');
const cnid=ref('');
const Insid=ref('');

//variables d'inscription
const pseudoI=ref();
const entireName=ref();
const mail=ref();
const mdp1=ref();
const mdp2=ref();

// fonction qui génère le code de vérification

function generateCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

function login() {
    localStorage.setItem('token', true)
    const index=baseDD.value.findIndex((e)=>e.name===pseudo.value && e.mot===mdp.value);
    if (index<=-1) {
        alert('Compte inexistant!! inscrivez-vous ou vérifiez vos informations')
    } else {
        alert("connexion réussi")
        route.push({
            name:'home',
            params:{id:index}
        })
    }
}

// fonction d'envois de mail
function sendVerificationMail() {
    const code = generateCode();

    const templateParams = {
      to_email: mail.value,            // remplit {{to_email}}
      userName: pseudoI.value,             // remplit {{userName}}
      confirmation_code: code     // remplit {{confirmation_code}}
    };

    emailjs.send("service_w6g1alp", "template_gjdh2dp", templateParams)
      .then(function(response) {
         alert("✅ Email envoyé à " + mail.value);
         console.log("SUCCESS", response.status, response.text);
      }, function(error) {
         alert("❌ Erreur lors de l'envoi");
         console.error("FAILED", error);
      });
  
}
//fonction d'inscription
function inscription(){
        if ((pseudoI.value!=="") && (entireName.value!=="") && (mail.value!=="") && (mdp1.value!=="") && (mdp2.value!=="")) {
            if (mdp1.value===mdp2.value) {
                const existingPseudo=baseDD.value.findIndex((e)=>e.name===pseudoI.value);
                const existingMail=baseDD.value.findIndex((e)=>e.email===mail.value);
                if (existingPseudo!== -1) {
                    alert("Nom d'utilisateur déjà prit")
                }else if(existingMail!== -1){
                    alert("Mail déjà utilisé")
                }else{ 
                    const newUser={
                        name:pseudoI.value,
                        mot:mdp1.value,
                        nomEntier:entireName.value,
                        email:mail.value,
                    }
                    baseDD.value.push(newUser);
                    localStorage.setItem("base", JSON.stringify(baseDD.value));
                    console.log("base après inscription :", JSON.parse(localStorage.getItem('base')));
                    sendVerificationMail()
                    alert(`Inscription Réussie ${pseudoI.value}`)
                    // formState.value='connect'; ici on revient au formulaire de connexion si inscription réussie
                    route.push({
                        name:'/ConfirmMail'
                    })
                }
                
            } else {
              alert('Mot de passe non conforme')  
            }
        } else {
            alert('Veuillez remplir tout les champs')
        }
    const newUser={}
}


//Provide
provide('val',{
  code:code.value,
  updateCode: ()=>{code.value=''}
})

</script>

<template>
  <!-- <div class="p-4">
    <h1 class="bg-blueColor">Salut</h1>
    <div class="bg-bgColor text-white p-4">Couleur brand</div>
    <div class="bg-redColor text-blueColor p-4">Couleur brand light</div>
    <div class="bg-[#FAFAFBFF]">Couleur brand dark</div>
  </div> -->
  <div class="flex justify-center h-screen w-full border-gray-200 page">
    <div>
      <div>
        <img src="../assets/image/aunthentication/st1removebg-preview.png" alt="">
      </div>
      <div>
        <img src="../assets/image/aunthentication/st2removebg-preview.png" alt="">
      </div>
    </div>
  </div>
  <div class="para">
    <transition name="para">
      <div class="min-w-[400px] flex justify-center rounded-4xl bg-[#eaeaeeaf]">
      <div class="form">
        <div
          class="flex h-[50px] w-[50px] text-center text-2xl p-[60px] bg-blueColor text-white rounded-b-3xl shadow-[1px_5px_50px_rgba(0,0,0,0.25)]">
        </div>
<!-- Formulaire de connexion -->
        <transition name="slide-fadeI">
              <div class="duration-[1s]" v-if="formState === 'connect'">
              <form>
                <div>
                  <input class="bg-bgColor " v-model="pseudo" name="pseudo" type="text" placeholder="Nom d'utilisateur"
                    required>
                </div>
                <div>
                  <input class="bg-bgColor " v-model="mdp" name="mdp" type="password" placeholder="Mot de passe" required>
                </div>
                <div style="display:flex; justify-content: space-between;">
                  <p><a>Mot de passe oublié</a></p>
                  <div @click="formState = 'disconnect'" class="text-[#1717eeee]">S'inscrire?</div>
                </div>
                <button @click.prevent="login" class="bg-blueColor">Se connecter</button>
              </form>
            </div>
        </transition>
<!--fin Formulaire de connexion -->

<!-- Formulaire d'inscription -->
        <transition name="slide-fade">
            <div class="duration-[1s]" v-if="formState === 'disconnect'">
            <form>
              <div>
                <input class="bg-bgColor " v-model="pseudoI" name="pseudo" type="text" placeholder="Nom d'utilisateur"
                  required>
              </div>
              <div>
                <input class="bg-bgColor " v-model="entireName" name="name" type="text" placeholder="Nom complet"
                  required>
              </div>
              <div>
                <input class="bg-bgColor " v-model="mail" name="mdp" type="mail" placeholder="Mail" required>
              </div>
              <div>
                <input class="bg-bgColor " v-model="mdp1" name="mdp" type="password" placeholder="Mot de passe" required>
              </div>
              <div>
                <input class="bg-bgColor " v-model="mdp2" name="mdp2" type="password"
                  placeholder="Confirmez le mot de passe" required>
              </div>
              <div @click="formState = 'connect'" class="self-end mr-[50px] text-[#1717eeee]" :id="Insid">Connexion</div>
              <button @click.prevent="inscription" class="bg-blueColor">Inscription</button>
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
.para-active{
  transition: all 0.5s;
}
/* transition formulaire de connexion */
.slide-fadeI-enter-active {
  /* transition-delay: 0.5s; */
  transition: all 2s;
}

.slide-fadeI-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fadeI-enter-from,
.slide-fadeI-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

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

form input {
  font-size: 1.5rem;
  height: 60px;
  width: 100%;
  border-radius: 15px;
  padding: 12px;
  z-index: 2;
  outline: none;
}

form label {
  font-size: 1.5rem;
  padding: 12px;
}

button {
  font-size: 1.8rem;
  position: relative;
  color: white;
  left: 15%;
  top: 50px;
  width: 70%;

  height: 50px;
  border-bottom-left-radius: 250px;
  border-bottom-right-radius: 250px;
  box-shadow: inset 0 -10px 20px 1px rgba(97, 81, 81, 0.541);
}
</style>
