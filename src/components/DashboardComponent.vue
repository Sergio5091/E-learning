<script setup>
import ImageDashboard from '@/assets/image/Dasboard/profil.jpg'
import HistoryWatch from './HistoryWatch.vue';
import { ref, onMounted, computed } from 'vue';
import allCourses from '@/newCourses.json';
//image reactive avec une ilage par defaut
const profileImag=ref("https://cdn-icons-png.flaticon.com/512/1946/1946429.png")

const Apear =ref(false)
const DisApear = ref(true)

 function DisApeared() {
    DisApear.value= false
    Apear.value= true
 }


//Une functon pour choisir l'image pour mettre a jr le profilI avec URL
const previewImage = (event)=>{
    const file = event.target.files[0]
    if (file) {
        profileImag.value = URL.createObjectURL(file)
    }
    localStorage.setItem("image",previewImage)
}

onMounted(()=>{
    localStorage.getItem("image")
})
const gadgesDiv = ref("gadgesDiv")

const courseHistory = ref([]);

onMounted(() => {
  const history = JSON.parse(localStorage.getItem('courseHistory') || '{}');
  courseHistory.value = Object.values(history);
});

const completedCoursesCount = computed(() => {
  return courseHistory.value.filter(c => c.statut === 'Terminé').length;
});

const totalLearningHours = computed(() => {
    let totalMinutes = 0;
    courseHistory.value.forEach(historyCourse => {
        const courseDetails = allCourses.courses.find(c => c.id === historyCourse.id);
        if (courseDetails && courseDetails.duration) {
            const durationStr = courseDetails.duration;
            let courseMinutes = 0;
            if (durationStr.includes('h')) {
                const parts = durationStr.split('h');
                courseMinutes += parseInt(parts[0], 10) * 60;
                if (parts[1] && parts[1].includes('min')) {
                    courseMinutes += parseInt(parts[1].replace('min', '').trim(), 10);
                }
            } else if (durationStr.includes('min')) {
                courseMinutes += parseInt(durationStr.replace('min', '').trim(), 10);
            }
            totalMinutes += courseMinutes;
        }
    });
    return Math.floor(totalMinutes / 60);
});

</script>

<template>
    <div class="m-20 px-10">

        <div >
            <h1 class="font-bold text-[30px] pt-5 ">Mon profil</h1>
            <!-- <p class="font-bold text-[20px]" >Détails de l'utilisateur</p> -->
            <div class=" px-10 my-10 border-para1Color/opacity-20 py-2 shadow   rounded-[20px]">
                <div class="">
                    <!-- <img class="w-22 h-22 rounded-[50px]" :src="ImageDashboard" alt="ImageDashboard"> -->
                     <!-- flex gap-6 items-center -->
                        <div class="w-28">
                        <!-- input file caché -->
                        <input id="upload" type="file" accept="image/*" class="hidden w-30"  @change="previewImage"/>

                        <!-- image cliquable -->
                            <label for="upload" class="cursor-pointer w-[10px]">
                                <img :src="profileImag"
                                    class="w-22 h-22 rounded-[50px]" />
                            </label>
                        </div>

                </div>
                <div>
                    <h2 class="font-bold text-[20px] mb-1">Alexandre Dubois</h2>
                    <div>
                        <small class="text-para1Color ">alexandre.dubois@edumaster.com</small>
                    </div>
                    <div class="border-b-[1px] border-para1Color/20 pt-1 pb-2"></div>
                    <button class="border-[1px] border-[#DEE1E6FF] font-medium text-[12px] px-[15px] py-[8px] my-[5px] rounded-[5px] mt-[10px] cursor-pointer" v-if="DisApear" @click="DisApeared">Modifier le profil</button>
                </div>
                <form class="w-[325px] grid gap-5 my-[20px] relative pb-6" v-if="Apear" >
                    <div class="flex justify-between items-center">
                        <label for="name" class="font-medium">Nom:</label>
                        <input class="border-[1px] w-[230px] outline-none rounded border-gray/10 px-[5px] py-[4px] border-para1Color/20" type="text" name="" id="name ">
                    </div>
                    <div class="flex justify-between">

                        <label for="name" class="font-medium">Prenom:</label>
                        <input class="border-[1px] w-[230px] border-para1Color/20 rounded outline-none px-[5px] py-[4px] items-center" type="text" name="" id="name">
                    </div>
                    <div class="w-[100px] text-center flex justify-center px-5 py-[3px] absolute bottom-[-20px] right-0 bg-blue-500/8 border-[1px] rounded-[10px] border-para1Color/10 shadow ">

                        <input type="submit" class="text-center font-medium" value="Enregister">
                    </div>
                </form>
                
            </div>
            <div>
                <!-- Statistiques -->
                <h2 class="font-bold text-[20px] my-5">Statistiques d'apprentissage</h2>
                <div class="flex   text-center items-center gap-5 ">
                    <div class=" px-[60px] rounded-[8px] border-para1Color py-[15px] w-[320px] bg-[#FFFFFFFF] shadow shadow-black/35 h-[152px]">
                        <div class="flex justify-center items-center ">
                            <svg class="text-blueColor text-center" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q8 0 15 1.5t14 4.5l-74 74H200v560h560v-266l80-80v346q0 33-23.5 56.5T760-120H200Zm261-160L235-506l56-56 170 170 367-367 57 55-424 424Z"/></svg>
                        </div>
                        <span class="text-blueColor">{{ completedCoursesCount }}</span><span class="text-para1Color text-[12px]">COURS TERMINÉS</span>
                    </div>
                    <div class=" px-[60px] rounded-[8px]  py-[15px] w-[320px] h-[152px] bg-[#FFFFFFFF] shadow shadow-black/35 h-[152px]">
                        <div class="flex justify-center items-center ">
    
                            <svg class="text-blueColor flex-col" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"  fill="currentColor"><path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z"/></svg>
                        </div>
                        <span class="text-blueColor">{{ totalLearningHours }}</span>
                        <span class="text-para1Color text-[12px]">Heures d'apprentissage</span>
                    </div>
                    <div class=" px-[60px] rounded-[8px] shadow shadow-black/35 h-[152px]  py-[15px] w-[320px] h-[152px] bg-[#FFFFFFFF]">
                        <div class="flex justify-center items-center ">
    
                            <svg class="text-blueColor" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"  fill="currentColor"><path d="M480-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z"/></svg>
                        </div>
                        <span class="text-blueColor">8</span>
                        <span class="text-para1Color text-[12px]">Badges obtenus</span>
                    </div>
                </div>
            </div>
    
            <!-- Bade -->
             <div>
                <h2 class="font-bold text-[22px] my-5">Badges obtenus</h2>
                <div class="flex gap-4  items-center text-center" :class="gadgesDiv">
                    <div class="bg-bgColor px-5 py-3 rounded-[10px] shadow-xs shadow-black/15 w-[258px] h-[144px]">
                        <div class="flex justify-center items-center text-redColor"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M800-80H560q-17 0-28.5-11.5T520-120v-240q0-17 11.5-28.5T560-400h240q17 0 28.5 11.5T840-360v80l80-80v240l-80-80v80q0 17-11.5 28.5T800-80ZM480-480Zm2-140q-58 0-99 41t-41 99q0 48 27 84t71 50v-90q-8-8-13-20.5t-5-23.5q0-25 17.5-42.5T482-540q25 0 42 17.5t17 42.5h81q0-58-41-99t-99-41ZM370-80l-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v13.5h-80q-1-19-3-33.5t-6-27.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q24 25 54 42t65 22v184h-70Z"/></svg></div>
                        <h2>Apprenti Développeur</h2>
                        <p>Terminez 5 cours de développement</p>
                    </div>
    
                    <div class="bg-bgColor px-5 py-3 rounded-[10px] shadow-xs shadow-black/15 w-[258px] h-[144px]">
                        <div class="flex justify-center items-center text-redColor "><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm80-200v-380l200-200v400L560-360Zm-160 65v-396q-33-14-68.5-21.5T260-720q-37 0-72 7t-68 21v397q35-13 69.5-19t70.5-6q36 0 70.5 6t69.5 19Zm0 0v-396 396Z"/></svg></div>
                        <h2>Maître du Design</h2>
                        <p>Terminez 5 cours de design</p>
                    </div>
    
                    <div class="bg-bgColor px-5 py-3 rounded-[10px] shadow-xs shadow-black/15 w-[258px] h-[144px]">
                        <div class="flex justify-center items-center text-redColor"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v320q0 33-23.5 56.5T800-80H480Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 23 3 45t9 43l148-148 132 111 131-131h-63v-80h200v200h-80v-63L456-320 325-432 207-314q42 69 113.5 111.5T480-160Zm300 20q17 0 28.5-11.5T820-180q0-17-11.5-28.5T780-220q-17 0-28.5 11.5T740-180q0 17 11.5 28.5T780-140ZM455-480Z"/></svg></div>
                        <h2>Analyste de Données</h2>
                        <p>Terminez 3 cours d'analyse de données</p>
                    </div>
                    <div class="bg-bgColor px-5 py-3 rounded-[10px] shadow-xs shadow-black/15 w-[258px] h-[144px]">
                        <div class="flex justify-center items-center text-redColor"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M323-160q-11 0-20.5-5.5T288-181l-78-139h58l40 80h92v-40h-68l-40-80H188l-57-100q-2-5-3.5-10t-1.5-10q0-4 5-20l57-100h104l40-80h68v-40h-92l-40 80h-58l78-139q5-10 14.5-15.5T323-800h97q17 0 28.5 11.5T460-760v160h-60l-40 40h100v120h-88l-40-80h-92l-40 40h108l40 80h112v200q0 17-11.5 28.5T420-160h-97Zm217 0q-17 0-28.5-11.5T500-200v-200h112l40-80h108l-40-40h-92l-40 80h-88v-120h100l-40-40h-60v-160q0-17 11.5-28.5T540-800h97q11 0 20.5 5.5T672-779l78 139h-58l-40-80h-92v40h68l40 80h104l57 100q2 5 3.5 10t1.5 10q0 4-5 20l-57 100H668l-40 80h-68v40h92l40-80h58l-78 139q-5 10-14.5 15.5T637-160h-97Z"/></svg></div>
                        <h2>Star de l'IA</h2>
                        <p>Terminez 2 cours d'intelligence artificielle</p>
                    </div>
                    
                </div>
             </div>
        </div>
        <div>
            <HistoryWatch/>
        </div>
    </div>
</template>

<style scoped>
.gadgesDiv h2{
   
    font-weight: 600;
}
.gadgesDiv{
    flex-wrap: wrap;
}
.gadgesDiv p{
    color:#565D6DFF ;
    font-size: 14px;
    
}
span:first-of-type{
    font-weight: 700;
    font-size: 35px;
    display: block;
}
.inputImg{
    position: absolute;

}
</style>
