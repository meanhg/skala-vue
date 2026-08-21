<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-icon">☀️❓</div>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <p>요청하신 주소가 존재하지 않거나,<br />아직 개발되지 않았습니다.</p>
      <button type="button" class="home-button" @click="router.push('/')">날씨 메인으로 이동</button>
    </div>
  </div>
</template>

<style scoped>
.not-found-container { display: grid; min-height: 420px; place-items: center; background: #f8f9fa; }
.not-found-content { padding: 42px; border: 1px solid #e9ecef; border-radius: 16px; background: #fff; box-shadow: 0 4px 6px rgb(0 0 0 / 10%); text-align: center; }
.error-icon { margin-bottom: 16px; font-size: 4rem; }
h2 { color: #343a40; }
p { color: #6c757d; line-height: 1.6; }
.home-button { padding: 12px 30px; border: none; border-radius: 30px; background: #007bff; color: white; font-size: 1rem; font-weight: 700; cursor: pointer; }
</style>
