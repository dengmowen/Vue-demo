<template>
    <div class="RatingSelect">
        <div class="rating-type border-bottom1px">
            <div @click="select(2,$event)" class="block positive" :class="{'active': selectType === 2}">
              {{desc.all}}
              <span class="count">{{ratings.length}}</span>
            </div>
            <div @click="select(0,$event)" class="block positive" :class="{'active': selectType === 0}">
              {{desc.positive}}
              <span class="count">{{positives.length}}</span>
            </div>
            <div @click="select(1,$event)" class="block negative" :class="{'active': selectType === 1}">
                {{desc.negative}}
                <span class="count">{{nagatives.length}}</span>
            </div>
        </div>
        <div @click="toggleContent($event)" class="rating-wsitch" :class="{'on': onlyContent}">
            <i class="icon-check_circle"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '吐槽'
          };
        }
      }
    },
    data () {
      return {
      };
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      nagatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type);  // 子组件通过$emit触发父组件的方法
      },
      toggleContent (event) { // 子组件通过$emit触发父组件的方法
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle', event);
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus">
@import '../../common/stylus/mixin.styl';
  .RatingSelect
    .rating-type
      padding: 18px 0;
      margin: 0 18px;
      border-bottom1px(rgba(7,17,27,0.1));
      font-size: 0;
      .block
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77,85,93)
        &.active
          color: #fff;
        .count
          margin-left: 2px;
          font-size: 8px;
        &.positive
          background: rgba(0,160,220,0.2);
          &.active
            background: rgb(0,160,220);
        &.negative
          background: rgba(77,85,93,0.2); 
          &.active
            background: rgb(77,85,93);
    .rating-wsitch
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      color: rgb(147,153,159);
      font-size: 0;
      &.on
        .icon-check_circle
          color: #00c850;
      .icon-check_circle
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      .text
        font-size: 12px;
</style>