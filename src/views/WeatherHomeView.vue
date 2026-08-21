<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'

const router = useRouter()
const route = useRoute()
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

const weatherList = ref([
  { id: 'city_01', name: '부산', temp: 28, status: '맑음' },
  { id: 'city_02', name: '대구', temp: 30, status: '맑음' },
  { id: 'city_03', name: '인천', temp: 24, status: '흐림' },
  { id: 'city_04', name: '광주', temp: 26, status: '구름 조금' },
  { id: 'city_05', name: '대전', temp: 23, status: '비' },
  { id: 'city_06', name: '울산', temp: 25, status: '맑음' },
])

const searchQuery = ref('')
const selectedCity = ref(null)
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const isLoading = ref(false)
const apiError = ref('')

const cityQueries = [
  { id: 'city_01', name: '부산', query: 'Busan,KR' },
  { id: 'city_02', name: '대구', query: 'Daegu,KR' },
  { id: 'city_03', name: '인천', query: 'Incheon,KR' },
  { id: 'city_04', name: '광주', query: 'Gwangju,KR' },
  { id: 'city_05', name: '대전', query: 'Daejeon,KR' },
  { id: 'city_06', name: '울산', query: 'Ulsan,KR' },
]

const fetchRealTimeWeather = async () => {
  if (!API_KEY) {
    apiError.value = 'OpenWeatherMap API 키가 설정되지 않았습니다.'
    return
  }

  isLoading.value = true
  apiError.value = ''

  try {
    const responses = await Promise.all(
      cityQueries.map((city) =>
        axios.get(CURRENT_WEATHER_URL, {
          params: { q: city.query, appid: API_KEY, units: 'metric', lang: 'kr' },
        }),
      ),
    )

    weatherList.value = responses.map((response, index) => ({
      id: cityQueries[index].id,
      name: cityQueries[index].name,
      temp: Math.round(response.data.main.temp),
      status: response.data.weather[0].description,
    }))
  } catch (error) {
    console.error('OpenWeatherMap 현재 날씨 조회 실패:', error)
    apiError.value = '실시간 날씨를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }

  await fetchRealTimeWeather()
})

watch(searchQuery, (newQuery) => {
  router.push({
    path: route.path,
    query: { search: newQuery || undefined },
  })
})

watch(selectedCityInfo, (newInfo) => {
  console.log(`👁️‍🗨️ [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newInfo}"`)
})

watchEffect(() => {
  console.log(`🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`)
})

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((item) => item.name.includes(query))
})

const selectCity = (city) => {
  selectedCity.value = city
  selectedCityInfo.value = `${city.name}이(가) 선택되었습니다.`
}

const handleDetailJump = (city) => {
  router.push(`/weather/${city.id}`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(value) => (searchQuery = value)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황</h3>
      <p v-if="isLoading" class="loading">🔄 실시간 날씨 데이터를 불러오는 중입니다.</p>
      <p v-else-if="apiError" class="api-error">{{ apiError }}</p>
      <WeatherCard
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city-item="item"
        :selected-city="selectedCity"
        @select-card="selectCity"
        @click-detail="handleDetailJump"
      />
      <p v-if="!isLoading && filteredWeatherList.length === 0" class="empty">😭 검색 결과와 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.dashboard-wrapper { width: min(100%, 600px); margin: 0 auto; }
.dashboard-wrapper h3 { margin: 0 0 10px; color: #64748b; font-size: .9rem; }
.empty { margin: 0; padding: 10px 0; color: #e74c3c; text-align: center; }
.loading { padding: 10px 0; color: #3498db; font-weight: bold; text-align: center; }
.api-error { padding: 10px; border-radius: 6px; background: #fff5f5; color: #c0392b; text-align: center; }
.status-bar { padding: 10px; border-radius: 6px; background: #e8f5e9; color: #2e7d32; font-weight: bold; text-align: center; }
</style>
