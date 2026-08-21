<template>
  <div class="guide-view">
    <h3>📚 학습 안내</h3>
    <hr />
    <p>날씨 대시보드에서 도시를 검색하고, 상세보기 버튼을 눌러 동적 라우트 화면을 확인해 보세요.</p>
    <ul>
      <li>검색어는 URL의 <code>search</code> 쿼리와 동기화됩니다.</li>
      <li>상세보기는 <code>/weather/:cityId</code> 경로로 이동합니다.</li>
      <li>존재하지 않는 주소는 404 화면으로 연결됩니다.</li>
    </ul>
  </div>
</template>

<style scoped>
.guide-view { line-height: 1.6; }
ul { padding-left: 20px; }
code { padding: 2px 4px; border-radius: 4px; background: #eef2ff; color: #4338ca; }
</style>
