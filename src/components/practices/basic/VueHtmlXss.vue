<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const message = ref('')

function showMessage() {
  message.value = inputValue.value
}
</script>

<template>
  <div class="practice-section">
    <h2>v-html XSS 학습</h2>
    <p><strong>주의:</strong> 사용자 입력을 v-html에 그대로 전달하면 XSS 위험이 있습니다. 신뢰할 수 있는 HTML만 사용하세요.</p>
    <input v-model="inputValue" placeholder="내용을 입력하세요" />
    <button @click="showMessage">확인</button>
    <div v-html="message"></div>
  </div>
</template>
