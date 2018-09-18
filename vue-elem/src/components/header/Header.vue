<template>
    <div class="Header">
         <!-- 优惠消息 -->
       <div class="content-wrapper">
              <!-- 商家头像 -->
              <div class="avata">
                    <img :src="seller.avatar" alt="">
              </div>
              <!-- 商家内容 -->
              <div class="content">
                    <div class="title">
                        <span class="brand"></span>
                        <span class="title-name">{{seller.name}}</span>
                    </div>
                    <div class="description">
                        {{seller.description}}/{{seller.deliveryTime}}分钟送达
                    </div>
                    <div class="support" v-if="seller.supports">
                        <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                        <span class="text">{{seller.supports[0].description}}</span>
                    </div>
              </div>
              <div class="support-count" v-if="seller.supports" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
              </div>
       </div>
       <!-- 公告栏 -->
       <div class="bulletin-wrapper" @click="showDetail">
           <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
           <i class="icon-keyboard_arrow_right"></i>
       </div>
       <!-- 背景模糊图片 -->
       <div class="background">
            <img :src="seller.avatar">
       </div>
       <transition name="fade">
         <!-- 弹出框 -->
          <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <!-- 内容层 -->
                    <div class="detail-main">
                        <h1 class="detail-main-name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <!-- 优惠信息 -->
                        <div class="title">
                              <div class="line"></div>
                              <div class="text">优惠信息</div>
                              <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                                <i class="icon" :class="classMap[seller.supports[index].type]"></i>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <!-- 商家公告 -->
                        <div class="title">
                              <div class="line"></div>
                              <div class="text">商家公告</div>
                              <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <!-- 关闭按钮 -->
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>
          </div>
       </transition>
       
    </div>
</template>

<script>
  import star from '../star/Star.vue';
  export default ({
    name: 'Header',
    props: ['seller'],
    components: {
      star
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
        detailShow: false
      };
    },
    methods: {
      showDetail () { // 查看详情
        this.detailShow = true;
      },
      hideDetail () { // 关闭按钮
        this.detailShow = false;
      }
    },
    created () {
    }
  });
</script>

<style lang="stylus" type="text/stylus">
@import '../../common/stylus/mixin.styl';
  .Header
    position: relative;
    color: #fff;
    overflow: hidden;
    background-color: rgba(7,17,27,0.5);
    .content-wrapper
      padding: 24px 12px  18px  24px;
      font-size: 0;
      .avata // 商家头像
        display: inline-block;
        vertical-align: top;
        img
          width: 64px;
          height: 64px;
          border-radius: 2px;
      .content // 商家内容
        display: inline-block;
        margin-left: 16px;
        font-size: 14px;
        .title
          margin: 20ox 0 8px 0 ;
          .brand
            width: 30px;
            height: 18px;
            display: inline-block;
            vertical-align: top;
            bg-image('brand');
            background-size:30px 18px;
            background-repeat: no-repeat;
          .title-name
            margin-left: 6px; 
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
        .description
          margin: 5px 0;
          line-height: 12px;
          font-size: 12px;    
        .support
          .icon
            display: inline-block;
            vertical-align: bottom;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px;
            font-size: 10px;
      .support-count
        position: absolute;
        right: 12px;
        top: 60px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        .count
          vertical-align: top;
          font-size: 10px;
        .icon-keyboard_arrow_right
          margin-left: 2px;
          line-height: 24px;
          font-size: 10px;
    .bulletin-wrapper   // 公告栏
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: rgba(7,17,27,0.2);
      .bulletin-title
        vertical-align: top;
        margin-top: 7px;
        display: inline-block;
        width: 22px;
        height: 12px;
        bg-image('bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
      .bulletin-text
        vertical-align: top;
        margin: 0 4px;
        font-size: 10px;
        font-weight: 200;
      .icon-keyboard_arrow_right
        position: absolute;
        right: 12px;
        top: 8px;
        font-size: 10px;
    .background  // 背景模糊图片
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
      img
        width: 100%;
        height: 100%;
    .detail  // 弹出层 static
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      backdrop-filter: blur(10px); // ios支持特性
      background: rgba(7,17,27,0.8);
      &.fade-enter-active, .fade-leave-active // 关闭按钮效果
         opacity: 1;
         transition: all .5s; 
      &.fade-enter, &.fade-leave-to
        opacity: 0;
        background: rgba(7,17,27,0);
      .detail-wrapper  // Sticky footer 布局
        width: 100%;
        min-height: 100%;
        .detail-main
          margin-top: 64px;
          padding-bottom: 64px;
          .detail-main-name // 弹框标题
            line-height: 16px;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
          .star-wrapper  // 星星
            margin-top: 18px;
            padding: 2px 0;
            text-align: center; 
          .title  // 优惠信息
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;
            .line
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom1px(rgba(255,255,255,0.2))
             // border-bottom: 1px solid rgba(255,255,255,0.2);
            .text
              padding: 0 12px;
              font-weight: 700;
              font-size: 14px;
          .supports // 弹框优惠信息
            width: 80%;
            margin: 0 auto;
            .support-item
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child
                margin-bottom: 0;
              .icon
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 16px;
                vertical-align: top;
                &.decrease
                  bg-image('decrease_2');
                &.discount
                  bg-image('discount_2');
                &.invoice
                  bg-image('invoice_2');
                &.special
                  bg-image('special_2');
                &.guarantee
                  bg-image('guarantee_2');  
              .text
                  line-height: 16px;
                  font-size: 12px;
          .bulletin  // 商家公告
            width: 80%;
            margin: 0 auto;
            .content
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;         
      .detail-close // 关闭按钮
          position: relative;
          width: 32px;
          height: 32px;
          margin: -64px auto 0 auto;
          clear: both;
          font-size: 32px;  
</style>