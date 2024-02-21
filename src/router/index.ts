import { createRouter, createWebHistory } from 'vue-router'
import Scan from '@/views/ScanViewFeatureDetectView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Scan
    },
    {
      path: '/scan-canvas',
      name: 'scan-canvas',
      component: () => import('@/views/CanvasScanView.vue')
    },
    {
      path: '/scan-magica',
      name: 'scan-magica',
      component: () => import('@/views/MagicaScanView.vue')
    },
    // catch all redirect to /
    {
      path: '/:pathMatch(.*)*',
      name: 'catch-all',
      redirect: { name: 'index' }
    }
  ]
})

export default router
