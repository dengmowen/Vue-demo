<template>
  <div class="LeftNav">
     <ul>
          <li v-for="(item, index) in shopname" :key="index">
            <i :class="item.icon"></i>
              <div>{{item.names}}</div>
          </li>
     </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftNav',
  data () {
    return {
      shopname: [
        { names: '收银', icon: 'icon iconfont icon-wodezichan' },
        { names: '店铺', icon: 'icon iconfont icon-31dianpu' },
        { names: '商品', icon: 'icon iconfont icon-hanbao' },
        { names: '会员', icon: 'icon iconfont icon-huiyuanqia' },
        { names: '统计', icon: 'icon iconfont icon-wodezichan' },
        {names: '设置', icon: 'icon iconfont icon-gongnengjianyi'}
      ]
    };
  }
};
</script>

<style lang="stylus" type="text/stylus">
  .LeftNav
    width: 5%;
    height: 100%;
    font-size: .4rem /* 10/25 */;
    float: left;
    color: #fff;
    background-color: #1d8ce0;
    .iconfont
      font-size: .96rem /* 24/25 */;
    ul
      li
        padding: .2rem; /* 5/25 */
        border-bottom: 1px solid #20a0ff;
        text-align: center;
</style>