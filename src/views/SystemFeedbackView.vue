<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const downloadProgress = ref(0)
const isDownloading = ref(false)

const confirmDelete = () => {
  ElMessageBox.confirm('서버에서 해당 파일을 영구히 삭제하시겠습니까?', '최종 경고', {
    confirmButtonText: '네, 삭제합니다',
    cancelButtonText: '취소',
    type: 'danger',
  })
    .then(() => ElMessage.success('파일이 안전하게 파쇄되었습니다.'))
    .catch(() => ElMessage.info('삭제 작업이 취소되었습니다.'))
}

const startDownload = () => {
  if (isDownloading.value) return

  isDownloading.value = true
  downloadProgress.value = 0

  const interval = setInterval(() => {
    downloadProgress.value += 20

    if (downloadProgress.value >= 100) {
      clearInterval(interval)
      isDownloading.value = false
      ElMessage.success('대용량 데이터 로드가 완료되었습니다!')
    }
  }, 400)
}
</script>

<template>
  <section class="feedback-page">
    <h2>시스템 피드백</h2>
    <p>삭제 확인창과 데이터 동기화 진행 상태를 확인합니다.</p>
    <el-card shadow="never">
      <div class="feedback-body">
        <div class="button-group">
          <el-button type="danger" plain @click="confirmDelete">서버 파일 삭제 테스트</el-button>
          <el-button type="primary" :loading="isDownloading" @click="startDownload">
            {{ isDownloading ? '동기화 중...' : '데이터 동기화 시작' }}
          </el-button>
        </div>
        <el-progress :percentage="downloadProgress" :status="downloadProgress === 100 ? 'success' : ''" />
      </div>
    </el-card>
  </section>
</template>

<style scoped>
.feedback-page { width: min(100%, 680px); margin: 0 auto; }
h2 { margin: 0; color: #1e293b; font-size: 1.3rem; }
p { margin: 8px 0 22px; color: #64748b; font-size: .9rem; }
.feedback-body { display: flex; flex-direction: column; gap: 18px; }
.button-group { display: flex; gap: 10px; }
@media (max-width: 520px) { .button-group { flex-direction: column; } }
</style>
