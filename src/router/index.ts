import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
