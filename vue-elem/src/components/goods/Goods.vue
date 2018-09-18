<template>
    <div class="Goods">
      <!-- 商品列表 -->
        <div class="menu-wrapper" ref="right_menu">
            <ul>
                <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
                   <div class="menu-item-container border-bottom1px">
                      <i class="icon" v-show="item.type>0" :class="classMap[item.type]"></i>
                      <span>{{item.name}}</span>
                   </div>         
                </li>
            </ul>
        </div>
        <!-- 商品详情 -->
        <div class="foods-wrapper" ref="left_menu">
            <ul>
               <li class="food-list food-list-hook" v-for="(item, index) in goods" :key="index">
                  <h1 class="title">{{item.name}}</h1>
                  <ul>
                      <li class="food-item border-bottom1px" v-for="(food, index) in item.foods" :key="index" @click="selectFood(food, $event)">
                          <div class="icon">
                              <img :src="food.icon" width="57" height="57">
                          </div>
                          <div class="content">
                              <h2 class="name">{{food.name}}</h2>
                              <!-- 描述 -->
                              <p class="desc">{{food.description}}</p>
                              <!-- 评价 -->
                              <div class="extra">
                                  <span class="sellCount">月售{{food.sellCount}}份</span>
                                  <span>好评率{{food.rating}}%</span>
                              </div>
                              <!-- 价格 -->
                              <div class="price">
                                  <span class="nowPrice">¥{{food.price}}</span>
                                  <span class="oldPrice" v-show="food.oldPrice">¥{{food.oldPrice}}%</span>
                              </div>
                              <!-- 增加删除按钮 -->
                              <div class="cart-wrapper">
                                  <cart-control @cartAdd="recCart" :food="food"></cart-control>
                              </div>
                          </div>
                      </li>
                  </ul>
               </li>
            </ul>
        </div>
        <shop-cart ref="shopcart" :select-foods='selectFoods' :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice'></shop-cart>
        <Food :food="selectedFood" ref="checkFood"></Food>
    </div>
</template>

<script>
// 引入better-scroll 滚动
  import BScroll from 'better-scroll';
  import ShopCart from '../../components/shopcart/ShopCart';
  import CartControl from '../../components/cratcontrol/CartControl';
  import Food from '../../components/food/Food';
  import data from '../../common/json/data.json';
  export default ({
    name: 'Goods',
    props: ['seller'],
    components: {
      ShopCart,
      CartControl,
      Food
    },
    data () {
      return {
        goods: [],
        classMap: [
          'decrease',
          'discount',
          'special',
          'invoice',
          'guarantee'
        ],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    methods: {
      _initScroll () { // 初始化滚动
        this.meunScroll = new BScroll(this.$refs.right_menu, { // 右侧菜单
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.left_menu, { // 左侧菜单
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => { // 动态获取Y的取值 根据better-scroll插件来监听   监听右列表滚动
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {  // 计算每一个列表项所在区间
        let foodList = this.$refs.left_menu.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu (index, event) { // 点击右侧跳转
        if (!event._constructed) { // 阻止PC两次点击事件
          return;
        }
        let foodList = this.$refs.left_menu.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      recCart (target) { // 接收catrControl子组件传来的参数
      //  console.log('arguments', arguments);
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target); // shopcart组件接收catrControl增加商品的参数
        });
      },
      selectFood (food, event) { // food.vue组件 商品详情
        if (!event._constructed) { // 阻止PC两次点击事件
          return;
        }
        this.selectedFood = food;
        this.$refs.checkFood.show();
      }
    },
    created () {
      // this.$http.get('./api/goods').then(response => {
      //   this.goods = response.data.data || [];
      //   this.$nextTick(() => {
      //     this._initScroll();
      //     this._calculateHeight();
      //   });
      // }).catch(error => {
      //   console.log('获取数据失败' + error);
      // });
      this.goods = data.goods;
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      });
    },
    computed: {
      currentIndex () { // 动态计算currentIndex
        for (let i = 0; i < this.listHeight.length; i++) {
          let heightOne = this.listHeight[i]; // 滚动的第一个高度
          let heightTwo = this.listHeight[i + 1]; // 滚动的第二个的高度
          if (!heightTwo || (this.scrollY >= heightOne && this.scrollY < heightTwo)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () { // 遍历所有商品 与购物车联动
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    }
  });
</script>

<style lang="stylus" type="text/stylus">
@import '../../common/stylus/mixin.styl';
  .Goods
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper // 商品列表
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      .menu-item
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        &.current
          position: relative;
          margin-top: -1px;
          z-index: 10;
          background: #fff;
          font-weight: 700;
          .text
            border-none();
        .menu-item-container // 商品列表内容
          display: table-cell;
          border-bottom1px(rgba(7,17,27,0.1));
          vertical-align: middle;
          font-size: 12px;
          .icon
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')     
    .foods-wrapper // 商品详情
      flex: 1
      .title
        height: 26px;
        line-height: 26px;
        padding-left: 14px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147,153,159);
        background: #f3f5f7;
      .food-item
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-bottom1px(rgba(7,17,27,0.1));
        &:last-child
          border-none();
          margin-bottom: 0;
        .icon
          flex: 0 0 57px;
          margin-right: 10px;
        .content
          flex: 1;
          .name // 商品标题
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7,17,27);
          .extra,.desc
            line-height: 10px;
            color: rgb(147,153,159);
            font-size: 10px;
          .desc // 描述
            margin-bottom: 8px;
            line-height: 14px;
          .extra // 评价
            .sellCount
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
            right: 0;
            bottom: 12px;     
</style>
