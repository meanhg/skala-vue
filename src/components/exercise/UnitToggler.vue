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
.unit-toggler { display: inline-flex; align-items: center; gap: 8px; margin-left: auto; color: #64748b; font-size: .78rem; white-space: nowrap; }
button { padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; color: #475569; cursor: pointer; font-size: .75rem; font-weight: 600; }
button:hover { border-color: #93c5fd; color: #2563eb; }
</style>
