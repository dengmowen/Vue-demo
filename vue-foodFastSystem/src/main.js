// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/css/common.css';
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-default/index.css';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$http = axios;  /* 引用axios this.$http.get/post */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});