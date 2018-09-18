<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-bottom1px">
       <router-link class="tab-item" v-for="(item, index) in mainList" :to="item.to" tag="div" :key="index">
              <a>{{item.name}}</a>
        </router-link>
    </div>
    <div class="content">
    </div>
    <keep-alive>
        <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import header from './components/header/Header.vue';
import { urlParse } from './common/js/util';
import data from './common/json/data.json';
export default {
  name: 'app',
  components: {
    'v-header': header
  },
  data () {
    return {
      mainList: [
        {name: '商品', to: 'goods'},
        {name: '评论', to: 'ratings'},
        {name: '商家', to: 'seller'}
      ],
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created () {
    // this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
    //   this.seller = response.data.data || [];
    //   this.seller = Object.assign({}, this.seller, response.data.data);
    // }).catch(error => {
    //   console.log('获取数据失败' + error);
    // });
    this.seller = data.seller;
  }
};
</script>

<style lang="stylus" type="text/stylus" scope>
@import './common/stylus/mixin.styl';
  #app
    .tab
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      // border-bottom: 1px solid rgba(7,17,27,0.1);
      border-bottom1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1;
        text-align: center;
        & > a
          display: block;
          height: 100%;
          font-size: 14px;
          color: rgb(77,85,93);
          text-align: center;
        &.active
          a
            color: rgb(240,20,20);
</style>
