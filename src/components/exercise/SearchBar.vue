<script setup>
defineEmits(['update-query'])

defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="search-inner">
    <h3>🔍 도시 검색</h3>
    <el-input
      :model-value="currentQuery"
      placeholder="검색할 도시 이름 입력"
      clearable
      @update:model-value="$emit('update-query', $event)"
    />
    <p>
      검색 중인 도시: <strong>{{ currentQuery }}</strong>
    </p>
  </div>
</template>

<style scoped>
h3 { margin: 0 0 10px; color: #334155; font-size: .95rem; }
p { margin: 8px 0 0; color: #64748b; font-size: .85rem; }
</style>
