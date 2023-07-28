import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/chat',
    children: [
      {
        path: '/chat',
        component: () => import('@/views/chat/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
// 导航守卫
router.beforeEach(async (to, from, next) => {
  document.title = 'AI助手'
  const token = localStorage.getItem('token')
  if (!token) {
    if (to.name === 'login') {
      next()
    } else {
      router.push('login')
      next()
    }
  } else {
    next()
  }
})

export default router
