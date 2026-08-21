<script setup>
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>날씨 단위: <strong>{{ configStore.unitLabel }}</strong></span>
    <button type="button" @click="configStore.toggleUnit">단위 변경</button>
  </div>
</template>

<style scoped>
.unit-toggler { display: inline-flex; align-items: center; gap: 8px; margin-left: auto; color: #64748b; font-size: .72rem; white-space: nowrap; }
button { padding: 6px 10px; border: none; border-radius: 4px; background: #4b6584; color: white; cursor: pointer; font-size: .7rem; font-weight: bold; }
</style>
