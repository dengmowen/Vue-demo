<template>
    <div class="Star"  :class="starType">
           <i v-for="(item, index) in starClasses" :key="index" class="star-item" :class="result[index]"></i>
    </div>
</template>
<script>
  export default ({
    name: 'Star',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    data () {
      return {
        result: [],
        starNums: 5 // 要显示的星星数量
      };
    },
    computed: {
      starType () {
        return 'star-' + this.size;
      },
      starClasses () {
        this.result = [];
        // 判断整星
        for (let i = 0; i < Math.floor(this.score); i++) {
          this.result.push('on');
        }
        // 判断是否有半星
        if (this.score < Math.round(this.score)) {
          this.result.push('half');
        }
        // 判断off关闭的星星
        while (this.result.length < this.starNums) {
          this.result.push('off');
        }
        return this.result;
      }
    }
  });
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl';
  .Star
      font-size: 0;
      text-align: center;
      .star-item
        display: inline-block;
        background-repeat: no-repeat;
      &.star-48
        .star-item
          width: 20px;
          height: 20px;
          margin-right: 22px;
          &:last-child
            margin-right: 0;
          &.on
            bg-image('star48_on')
          &.half
            bg-image('star48_half')
          &.off
            bg-image('star48_off')
      &.star-36
        .star-item
          width: 15px;
          height: 15px;
          margin-right: 36px;
          &:last-child
            margin-right: 0;
          &.on
            bg-image('star36_on')
          &.half
            bg-image('star36_half')
          &.off
            bg-image('star36_off')
      &.star-24
        .star-item
          width: 10px;
          height: 10px;
          margin-right: 3px;
          &:last-child
            margin-right: 0;
          &.on
            bg-image('star24_on')
          &.half
            bg-image('star24_half')
          &.off
            bg-image('star24_off')
</style>
