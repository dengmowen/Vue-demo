<template>
    <div class="Seller" ref="sellerScroll">
         <div class="seller-content">
              <div class="overview">
                  <h1 class="title">{{seller.name}}</h1>
                  <div class="desc border-bottom1px">
                    <Star :size="36" :score="seller.score"></Star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                  </div>
                  <ul class="remark">
                     <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                     </li>
                     <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                     </li>
                      <li class="block">
                         <h2>平均配送时间</h2>
                        <div class="content">
                          <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                      </li>
                  </ul>
                  <div class="favorite" @click="toggleFavorite($event)">
                      <i class="icon-favorite" :class="{'active':favorite}"></i>
                      <span class="text">{{favoriteText}}</span>
                  </div>
              </div>
              <split></split>
              <div class="bulletin">
                  <h1 class="title">公告与活动</h1>
                  <div class="content-wrapper border-bottom1px">
                      <p class="content">{{seller.bulletin}}</p>
                  </div>
                 <ul v-if="seller.supports" class="supports">
                      <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                      </li>
                  </ul>
              </div>
              <!-- 商家实景 -->
              <div class="pics">
                  <h1 class="title">商家实景</h1>
                  <div class="pic-wrapper" ref="picWrapper">
                      <ul class="pic-list" ref="picList">
                          <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
                             <img :src="pic" width="120" height="120">
                          </li>
                      </ul>
                  </div>
              </div>
              <split></split>
              <!-- 商家信息 -->
              <div class="info">
                  <h1 class="title border-bottom1px">商家信息</h1>
                  <ul>
                    <li class="info-item border-bottom1px" v-for="(info,index) in seller.infos" :key="index">
                        {{info}}
                    </li>
                  </ul>
              </div>
         </div>
    </div>
</template>

<script>
  import Star from '../star/Star.vue';
  import split from '../split/Split.vue';
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';
  export default ({
    name: 'Seller',
    props: ['seller'],
    components: {
      Star,
      split
    },
    data () {
      return {
        classMap: [
          'decrease',
          'discount',
          'special',
          'invoice',
          'guarantee'
        ],
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    methods: {
      _initSellerScroll () { // seller页面滚动
        if (!this.sellerScroll) {
          this.$nextTick(() => {
            this.sellerScroll = new BScroll(this.$refs.sellerScroll, {click: true});
          });
        } else {
          this.sellerScroll.refresh();
        }
      },
      _initPicScroll () { // 商家实景滚动
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleFavorite (event) { // 收藏
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    },
    watch: {
      'seller' () {
        this.$nextTick(() => {
          this._initSellerScroll();
          this._initPicScroll();
        });
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._initSellerScroll();
        this._initPicScroll();
      });
    }
  });
</script>

<style lang="stylus" type="text/stylus">
@import '../../common/stylus/mixin.styl';
  .Seller
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .seller-content
      .overview
        padding: 18px;
        .title
          margin-bottom: 8px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          font-size: 14px;
        .desc
          padding-bottom: 18px;
          font-size: 0
          border-bottom1px(rgba(7, 17, 27, 0.1));
          .Star
            display: inline-block;
            vertical-align: top;
            margin-right: 8px;
            .star-item
              margin-right: 4px;
          .text
            display: inline-block;
            vertical-align: top;
            margin-right: 12px;
            line-height: 18px;
            font-size: 10px;
            color: rgb(77, 85, 93);
        .remark
          display: flex;
          padding-top: 18px;
          .block
            flex: 1;
            text-align: center;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            &:last-child
              border: none;
            h2
              margin-bottom: 4px;
              line-height: 10px;
              font-size: 10px;
              color: rgb(147, 153, 149);
            .content
              line-height: 24px
              font-size: 10px
              color: rgb(7, 17, 27);
              .stress
                font-size: 24px;
        .favorite
          position: absolute;
          right: 11px;
          top: 18px;
          width: 50px;
          text-align: center;
          .icon-favorite
            display block;
            margin-bottom: 4px;
            line-height: 24px;
            font-size: 24px;
            width: 50px;
            color: #d4d6d9;
            &.active
              color: rgb(240,20,20);
          .text
            line-height: 10px;
            font-size: 10px;
            color: rgb(77,85,93);

      .bulletin
         padding: 18px 18px 0 18px;
        .title
          margin-bottom: 8px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          font-size: 14px;
        .content-wrapper
          padding: 0 12px 16px 1px;
          border-bottom1px(rgba(7, 17, 27, 0.1));
          .content
            line-height: 24px;
            font-size: 12px;
            color: rgb(240, 20, 20);
         .supports
            .support-item
              padding: 16px 12px;
              border-1px(rgba(7, 17, 27, 0.1));
              font-size: 0;
              &:last-child
                border-none()
              .icon
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                &.decrease
                  bg-image('decrease_4');
                &.discount
                  bg-image('discount_4');
                &.guarantee
                  bg-image('guarantee_4');
                &.invoice
                  bg-image('invoice_4');
                &.special
                  bg-image('special_4');
              .text
                display: inline-block;
                font-size: 12px;
                line-height: 16px;
                color: rgb(7, 17, 27);
      .pics
        padding: 18px;
        .title
          margin-bottom: 12px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          font-size: 14px;
        .pic-wrapper
          width: 100%;
          overflow: hidden;
          white-space: nowrap; /*不这行*/
          .pic-list
            font-size: 0;
            .pic-item
              display: inline-block;
              margin-right: 6px;
              width: 120px;
              height: 90px;
              &:last-child
                margin: 0;
      .info
        padding: 18px 18px 0 18px;
        color: rgb(7, 17, 27);
        .title
          padding-bottom: 12px;
          line-height: 14px;
          border-bottom1px(rgba(7, 17, 27, 0.1));
          font-size: 14px
        .info-item
          padding: 16px 12px;
          line-height: 16px;
          border-bottom1px(rgba(7, 17, 27, 0.1));
          font-size: 12px;
          &:last-child
            border-none();                   
</style>
