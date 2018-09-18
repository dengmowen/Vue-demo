<template>
    <div class="ShopCart">
       <div class="shopcart-content">
            <div class="content" @click="toggleList">
                  <div class="content-left">
                    <!-- 图标 -->
                      <div class="logo-wrapper">
                            <div class="logo" :class="{'highlight': totalCount>0}">
                                  <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
                            </div>
                            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                      </div>
                      <div class="price" :class="{'highlight': totalPrice>0}">¥{{totalPrice}}元</div>
                      <div class="desc">另需配送费¥{{deliveryPrice}}</div>
                  </div>
                  <!-- 去结算 -->
                  <div class="content-right" @click.stop.prevent="goPay">
                      <div class="pay" :class="payClass">{{payDesc}}</div>
                  </div>
            </div>
            <!-- 小球 -->
            <div class="ball-container">
                <div v-for="(ball, index) in balls" :key="index">
                    <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                        <div v-show="ball.show"  class="ball">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <!-- 购物车内容详情 -->
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow" >
                    <div class="list-header">
                          <h1 class="title">购物车</h1>
                          <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="list_content">
                          <ul>
                            <li class="food" v-for="(food, index) in selectFoods" :key="index">
                                <span class="name">{{food.name}}</span>
                                <!-- 价格 -->
                                <div class="price">
                                    <span>¥{{food.price* food.count}}</span>
                                </div>
                                <!-- 加减按钮 -->
                                <div class="cart-wrapper">
                                  <cart-control :food="food"></cart-control>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
       </div>
       <!-- 背景遮罩层 -->
        <transition name="mask">
            <div class="list-mask" v-show="listShow" @click="maskHide"></div>
        </transition> 
    </div>
</template>

<script>
  import CartControl from '../../components/cratcontrol/CartControl';
  import BScroll from 'better-scroll';
  export default ({
    name: 'ShopCart',
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: { // 选择的商品
        type: Array,
        default () {
          return [];
        }
      }
    },
    components: {
      CartControl
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true // 折叠
      };
    },
    methods: {
      drop (el) { // <div class="cart-add icon-add_circle"></div>
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            // console.log('rect', rect);
            let x = rect.left - 32;

            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${x}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter (el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3D(0,0,0)';
        });
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList () { // 判断是否可以开关
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty () { // 清空数据
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      maskHide () { // 背景层点击的时候隐藏
        this.fold = !this.fold;
      },
      goPay () {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        alert(`一共支付${this.totalPrice}元,请耐心等待送达`);
        this.empty(); // 支付成功清空购物车
      }
    },
    computed: {
      totalPrice () { // 计算商品总价
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        }, this);
        return total;
      },
      totalCount () { // 计算商品数量
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        }, this);
        return count;
      },
      payDesc () { // 计算支付价格
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass () { // 给去结算的样式
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow () { // 是否显示购物车
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.list_content, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    }
  });
</script>

<style lang="stylus" type="text/stylus">
@import '../../common/stylus/mixin.styl';
  .ShopCart
   .shopcart-content
      position:fixed;
      left: 0;
      bottom: 0;
      z-index: 50;
      width: 100%;
      height: 48px;
      .content
        display: flex;
        font-size: 0;
        background: #141d27;
        color: rgba(255,255,255,0.4);     
        .content-left  // 左边布局
          flex: 1;
          .logo-wrapper
            box-sizing: border-box;
            display: inline-block;
            position: relative;
            top: -10px;
            margin: 0 12px;
            padding: 6px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #141d27; 
            .logo
                width: 100%;
                height: 100%;
                border-radius: 50%;
                text-align: center;
                background: #2B343C;
                &.highlight
                  background: rgb(0,160,220);
                .icon-shopping_cart
                  line-height: 44px;
                  font-size: 24px;
                  color: #80858A;
                  &.highlight
                    color: #ffffff;
            .num
                position: absolute;
                top: 0;
                right: 0;
                width: 24px;
                height: 16px;
                line-height: 16px;
                text-align: center;
                border-radius: 16px;
                font-size: 9px;
                font-weight: 400;
                color:  #ffffff;
                background: rgb(240,20,20);
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);  
          .price   
            box-sizing: border-box;    
            margin-top: 12px;
            line-height: 24px;
            padding-right: 12px;
            border-right: 1px solid rgba(255,255,255,0.1);
            display: inline-block;
            vertical-align: top;
            font-size: 16px;
            font-weight: 700;
            color: rgba(255,255,255,0.2);
            &.highlight
              color: #ffffff;   
          .desc
            display: inline-block;
            vertical-align: top; 
            margin: 12px 0 0 12px;
            line-height: 24px;
            font-size: 10px;  
        .content-right // 右边布局
          flex: 0 0 105px;
          width: 105px;
          .pay  // 去结算
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-size: 12px;
            font-weight: 700;
            background: #2B333B;
            &.not-enough
              background: #2B333B;
            &.enough
              background: #00b43c;
              color: #fff;
      .ball-container  
        .ball
          position: fixed;
          left: 32px;
          bottom: 22px;
          z-index: 200;
          transition: all .6s cubic-bezier(.49, -.29, .75, .41);
          .inner
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: rgb(0,160,220);
              transition: all .6s linear;
      .shopcart-list
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        transform: translate3d(0, -100%, 0);
        &.fold-enter-active, &.fold-leave-active
          transition: all 0.5s
          transform: translate3d(0, -100%, 0);
        &.fold-enter, &.fold-leave-active
          transform: translate3d(0, 0, 0);
        .list-header
          height: 40px;
          line-height: 40px;
          padding: 0 18px;
          background: #f3f5f7;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          .title
            float: left;
            font-size: 17px;
            color: rgb(7,17,27);
          .empty
            float: right;
            font-size: 12px;
            color: rgb(0,160,220);    
        .list-content
          padding: 0 18px;
          max-height: 217px;
          overflow: hidden;
          background: #fff;
          .food
            position: relative;
            padding: 12px 0;
            box-sizing: border-box;
            border-bottom1px(rgba(7,17,27,0.1));
            .name
              line-height: 24px;
              font-size: 14px;
              color: rgb(7,17,27);
            .price
              position: absolute;
              right: 90px;
              bottom: 12px;
              line-height: 24px;
              font-size: 14px;
              font-weight: 700;
              color: rgb(240,20,20); 
            .cart-wrapper
              position: absolute;
              right: 0;
              bottom: 6px;
   .list-mask
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 40;
      opacity 1
      background rgba(7, 17, 27, 0.6)
      backdrop-filter: blur(10px);
      &.mask-enter-active, &.mask-leave-active
        opacity: 1;
        transition: all 0.5s;
        background: rgba(7,17,27,0.6);
      &.mask-enter, &.mask-leave-active
        opacity: 0;
        background: rgba(7,17,27,0); 
</style>
