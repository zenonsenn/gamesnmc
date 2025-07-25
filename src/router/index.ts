import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/play/zendle',
      name: 'zendle',
      component: () => import('@/views/zendle/GameView.vue'),
    },
    {
      path: '/blog/zendle',
      name: 'zendle-blog',
      component: () => import('@/views/zendle/BlogView.vue'),
    },
  ],
})

export default router
