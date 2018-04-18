<template>
<div class="shopcart-wrapper">
  <div class="shopcart" @click="toggleShopcartListShow">
    <div class="content">
      <div class="cart-icon" :data-count="totalCount" :class="{selected: totalCount > 0}">
        <span class="icon-shopping_cart"></span>
      </div>
      <div class="tips">
        <span class="price">￥{{ totalPrice }}</span>
        <span class="line"></span>
        <span class="message">另需配送费￥{{ deliveryPrice }}元</span>
      </div>
    </div>
    <div class="check-button" :class="{canCheck: deliveryMoneyLeft <= 0}">
      <template>
        <span class="price" v-if="totalCount === 0">￥{{ minPrice }}起送</span>
        <span class="price" v-else-if="deliveryMoneyLeft > 0">还差￥{{ deliveryMoneyLeft }}元起送</span>
        <span class="check" @click.stop="goCheck" v-else>去结算</span>
      </template>
    </div>
  </div>
  <transition name='selected-list'>
    <div class="shopcart-list" v-show="showShopcartList">
      <h2 class="header">
        <span class="cart">购物车</span>
        <span class="clear">清空</span>
      </h2>
      <ul>
        <li class="list-item border-1px" v-for="food in selectedFoods" :key="food.name">
          <span class="name">{{ food.name }}</span>
          <span class="price">{{ food.price }}</span>
          <div class="cartcontrol-wrapper">
            <cart-control :goods="food"></cart-control>
          </div>
        </li>
      </ul>
      <div class="cover" @click="toggleShopcartListShow"></div>
    </div>
  </transition>
</div>
</template>

<script>
import CartControl from '@/components/cartcontrol/cartcontrol'
export default {
  props: {
    selectedFoods: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: Number,
    minPrice: Number
  },
  data () {
    return {
      showShopcartList: false
    }
  },
  computed: {
    totalPrice () {
      return this.$props.selectedFoods.reduce((init, item) => {
        return (init += item.price * item.count)
      }, 0)
    },
    totalCount () {
      return this.$props.selectedFoods.reduce((init, item) => {
        return (init += item.count)
      }, 0)
    },
    deliveryMoneyLeft () {
      return (this.$props.minPrice - this.totalPrice)
    }
  },
  methods: {
    goCheck () {
      alert('共计' + this.totalPrice + '元')
    },
    toggleShopcartListShow () {
      if (this.selectedFoods.length < 1) {
        return
      }
      this.showShopcartList = !this.showShopcartList
    }
  },
  components: {
    CartControl
  },
  watch: {
    selectedFoods () {
      if (this.selectedFoods.length === 0) {
        this.showShopcartList = false
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../common/scss/mixin.scss';
@import '../../common/scss/base.scss';
.shopcart {
  width: 100%;
  height: 0.96rem;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  font-size: 0;
  background-color: #141d27;
  color: rgba(255, 255, 255, .4);
  padding-left: .36rem;
  z-index: 10;
  .content {
    width: 0;
    font-size: 0;
    flex-grow: 1;
    line-height: .96rem;
    display: flex;
    .cart-icon {
      position: relative;
      &.selected {
        background-color: #00a0dc;
        &::before {
          content: attr(data-count);
          padding: 0 .16rem;
          height: 0.28rem;
          line-height: .28rem;
          text-align: center;
          display: block;
          position: absolute;
          top: -.12rem;
          right: -.12rem;
          font-size: .18rem;
          color: #fff;
          border-radius: .12rem;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 .04rem .08rem 0 rgba(0, 0, 0, .4);
        }
        + .tips {
          .price {
            color: #fff;
          }
        }
      }
      display: inline-block;
      position: relative;
      top: -.16rem;
      width: 1rem;
      height: 1rem;
      border: .12rem solid #141d27;
      border-radius: 9999px;
      background-color: #2b343c;
      text-align: center;
      font-size: .48rem;
      span.icon-shopping_cart {
        vertical-align: 0.05rem;
        color: white;
      }
    }
    .tips {
      padding-left: .24rem;
      .price {
        font-size: .32rem;
      }
      .line {
        display: inline-block;
        margin: 0 .24rem;
        width: 0rem;
        height: .5rem;
        border-right: 1px solid rgba(255, 255, 255, .1);
        background-clip: content-box;
        vertical-align: -.15rem;
      }
      .message {
        font-size: .25rem;
      }
    }
  }
  .check-button {
    width: 2.1rem;
    height: .96rem;
    font-size: .2rem;
    text-align: center;
    background-color: #2b333b;
    font-weight: 900;
    &.canCheck {
      background-color: green;
      color: white;
      font-size: .3rem;
    }
    span {
      line-height: .96rem;
    }
  }
}
.shopcart-list {
  position: fixed;
  left: 0;
  bottom: .96rem;
  width: 100%;
  height: 5.15rem;
  background-color: #fff;
  z-index: 9;
  &.selected-list-enter-active, &.selected-list-leave-active {
    transition: all .5s;
  }
  &.selected-list-enter, &.selected-list-leave-to {
    opacity: 0;
  }
  .cover {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(7, 17, 27, .6);
  }
  h2.header {
    background-color: #f3f5f7;
    height: .8rem;
    font-size: 0;
    line-height: .8rem;
    padding: 0 .36rem;
    @include clearfix();
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    .cart {
      color: rgb(7, 17, 27);
      font-size: .28rem;
    }
    .clear {
      font-size: .24rem;
      color: rgb(0, 160, 220);
      float: right;
    }
  }
  ul {
    height: 100%;
    background-color: #fff;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .list-item {
    display: flex;
    height: .96rem;
    margin: 0 .36rem;
    line-height: .96rem;
    background-color: #fff;
    @include border-1px(rgba(7, 17, 27, .1));
    .name {
      width: 0;
      flex-grow: 1;
      font-size: .28rem;
      color: rgb(7, 17, 27);
    }
    .price {
      font-size: .24rem;
      padding-right: .24rem;
      color: rgb(240, 20, 20);
      font-weight: 900;
      &::before {
        content: '￥';
      }
    }
  }
}
</style>
