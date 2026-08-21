<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

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

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((item) => item.name.includes(query))
})

watch(selectedCityInfo, (newInfo) => {
  console.log(`👁️‍🗨️ [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newInfo}"`)
})

watchEffect(() => {
  console.log(`🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`)
})

const selectCity = (city) => {
  selectedCity.value = city
  selectedCityInfo.value = `${city.name}이(가) 선택되었습니다.`
  window.alert(`${city.name}이(가) 선택되었습니다.`)
}

const showDetail = (city) => {
  selectedCityInfo.value = `${city.name} 상세보기: ${city.status}, ${city.temp}°C`
  window.alert(`${city.name}의 현재 날씨는 ${city.status} 상태입니다.`)
}
</script>

<template>
  <section class="weather-component">
    <h2>🌤️ 과제 3: 날씨 (컴포넌트)</h2>

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
        @click-detail="showDetail"
      />

      <p v-if="filteredWeatherList.length === 0" class="empty">😭 검색 결과와 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <div class="status-bar" aria-live="polite">
      {{ selectedCityInfo }}
    </div>
  </section>
</template>

<style scoped>
.weather-component { width: min(100%, 600px); margin: 24px auto; padding: 1.25rem; background: #fff; box-shadow: 0 8px 26px rgb(35 67 96 / 12%); color: #313b47; }
.weather-component > h2 { margin: 0 0 .8rem; padding-bottom: .6rem; border-bottom: 1px solid #edf0f2; font-size: 1rem; font-weight: 800; }
.search-inner h3, .base-dashboard-card > h3 { margin: 0 0 8px; color: #64748b; font-size: .9rem; }
.search-inner input { width: 100%; padding: .45rem .5rem; border: 1px solid #aeb7c2; background: white; }
.search-inner p { margin: 8px 0 0; font-size: .8rem; color: #64748b; }
.empty { margin: 0; padding: .8rem; text-align: center; color: #e74c3c; }
.status-bar { padding: .65rem; border-radius: 3px; background: #e4f6e8; color: #52a56b; font-size: .8rem; font-weight: 700; text-align: center; }
</style>
