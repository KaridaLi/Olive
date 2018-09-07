import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import login from '@/components/login';
import forgotPwd from '@/components/forgotPwd';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/',
      name: 'forgotPwd',
      component: forgotPwd
    }
  ]
});
