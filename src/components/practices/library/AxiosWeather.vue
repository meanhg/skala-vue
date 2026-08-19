<script setup>
import { computed, ref } from 'vue'

// 대한민국 광역시 6곳의 목 데이터입니다. 데이터 추가 기능은 다음 과제에서 확장합니다.
const weatherList = ref([
  { id: 'city_01', name: '부산', temp: 28, status: '맑음' },
  { id: 'city_02', name: '대구', temp: 30, status: '맑음' },
  { id: 'city_03', name: '인천', temp: 24, status: '흐림' },
  { id: 'city_04', name: '광주', temp: 26, status: '구름 조금' },
  { id: 'city_05', name: '대전', temp: 23, status: '비' },
  { id: 'city_06', name: '울산', temp: 25, status: '맑음' },
])

const keyword = ref('')
const selectedCity = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const filteredWeatherList = computed(() => {
  const query = keyword.value.trim()
  return weatherList.value.filter((city) => city.name.includes(query))
})

const selectCity = (city) => {
  selectedCity.value = city.name
  selectedCityInfo.value = `${city.name}이(가) 선택되었습니다.`
  window.alert(`${city.name}이(가) 선택되었습니다.`)
}

const showDetail = (city) => {
  selectedCityInfo.value = `${city.name} 상세보기: ${city.status}, ${city.temp}°C`
  window.alert(`${city.name}의 현재 날씨는 ${city.status} 상태입니다.`)
}
</script>

<template>
  <section class="weather-mockup">
    <h2>🌤️ 과제 1: 날씨 (Mockup)</h2>
    <div class="search-area">
      <label for="city-search">🔍 도시 검색</label>
      <input id="city-search" v-model="keyword" type="search" placeholder="검색할 도시 이름" />
      <small>검색된 도시: {{ filteredWeatherList.length }}곳</small>
    </div>

    <section class="list-panel" aria-labelledby="weather-list-title">
      <h3 id="weather-list-title">🏙️ 지역별 날씨 현황</h3>
      <div class="weather-list">
        <article
          v-for="city in filteredWeatherList"
          :key="city.id"
          class="weather-card"
          :class="{ selected: selectedCity === city.name }"
          tabindex="0"
          @click="selectCity(city)"
          @keydown.enter="selectCity(city)"
        >
          <div>
            <h4>🏙️ {{ city.name }} 날씨 현황</h4>
            <p>날씨: {{ city.status }}</p>
            <p>현재 기온: {{ city.temp }}°C</p>
            <span v-if="city.temp >= 25" class="badge hot">🫠 더움 (25도 이상)</span>
            <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>
          </div>
          <button type="button" @click.stop="showDetail(city)">상세보기</button>
        </article>
      </div>
      <p v-if="filteredWeatherList.length === 0" class="empty">검색 결과가 없습니다.</p>
    </section>

    <footer aria-live="polite">{{ selectedCityInfo }}</footer>
  </section>
</template>

<style scoped>
.weather-mockup { width: min(100%, 380px); margin: 24px auto; padding: 1.25rem; background: #fff; box-shadow: 0 8px 26px rgb(35 67 96 / 12%); color: #313b47; }
.weather-mockup h2 { margin: 0 0 .8rem; padding-bottom: .6rem; border-bottom: 1px solid #edf0f2; font-size: 1rem; font-weight: 800; }
.search-area { display: grid; gap: .35rem; padding: .7rem; border-radius: 4px; background: #f4f6f8; }
.search-area label { color: #64748b; font-size: .74rem; font-weight: 700; }
.search-area input { width: 100%; padding: .4rem .5rem; border: 1px solid #aeb7c2; background: white; font-size: .76rem; }
.search-area small { color: #8a96a3; font-size: .65rem; }
.list-panel { margin-top: .8rem; padding: .7rem; border-radius: 4px; background: #f4f6f8; }
.list-panel > h3 { margin: 0 0 .55rem; color: #64748b; font-size: .74rem; font-weight: 700; }
.weather-list { display: grid; gap: .5rem; }
.weather-card { display: flex; align-items: center; justify-content: space-between; gap: .5rem; padding: .6rem; border: 1px solid #e1e6eb; border-radius: 3px; background: #fff; cursor: pointer; }
.weather-card:hover, .weather-card:focus, .weather-card.selected { border-color: #72b9df; background: #f0f9ff; outline: none; }
.weather-card h4, .weather-card p { margin: 0; line-height: 1.4; }
.weather-card h4 { font-size: .72rem; font-weight: 700; }
.weather-card p { font-size: .67rem; }
.weather-card button { padding: .25rem .4rem; border: 1px solid #aeb7c2; border-radius: 2px; background: #fff; color: #4b5563; font-size: .62rem; cursor: pointer; white-space: nowrap; }
.badge { display: inline-block; margin-top: .22rem; padding: .14rem .28rem; border-radius: 2px; color: white; font-size: .59rem; }
.hot { background: #fb6c72; }
.cool { background: #56a9e8; }
.empty { margin: 0; padding: .8rem; text-align: center; color: #6b7280; font-size: .7rem; }
footer { margin-top: .8rem; padding: .55rem; border-radius: 3px; background: #e4f6e8; color: #52a56b; font-size: .67rem; font-weight: 700; text-align: center; }

@media (max-width: 480px) {
  .weather-mockup { width: 100%; }
}
</style>
