<template>
    <div class="Error">
        <h1>404页面</h1>
        <h3>{{msg}}</h3>
    </div>
</template>
<script>
  export default {
    name: 'Error',
    data () {
      return {
        msg: '页面不存在'
      };
    }
  };
</script>
<style>

</style>
