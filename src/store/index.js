import { createStore } from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

export const state = {
  cart: [],
  books: [],
  booksFilter: [],
  loadingCart: {},
  loadingCatalog: {},
  refetchCart: {},
  quantityBooksCart: 0,
}

const store = createStore({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store