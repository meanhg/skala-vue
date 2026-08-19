# SKALA Vue 학습 프로젝트

Vue 3와 Vite를 활용한 학습·실습 프로젝트입니다.

## 1일차 · 학습 환경 설정

- Vue 3 + Vite 프로젝트 생성
- Vue Router, Pinia 기본 구성
- 개발 서버 실행 및 프로젝트 구조 확인

```sh
npm install
npm run dev
```

## 2일차 · Vue 기본 문법 실습

- 반응성 데이터와 텍스트 보간법
- Vue Directive
  - `v-html`, `v-text`, `v-bind`, `v-if`, `v-show`, `v-for`
  - `v-pre`, `v-cloak`, `v-once`, `v-memo`
- 이벤트 처리
  - `v-on`, 이벤트 객체, 이벤트 수식어
- 폼 처리
  - `v-model`, HTML Form 요소 바인딩, `v-model` 수식어
- Scoped 스타일 및 외부 CSS 활용

각 문법 예제는 `src/components/practices/basic/`에 있습니다. `/practices` 경로에서 예제를 선택해 실행할 수 있습니다.

## 2일차 실습 과제 · Weather Mockup

홈(`/`)에서 다음 기능을 구현했습니다.

- 대한민국 광역시 6곳의 날씨 목 데이터를 `v-for`와 `:key`로 렌더링
- 기온 25°C 기준으로 더움/선선함 라벨을 조건부 렌더링
- 도시명 한글 검색 (`v-model`)
- 카드 클릭 선택 알림과 상세보기 버튼의 이벤트 전파 차단 (`.stop`)
- 데이터 추가 기능은 다음 단계에서 구현 예정

## 명령어

```sh
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 린트
npm run lint
```
