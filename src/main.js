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
    ratings: {},
    goods: {}
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
        }
      })
    axios.get('/api/ratings')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          this.$store.commit('loadRatings', res.data.data)
        }
      })
    axios.get('/api/goods')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          this.$store.commit('loadGoods', res.data.data)
        }
      })
  },
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
