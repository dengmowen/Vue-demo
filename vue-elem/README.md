# Vue-elem
# 基于Vue的elem移动端开发
> vue-elem

#### 观看地址
> 手机观看模式下更佳 [elem项目地址](http://www.dengmowen.cn/demo/vue/elem)
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
 > 打包到服务器如果不是根目录 修改config目录下的index.js--> assetsPublicPath
# build for production and view the bundle analyzer report
npm run build --report
```
# 接口请求在dev-server 封装方法
# 项目技术架构
 * vue
 * vue-cli
 * vue-resource
 * webpack
 * vue-router
 * stylus
   > cnpm i stylus --save
 * axios
   > cnpm i axios --save
 * better-scroll
   > cnpm i better-scroll --save
###目录结构
***
<pre>
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // 图片资源
│   ├── common          // 公共的css js 资源
│   ├── components     // 各种组件
│   ├── App.vue         // 主页面 
│   └── main.js        // Webpack 预编译入口
</pre>

###实现的功能
***
* 商品滚动 ，商品滚轮滚动
* 商品联动
* 加入购物车，移除购物车
* 显示评论 评论筛选
* 图片左右滑动
* 商品详情  父子组件的通信
* 等等
### 后续会持续升级的
