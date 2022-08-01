import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Statement from '@/components/Statement'
import Users from '@/components/user/Users'
import Permission from '@/components/permissions/Permission'
import Accounts from '@/components/resources/Accounts'
import Devices from '@/components/resources/Devices'
import Project from '@/components/projects/Project'
import InterfaceManagement from '@/components/interfaces/InterfaceManagement'
import InterfaceDetail from '@/components/interfaces/InterfaceDetail'
import DocumentList from '@/components/file/DocumentList'
import DeleteAccountLink from '@/components/util/DeleteAccountLink'
import '../assets/css/global.css'
import mavonEditor from 'mavon-editor'
import moment from 'moment'
import Document from '@/components/file/Document'
import 'mavon-editor/dist/css/index.css'

Vue.use(VueRouter)
Vue.use(moment)
Vue.use(mavonEditor)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/statement',
    children: [
      { path: '/statement', component: Statement },
      { path: '/document', component: Document },
      { path: '/project', component: Project },
      { path: '/iManagement', component: InterfaceManagement },
      { path: '/documentList', component: DocumentList },
      { path: '/interfaceDetail', component: InterfaceDetail },
      { path: '/permission', component: Permission },
      { path: '/accounts', component: Accounts },
      { path: '/ ', component: InterfaceDetail },
      { path: '/devices', component: Devices },
      { path: '/users', component: Users },
      { path: '/deleteAccountLink', component: DeleteAccountLink }]
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
