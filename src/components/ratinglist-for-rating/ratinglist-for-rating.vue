<template>
  <div class="rating-list-wrapper">
    <div class="filter border-1px">
      <div class="buttons border-1px">
        <label>
          <input type="radio" name="toggle-button" value="all" v-model="parts">
          <span class="all">全部 {{ ratings.length }}</span>
        </label>
        <label>
          <input type="radio" name="toggle-button" value="recommend" v-model="parts">
          <span class="recommend">推荐 {{ ratings.filter(it => it.rateType === 0).length }}</span>
        </label>
        <label>
          <input type="radio" name="toggle-button" value="complain" v-model="parts">
          <span class="complain">吐槽 {{ ratings.filter(it => it.rateType === 1).length }}</span>
        </label>
      </div>
      <div class="checkbox" @click="toggleFilter">
        <label>
          <input type="checkbox" :checked="filter">
          <i class="icon-check_circle"></i>
          <span class="tips">只看有内容的评价</span>
        </label>
      </div>
    </div>
    <ul class="ratings">
      <li class="rating-item border-1px" v-for="item in listToShowFiltered" :key="item.username + item.rateTime">
        <div class="timestamp">{{ new Date(item.rateTime).toLocaleString() }}</div>
        <div class="delivery-time-wrapper" v-if="item.score || item.deliveryTime">
          <div class="star-wrapper" v-if="item.score">
            <Star :score="item.score" :size="24" />
          </div>
          <div class="delivery-time" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</div>
        </div>
        <div class="content">
          <span class="text">{{ item.text }}</span>
        </div>
        <div class="recommend">
          <i class="icon-thumb_up positive" v-if="item.rateType === 0"></i>
          <i class="icon-thumb_down negative" v-if="item.rateType === 1"></i>
          <span class="recommend border-1px" v-for="food in item.recommend" :key="food">{{ food }}</span>
        </div>
        <div class="user-info">
          <span class="username">{{ item.username }}</span>
          <img :src="item.avatar" alt="useravatar" class="useravatar">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Star from '@/components/star/star'
export default {
  props: {
    ratings: Array
  },
  data () {
    return {
      parts: 'all',
      filter: false,
      operating: false
    }
  },
  computed: {
    listToShow () {
      const POSITIVE = 0
      const NEGATIVE = 1
      if (this.parts === 'all') {
        return this.ratings
      } else if (this.parts === 'recommend') {
        return this.ratings.filter(item => item.rateType === POSITIVE)
      } else if (this.parts === 'complain') {
        return this.ratings.filter(item => item.rateType === NEGATIVE)
      }
    },
    listToShowFiltered () {
      if (this.filter) {
        return this.listToShow.filter(item => item.text !== '')
      } else {
        return this.listToShow
      }
    }
  },
  components: {
    Star
  },
  methods: {
    toggleFilter () {
      if (this.operating) {
        this.betterScorllBugHack()
        this.filter = !this.filter
      }
    },
    betterScorllBugHack () {
      this.operating = true
      setTimeout(() => {
        this.operating = false
      }, 20)
    }
  }
}
</script>

<style lang="scss">
@import '../../common/scss/base.scss';
@import '../../common/scss/mixin.scss';
  .rating-list-wrapper {
    .filter {
      padding: 0 .36rem;
      @include border-1px(rgba(7, 17, 27, .2));
      .buttons {
        font-size: 0;
        padding-bottom: .36rem;
        @include border-1px(rgba(7, 17, 27, .1));
        input {
          display: none;
        }
        span {
          font-size: .24rem;
          display: inline-block;
          padding: .16rem .24rem;
          border-radius: .04rem;
          margin-right: .16rem;
          &.all {
            color: #fff;
            background-color: rgb(0, 160, 220);
          }
          &.recommend {
            color: rgb(77, 85, 93);
            background-color: rgba(0, 160, 220, .2);
          }
          &.complain {
            color: rgb(77, 85, 93);
            background-color: rgba(77, 85, 93, .2);
          }
        }
      }
      .checkbox {
        font-size: 0;
        padding: 0.24rem 0;
        color: rgb(147, 153, 159);
        label {
          height: .48rem;
          input {
            display: none;
            &:checked {
              ~i, ~span.tips {
                color: rgba(0, 0, 0, .8);
              }
            }
          }
          i {
            font-size: .48rem;
            line-height: .48rem;
            vertical-align: top;
            padding-right: .08rem;
          }
          .tips {
            line-height: .48rem;
            font-size: .24rem;
            vertical-align: top;
          }
        }
      }
    }
    .ratings {
      padding: .36rem .36rem 0 .36rem;
      .rating-item {
        &:last-child::after{
          border: none;
        }
        @include border-1px(rgba(7, 17, 27, .2));
        padding: .32rem 0;
        position: relative;
        font-size: 0;
        display: flow-root;
        .timestamp {
          font-size: .2rem;
          color: rgb(147, 153, 159);
        }
        .delivery-time-wrapper {
          display: flex;
          width: 100vw;
          margin: .08rem 0 .12rem;
          .star-wrapper {
            vertical-align: top;
            margin: .08rem 0;
            width: 1.5rem;
            height: 0.24rem;
            display: inline-block;
            vertical-align: top;
            padding-right: .12rem;
          }
          .delivery-time {
            width: 0;
            flex-grow: 1;
            font-size: .2rem;
            height: .4rem;
            line-height: .4rem;
          }
        }
        .content {
          margin-top: .12rem;
          font-size: .24rem;
        }
        .recommend {
          margin-top: .12rem;
          .positive {
            color: rgb(0, 160, 220);
            font-size: .24rem;
            line-height: .27rem;
            margin-right: .16rem;
          }
          .negative {
            color: rgb(147, 153, 159);
            font-size: .24rem;
            line-height: .27rem;
            margin-right: .16rem;
          }
          .recommend {
            display: inline-block;
            font-size: .18rem;
            line-height: 1.5;
            padding: 0 .12rem;
            margin-right: .16rem;
            width: 1rem;
            border: 1px solid rgba(7, 17, 27, .2);
            color: rgb(147, 153, 159);
            text-align: center;
            @include ellipsis();
          }
        }
        .user-info {
          position: absolute;
          right: 0;
          top: 0.32rem;
          font-size: 0;
          .username {
            font-size: .2rem;
            line-height: .24rem;
            color: rgb(147, 153, 159);
          }
          .useravatar {
            width: 0.24rem;
            height: 0.24rem;
            border-radius: 999rem;
            margin-left: .12rem;
            vertical-align: top;
          }
        }
      }
    }
  }
</style>
