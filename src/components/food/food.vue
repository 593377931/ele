<template>
  <div class="wrapper-food border-1px">
    <img :src="msg.icon" alt="food picture">
    <div class="content" @click="showFoodDeatil">
      <h2 class="name">{{ msg.name }}</h2>
      <p class="description" v-if="msg.description">{{ msg.description }}</p>
      <p class="sellCount">
        <span>月售{{  msg.sellCount }}份</span>
        <span>好评率{{ msg.rating }}%</span>
      </p>
      <p class="price">
        <span class="current">{{ msg.price }}</span>
        <span class="oldPrice" v-if="msg.oldPrice">{{ msg.oldPrice }}</span>
      </p>
    </div>
    <div class="cart-control-wrapper">
      <cart-control :goods="msg"></cart-control>
    </div>
  </div>
</template>

<script>
import CartControl from '@/components/cartcontrol/cartcontrol'

export default {
  props: {
    msg: Object
  },
  data () {
    return {
      operating: false
    }
  },
  components: {
    CartControl
  },
  methods: {
    showFoodDeatil () {
      if (!this.operating) {
        this.$emit('showFoodDeatil')
        this.operating = true
        setTimeout(() => {
          this.operating = false
        }, 20)
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../../common/scss/mixin.scss';
  .wrapper-food {
    @include border-1px(rgba(7, 17, 27, .1));
    position: relative;
    &::after {
      width: 90%;
      left: 0;
      right: 0;
      margin: auto;
    }
    padding: .36rem;
    display: flex;
    img {
      width: 1.14rem;
      height: 1.14rem;
      margin-right: .2rem;
    }
    .content {
      flex-grow: 1;
      .name {
        margin-top: .04rem;
        font-size: .28rem;
        line-height: .28rem;
      }
      .description {
        margin: .16rem 0;
        font-size: .2rem;
        line-height: 1.5;
        color: rgb(147,153,159);
        word-break: break-all;
        white-space: wrap;
      }
      .sellCount {
        margin: .16rem 0;
        font-size: .20rem;
        color: rgb(147,153,159)
      }
      .price {
        font-size: 0;
        .current {
          font-size: .28rem;
          line-height: .28rem;
          color: red;
          font-weight: 700;
          &::before {
            content: '￥';
            font-size: .2rem;
          }
        }
        .oldPrice {
          margin-left: .08rem;
          text-decoration: line-through;
          font-size: .2rem;
          color: rgb(147, 153, 159);
          font-weight: 700;
          &::before {
            content: '￥';
            font-size: .2rem;
          }
        }
      }
    }
    .cart-control-wrapper {
      position: absolute;
      right: .3rem;
      bottom: .3rem;
    }
  }
</style>
