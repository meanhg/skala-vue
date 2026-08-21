<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>
    <h3>ℹ️ 서비스 소개</h3>
    <hr />
    <div class="description-box">
      <p>본 앱은 <strong>Vue 3</strong> 및 <strong>Vue Router 4</strong> 기반의 실습용 기상 관측 대시보드입니다.</p>
      <ul>
        <li><code>components/exercise/</code> 폴더의 독립 부품 연동</li>
        <li>클라이언트 사이드 라우팅을 통한 새로고침 없는 화면 전환</li>
        <li>URL 쿼리 스트링을 활용한 검색 상태 동기화</li>
      </ul>
    </div>
    <button type="button" class="home-btn" @click="router.push('/')">대시보드 홈으로 이동</button>
  </div>
</template>

<style scoped>
.description-box { padding: 12px; border-radius: 6px; background: #f8f9fa; font-size: 14px; line-height: 1.5; }
ul { margin: 8px 0 0; padding-left: 20px; }
li { margin-bottom: 6px; color: #555; }
code { padding: 2px 4px; border-radius: 4px; background: #ffeaa7; color: #d63031; }
.home-btn { width: 100%; margin-top: 15px; padding: 10px; border: none; border-radius: 4px; background: #3498db; color: white; font-weight: bold; cursor: pointer; }
</style>
