import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/Home'

import index1 from '../views/index1'
import index2 from '../views/index2'
import index3 from '../views/index3'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/home',
    name: '导航一',
    component: Home,
    children: [
      {
        path: '/index1',
        name: '选项1',
        component: index1
      },
      {
        path: '/index2',
        name: '选项二',
        component: index2
      },
      {
        path: '/index3',
        name: '选项三',
        component: index3
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
