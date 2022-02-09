import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import asyncRoute from './asyncRoute.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
 ...asyncRoute,
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/*',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  let token = sessionStorage.getItem("token")
  if(to.fullPath==='/login'){
    next()
  }else if(token){
    next()
  }else{
    next("/login")
  }
// document.title = to.mata.title;
})

export default router
