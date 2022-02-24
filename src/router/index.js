import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    // route level code-splitting
    // this generates a separate chunk (contact.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/pricing',
    name: 'pricing',
    // route level code-splitting
    // this generates a separate chunk (pricing.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "pricing" */ '../views/Pricing.vue')
  },
  {
    path: '/beat-makers',
    name: 'beatMakers',
    // route level code-splitting
    // this generates a separate chunk (beatMakers.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "beatMakers" */ '../views/BeatMakers.vue')
  },
  {
    path: '/beat-users',
    name: 'beatUsers',
    // route level code-splitting
    // this generates a separate chunk (beatUsers.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "beatUsers" */ '../views/BeatUsers.vue')
  },
  {
    path: '/licensing/:id',
    name: 'licensing',
    // route level code-splitting
    // this generates a separate chunk (licensing.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "licensing" */ '../views/Licensing.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
