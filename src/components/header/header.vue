<template>
  <div class="header" :style="{'background-image': 'url(' + sellerInfo.avatar + ')' }">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="sellerInfo.avatar" alt="logo">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ sellerInfo.name }}</span>
        </div>
        <div class="description">
          {{ sellerInfo.description + ' / ' + sellerInfo.deliveryTime + '分钟送达' }}
        </div>
        <div v-if="sellerInfo.supports" class="support">
          <span class="icon" :class="supportType(0)"></span>
          <span class="text">{{ sellerInfo.supports[0].description }}</span>
        </div>
      </div>
      <div @click="toggleDetailShow" class="support-count" v-if="sellerInfo.supports">
        <span class="msg">{{sellerInfo.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="toggleDetailShow">
      <span class="bulletin"></span>
      <span class="content">{{ sellerInfo.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <transition name='fade'>
      <div class="detail" v-show="showDetail" ref="detailOuter">
        <div class="detail-wrapper">
          <div class="content-wrapper-salt">
            <h1 class="name">{{ sellerInfo.name }}</h1>
            <div class="star-wrapper">
              <Star :style="starStyle" :score="sellerInfo.score" :size="24" />
            </div>
            <div class="msgBar">
              <span class="line"></span>
              <span class="title">优惠信息</span>
              <span class="line"></span>
            </div>
            <div class="supports">
              <ul>
                <li v-for="(item, index) in sellerInfo.supports" :key="index">
                  <span class="icon" :class="supportType(item.type)"></span>
                  <span class="content">{{ item.description }}</span>
                </li>
              </ul>
            </div>
            <div class="msgBar">
              <span class="line"></span>
              <span class="title">商家公告</span>
              <span class="line"></span>
            </div>
            <p class="bulletin" @click="toggleDetailShow">{{ sellerInfo.bulletin }}</p>
          </div>
          <div class="detail-footer" @click="toggleDetailShow">
            <i class="icon-close"></i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from '@/components/star/star'
import BScroll from 'better-scroll'
export default {
  props: {
    sellerInfo: Object
  },
  name: 'Header',
  data () {
    return {
      showDetail: false,
      starStyle: {
        width: '50%',
        margin: 'auto',
        'margin-top': '.32rem'
      }
    }
  },
  methods: {
    supportType (key) {
      let classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      let type = this.$props.sellerInfo && this.$props.sellerInfo.supports[key].type
      return classMap[type]
    },
    toggleDetailShow () {
      this.showDetail = !this.showDetail
      this.$nextTick(() => {
        this.detailOuter = new BScroll(this.$refs.detailOuter, {
          click: true
        })
      })
    }
  },
  components: {
    Star
  }
}
</script>

<style lang="scss">
  @import "../../common/scss/mixin.scss";
  .header {
    color: #fff;
    background-color: rgba(0,0,0,.7);
    background-size: cover;
    background-blend-mode: color;
    .content-wrapper {
      padding: .48rem .24rem .36rem .48rem;
      display: flow-root;
      position: relative;
      height: calc(.48rem + 1.28rem + .36rem);
      @include clearfix();
      .avatar {
        float: left;
        img {
          width: 1.28rem;
          height: 1.28rem;
          border-radius: .04rem;
        }
      }
      .content {
        float: left;
        margin-top: .04rem;
        margin-left: .32rem;
        .title {
          font-size: .32rem;
          // line-height: .36rem;
          margin-bottom: .16rem;
          span.brand {
            display: inline-block;
            width: .6rem;
            height: .36rem;
            @include bg-image("brand");
            background-size: cover;
            background-repeat: no-repeat;
          }
          span.name {
            vertical-align: top;
          font-weight: 900;
          }
        }
        .description {
          font-size: .24rem;
          margin-bottom: .2rem;
        }
        .support {
          font-size: 0;
          .icon {
            display: inline-block;
            vertical-align: top;
            width: .24rem;
            height: .24rem;
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
          .text {
            font-size: .2rem;
            line-height: .24rem;
            margin-left: .08rem;
          }
        }
      }
      .support-count {
        padding: .16rem;
        height: .48rem;
        position: absolute;
        line-height: .2rem;
        right: .24rem;
        bottom: .36rem;
        background-color: rgba(0,0,0,.2);
        border-radius: .24rem;
        font-size: 0;
        span.msg {
          font-size: .2rem;
          margin-left: .04rem;
        }
        i {
          vertical-align: -.02rem;
          font-size: .2rem;
        }
      }
    }
    .bulletin-wrapper {
      height: .56rem;
      line-height: .56rem;
      padding: 0 .48rem 0 .24rem;
      font-size: .2rem;
      background-color: rgba(7,17,27,.2);
      position: relative;
      @include ellipsis();
      span.bulletin {
        @include bg-image('bulletin');
        display: inline-block;
        width: 0.44rem;
        height: 0.24rem;
        margin: .16rem 0;
        background-size: cover;
        background-repeat: no-repeat;
        vertical-align: top;
        border-radius: .04rem;
      }
      i {
        position: absolute;
        width: .2rem;
        height: .18rem;
        right: .24rem;
        top: 50%;
        transform: translateY(-50%)
      }
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      padding: 0 .72rem;
      z-index: 100;
      background-color: rgba(7, 17, 27, .8);
      overflow: hidden;
      -webkit-backdrop-filter: blur(10px);
      &.fade-enter-active, &.fade-leave-active {
        transition: opacity .3s;
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
      &::-webkit-scrollbar {
        display: none;
      }
      .detail-wrapper {
        flex-wrap: wrap;
        position: relative;
        min-height: 100vh;
        padding-bottom: 1.28rem;
        .content-wrapper-salt {
          padding-top: .72rem;
          .name {
            font-size: .32rem;
            line-height: .32rem;
            font-weight: 700;
            text-align: center;
          }
          .msgBar {
            display: flex;
            line-height: .28rem;
            align-items: center;
            margin: .56rem 0 .48rem;
            span.line {
              display: inline-block;
              flex-grow: 1;
              background-color: rgba(255,255,255,.2);
              height: .02rem;
            }
            span.title {
              font-size: .28rem;
              font-weight: 700;
              padding: 0 .24rem;
            }
          }
          .supports {
            ul {
              li {
                font-size: .24rem;
                line-height: .32rem;
                margin-top: .24rem;
                span.icon {
                  display: inline-block;
                  width: 0.32rem;
                  height: 0.32rem;
                  background-size: contain;
                  vertical-align: top;
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
          p.bulletin {
            padding: 0 .24rem;
            font-size: .24rem;
            line-height: 2;
          }
        }
        .detail-footer {
          position: absolute;
          width: 100%;
          bottom: 0;
          height: 1.28rem;
          font-size: 0;
          text-align: center;
          i {
            color: rgba(255, 255, 255, .5);
            font-size: .64rem;
            line-height: 1.28rem;
          }
        }
      }
    }
  }
</style>
