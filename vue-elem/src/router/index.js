import Vue from 'vue';
import Router from 'vue-router';
// import Header from '@/components/header/Header';
import Goods from '@/components/goods/Goods';
import Ratings from '@/components/ratings/Ratings';
import Seller from '@/components/seller/Seller';
import Error from '@/components/Error';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
      // children: [
      //     {path: '/', redirect: 'lotteryRecord'},
      //     {path: 'lotteryRecord', name: 'lotteryRecord', component: LotteryRecord}
      // ]
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {  // 配置404页面错误
      path: '*',
      component: Error
    }
  ],
  linkActiveClass: 'active'
});
