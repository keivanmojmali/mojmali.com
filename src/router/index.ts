import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticlePage from '../views/ArticlePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: ArticlePage,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // If returning from article page, restore saved position
    if (savedPosition) {
      return savedPosition
    }
    // If hash exists, scroll to that element
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

export default router
