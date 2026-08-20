<script setup>
import { computed, ref } from 'vue'
import EventBasic from '@/components/practices/basic/EventBasic.vue'
import EventModifier from '@/components/practices/basic/EventModifier.vue'
import EventObject from '@/components/practices/basic/EventObject.vue'
import ModelBasic from '@/components/practices/basic/ModelBasic.vue'
import ModelForm from '@/components/practices/basic/ModelForm.vue'
import ModelModifier from '@/components/practices/basic/ModelModifier.vue'
import SampleOne from '@/components/practices/basic/SampleOne.vue'
import SampleTwo from '@/components/practices/basic/SampleTwo.vue'
import StyleScoped from '@/components/practices/basic/StyleScoped.vue'
import VueBind from '@/components/practices/basic/VueBind.vue'
import VueBindClass from '@/components/practices/basic/VueBindClass.vue'
import VueBindShorthand from '@/components/practices/basic/VueBindShorthand.vue'
import VueBindStyle from '@/components/practices/basic/VueBindStyle.vue'
import VueCloak from '@/components/practices/basic/VueCloak.vue'
import VueFor from '@/components/practices/basic/VueFor.vue'
import VueHtml from '@/components/practices/basic/VueHtml.vue'
import VueHtmlXss from '@/components/practices/basic/VueHtmlXss.vue'
import VueIf from '@/components/practices/basic/VueIf.vue'
import VueMemo from '@/components/practices/basic/VueMemo.vue'
import VueOnce from '@/components/practices/basic/VueOnce.vue'
import VuePre from '@/components/practices/basic/VuePre.vue'
import VueShow from '@/components/practices/basic/VueShow.vue'
import VueText from '@/components/practices/basic/VueText.vue'
import AxiosWeather from '@/components/practices/library/AxiosWeather.vue'
import ReactiveReactive from '@/components/practices/composition/ReactiveReactive.vue'
import ReactiveRef from '@/components/practices/composition/ReactiveRef.vue'
import ComputedBasic from '@/components/practices/composition/ComputedBasic.vue'
import WatchersBasic from '@/components/practices/composition/WatchersBasic.vue'
import WatchersDeep from '@/components/practices/composition/WatchersDeep.vue'
import WatchersMulti from '@/components/practices/composition/WatchersMulti.vue'
import WatchersReactive from '@/components/practices/composition/WatchersReactive.vue'
import WatchersWatchEffect from '@/components/practices/composition/WatchersWatchEffect.vue'

const practices = [
  ['반응성 데이터', 'SampleOne', SampleOne],
  ['ref() 반응형 상태', 'ReactiveRef', ReactiveRef],
  ['reactive() 반응형 상태', 'ReactiveReactive', ReactiveReactive],
  ['computed() 캐싱', 'ComputedBasic', ComputedBasic],
  ['watch() 기본', 'WatchersBasic', WatchersBasic],
  ['watch() 다중 감시', 'WatchersMulti', WatchersMulti],
  ['watch() deep 감시', 'WatchersDeep', WatchersDeep],
  ['watch() reactive 감시', 'WatchersReactive', WatchersReactive],
  ['watchEffect() 자동 감시', 'WatchersWatchEffect', WatchersWatchEffect],
  ['텍스트 보간법', 'SampleTwo', SampleTwo],
  ['v-html', 'VueHtml', VueHtml],
  ['v-html XSS', 'VueHtmlXss', VueHtmlXss],
  ['v-text', 'VueText', VueText],
  ['v-bind 기본', 'VueBind', VueBind],
  ['v-bind class', 'VueBindClass', VueBindClass],
  ['v-bind style', 'VueBindStyle', VueBindStyle],
  ['v-bind 단축 문법', 'VueBindShorthand', VueBindShorthand],
  ['v-if / v-else', 'VueIf', VueIf],
  ['v-show', 'VueShow', VueShow],
  ['v-for', 'VueFor', VueFor],
  ['v-pre', 'VuePre', VuePre],
  ['v-cloak', 'VueCloak', VueCloak],
  ['v-once', 'VueOnce', VueOnce],
  ['v-memo', 'VueMemo', VueMemo],
  ['v-on 이벤트', 'EventBasic', EventBasic],
  ['이벤트 객체', 'EventObject', EventObject],
  ['이벤트 수식어', 'EventModifier', EventModifier],
  ['v-model 기본', 'ModelBasic', ModelBasic],
  ['Form v-model', 'ModelForm', ModelForm],
  ['v-model 수식어', 'ModelModifier', ModelModifier],
  ['Vue 스타일', 'StyleScoped', StyleScoped],
  ['날씨 Mockup', 'AxiosWeather', AxiosWeather],
]

const selectedName = ref(practices[0][1])
const selectedPractice = computed(() => practices.find(([, name]) => name === selectedName.value))
</script>

<template>
  <main class="practice-page">
    <h1>Vue Basic Code Challenges</h1>
    <p>왼쪽 목록에서 학습할 예제를 선택하세요.</p>
    <div class="practice-layout">
      <nav class="practice-menu" aria-label="Vue 기본 예제 목록">
        <button
          v-for="[label, name] in practices"
          :key="name"
          :class="{ active: selectedName === name }"
          type="button"
          @click="selectedName = name"
        >
          {{ label }}
        </button>
      </nav>
      <section class="practice-content">
        <component :is="selectedPractice[2]" />
      </section>
    </div>
  </main>
</template>

<style scoped>
.practice-page { width: min(100%, 1100px); margin: 0 auto; }
.practice-layout { display: grid; grid-template-columns: minmax(170px, 240px) 1fr; gap: 1.5rem; margin-top: 1.5rem; }
.practice-menu { display: flex; flex-direction: column; gap: .4rem; }
.practice-menu button { padding: .55rem .75rem; text-align: left; border: 1px solid var(--color-border); border-radius: 6px; background: transparent; color: var(--color-text); cursor: pointer; }
.practice-menu button.active { border-color: #42b883; background: #42b883; color: white; }
.practice-content { min-width: 0; padding: 1.5rem; border: 1px solid var(--color-border); border-radius: 10px; }
@media (max-width: 700px) { .practice-layout { grid-template-columns: 1fr; } .practice-menu { flex-flow: row wrap; } }
</style>
