<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

const mockDetails = {
  city_01: { name: '부산광역시', temp: 28, status: '맑음', humidity: '55%', wind: '2.5m/s' },
  city_02: { name: '대구광역시', temp: 30, status: '맑음', humidity: '48%', wind: '1.8m/s' },
  city_03: { name: '인천광역시', temp: 24, status: '흐림', humidity: '72%', wind: '3.6m/s' },
  city_04: { name: '광주광역시', temp: 26, status: '구름 조금', humidity: '61%', wind: '2.2m/s' },
  city_05: { name: '대전광역시', temp: 23, status: '비', humidity: '85%', wind: '4.1m/s' },
  city_06: { name: '울산광역시', temp: 25, status: '맑음', humidity: '58%', wind: '3.0m/s' },
}

const cityData = ref(null)
const forecastItems = ref([])
const additionalWeather = ref(null)
const forecastError = ref('')

const cityLocations = {
  city_01: { query: 'Busan,KR', latitude: 35.1796, longitude: 129.0756 },
  city_02: { query: 'Daegu,KR', latitude: 35.8714, longitude: 128.6014 },
  city_03: { query: 'Incheon,KR', latitude: 37.4563, longitude: 126.7052 },
  city_04: { query: 'Gwangju,KR', latitude: 35.1595, longitude: 126.8526 },
  city_05: { query: 'Daejeon,KR', latitude: 36.3504, longitude: 127.3845 },
  city_06: { query: 'Ulsan,KR', latitude: 35.5384, longitude: 129.3114 },
}

const displayTemp = computed(() => {
  if (!cityData.value) {
    return 0
  }

  if (configStore.unit === 'fahrenheit') {
    return Math.round((cityData.value.temp * 9) / 5 + 32)
  }

  return cityData.value.temp
})

const formatTemp = (temp) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32)
  }

  return Math.round(temp)
}

const fetchAdditionalWeather = async (id) => {
  const location = cityLocations[id]

  if (!location || !API_KEY) {
    forecastError.value = '예보 데이터를 불러올 수 없습니다.'
    return
  }

  try {
    const [forecastResponse, openMeteoResponse] = await Promise.all([
      axios.get(FORECAST_URL, {
        params: { q: location.query, appid: API_KEY, units: 'metric', lang: 'kr', cnt: 4 },
      }),
      axios.get('https://api.open-meteo.com/v1/forecast', {
        params: { latitude: location.latitude, longitude: location.longitude, current: 'apparent_temperature,wind_speed_10m' },
      }),
    ])

    forecastItems.value = forecastResponse.data.list
    additionalWeather.value = openMeteoResponse.data.current
  } catch (error) {
    console.error('추가 날씨 API 조회 실패:', error)
    forecastError.value = '예보 또는 보조 관측 데이터를 불러오지 못했습니다.'
  }
}

onMounted(async () => {
  const id = route.params.cityId

  if (mockDetails[id]) {
    cityData.value = mockDetails[id]
    await fetchAdditionalWeather(id)
  }
})
</script>

<template>
  <div class="detail-container">
    <h3>📊 지역별 상세 기상 관측 정보</h3>
    <hr />
    <div v-if="cityData" class="info-card">
      <h4>📍 지정 지역: {{ cityData.name }}</h4>
      <p>실시간 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong></p>
      <p>기상 현황: {{ cityData.status }}</p>
      <p>대기 습도: {{ cityData.humidity }}</p>
      <p>현재 풍속: {{ cityData.wind }}</p>
    </div>
    <p v-else>해당 지역의 상세 데이터 장부가 존재하지 않습니다.</p>

    <section v-if="forecastItems.length" class="forecast-card">
      <h4>🗓️ OpenWeatherMap 단기 예보</h4>
      <ul>
        <li v-for="item in forecastItems" :key="item.dt">
          {{ item.dt_txt }} · {{ formatTemp(item.main.temp) }}{{ configStore.unitSymbol }} · {{ item.weather[0].description }}
        </li>
      </ul>
    </section>

    <section v-if="additionalWeather" class="additional-card">
      <h4>🌡️ Open-Meteo 보조 관측</h4>
      <p>체감 온도: {{ formatTemp(additionalWeather.apparent_temperature) }}{{ configStore.unitSymbol }}</p>
      <p>풍속: {{ additionalWeather.wind_speed_10m }} km/h</p>
    </section>
    <p v-if="forecastError" class="forecast-error">{{ forecastError }}</p>
    <button type="button" class="back-btn" @click="router.push('/')">← 메인 대시보드로 돌아가기</button>
  </div>
</template>

<style scoped>
.detail-container { padding: 4px; }
.info-card { margin: 15px 0; padding: 15px; border-radius: 6px; background: #f1f2f6; }
.info-card p { margin: 7px 0; }
.back-btn { padding: 8px 12px; border: none; border-radius: 4px; background: #2c3e50; color: white; cursor: pointer; }
.forecast-card, .additional-card { margin: 15px 0; padding: 15px; border-radius: 6px; background: #f8fafc; }
.forecast-card h4, .additional-card h4 { margin: 0 0 10px; }
.forecast-card ul { margin: 0; padding-left: 20px; }
.forecast-card li, .additional-card p { margin: 6px 0; }
.forecast-error { color: #c0392b; }
</style>
