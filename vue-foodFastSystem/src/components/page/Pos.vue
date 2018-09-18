<template>
  <div class="Pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <!-- show-summary 计算总价 -->
            <el-table :data="tableData" border style="width:100%">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="70%"></el-table-column>
              <el-table-column prop="price" label="价格" width="70%"></el-table-column>
              <el-table-column label="操作" width="120px" fixed="right">
                <template scope="scope">
                  <el-button type="text" size="small" @click="deleteOrderList(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="total-money">
              <small>数量:</small>
              <span>{{totalCount}}</span>
              <small>金额:</small>
              <span>{{totalMoney}}元</span>
            </div>
            <div class="put-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="delAllGoods">删除</el-button>
              <el-button type="success" @click="checkOut">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">
            挂单
          </el-tab-pane>
          <el-tab-pane label="外卖">
            外卖
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="(goods, index) in oftenGoods" :key="index" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">¥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <ul class='cookList'>
                <li v-for="(goods, index) in type0Goods" :key="index" @click="addOrderList(goods)">
                  <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <ul class='cookList'>
                <li v-for="(goods, index) in type1Goods" :key="index" @click="addOrderList(goods)">
                  <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <ul class='cookList'>
                <li v-for="(goods, index) in type2Goods" :key="index" @click="addOrderList(goods)">
                  <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <ul class='cookList'>
                <li v-for="(goods, index) in type3Goods" :key="index" @click="addOrderList(goods)">
                  <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                  <span class="foodName">{{goods.goodsName}}</span>
                  <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Pos',
  data () {
    return {
      tableData: [],
      oftenGoods: [
        {
          'goodsId': 1,
          'goodsName': '香辣鸡腿堡',
          'price': 18
        },
        {
          'goodsId': 2,
          'goodsName': '田园鸡腿堡',
          'price': 15
        },
        {
          'goodsId': 3,
          'goodsName': '和风汉堡',
          'price': 15
        },
        {
          'goodsId': 4,
          'goodsName': '大包薯条',
          'price': 18
        },
        {
          'goodsId': 5,
          'goodsName': '脆皮炸鸡腿',
          'price': 20
        },
        {
          'goodsId': 6,
          'goodsName': '魔法鸡块',
          'price': 20
        },
        {
          'goodsId': 7,
          'goodsName': '可乐大杯',
          'price': 10
        },
        {
          'goodsId': 8,
          'goodsName': '雪顶咖啡',
          'price': 18
        },
        {
          'goodsId': 9,
          'goodsName': '儿童欢乐套餐',
          'price': 25
        },
        {
          'goodsId': 10,
          'goodsName': '快乐全家桶',
          'price': 99
        }
      ],
      type0Goods: [
        {
          'goodsId': 1,
          'goodsImg': 'http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg',
          'goodsName': '香辣鸡腿堡',
          'price': 18
        },
        {
          'goodsId': 2,
          'goodsImg': 'http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg',
          'goodsName': '田园鸡腿堡',
          'price': 15
        },
        {
          'goodsId': 3,
          'goodsImg': 'http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg',
          'goodsName': '和风汉堡',
          'price': 15
        }
      ],
      type1Goods: [
        {
          'goodsId': 4,
          'goodsImg': 'http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg',
          'goodsName': '大包薯条',
          'price': 12
        },
        {
          'goodsId': 5,
          'goodsImg': 'http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg',
          'goodsName': '脆皮炸鸡腿',
          'price': 15
        },
        {
          'goodsId': 6,
          'goodsImg': 'http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg',
          'goodsName': '魔法鸡块',
          'price': 10
        }
      ],
      type2Goods: [
        {
          'goodsId': 7,
          'goodsImg': 'http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg',
          'goodsName': '大可乐大杯',
          'price': 10
        },
        {
          'goodsId': 8,
          'goodsImg': 'http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg',
          'goodsName': '雪顶咖啡',
          'price': 18
        }
      ],
      type3Goods: [
        {
          'goodsId': 9,
          'goodsImg': 'http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg',
          'goodsName': '儿童欢乐套餐',
          'price': 25
        },
        {
          'goodsId': 10,
          'goodsImg': 'http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg',
          'goodsName': '快乐全家桶',
          'price': 125
        }
      ],
      totalMoney: 0,
      totalCount: 0
    };
  },
  mounted () {
    var orderHeight = document.body.clientHeight;
    document.getElementById('order-list').style.height = orderHeight + 'px';
  },
  methods: {
    // 添加订单列表的方法
    addOrderList (goods) {
      this.totalMoney = 0;
      this.totalCount = 0;
      let isHave = false;
      // 判断是否这个商品已经存在于订单列表
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true; // 存在
        }
      }
      // 根据isHave的值判断订单列表中是否已经有此商品
      if (isHave) {
        // 存在就进行数量添加
        let arrList = this.tableData.filter(o => o.goodsId === goods.goodsId);
        arrList[0].count++;
      } else {
        //  不存在就推入数组
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        this.tableData.push(newGoods);
      }
      this.getAllMonery();
    },
    // 删除单个商品
    deleteOrderList (goods) {
      this.tableData = this.tableData.filter(o => o.goodsId !== goods.goodsId);
      this.getAllMonery();
    },
    // 汇总数量跟金额
    getAllMonery () {
      this.totalCount = 0;
      this.totalMoney = 0;
      if (this.tableData) {
        // 进行数量和价格的汇总计算
        this.tableData.forEach((element) => {
          this.totalCount += element.count;
          this.totalMoney = this.totalMoney + ((element.price) * (element.count));
        });
      }
    },
    // 删除所有商品
    delAllGoods () {
      let confirm = window.confirm('确定要撤单吗');
      if (confirm) {
        this.$message({
          message: '撤单成功',
          type: 'success'
        });
        this.tableData = [];
        this.totalCount = 0;
        this.totalMoney = 0;
      }
    },
    // 模拟结账
    checkOut () {
      if (this.totalCount > 0) {
        this.tableData = [];
        this.totalCount = 0;
        this.totalMoney = 0;
        this.$message({
          message: '结账成功, 感谢您的购买',
          type: 'success'
        });
      } else {
        this.$message.error('暂无订单 请下单');
      }
    }
  }

};
</script>

<style lang="stylus" type="text/stylus">
  .Pos
    .pos-order
      border-right: 1px solid #C0CCDA;
      background-color: #F9FAFC;
      .put-btn
        margin-top: .4rem /* 10/25 */;
     .total-money
        padding: .4rem /* 10/25 */;
        border: 1px solid #D3DCE6;
        background-color: #fff;  
    .often-goods /* 商品样式 */
      cursor: pointer;
      .title
        border-bottom: 1px solid #ddd;
        padding: .4rem /* 10/25 */;
        text-align: left;
        background-color: #F9FAFC;
      .often-goods-list
        ul
          li
            padding: .4rem /* 10/25 */;
            margin: .4rem /* 10/25 */;
            border: 1px solid #E5E9F2;
            border-radius: .4rem /* 10/25 */;
            float: left;
            background-color: #FFF; 
        .o-price
          color: #58B7FE;
    .goods-type /* 商品类型 */
        clear: both;
        .cookList 
              cursor: pointer;
              li
                width:23%;
                padding: .08rem /* 2/25 */;
                float: left;
                margin: 10px;
                border:1px solid #E5E9F2;
                height: auto;
                overflow: hidden;
                background-color:#fff;          
                span 
                  display: block;
                  float:left;
              .foodImg
                  width: 40%;
              .foodName
                  font-size: .64rem /* 16/25 */;
                  padding-left: .4rem /* 10/25 */;
                  color:brown;
              .foodPrice
                  font-size: .64rem /* 16/25 */;
                  padding-left: .4rem /* 10/25 */;
                  padding-top: .4rem /* 10/25 */; 
</style>11
