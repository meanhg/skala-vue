<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'

const router = useRouter()
const route = useRoute()

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

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
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
      <WeatherCard
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city-item="item"
        :selected-city="selectedCity"
        @select-card="selectCity"
        @click-detail="handleDetailJump"
      />
      <p v-if="filteredWeatherList.length === 0" class="empty">😭 검색 결과와 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.dashboard-wrapper { width: min(100%, 600px); margin: 0 auto; }
.dashboard-wrapper h3 { margin: 0 0 10px; color: #64748b; font-size: .9rem; }
.empty { margin: 0; padding: 10px 0; color: #e74c3c; text-align: center; }
.status-bar { padding: 10px; border-radius: 6px; background: #e8f5e9; color: #2e7d32; font-weight: bold; text-align: center; }
</style>
