<script setup>
import { computed } from 'vue'

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
</script>

<template>
  <div class="weather-card" :class="{ selected: isSelected }" tabindex="0" @click="emit('select-card', cityItem)" @keydown.enter="emit('select-card', cityItem)">
    <h4>🏙️ {{ cityItem.name }} 날씨 현황</h4>
    <p>날씨: {{ cityItem.status }}</p>
    <p>현재 기온: {{ cityItem.temp }}°C</p>

    <span v-if="cityItem.temp >= 25" class="badge hot">🫠 더움 (25도 이상)</span>
    <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>

    <button class="btn-detail" type="button" @click.stop="emit('click-detail', cityItem)">상세보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  background: #fff;
  border: 1px solid #dee2e6;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.weather-card:hover, .weather-card:focus, .weather-card.selected { border-color: #72b9df; background: #f0f9ff; outline: none; }
.weather-card h4, .weather-card p { margin: 0; line-height: 1.4; }
.badge { display: inline-block; margin-top: 4px; padding: 4px 8px; font-size: 12px; border-radius: 4px; color: #fff; }
.hot { background-color: #ff7675; }
.cool { background-color: #74b9ff; }
.btn-detail { position: absolute; right: 12px; top: 15px; padding: 6px 10px; cursor: pointer; }
</style>
