<template>
    <div class="CartControl">
        <transition name="fade">
            <div class="crat-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart" >
               <transition name="inner">
                      <span class="inner icon-remove_circle_outline"></span>
              </transition>      
            </div>
        </transition>
        <div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
  import Vue from 'vue';
  export default ({
    name: 'CartControl',
    props: ['food'],
    data () {
      return {};
    },
    methods: {
      addCart (event) { // 增加商品数量
        if (!event._constructed) { // 阻止PC两次点击事件
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('cartAdd', event.target); // 父子通信
      },
      decreaseCart (event) { // 减少商品数量
        if (!event._constructed) { // 阻止PC两次点击事件
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  });
</script>

<style lang="stylus" type="text/stylus">
  .CartControl
    font-size: 0;
    .crat-decrease
      display: inline-block;
      padding: 6px;
      transition: all .4s linear;
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.4s linear;
      &.fade-enter, &.fade-leave-active
        opacity: 0;
        transform translate3d(24px, 0, 0)
      .inner
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0,160,220);
        &.inner-enter-active, &.inner-leave-active
         transition: all 0.4s linear;
         transform: rotate(0);
        &.inner-enter, &.inner-leave-active
         opacity: 0;
         transform  rotate(180deg);
    .cart-count
      display: inline-block;
      vertical-align: top;
      width: 12px;
      line-height: 24px;
      padding-top: 6px;
      text-align: center;
      font-size: 10px;
      color: rgb(147,153,159);
    .cart-add
      display: inline-block;
      line-height: 24px;
      padding: 6px;
      font-size: 24px;
      color: rgb(0,160,220);
</style>
