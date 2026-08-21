import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WeatherHome',
      component: () => import('@/views/WeatherHomeView.vue'),
    },
    {
      path: '/about',
      name: 'WeatherAbout',
      component: () => import('@/views/WeatherAboutView.vue'),
    },
    {
      path: '/weather/:cityId',
      name: 'WeatherDetail',
      component: () => import('@/views/WeatherDetailView.vue'),
    },
    {
      path: '/guide',
      name: 'WeatherGuide',
      component: () => import('@/views/WeatherGuideView.vue'),
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('@/views/SignUpView.vue'),
    },
    {
      path: '/product-rating',
      name: 'ProductRating',
      component: () => import('@/views/ProductRatingView.vue'),
    },
    {
      path: '/feedback',
      name: 'SystemFeedback',
      component: () => import('@/views/SystemFeedbackView.vue'),
    },
    {
      path: '/practices',
      name: 'practices',
      component: () => import('@/views/PracticeView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
