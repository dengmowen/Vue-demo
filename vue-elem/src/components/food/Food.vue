<template>
    <transition name="fade">
       <div class="Food" v-show="showFlag" ref="foodScroll">
              <div class="food-content">
                    <div class="img-header">
                        <img :src="food.image" alt="">
                        <div class="back" @click="hide">
                          <i class="icon-arrow_lift"></i>
                        </div>
                    </div>
                    <div class="content">
                        <h1 class="title">{{food.name}}</h1>
                        <div class="detail">
                            <span class="sell-count">月售{{food.sellCount}}份</span>
                            <span class="rating">好评率{{food.rating}}%</span>
                        </div>
                        <!-- 价格 -->
                        <div class="price">
                            <span class="nowPrice">¥{{food.price}}</span>
                            <span class="oldPrice" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                        </div>
                        <!-- 加入购物车 -->
                        <div class="cart-wrapper">
                          <cart-control :food="food"></cart-control>
                        </div>
                        <transition name="fadeBuy">
                            <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
                        </transition>
                    </div>
                    <Split v-show="food.info"></Split>
                    <div class="info" v-show="food.info">
                        <h1 class="title">商品信息</h1>
                        <p class="text">{{food.info}}</p>
                    </div>
                    <Split></Split>
                    <div class="rating">               
                          <h1 class="title">商品评价</h1>
                          <rating-select  @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"
                        :ratings="food.ratings"></rating-select>
                        <div class="rating-wrapper">
                            <ul v-show="food.ratings && food.ratings.length">
                                <li v-show="needShow(rating.rateType,rating.text)" class="rating-item border-bottom1px" v-for="(rating, index) in food.ratings" :key="index">
                                    <div class="user">
                                      <span class="name">{{rating.username}}</span>
                                      <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                                    </div>
                                    <div class="time">
                                        {{rating.rateTime | formatDate}}
                                    </div>
                                    <p class="text">
                                        <span :class="{'icon-thumb_up':rating.rateType ===0,'icon-thumb_down':rating.rateType === 1}"></span>
                                        {{rating.text}}
                                    </p>
                                </li>
                            </ul>
                            <!-- 暂无评价 -->
                            <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">
                              暂无评价
                            </div>
                        </div>
                    </div>
              </div>       
       </div>
    </transition>
</template>

<script>
  const ALL = 2;
  import BScroll from 'better-scroll';
  import CartControl from '../../components/cratcontrol/CartControl';
  import Split from '../../components/split/Split';
  import Vue from 'vue';
  import RatingSelect from '../../components/ratingSelect/RatingSelect';
  import {formatDate} from '../../common/js/date';  // 引用时间转换
  export default ({
    name: 'Food',
    props: {
      food: {
        type: Object
      }
    },
    components: {
      CartControl,
      Split,
      RatingSelect
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show () {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs.foodScroll, {
              click: true
            });
          } else {
            this.foodScroll.refresh();
          }
        });
      },
      hide () {
        this.showFlag = false;
      },
      addFirst (event) { // 加入购物车
        if (!event._constructed) { // 阻止PC两次点击事件
          return;
        }
        // this.$emit('cartAdd', event.target);
        Vue.set(this.food, 'count', 1);
      },
      needShow (type, text) { // 动态判断评论
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRating (type) { // 接收RatingSelect.vue传过来的参数
        this.selectType = type;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        });
      },
      toggleContent () { // 接收RatingSelect.vue传过来的参数
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        });
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  });
</script>

<style lang="stylus" type="text/stylus">
@import '../../common/stylus/mixin.styl';
  .Food
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
   &.fade-enter-active, &.fade-leave-active
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
   &.fade-enter, &.fade-leave-active
    opacity: 0
    transform: translate3d(100%, 0, 0);
   .food-content
      .img-header
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img 
          position: absolute; 
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        .back
          position: absolute;
          top: 10px;
          left: 0;
          .icon-arrow_lift
            display: block;
            padding: 10px;
            font-size: 20px;
            color: #fff;
      .content
        position: relative;
        padding: 18px;
        .title
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,17,27);  
        .detail
          margin-bottom: 18px;
          height: 10px;
          line-height: 10px;
          font-size: 0;
          .sell-count, .rating
            font-size: 10px;
            color: rgb(147,153,159);
          .sell-count
            margin-right: 12px;
        .price // 价格
          line-height: 24px;
          font-weight: 700;
          .nowPrice
            margin-right: 8px;
            font-size: 10px;
            color: rgb(240,20,20);
          .oldPrice 
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147,153,159);
        .cart-wrapper
          position: absolute;
          right: 12px;
          bottom: 12px;
        .buy
          position: absolute;
          right: 18px;
          bottom: 18px;
          z-index: 10;
          height: 24px;
          line-height: 24px;
          padding: 0 12px;
          box-sizing: border-box;
          border-radius: 12px;
          font-size: 10px;
          color: #fff;
          background: rgb(0,160,220);
          &.fadeBuy-enter-active, &.fade-leave-active
            transition: all 0.6s linear;
            opacity: 1;
          &.fadeBuy-enter, &.fade-leave-active
            opacity: 0
   .info
      padding: 18px;
      .title
       line-height: 14px;
       margin-bottom: 6px;
       font-size: 14px;
       color: rgb(7,17,27);
      .text
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77,85,93);
    .rating
      padding-top: 18px;
      .title
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7,17,27);
      .rating-wrapper
        padding: 0 18px;
        .rating-item
          position: relative;
          padding: 16px 0;
          border-bottom1px(rgba(7,17,27,0.1));
          .user
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            font-size: 0;
            .name
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
              font-size: 10px;
              color: rgb(147,153,159);
            .avatar
              border-radius: 50%;
          .time
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147,153,159);
          .text
            line-height: 16px;
            font-size: 12px;
            color: rgb(7,17,27);
            .icon-thumb_up,.icon-thumb_down
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
            .icon-thumb_up
              color: rgb(0,160,220);
            .icon-thumb_down
              color: rgb(147,153,159);
        .no-ratings
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147,153,159);    
</style>
