import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/Product.vue')
  },
  {
    path: '/solution',
    name: 'Solution',
    component: () => import('@/views/Solution.vue')
  },
  {
    path: '/cooperation',
    name: 'Cooperation',
    component: () => import('@/views/Cooperation.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/News.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Signup.vue')
  },
  {
    path: '/inputAdvisory',
    name: 'InputAdvisory',
    component: () => import('@/views/InputAdvisory.vue')
  },
  {
    path: '/inputAfterSale',
    name: 'InputAfterSale',
    component: () => import('@/views/InputAfterSale.vue')
  },
  {
    path: '/inputFeedback',
    name: 'InputFeedback',
    component: () => import('@/views/InputFeedback.vue')
  },
  {
    path: '/inputBuy',
    name: 'InputBuy',
    component: () => import('@/views/InputBuy.vue')
  },
  {
    path: '/inputCoop',
    name: 'InputCoop',
    component: () => import('@/views/InputCoop.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
