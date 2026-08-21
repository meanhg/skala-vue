<script setup>
import UnitToggler from '@/components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="weather-router-app">
    <header class="app-header">
      <nav aria-label="날씨 서비스 메뉴">
        <RouterLink class="brand" to="/">Weather</RouterLink>
        <div class="nav-links">
          <RouterLink to="/">날씨</RouterLink>
          <RouterLink to="/about">서비스</RouterLink>
          <RouterLink to="/guide">안내</RouterLink>
          <RouterLink to="/product-rating">상품 평가</RouterLink>
          <RouterLink to="/feedback">시스템</RouterLink>
        </div>
        <UnitToggler />
        <div class="auth-links">
          <a href="#login">로그인</a>
          <RouterLink class="signup-link" to="/signup">회원가입</RouterLink>
        </div>
      </nav>
    </header>
    <main class="router-content">
      <RouterView />
    </main>
    <footer class="app-footer">Weather Dashboard Practice</footer>
  </div>
</template>

<style scoped>
.weather-router-app { --content-width: 860px; --content-gutter: 16px; min-height: 100vh; display: flex; flex-direction: column; }
.app-header { position: sticky; top: 0; z-index: 10; width: 100%; padding: 14px max(var(--content-gutter), calc((100% - var(--content-width)) / 2)); border-bottom: 1px solid #e2e8f0; background: rgb(255 255 255 / 94%); backdrop-filter: blur(10px); }
nav { display: flex; align-items: center; gap: 24px; }
nav a { padding: 4px 0; color: #64748b; font-size: .9rem; font-weight: 600; text-decoration: none; }
.brand { color: #0f172a; font-size: 1.05rem; font-weight: 750; letter-spacing: -.03em; }
.nav-links { display: flex; gap: 20px; }
.nav-links a.router-link-active { color: #2563eb; }
.auth-links { display: flex; align-items: center; gap: 14px; }
.auth-links .signup-link { padding: 8px 12px; border-radius: 6px; background: #2563eb; color: #fff; }
.auth-links .signup-link:hover { background: #1d4ed8; }
.router-content { width: min(calc(100% - (var(--content-gutter) * 2)), var(--content-width)); flex: 1; margin: 20px auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; box-shadow: 0 6px 18px rgb(15 23 42 / 4%); }
.app-footer { width: min(calc(100% - (var(--content-gutter) * 2)), var(--content-width)); margin: 0 auto; padding: 0 0 28px; color: #94a3b8; font-size: .78rem; text-align: center; }
@media (max-width: 700px) { nav { flex-wrap: wrap; gap: 10px 16px; } .unit-toggler { margin-left: 0; } .router-content { margin: 18px auto; padding: 18px; border-radius: 10px; } }
</style>
