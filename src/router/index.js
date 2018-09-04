import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import signInsuccess from '@/components/signInsuccess'
import forgotPwd from '@/components/forgotPwd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/signInsuccess',
      name: 'signInsuccess',
      component: signInsuccess
    },
    {
      path: '/',
      name: 'forgotPwd',
      component: forgotPwd
    }
  ]
})
