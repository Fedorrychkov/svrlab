import {
  ADD_TO_BASKET,
  GET_BASKET,
  SET_BASKET,
  REMOVE_FROM_BASKET,
  PUSH_PRODUCT_TO_BASKET,
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  SET_CHECKOUT_STATUS,
  SET_CHECKOUT
} from '../actions/cart'
import axios from 'axios'

const state = () => ({
  items: [],
  checkoutStatus: null,
  nullableInventory: false
})

const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items
  },
  cartInventoryNull: (state) => {
    return state.nullableInventory
  },
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.cost * product.quantity
    }, 0)
  },
  basketCount: (state, getters) => {
    return getters.cartProducts.reduce((count, product) => {
      return count + product.quantity
    }, 0)
  }
}

const actions = {
  [ADD_TO_BASKET]: ({state, commit}, product) => {
    commit(SET_CHECKOUT_STATUS, null)
    // if (product.inventory > 0) {
    if (product) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit(PUSH_PRODUCT_TO_BASKET, product)
      } else {
        commit(INCREMENT_PRODUCT, {id: cartItem.id})
      }
      commit('SET')
    }
  },
  [GET_BASKET]: ({dispatch, state, commit, rootState}) => {
    if (!rootState.modules.amplifier.amplifiers.length) {
      dispatch('modules/amplifier/GET_AMPLIFIERS', null, {root: true}).then(res => {
        commit('GET', rootState.modules.amplifier.amplifiers)
      })
    } else {
      commit('GET')
    }
  },
  [REMOVE_FROM_BASKET]: ({state, commit}, {id}) => {
    commit(REMOVE_FROM_BASKET, {id})
    commit('SET')
  },
  [DECREMENT_PRODUCT]: ({state, commit}, {id}) => {
    commit(DECREMENT_PRODUCT, {id})
    commit('SET')
  },
  [INCREMENT_PRODUCT]: ({state, commit}, {id}) => {
    commit(INCREMENT_PRODUCT, {id})
    commit('SET')
  },
  [SET_CHECKOUT]: ({state, commit}, data) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/order', data).then(res => {
        resolve(res)
        commit(SET_CHECKOUT, res)
      }).finally(() => {
      })
    })
  }
}

const mutations = {
  [PUSH_PRODUCT_TO_BASKET]: (state, product) => {
    state.items.push({
      ...product,
      quantity: 1
    })
  },
  [SET_BASKET]: (state, products) => {
    state.items = products
  },
  [INCREMENT_PRODUCT]: (state, {id}) => {
    const cartItem = state.items.find(item => item.id === id)
    cartItem && cartItem.quantity++
  },
  [DECREMENT_PRODUCT]: (state, {id}) => {
    const cartItem = state.items.find(item => item.id === id)
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--
    }
  },
  [SET_CHECKOUT_STATUS]: (state, status) => {
    state.checkoutStatus = status
  },
  [REMOVE_FROM_BASKET]: (state, {id}) => {
    const items = state.items.filter(item => item.id !== id)
    state.items = items
  },
  [SET_CHECKOUT]: (state) => {
  },
  [GET_BASKET]: (state, items) => {
    state.items = items
  },
  'SET': (state) => {
    if (process.browser) {
      localStorage.setItem('svrlab.basket', JSON.stringify(state.items))
    }
  },
  'GET': (state, amplifiers) => {
    if (process.browser) {
      let items = JSON.parse(localStorage.getItem('svrlab.basket')) || []
      if (amplifiers) {
        const filtered = items.filter((item) => {
          const amplifier = amplifiers.find(amp => amp.id === item.id)
          if (amplifier) {
            if (!amplifier.inventory) {
              state.nullableInventory = true
            }
            amplifier.quantity = item.quantity
            item = amplifier
            return item
          }
        })
        items = filtered
        localStorage.setItem('svrlab.basket', JSON.stringify(items))
      }
      state.items = JSON.parse(localStorage.getItem('svrlab.basket')) || []
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
