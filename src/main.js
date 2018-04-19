// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'

import '@/common/scss/index.scss'

const ERR_OK = 0

Vue.use(Vuex)
Vue.config.productionTip = false
var store = new Vuex.Store({
  state: {
    seller: {},
    ratings: [],
    goods: [],
    userSelected: [],
    collected: false
  },
  getters: {},
  mutations: {
    loadSeller: (state, data) => {
      state.seller = data
    },
    loadRatings: (state, data) => {
      state.ratings = data
    },
    loadGoods: (state, data) => {
      state.goods = data
    },
    addGoods: (state, goods) => {
      let userSelected = state.userSelected
      let key = userSelected.indexOf(goods)
      if (key > -1) {
        userSelected[key].count++
        let temp = userSelected[key]
        userSelected.splice(key, 1, temp)
      } else if (key === -1) {
        goods.count = 1
        userSelected.push(goods)
      }
    },
    removeGoods: (state, goods) => {
      let userSelected = state.userSelected
      let key = userSelected.indexOf(goods)
      if (userSelected[key].count > 0) {
        userSelected[key].count--
        let temp = userSelected[key]
        if (temp.count > 0) {
          userSelected.splice(key, 1, temp)
        } else {
          userSelected.splice(key, 1)
        }
      }
    },
    toggleCollection: (state) => {
      state.collected = !state.collected
    }
  }
})

/* eslint-disable no-new */
new Vue({
  created () {
    axios.get('/api/seller')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          this.$store.commit('loadSeller', res.data.data)
          this.loadWatcher.push('seller loaded')
        }
      })
    axios.get('/api/ratings')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          this.$store.commit('loadRatings', res.data.data)
          this.loadWatcher.push('ratings loaded')
        }
      })
    axios.get('/api/goods')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          this.$store.commit('loadGoods', res.data.data)
          this.loadWatcher.push('seller loaded')
        }
      })
  },
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  data () {
    return {
      loadWatcher: []
    }
  },
  watch: {
    loadWatcher () {
      if (this.loadWatcher.length === 3) {
        let mask = document.querySelector('body > div.cover')
        mask.classList.add('loaded')
        setTimeout(() => {
          document.body.removeChild(mask)
          mask = null
        }, 550)
      }
    }
  }
})
