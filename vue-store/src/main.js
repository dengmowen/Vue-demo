/* eslint-disable */
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
Vue.prototype.$http = axios;
import VueLazyLoad from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import './assets/css/base.css';
import './assets/css/product.css';
import './assets/css/checkout.css';
Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
  loading: "/static/loading-svg/loading-bars.svg"
});
Vue.use(infiniteScroll);
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
/* 绑定渲染的另一种方法 */
// new Vue({
//   router,
//   render: (h) => {
//     return h(App)
//   }
// }).$mount('#app');

