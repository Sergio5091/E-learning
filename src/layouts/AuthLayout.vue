<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
import bd from "../Users.json";
let baseDD=computed(()=>{
    if(localStorage.getItem('base')){
        const stored=localStorage.getItem('base');
       return JSON.parse(stored); 
    } else{
        return bd.Users
    }
})


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
    code= Math.random().toString(36).substring(2, 10).toUpperCase();
    return code
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

    emailjs.send("TON_SERVICE_ID", "TON_TEMPLATE_ID", templateParams)
      .then(function(response) {
         alert("✅ Email envoyé à " + email);
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
                    alert(`Inscription Réussie ${pseudoI.value}`)
                    // formState.value='connect'; ici on revient au formulaire de connexion si inscription réussie
                }
                
            } else {
              alert('Mot de passe non conforme')  
            }
        } else {
            alert('Veuillez remplir tout les champs')
        }
    const newUser={}
}


</script>

<template>
  <!-- <div class="p-4">
    <h1 class="bg-blueColor">Salut</h1>
    <div class="bg-bgColor text-white p-4">Couleur brand</div>
    <div class="bg-redColor text-blueColor p-4">Couleur brand light</div>
    <div class="bg-[#FAFAFBFF]">Couleur brand dark</div>
  </div> -->
  <div class="flex justify-center h-screen w-full border-gray-200 page">
    <div class="auto">
      <div>
        <img src="./assets/image/aunthentication/st1removebg-preview.png" alt="">
      </div>
      <div>
        <img src="./assets/image/aunthentication/st2removebg-preview.png" alt="">
      </div>
    </div>
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
.auto{
  margin:auto;
}
</style>
