<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
  selectedCity: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
const isSelected = computed(() => props.selectedCity?.id === props.cityItem.id)
const configStore = useConfigStore()
const displayTemp = computed(() => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((props.cityItem.temp * 9) / 5 + 32)
  }

  return props.cityItem.temp
})
</script>

<template>
  <div class="weather-card" :class="{ selected: isSelected }" tabindex="0" @click="emit('select-card', cityItem)" @keydown.enter="emit('select-card', cityItem)">
    <div class="weather-info">
      <h4>🏙️ {{ cityItem.name }} 날씨 현황</h4>
      <p>날씨: {{ cityItem.status }}</p>
      <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
    </div>

    <div class="weather-actions">
      <span v-if="cityItem.temp >= 25" class="badge hot">🫠 더움 (25도 이상)</span>
      <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>
      <el-button class="btn-detail" size="small" @click.stop="emit('click-detail', cityItem)">상세보기</el-button>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: #fff;
  border: 1px solid #e2e8f0;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
}
.weather-card:hover, .weather-card:focus, .weather-card.selected { border-color: #93c5fd; background: #f8fbff; outline: none; }
.weather-card h4 { margin: 0 0 6px; color: #334155; font-size: .95rem; }
.weather-card p { margin: 0; color: #64748b; line-height: 1.55; }
.weather-actions { display: flex; align-items: center; gap: 12px; }
.badge { display: inline-block; padding: 5px 9px; font-size: 12px; border-radius: 4px; color: #fff; white-space: nowrap; }
.hot { background-color: #ff7675; }
.cool { background-color: #74b9ff; }
.btn-detail { height: 25px; padding: 0 10px; font-size: .85rem; }
@media (max-width: 520px) { .weather-card { align-items: flex-start; flex-direction: column; gap: 12px; } .weather-actions { width: 100%; justify-content: space-between; } }
</style>
