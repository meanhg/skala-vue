<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'
const items = ref([])
const textInput = ref('')

const handleRead = async () => {
  try {
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
  } catch (error) {
    console.error('GET 실패:', error)
  }
}

const handleCreate = async () => {
  if (!textInput.value.trim()) {
    return
  }

  try {
    const response = await axios.post(BASE_URL, { title: textInput.value, body: '샘플 내용', userId: 1 })
    items.value.unshift(response.data)
    textInput.value = ''
  } catch (error) {
    console.error('POST 실패:', error)
  }
}

const handleUpdate = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, { title: '✨ 수정된 타이틀 데이터', body: '수정 완료', userId: 1 })
    const index = items.value.findIndex((item) => item.id === id)

    if (index !== -1) {
      items.value[index] = response.data
    }
  } catch (error) {
    console.error('PUT 실패:', error)
  }
}

const handleDelete = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
    items.value = items.value.filter((item) => item.id !== id)
  } catch (error) {
    console.error('DELETE 실패:', error)
  }
}

onMounted(handleRead)
</script>

<template>
  <div class="practice-section">
    <h2>⚡ Axios JSON CRUD 예제</h2>
    <div class="input-zone">
      <input v-model="textInput" placeholder="저장할 텍스트를 입력하세요" />
      <button type="button" class="btn-post" @click="handleCreate">POST (추가)</button>
    </div>
    <ul class="item-list">
      <li v-for="item in items" :key="item.id" class="item-card">
        <div>
          <span class="id-tag">ID: {{ item.id }}</span>
          <p>{{ item.title }}</p>
        </div>
        <div class="btn-group">
          <button type="button" class="btn-put" @click="handleUpdate(item.id)">PUT (수정)</button>
          <button type="button" class="btn-delete" @click="handleDelete(item.id)">DEL (삭제)</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.input-zone, .btn-group { display: flex; gap: 8px; }
.input-zone { margin-bottom: 20px; }
input { flex: 1; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; }
button { padding: 8px 12px; border: none; border-radius: 6px; color: white; cursor: pointer; font-size: 12px; font-weight: bold; }
.btn-post { background: #22c55e; }
.btn-put { background: #eab308; }
.btn-delete { background: #ef4444; }
.item-list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.item-card { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; }
.item-card p { margin: 4px 0 0; }
.id-tag { color: #64748b; font-size: 11px; font-weight: bold; }
</style>
