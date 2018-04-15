<template>
  <div class="star">
    <span v-for="(starType, index) in starTypes" :class="starType" :key="index"></span>
  </div>
</template>

<script>
export default {
  props: {
    score: Number,
    size: Number
  },
  computed: {
    starTypes () {
      let result = new Array(5).fill('star' + this.size)
      let onCount = Math.floor(this.score)
      let halfCount = this.score - onCount >= 0.5 ? 0 : 1
      if (halfCount === 0) {
        onCount += 1
      }
      for (let i = 0; i < 5; i++) {
        if (onCount-- > 0) {
          result[i] = 'star' + this.size + ' ' + 'on'
        } else if (halfCount-- > 0) {
          result[i] = 'star' + this.size + ' ' + 'half'
        } else {
          result[i] = 'star' + this.size + ' ' + 'off'
        }
      }
      return result
    }
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.star {
  width: 100%;
  display: flex;
  span {
    flex-grow: 1;
    justify-content: space-between;
    display: inline-block;
    &.star24 {
      width: .4rem;
      height: .4rem;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 50% 50%;
      &.half {
        @include bg-image(star24_half)
      }
      &.off {
        @include bg-image(star24_off)
      }
      &.on {
        @include bg-image(star24_on)
      }
    }
    &.star36 {
      width: .6rem;
      height: .6rem;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 50% 50%;
      &.half {
        @include bg-image(star36_half)
      }
      &.off {
        @include bg-image(star36_off)
      }
      &.on {
        @include bg-image(star36_on)
      }
    }
    &.star48 {
      width: .8rem;
      height: .8rem;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 50% 50%;
      &.half {
        @include bg-image(star48_half)
      }
      &.off {
        @include bg-image(star48_off)
      }
      &.on {
        @include bg-image(star48_on)
      }
    }
  }
}
</style>
