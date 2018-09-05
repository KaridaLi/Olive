// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueRouter from 'vue-router';
// Element UI
import Element from 'element-ui';
// 默认样式
import 'element-ui/lib/theme-chalk/index.css';
import 'common/stylus/index.styl';
Vue.use(VueRouter);
Vue.use(Element);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
