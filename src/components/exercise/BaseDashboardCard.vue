<template>
  <el-card class="base-dashboard-card" shadow="never">
    <slot></slot>
  </el-card>
</template>

<style scoped>
.base-dashboard-card {
  margin-bottom: 15px;
  border-color: #e2e8f0;
  background: #fff;
}

.base-dashboard-card :deep(.el-card__body) { padding: 16px; }
</style>
