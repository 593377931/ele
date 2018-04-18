<template>
  <div class="cart-control">
    <transition name="trans">
      <div class="decrease icon-remove_circle_outline" v-show="count > 0" @click="remove"></div>
    </transition>
    <transition name="trans">
      <div class="count" v-show="count > 0">{{ count }}</div>
    </transition>
    <div class="increase icon-add_circle" @click="add"></div>
  </div>
</template>

<script>
export default {
  props: {
    goods: Object
  },
  data () {
    return {
      operating: false
    }
  },
  methods: {
    add (event) {
      if (!this.operating) {
        // better-scroll 插件点击事件触发两侧 bug hack
        this.operating = true
        setTimeout(() => {
          this.operating = false
        }, 20)
        this.$store.commit('addGoods', this.$props.goods)
      }
    },
    remove (event) {
      if (!this.operating) {
        this.operating = true
        setTimeout(() => {
          this.operating = false
        }, 20)
        this.$store.commit('removeGoods', this.$props.goods)
      }
    }
  },
  computed: {
    count () {
      let userSelected = this.$store.state.userSelected
      let key = userSelected.indexOf(this.goods)
      return (key > -1 ? userSelected[key].count : 0)
    }
  }
}
</script>

<style lang="scss">
.cart-control {
  display: flex;
  font-size: .48rem;
  color: rgb(0, 160, 220);
  align-items: center;
  .trans-enter-active, .trans-leave-active {
    transition: all .2s;
  }
  .trans-enter, .trans-leave-to {
    opacity: 0;
  }
  div {
    flex-basis: 0;
    flex-grow: 1;
  }
  .decrease, .increase {
    padding: .1rem;
  }
  .count {
    font-size: .2rem;
    color: rgb(147, 153, 159);
  }
}
</style>
