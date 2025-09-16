

<script setup>
import { ref, onMounted, watch } from "vue"
import { pipeline } from "@xenova/transformers"

const isOpen = ref(false)
const input = ref("")
const messages = ref(JSON.parse(localStorage.getItem("chat-history")) || [])
const loading = ref(false)

let generator = null

// Charger le modèle Bloom
onMounted(async () => {
  try {
    loading.value = true
    generator = await pipeline("text-generation", "Xenova/distilgpt2")
  } catch (err) {
    console.error("Erreur de chargement du modèle :", err)
    alert("Impossible de charger le modèle. Vérifie ta connexion ou l’URL.")
  } finally {
    loading.value = false
  }
})

// Sauvegarde de l’historique
watch(messages, (val) => {
  localStorage.setItem("chat-history", JSON.stringify(val))
}, { deep: true })

// Envoyer message
async function send() {
  if (!input.value.trim() || !generator) return
  const userMsg = input.value.trim()
  messages.value.push({ role: "user", text: userMsg })
  input.value = ""
  loading.value = true

  const prompt = messages.value
    .map(m => `${m.role === "user" ? "Utilisateur" : "IA"}: ${m.text}`)
    .join("\n") + "\nIA:"

  const output = await generator(prompt, {
    max_new_tokens: 60,
    do_sample: true,
    top_k: 50,
    top_p: 0.95,
  })

  const reply = output[0].generated_text.split("IA:").pop().trim()
  messages.value.push({ role: "ai", text: reply })
  loading.value = false
}

function toggleChat() {
  isOpen.value = !isOpen.value
}
</script>


<template>
  <div>
    <!-- Bulle flottante -->
    <div
      class="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white cursor-pointer shadow-lg hover:bg-blue-700"
      @click="toggleChat"
    >
      💬
    </div>

    <!-- Fenêtre de chat -->
    <div
      v-if="isOpen"
      class="fixed bottom-24 right-6 w-80 h-96 bg-white border rounded-lg shadow-xl flex flex-col"
    >
      <!-- Header -->
      <div class="bg-blue-600 text-white p-2 flex justify-between items-center rounded-t-lg">
        <span>Assistant IA</span>
        <button @click="toggleChat">✖</button>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-2 bg-gray-50">
        <div v-for="(msg, i) in messages" :key="i" class="mb-2">
          <div v-if="msg.role === 'user'" class="text-right">
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg inline-block">
              {{ msg.text }}
            </span>
          </div>
          <div v-else class="text-left">
            <span class="bg-green-100 text-green-800 px-2 py-1 rounded-lg inline-block">
              {{ msg.text }}
            </span>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="p-2 border-t flex gap-2">
        <input
          v-model="input"
          placeholder="Écrire..."
          class="flex-1 p-1 border rounded"
          @keyup.enter="send"
        />
        <button
          @click="send"
          class="px-2 bg-blue-600 text-white rounded"
          :disabled="loading"
        >
          ➤
        </button>
      </div>

      <!-- Chargement -->
      <div v-if="loading" class="p-1 text-center text-sm text-gray-500">⏳ Réponse en cours...</div>
    </div>
  </div>
</template>


<style>
/* Ajuster le z-index pour que la bulle soit toujours visible */
.fixed {
  z-index: 9999;
}
</style>
