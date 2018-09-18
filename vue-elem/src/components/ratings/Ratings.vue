<template>
    <div class="Ratings" ref="ratingScroll">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <Star :size="36" :score="seller.serviceScore"></Star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <Star   :size="36" :score="seller.foodScore"></Star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <Split></Split> 
            <rating-select  @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent"   :ratings="ratings" ></rating-select>
            <div class="rating-wrapper">
                <ul>
                   <li v-for="(rating, index) in ratings" :key="index" class="rating-item" v-show="needShow(rating.rateType,rating.text)" >
                      <div class="avatar">
                        <img :src="rating.avatar" alt="" width="28" height="28">
                      </div>
                      <div class="content">
                          <h1 class="name">{{rating.username}}</h1>
                          <div class="star-wrapper">
                              <Star :size="24" :score="rating.score"></Star>
                              <span class="delivery" v-show="rating.deliveryTime">
                                {{rating.deliveryTime}}
                              </span>
                          </div>
                          <p class="text">{{rating.text}}</p>
                          <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
                              <i class="iconfont icon-damuzhi"></i>
                              <span  class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                          </div>
                          <div class="time">
                             {{rating.rateTime | formatDate}}
                          </div>
                      </div>
                   </li>
                </ul>
            </div>      
        </div>
    </div>
</template>

<script>
  import Star from '../star/Star.vue';
  import BScroll from 'better-scroll';
  import Split from '../split/Split.vue';
  import RatingSelect from '../ratingSelect/RatingSelect.vue';
  import { formatDate } from '../../common/js/date';
  import data from '../../common/json/data.json';
  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;
  // const ERR_OK = 0;
  export default ({
    name: 'Ratings',
    components: {
      Star,
      Split,
      RatingSelect
    },
    props: ['seller'],
    data () {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: false
      };
    },
    created () {
//      this.$http.get('/api/ratings').then((response) => {
//        response = response.body;
//        if (response.errno === ERR_OK) {
//          this.ratings = response.data;
//          this.$nextTick(() => {
//            console.log(this.$el);
//            this.scroll = new BScroll(this.$el, {click: true});
//          });
//        }
//      });
      this.ratings = data.ratings;
      this.$nextTick(() => {
        this.ratingScroll = new BScroll(this.$refs.ratingScroll, {click: true});
      });
    },
    methods: {
      selectRating (type) { // 接收RatingSelect.vue传过来的参数
        this.selectType = type;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
        });
      },
      toggleContent () { // 接收RatingSelect.vue传过来的参数
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
        });
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
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
  .Ratings
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .ratings-content
      .overview
        display: flex;
        padding: 18px 0 18px 18px;
        .overview-left
          flex: 0 0 137px;
          width: 137px;
          padding: 6px 0px;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          text-align: center;
          @media only screen and (max-width 320px)
            flex: 0 0 100px;
            width: 100px;
          .score
            line-height: 28px;
            font-size: 24px;
            color: rgb(255,153,0); 
          .title
            margin-bottom: 8px;
            line-height: 12px; 
            font-size: 12px; 
            color: rgb(7, 17, 27); 
          .rank
            line-height: 10px; 
            font-size: 12px; 
            color: rgb(147, 153, 159);
        .overview-right
          flex: 1;
          padding: 6px 0 6px 24px;
          @media only screen and (max-width 360px)
            margin-left: 10px;
            padding: 0;
          .score-wrapper
            margin-bottom: 8px;
            line-height: 18px;
            font-size: 0; 
            .title
              display: inline-block;
              vertical-align: top;
              line-height: 18px;
              font-size: 12px;
              color: rgb(7, 17, 27);
            .Star
              display: inline-block;
              margin: 0 12px;
              vertical-align: top;
              .star-item
                margin-right: 4px;
            .score
              display: inline-block;
              vertical-align top;
              line-height 18px;
              font-size 12px;
              color rgb(266, 153, 0); 
          .delivery-wrapper
            font-size: 0
            .title
              line-height: 18px;
              font-size: 12px;
              color: rgb(7, 17, 27);
            .delivery
              display: inline-block;
              margin-left: 12px;
              vertical-align: top;
              line-height: 18px;
              font-size: 12px;
              color: rgb(147, 153, 159);
      .rating-wrapper
        padding: 0 18px;
        .rating-item
          display: flex;
          padding: 18px 0;
          border-bottom1px(rgba(1, 17, 27, 0.1))
          .avatar
            flex: 0 0 28px;
            width: 28px;
            margin-right: 12px;
          img
            border-radius: 50%;
          .content
            position: relative;
            flex: 1;
            .name
              margin-bottom: 4px;
              line-height: 12px;
              font-weight: 700;
              font-size: 10px;
              color: rgb(7, 17, 27);
            .star-wrapper
              margin-bottom: 6px;
              font-size: 0;
              .star
                display: inline-block;
                margin-right: 16px;
                vertical-align: top;
              .delivery
                display: inline-block;
                vertical-align: top;
                font-size: 10px;
                line-height: 12px;
                color: rgb(147, 153, 159);
            .text
              line-height: 18px;
              color: rgb(7, 17, 27);
              font-size: 12px;
              margin-bottom: 8px;
            .recommend
              line-height: 16px;
              font-size: 0;
              .iconfont, .item
                display: inline-block;
                margin: 0 8px 4px 0;
                font-size: 9px;
              .iconfont
                color: rgb(0, 160, 220);
              .item
                padding: 0 6px
                border: 1px solid rgba(7, 17, 27, 0.1);
                border-radius: 1px;
                color: rgb(147, 153, 159);
                background: #ffffff;
            .time
              position: absolute;
              top: 0;
              right: 0;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
</style>
