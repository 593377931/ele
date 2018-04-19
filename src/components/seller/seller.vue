<template>
  <div class="seller" ref="wrapper">
    <div class="content-wrapper">
      <section class="title">
        <div class="header border-1px">
          <h2 class="name">{{ sellerInfo.name }}</h2>
          <div class="star-wrapper">
            <Star :score="sellerInfo.score" :size="36" />
          </div>
          <div class="mounth-count">
            <span class="text">月售{{ sellerInfo.sellCount }}单</span>
          </div>
        </div>
        <div class="footer">
          <div class="minPrice border-right-1px">
            <span class="title">起送价</span>
            <span class="cost">{{ sellerInfo.minPrice }}</span>
            <span class="tail">元</span>
          </div>
          <div class="deliveryPrice border-right-1px">
            <span class="title">{{ sellerInfo.description }}</span>
            <span class="cost">{{ sellerInfo.deliveryPrice }}</span>
            <span class="tail">元</span>
          </div>
          <div class="deliveryTime">
            <span class="title">平均配送时间</span>
            <span class="cost">{{ sellerInfo.deliveryTime }}</span>
            <span class="tail">分钟</span>
          </div>
        </div>
        <div class="heart" @click="toggleCollection">
          <i class="icon-favorite" :class="collected ? 'collected' : 'uncollected'"></i>
          <span class="text">{{ collected ? '已收藏' : '收藏' }}</span>
        </div>
      </section>
      <section class="line-bar"></section>
      <section class="bulletin-support">
        <h2 class="title">公告与活动</h2>
        <div class="bulletin">{{ sellerInfo.bulletin }}</div>
        <div class="supports">
          <ul>
            <li class="support-item border-top-1px" v-for="item in sellerInfo.supports" :key="item.type">
              <span class="icon" :class="supportType(item.type)"></span>
              <span class="description">{{ item.description }}</span>
            </li>
          </ul>
        </div>
      </section>
      <section class="line-bar"></section>
      <section class="photos">
        <h2 class="title">商家实景</h2>
        <div class="pics">
          <img v-for="(item, index) in sellerInfo.pics" :src="item" alt="sellerPics" :key="index">
        </div>
      </section>
      <section class="line-bar"></section>
      <section class="seller-message">
        <h2 class="title">商家信息</h2>
        <ul>
          <li class="seller-info-list border-top-1px" v-for="(item, index) in sellerInfo.infos" :key="index">{{ item }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import Star from '@/components/star/star'
import BScroll from 'better-scroll'

export default {
  beforeMount () {
    this.$nextTick(() => {
      this.wrapper = new BScroll(this.$el, {
        click: true
      })
    })
  },
  computed: {
    sellerInfo () {
      return this.$store.state.seller
    },
    collected () {
      return this.$store.state.collected
    }
  },
  data () {
    return {
      operating: false
    }
  },
  components: {
    Star
  },
  methods: {
    toggleCollection () {
      if (!this.operating) {
        this.betterScorllBugHack()
        this.$store.commit('toggleCollection')
      }
    },
    betterScorllBugHack () {
      this.operating = true
      setTimeout(() => {
        this.operating = false
      }, 20)
    },
    supportType (key) {
      let classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      return classMap[key]
    }
  }
}
</script>

<style lang="scss">
@import '../../common/scss/mixin.scss';
@import '../../common/scss/base.scss';
  .seller {
    width: 100vw;
    height: calc(100vh - 3.48rem);
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .content-wrapper {
      >.line-bar {
        width: 100vw;
        height: 0.32rem;
        background-color: #f3f5f7;
        border-top: .01rem solid rgba(7, 17, 27, .1);
        border-bottom: .01rem solid rgba(7, 17, 27, .1);
      }
      >.title {
        padding: .36rem;
        position: relative;
        >.header {
          background-color: #fff;
          @include border-1px(rgba(7, 17, 27, .1));
          padding-bottom: .36rem;
          .name {
            font-size: .28rem;
            font-weight: 700;
            color: rgb(7, 17, 27);
            line-height: 1;
            padding-bottom: .16rem;
          }
          .star-wrapper {
            display: inline-block;
            height: .2rem;
            width: 1.25rem;
            vertical-align: top;
            margin-right: .24rem;
          }
          .mounth-count {
            vertical-align: top;
            display: inline-block;
            font-size: .2rem;
            line-height: 1;
            color: rgb(77, 85, 93);
          }
        }
        >.footer {
          padding-top: .36rem;
          display: flex;
          >div {
            width: 0;
            flex-grow: 1;
            text-align: center;
            &.minPrice, &.deliveryPrice {
              @include border-right-1px(rgba(7, 17, 27, .1));
            }
            .title {
              display: block;
              color: rgb(147, 153, 159);
              margin-bottom: .08rem;
            }
            .cost {
              font-size: .48rem;
              color: rgb(7, 17, 27);
            }
          }
        }
        >.heart {
          width: .8rem;
          position: absolute;
          right: 0.36rem;
          top: 0.36rem;
          i {
            display: block;
            text-align: center;
            margin-bottom: .08rem;
            color: #d4d6d9;
            &.collected {
              color: red;
            }
          }
          span.text {
            display: block;
            text-align: center;
            color: #93999f;
            &.collected {
              color: rgb(77, 85, 93);
            }
          }
        }
      }
      >.bulletin-support {
        padding: .36rem;
        .title {
          font-weight: 700;
          font-size: .28rem;
          color: rgb(7, 17, 27);
          line-height: 1;
          margin-bottom: .16rem;
        }
        .bulletin {
          padding: 0 .24rem;
          font-size: .24rem;
          line-height: 2;
          font-weight: 200;
          color: rgb(240, 20, 20);
        }
        .supports {
          padding-top: .32rem;
          ul {
            .support-item {
              @include border-top-1px(rgba(7, 17, 27, .1));
              padding: .32rem .24rem;
              font-size: .24rem;
              line-height: .32rem;
              &:last-child {
                padding-bottom: 0;
              }
              .icon {
                display: inline-block;
                vertical-align: top;
                width: .32rem;
                height: .32rem;
                background-size: cover;
                background-repeat: no-repeat;
                &.decrease {
                  @include bg-image("decrease_1")
                }
                &.discount {
                  @include bg-image("discount_1")
                }
                &.guarantee {
                  @include bg-image("guarantee_1")
                }
                &.invoice {
                  @include bg-image("invoice_1")
                }
                &.special {
                  @include bg-image("special_1")
                }
              }
            }
          }
        }
      }
      >.photos {
        padding: .36rem;
        .title {
          font-weight: 700;
          font-size: .28rem;
          color: rgb(7, 17, 27);
          line-height: 1;
          padding-bottom: .24rem;
        }
        .pics {
          font-size: 0;
          width: 100%;
          height: auto;
          overflow: auto;
          white-space: nowrap;
          &::-webkit-scrollbar {
            display: none;
          }
          img {
            height: 1.80rem;
            padding-right: .12rem;
            &:last-child {
              padding-right: 0;
            }
          }
        }
      }
      >.seller-message {
        padding: .36rem;
        .title {
          font-weight: 700;
          font-size: .28rem;
          color: rgb(7, 17, 27);
          line-height: 1;
          padding-bottom: .24rem;
        }
        ul {
          margin-bottom: -.36rem;
          .seller-info-list {
            font-size: .24rem;
            line-height: .32rem;
            padding: .32rem .24rem;
            @include border-top-1px(rgba(7, 17, 27, .1));
          }
        }
      }
    }
  }
</style>
