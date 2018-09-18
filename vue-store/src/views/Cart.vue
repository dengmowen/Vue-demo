<template>
    <div class="Cart">
        <h1>我是Cart购物车</h1>
    </div>
</template>

<script>
    export default {
      name: 'Cart',
      data () {
        return {};
      },
      methods: {
      },
      mounted () {
        Vue.http.interceptors.push(function( request, next){
          next(function(response){
            return response;
          });
        }
        ),
        axios.interceptors.request.use(function(config){return config}),
         axios.interceptors.response.use(function(response){return response})
      }
    };
</script>

<style>

</style>
