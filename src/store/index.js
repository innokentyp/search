import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { search } from './actions'

export default new Vuex.Store({
  state: {
    loading: false,

    query: '',
    'search-results': []
  },
  getters: {
    loading (state) {
      return state.loading
    },
    query (state) {
      return state.query
    },
    'search-results': function (state) {
      return state['search-results'].map(item => {
        item.url = `https://en.wikipedia.org/wiki/${item.title}`

        return item
      })
    }
  },
  mutations: {
    loading (state, value) {
      state.loading = value
    },
    search (state, value) {
      state.query = value.query
      state['search-results'] = value.results
    }
  },
  actions: {
    search
  }
})
