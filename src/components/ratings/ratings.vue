<template>
  <div class="ratings-afdlu-salt">
    <section class="header">
      <aside class="about-score">
        <p class="service-score">{{ sellerInfo.serviceScore }}</p>
        <h2>综合评分</h2>
        <p class="rank-rate">高于周边商家{{ sellerInfo.rankRate }}%</p>
      </aside>
      <main class="stars">
        <div class="service-score">
          <span class="title">服务态度</span>
          <div class="star-wrapper">
            <Star :score="sellerInfo.serviceScore" :size="24" />
          </div>
        </div>
        <div class="food-score">
          <span class="title">商品评分</span>
          <div class="star-wrapper">
            <Star :score="foodScore" :size="24" />
          </div>
        </div>
        <div class="delivery-time">
          <span class="title">平均送达</span>
          <span class="time">{{deliveryTime}}分钟</span>
        </div>
      </main>
    </section>
    <div class="line-bar"></div>
    <div class="rating-list-wrapper">
      <rating-list :ratings="ratings"></rating-list>
    </div>
  </div>
</template>

<script>
import Star from '@/components/star/star'
import RatingList from '@/components/ratinglist-for-rating/ratinglist-for-rating'
export default {
  computed: {
    ratings () {
      return this.$store.state.ratings
    },
    sellerInfo () {
      return this.$store.state.seller
    },
    foodScore () {
      if (!this.ratings.length) {
        return 0
      }
      return (
        Math.round(this.ratings.reduce((init, item, index, ary) => init + item.score / ary.length, 0) * 10) / 10
      )
    },
    deliveryTime () {
      if (!this.ratings.length) {
        return 0
      }
      return (
        Math.round(
          this.ratings
            .map(it => it.deliveryTime)
            .filter(it => Number.isInteger(it))
            .reduce((init, item, index, ary) => init + item / ary.length, 0)
        )
      )
    }
  },
  components: {
    Star,
    RatingList
  }
}
</script>

<style lang="scss">
@import '../../common/scss/base.scss';
  .ratings-afdlu-salt {
    height: calc(100vh - 3.48rem);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    line-height: 1.5;
    padding-bottom: 0;
    &::-webkit-scrollbar {
      display: none;
    }
    .header {
      padding: .36rem .48rem;
      color: #000;
      background-color: #fff;
      display: flex;
      aside.about-score {
        width: 2.75rem;
        border-right: 1px solid gainsboro;
        transform: translateX(-.24rem);
        text-align: center;
        .service-score {
          padding-bottom: .12rem;
          font-size: .48rem;
          color: rgb(255, 153, 0);
        }
        h2 {
          font-size: .24rem;
          color: rgb(7, 17, 27);
          line-height: 1;
          padding-bottom: .16rem;
          font-weight: 700;
        }
        .rank-rate {
          font-size: .2rem;
          color: rgb(7, 17, 27);
          line-height: 1;
        }
      }
      main.stars {
        padding-left: .48rem;
        width: 0;
        flex-grow: 1;
        > div {
          display: flex;
          line-height: .4rem;
          .title {
            font-size: .24rem;
            color: rgb(7, 17, 27);
            padding-right: .24rem;
          }
          .star-wrapper {
            display: inline-block;
            vertical-align: top;
            height: .4rem;
            width: 0;
            flex-grow: 1;
          }
          .time {
            font-size: .24rem;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .line-bar {
      width: 100vw;
      height: 0.32rem;
      background-color: #f3f5f7;
      border-top: .01rem solid rgba(7, 17, 27, .1);
      border-bottom: .01rem solid rgba(7, 17, 27, .1);
    }
    .rating-list-wrapper {
      margin-top: .36rem;
    }
  }
</style>
