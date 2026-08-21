<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const mockDetails = {
  city_01: { name: '부산광역시', temp: 28, status: '맑음', humidity: '55%', wind: '2.5m/s' },
  city_02: { name: '대구광역시', temp: 30, status: '맑음', humidity: '48%', wind: '1.8m/s' },
  city_03: { name: '인천광역시', temp: 24, status: '흐림', humidity: '72%', wind: '3.6m/s' },
  city_04: { name: '광주광역시', temp: 26, status: '구름 조금', humidity: '61%', wind: '2.2m/s' },
  city_05: { name: '대전광역시', temp: 23, status: '비', humidity: '85%', wind: '4.1m/s' },
  city_06: { name: '울산광역시', temp: 25, status: '맑음', humidity: '58%', wind: '3.0m/s' },
}

const cityData = ref(null)

onMounted(() => {
  const id = route.params.cityId

  if (mockDetails[id]) {
    cityData.value = mockDetails[id]
  }
})
</script>

<template>
  <div class="detail-container">
    <h3>📊 지역별 상세 기상 관측 정보</h3>
    <hr />
    <div v-if="cityData" class="info-card">
      <h4>📍 지정 지역: {{ cityData.name }}</h4>
      <p>실시간 기온: <strong>{{ cityData.temp }}°C</strong></p>
      <p>기상 현황: {{ cityData.status }}</p>
      <p>대기 습도: {{ cityData.humidity }}</p>
      <p>현재 풍속: {{ cityData.wind }}</p>
    </div>
    <p v-else>해당 지역의 상세 데이터 장부가 존재하지 않습니다.</p>
    <button type="button" class="back-btn" @click="router.push('/')">← 메인 대시보드로 돌아가기</button>
  </div>
</template>

<style scoped>
.detail-container { padding: 4px; }
.info-card { margin: 15px 0; padding: 15px; border-radius: 6px; background: #f1f2f6; }
.info-card p { margin: 7px 0; }
.back-btn { padding: 8px 12px; border: none; border-radius: 4px; background: #2c3e50; color: white; cursor: pointer; }
</style>
