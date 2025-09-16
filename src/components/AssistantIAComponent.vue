<script setup>
import { ref, watch } from 'vue'

const isOpen = ref(false)
const input = ref('')
const messages = ref(JSON.parse(localStorage.getItem('chat-history')) || [])
const loading = ref(false)
const error = ref('')

const OPENROUTERAPI =
  "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"

watch(
  messages,
  (val) => {
    localStorage.setItem('chat-history', JSON.stringify(val))
  },
  { deep: true },
)

function toggleChat() {
  isOpen.value = !isOpen.value
}

async function send() {
  if (!input.value.trim()) return
  const userMsg = input.value.trim()
  messages.value.push({ role: 'user', text: userMsg })
  input.value = ''
  loading.value = true
  error.value = ''

  try {
    // Appel à l'API OpenRouter 
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${OPENROUTERAPI}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "model": 'google/gemma-7b-it',
        "messages": [
          { "role": 'user', "content": userMsg },
        ],
      }),
    })
    console.log( response.status)
    if (!response.ok) {
      const errMsg = await response.text()
      console.error("Erreur API:", errMsg)
      throw new Error('Erreur API: ' + errMsg)
    }
    const data = await response.json()
    console.log("Réponse API:", data)
    const reply = data.choices?.[0]?.message?.content || "Je n'ai pas compris votre question."
    messages.value.push({ role: 'ai', text: reply })
  } catch (err) {
    console.error("Erreur lors de la génération de la réponse:", err)
    error.value = "Erreur lors de la connexion à l'IA ou génération de la réponse."
    messages.value.push({ role: 'ai', text: '❌ Erreur lors de la génération de la réponse.' })
  } finally {
    loading.value = false
  }
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
        <div v-if="error" class="text-red-600 text-sm mb-2">{{ error }}</div>
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
          :disabled="loading"
        />
        <button @click="send" class="px-2 bg-blue-600 text-white rounded" :disabled="loading">
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
