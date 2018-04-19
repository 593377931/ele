<template>
  <div class="food-detail-wrapper">
    <div class="img">
      <span class="exit icon-arrow_lift" @click="closeFoodDetail"></span>
      <img :src="food.image" alt="food image">
    </div>
    <div class="title">
      <h2>{{ food.name }}</h2>
      <p class="message">
        <span class="sellCount">月售{{ food.sellCount }}份</span>
        <span class="rating">好评率{{ food.rating }}%</span>
      </p>
      <div class="price">
        <span class="current">{{ food.price }}</span>
        <span class="old">{{ food.oldPrice }}</span>
      </div>
      <div class="cart">
        <div class="add-to-cart" @click="addOne" v-if="userSelectedCount === 0">加入购物车</div>
        <div class="cart-control-wrapper" v-else>
          <cart-control :goods="food"></cart-control>
        </div>
      </div>
    </div>
    <div class="line-bar"></div>
    <div class="introduce" v-if="food.info">
      <h2 class="title">商品介绍</h2>
      <p class="detail">{{ food.info }}</p>
    </div>
    <div class="line-bar" v-if="food.info"></div>
    <div class="ratings">
      <h2 class="title">商品评价</h2>
      <rating-list :ratings="food.ratings"></rating-list>
    </div>
  </div>
</template>

<script>
import CartControl from '@/components/cartcontrol/cartcontrol'
import RatingList from '@/components/ratinglist/ratinglist'

export default {
  props: {
    food: Object
  },
  computed: {
    userSelectedCount () {
      let userSelected = this.$store.state.userSelected
      let key = userSelected.indexOf(this.food)
      if (key > -1) {
        return userSelected[key].count
      } else {
        return 0
      }
    }
  },
  methods: {
    addOne () {
      this.$store.commit('addGoods', this.food)
    },
    closeFoodDetail () {
      this.$emit('closeFoodDetail')
    }
  },
  components: {
    CartControl,
    RatingList
  }
}
</script>

<style lang="scss">
.food-detail-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  overflow: auto;
  background-color: #fff;
  padding-bottom: .96rem;
  &::-webkit-scrollbar {
    display: none;
  }
  .img {
    position: relative;
    .exit {
      position: absolute;
      top: .2rem;
      left: .2rem;
      padding: .2rem;
      font-size: .4rem;
      line-height: .4rem;
      color: #fff;
      background-color: rgba(0, 0, 0, .3);
      border-radius: 999rem;
    }
    img {
      width: 100%;
    }
  }
  .title {
    padding: 0 .36rem;
    position: relative;
    h2 {
      font-size: .28rem;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: .28rem;
      margin: .36rem 0 .16rem;
    }
    p.message {
      color: rgb(147, 153, 159);
      font-size: 0;
      line-height: 1;
      margin: .16rem 0 .36rem;
      span {
        font-size: .2rem;
        padding-right: .24rem;
      }
    }
    .price {
      font-weight: 700px;
      font-size: 0;
      margin: .36rem 0;
      .current {
        font-size: .28rem;
        color: rgb(240, 20, 20);
      }
      .old {
        font-size: .2rem;
      }
    }
    .cart {
      position: absolute;
      right: .36rem;
      bottom: .2rem;
      .add-to-cart {
        width: 1.48rem;
        height: 0.48rem;
        border-radius: .24rem;
        color: #fff;
        background-color: rgb(0, 160, 220);
        font-size: .2rem;
        line-height: .48rem;
        text-align: center;
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
  .introduce {
    padding: .36rem;
    .title {
      padding: 0;
      font-size: .28rem;
      margin-bottom: .12rem;
    }
    .detail {
      font-size: .24rem;
      color: rgb(77, 85, 93);
      line-height: 2;
    }
  }
  .ratings {
    .title {
      margin: .36rem;
      padding: 0;
      font-size: .28rem;
    }
  }
}
</style>
