<script setup>
import AxiosWeather from '@/components/practices/library/AxiosWeather.vue'
</script>

<template>
  <main class="weather-page">
    <AxiosWeather />
  </main>
</template>

<style scoped>
.weather-page { min-height: 100vh; background: #fff; }
</style>
