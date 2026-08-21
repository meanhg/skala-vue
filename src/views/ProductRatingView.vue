<script setup>
import { ref } from 'vue'

const productQuantity = ref(1)
const productRate = ref(4)
</script>

<template>
  <section class="product-page">
    <h2>상품 수량 및 평점</h2>
    <p>구매 수량과 상품 만족도 별점을 선택할 수 있습니다.</p>
    <el-card shadow="never">
      <div class="product-body">
        <div class="setting-row">
          <span>구매 수량</span>
          <el-input-number v-model="productQuantity" :min="1" :max="10" />
          <small>최대 10개 구매 가능</small>
        </div>
        <div class="setting-row">
          <span>상품 만족도</span>
          <el-rate v-model="productRate" show-score score-template="{value} 점" />
        </div>
        <div class="result-preview">선택 수량 {{ productQuantity }}개 / 내가 준 점수 {{ productRate }}점</div>
      </div>
    </el-card>
  </section>
</template>

<style scoped>
.product-page { width: min(100%, 680px); margin: 0 auto; }
h2 { margin: 0; color: #1e293b; font-size: 1.3rem; }
p { margin: 8px 0 22px; color: #64748b; font-size: .9rem; }
.product-body { display: flex; flex-direction: column; gap: 18px; }
.setting-row { display: flex; align-items: center; gap: 14px; color: #475569; font-size: .9rem; }
.setting-row > span { width: 110px; font-weight: 600; }
small { color: #94a3b8; }
.result-preview { padding: 12px; border-radius: 6px; background: #f8fafc; color: #475569; font-size: .9rem; }
@media (max-width: 520px) { .setting-row { align-items: flex-start; flex-direction: column; gap: 8px; } }
</style>
