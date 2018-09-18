/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import GoodsList from '../views/GoodsList.vue';
Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    }
  ]
});
