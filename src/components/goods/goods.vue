<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="list-item border-1px" @click="scrollTo(index, $event)" :class="{current: currentIndex === index}" v-for="(item, index) in goods" :key="(item.name)">
          <span class="title">
            <span class="icon" v-if="item.type > -1" :class="supportType(item.type)"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(item, index) in goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food" v-for="food in item.foods" :key="food.name">
              <Food :msg="food"  v-on:showFoodDeatil = "showFoodDeatil(food)" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :selectedFoods="userSelected" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"/>
    <food-detail v-on:closeFoodDetail="showGoodsDetail = null" v-if="showGoodsDetail" :food="showGoodsDetail"></food-detail>
  </div>
</template>

<script>
import Food from '@/components/food/food'
import ShopCart from '@/components/shopcart/shopcart'
import FoodDetail from '@/components/fooddetail/food'

import BScroll from 'better-scroll'

export default {
  data () {
    return {
      listHeight: [],
      scrollY: 0,
      showGoodsDetail: null
    }
  },
  computed: {
    seller () {
      return this.$store.state.seller
    },
    userSelected () {
      return this.$store.state.userSelected
    },
    goods () {
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
      return this.$store.state.goods
    },
    currentIndex () {
      let menuHeights = this.listHeight
      let scrollY = this.scrollY
      for (let i = 0; i < menuHeights.length; i++) {
        let hBefore = menuHeights[i]
        let hAfter = menuHeights[i + 1]
        if (!hAfter || (scrollY >= hBefore && scrollY < hAfter)) {
          return i
        }
      }
    }
  },
  methods: {
    showFoodDeatil (food) {
      this.showGoodsDetail = food
    },
    scrollTo (index, event) {
      if (!event._constructed) {
        return
      }
      let foodLists = this.$refs.foodsWrapper.querySelectorAll('li.food-list-hook')
      this.foodsScroll.scrollToElement(foodLists[index], 300)
    },
    supportType (key) {
      let classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      return classMap[key]
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      })
      this.foodsScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodLists = Array.from(this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'))
      let height = 0
      foodLists.forEach(item => {
        this.listHeight.push(height)
        height += item.clientHeight
      })
    }
  },
  components: {
    Food,
    ShopCart,
    FoodDetail
  }
}
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';
.goods {
  position: absolute;
  top: calc(.48rem + 1.28rem + .36rem + .56rem + .8rem);
  bottom: .96rem;
  width: 100%;
  display: flex;
  .menu-wrapper {
    height: 100%;
    background-color: #f3f5f7;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      .list-item {
        @include border-1px(rgba(7, 17, 27, .1));
        height: 1.08rem;
        width: 1.6rem;
        position: relative;
        &.current {
          background-color: #fff;
          z-index: 10;
          font-weight: 700;
          &::after {
            border: none;
          }
        }
        span.icon {
          display: inline-block;
          width: 0.32rem;
          height: 0.32rem;
          background-size: contain;
          vertical-align: middle;
          margin-bottom: .04rem;
          &.decrease {
            @include bg-image("decrease_3")
          }
          &.discount {
            @include bg-image("discount_3")
          }
          &.guarantee {
            @include bg-image("guarantee_3")
          }
          &.invoice {
            @include bg-image("invoice_3")
          }
          &.special {
            @include bg-image("special_3")
          }
        }
        span.title {
          padding: 0 .24rem;
          font-size: .24rem;
          line-height: .28rem;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .foods-wrapper {
    flex-grow: 1;
    width: 0;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    li.food-list {
      .title {
        font-size: .24rem;
        height: .52rem;
        line-height: .52rem;
        padding-left: .28rem;
        background-color: #f3f5f7;
        position: relative;
        &::before {
          content: " ";
          position: absolute;
          left: 0;
          display: inline-block;
          width: .04rem;
          height: 100%;
          background-color: #d9dde1;
        }
      }
      ul {
        li:last-child {
          div.wrapper::after {
            border: none;
          }
        }
      }
    }
  }
}
</style>
