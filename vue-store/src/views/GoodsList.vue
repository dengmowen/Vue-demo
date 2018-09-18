<template>
    <div class="GoodsList">
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods" :class="{'sort-up':sortFlag}">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd>
                   <a href="javascript:void(0)" :class="{'cur':priceChecked == 'all'}" @click="priceChecked = 'all'">All</a>
                </dd>
                <dd v-for="(price, index) in priceFilter" :key="index" >
                  <a href="javascript:void(0)" :class="{'cur':priceChecked == index}" @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>
            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(goods, index) in goodsList" :key="index">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/' + goods.productImg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{goods.productName}}</div>
                      <div class="price">{{goods.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                    加载中.....
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavHeader from '../components/NavHeader';
    import NavFooter from '../components/NavFooter';
    import NavBread from '../components/NavBread';
    export default ({
      name: 'GoodsList',
      components: {
        NavHeader,
        NavFooter,
        NavBread
      },
      data () {
        return {
          goodsList: [],
          priceFilter: [
            {
              startPrice: '0.00',
              endPrice: '500.00'
            },
            {
              startPrice: '500.00',
              endPrice: '1000.00'
            },
            {
              startPrice: '1000.00',
              endPrice: '2000.00'
            },
            {
              startPrice: '2000.00',
              endPrice: '3000.00'
            }
          ],
          priceChecked: 'all',
          filterBy: false, // 价格
          overLayFlag: false, // 遮罩
          sortFlag: true, // 排序
          page: 1,
          pageSize: 8,
          busy: true
        };
      },
      methods: {
        getGoodsList (flag) {
          var param = {
            page: this.page,
            pageSize: this.pageSize,
            sort: this.sortFlag ? 1 : -1
          };
          this.$http.get('/api/goods', {params: param}).then((res) => {
            console.log(res.data.data.count);
            if (res.data.data.status === '0') {
              if (flag) {
                this.goodsList = this.goodsList.concat(res.data.data.result);
                if (res.data.data.count === '0') {
                  this.busy = true;
                } else {
                  this.busy = false;
                }
              } else {
                this.goodsList = res.data.data.result;
                this.busy = false;
              }
            } else {
              this.goodsList = [];
            }
          });
        },
        // 打开遮罩层
        showFilterPop () {
          this.filterBy = true;
          this.overLayFlag = true;
        },
        // 价格点击框框
        setPriceFilter (index) {
          this.priceChecked = index;
          this.closePop();
        },
        // 关闭遮罩层
        closePop () {
          this.filterBy = false;
          this.overLayFlag = false;
        },
        // 排序
        sortGoods () {
          this.sortFlag = !this.sortFlag;
          this.page = 1;
          this.getGoodsList();
        },
        // 加载
        loadMore () {
          this.busy = true;
          setTimeout(() => {
            this.page++;
            this.getGoodsList(true);
          }, 1000);
        }
      },
      mounted () {
        this.getGoodsList();
      }
    });
</script>
