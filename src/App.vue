<script setup>
import UnitToggler from '@/components/exercise/UnitToggler.vue'
</script>

<template>
  <main class="weather-router-app">
    <header class="app-header">
      <h1>🌤️ 과제 5: 스토어 적용</h1>
      <nav aria-label="날씨 서비스 메뉴">
        <RouterLink to="/">🌦️ 날씨 대시보드</RouterLink>
        <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
        <RouterLink to="/guide">📚 학습 안내</RouterLink>
        <UnitToggler />
      </nav>
    </header>
    <section class="router-content">
      <RouterView />
    </section>
  </main>
</template>

<style scoped>
.weather-router-app { width: min(100% - 32px, 680px); margin: 24px auto; }
.app-header { position: sticky; top: 0; z-index: 10; padding: 14px 0 18px; background: var(--color-background, #fff); }
h1 { margin: 0 0 12px; padding-bottom: 14px; border-bottom: 1px solid #e5e7eb; font-size: 1.2rem; }
nav { display: flex; justify-content: center; gap: 18px; padding: 16px; border-radius: 8px; background: #fff; box-shadow: 0 2px 8px rgb(0 0 0 / 6%); }
nav a { color: #64748b; font-weight: 700; text-decoration: none; }
nav a.router-link-active { color: #3498db; border-bottom: 2px solid #3498db; }
.router-content { padding: 18px; border-radius: 8px; background: #fff; box-shadow: 0 2px 8px rgb(0 0 0 / 6%); }
@media (max-width: 520px) { .weather-router-app { width: min(100% - 24px, 680px); } nav { flex-wrap: wrap; gap: 12px; } }
</style>
