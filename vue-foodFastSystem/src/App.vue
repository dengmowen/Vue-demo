<template>
  <div id="app">
    <left-nav></left-nav>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftNav from '@/components/common/LeftNav';
export default {
  name: 'app',
  components: {
    LeftNav
  }
};
</script>

<style lang="stylus" type="text/stylus">
#app
  font-family: 'SimSun','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .main
    width: 95%;
    height: 100%;
    overflow: hidden;
    float: left;
    background-color: #c0d6e4;
</style>
