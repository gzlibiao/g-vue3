import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    // component: ()=>import('@/views/home/index.vue')
    redirect:"/editor"
  },
  {
    path: '/editor',
    name: 'editor',
    component: ()=>import("@/components/Editor.vue")
  },
  {
    path: '/markdown',
    name: 'markdown',
    component: ()=>import("@/components/Markdown.vue")
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
