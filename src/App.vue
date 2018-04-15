<template>
  <div id="app">
    <v-header :sellerInfo="$store.state.seller" />
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link tag="div" to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="div" to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link tag="div" to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import VHeader from '@/components/header/header'
export default {
  data () {
    return {
      seller: {}
    }
  },
  name: 'App',
  components: {
    VHeader
  }
}
</script>

<style lang="scss">
@import "common/scss/mixin.scss";
#app {
  div.tab {
    display: flex;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    font-size: .28rem;
    @include border-1px(rgba(7, 17, 27, .1));
    // border-bottom: 1px solid rgba(7, 17, 27, .1);
    .tab-item {
      flex-grow: 1;
      text-align: center;
      color: rgb(77, 85, 93);
      div.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
