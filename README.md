# SKALA Vue 학습 프로젝트

Vue 3와 Vite를 이용한 실습 프로젝트입니다.

## 1일차 · 학습 환경 설정

- Vue 3 + Vite 프로젝트 생성
- Vue Router, Pinia 기본 설정
- 개발 서버 실행 및 프로젝트 구조 확인

```sh
npm install
npm run dev
```

## 2일차 · Vue 기본 문법

- 반응성 데이터와 텍스트 보간법
- Vue Directive
  - `v-html`, `v-text`, `v-bind`, `v-if`, `v-show`, `v-for`
  - `v-pre`, `v-cloak`, `v-once`, `v-memo`
- 이벤트 처리와 이벤트 수식어
- `v-model`과 Form 처리
- Scoped 스타일

`/practices`에서 문법 예제를 확인할 수 있습니다.

### Weather Mockup

- 지역별 날씨 목 데이터 출력
- 도시명 검색
- 기온에 따른 더움/선선함 표시
- 카드 선택과 상세보기 버튼 처리

## 3일차 · Composition API와 Component

- `ref()`, `reactive()` 반응형 상태
- `computed()`, `watch()`, `watchEffect()`
- Component Lifecycle Hook
- Props & Emits
- Default Slot, Named Slot, Scoped Slot
- Element Plus UI Library 적용

### Weather Composition

- 검색어와 선택 도시 상태 관리
- `computed()`를 이용한 도시 검색
- `watch()`와 `watchEffect()` 동작 확인

![Composition API Watcher 실습 화면](screenshots/weather-composition-watchers.png)

### Weather Component

- `WeatherParent`, `BaseDashboardCard`, `SearchBar`, `WeatherCard`로 화면 분리
- Props와 Emits를 이용한 검색, 카드 선택, 상세보기 처리
- Element Plus Card, Input, Button, Alert 적용

### Element Plus Code Challenge

- 회원가입 Form과 이메일·약관 검증 메시지
- 상품 수량 선택, 별점, 실시간 요약
- 삭제 확인창과 다운로드 진행률 표시

## 4일차 · Vue Router

- Lazy Loading과 Catch-all Route 적용
- `RouterLink`, `RouterView` 내비게이션 구성
- 검색어 쿼리 스트링 처리
- `/weather/:cityId` 동적 상세 페이지
- 서비스 소개, 추가 view, 404 페이지 작성

## 4일차 · Pinia

- Counter Store 작성
- 날씨 단위 설정 Store 작성
- 섭씨/화씨 단위 변경을 메인과 상세 날씨 화면에 적용

## 4일차 · Axios

- Axios 설치
- OpenWeatherMap 현재 날씨 API 적용
- OpenWeatherMap 예보 API 추가
- 외부 API를 활용한 날씨 정보 확장
- Axios Weather 예제와 JSON CRUD 예제 작성


## 명령어

```sh
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 린트
npm run lint
```
