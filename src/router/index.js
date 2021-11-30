import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Statement from '@/components/Statement'
import Users from '@/components/user/Users'
import Permission from '@/components/permissions/Permission'
import Accounts from '@/components/resources/Accounts'
import Devices from '@/components/resources/Devices'
import '../assets/css/global.css'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/statement',
    children: [
      { path: '/statement', component: Statement },
      { path: '/permission', component: Permission },
      { path: '/accounts', component: Accounts },
      { path: '/devices', component: Devices },
      { path: '/users', component: Users }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
