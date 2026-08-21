<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const userForm = ref({
  email: '',
  agree: false,
})

const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('❌ 올바른 이메일 형식이 아닙니다.')
    return
  }

  if (!userForm.value.agree) {
    ElMessage.warning('⚠️ 이용약관에 동의하셔야 합니다.')
    return
  }

  ElMessage.success('🎉 가입 신청이 정상적으로 완료되었습니다!')
}
</script>

<template>
  <section class="form-page">
    <h2>회원가입</h2>
    <p>이메일 주소와 약관 동의 여부를 확인합니다.</p>
    <el-card shadow="never">
      <div class="form-body">
        <label for="signup-email">이메일 주소</label>
        <el-input id="signup-email" v-model="userForm.email" placeholder="example@email.com" clearable />
        <el-switch v-model="userForm.agree" active-text="개인정보 수집 및 필수 이용약관에 동의합니다." />
        <el-button type="primary" @click="handleRegister">회원가입하기</el-button>
      </div>
    </el-card>
  </section>
</template>

<style scoped>
.form-page { width: min(100%, 520px); margin: 0 auto; }
h2 { margin: 0; color: #1e293b; font-size: 1.3rem; }
p { margin: 8px 0 22px; color: #64748b; font-size: .9rem; }
.form-body { display: flex; flex-direction: column; gap: 14px; }
label { color: #475569; font-size: .9rem; font-weight: 600; }
</style>
