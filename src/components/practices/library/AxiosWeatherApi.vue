<script setup>
import { ref } from 'vue'
import axios from 'axios'

const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

const handleFetchWeather = async () => {
  if (!API_KEY) {
    errorMessage.value = 'OpenWeatherMap API 키가 설정되지 않았습니다.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: 'Gwangju,KR', appid: API_KEY, units: 'metric', lang: 'kr' },
    })

    weatherData.value = response.data
  } catch (error) {
    console.error('Axios 날씨 조회 실패:', error)
    errorMessage.value = '데이터를 가져오지 못했습니다. API 키와 네트워크를 확인하세요.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="practice-section">
    <h2>⚡ Axios 날씨 통신 검증</h2>
    <button type="button" :disabled="isLoading" @click="handleFetchWeather">
      {{ isLoading ? '데이터 로딩 중...' : '광주 실시간 날씨 불러오기' }}
    </button>
    <div v-if="weatherData" class="result-card">
      <p>📍 위치: <strong>{{ weatherData.name }}</strong></p>
      <p>🌡️ 현재 기온: <strong>{{ Math.round(weatherData.main.temp) }}°C</strong></p>
      <p>☁️ 날씨 상태: <strong>{{ weatherData.weather[0].description }}</strong></p>
      <p>💧 습도: <strong>{{ weatherData.main.humidity }}%</strong></p>
    </div>
    <p v-else-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-else>버튼을 눌러 OpenWeatherMap API 통신을 시작하세요.</p>
  </div>
</template>

<style scoped>
.result-card { margin-top: 12px; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; line-height: 1.8; }
.result-card p { margin: 0; }
.result-card strong { color: #0284c7; }
.error-message { color: #c0392b; }
</style>
