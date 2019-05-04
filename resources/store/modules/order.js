import {
  GET_ORDERS,
  UPDATE_ORDER,
  GET_ORDER
} from '../actions/order'
import axios from 'axios'

const state = () => ({
  items: null,
  order: null
})

const getters = {
  orders: state => state.items,
  order: state => state.order
}

const actions = {
  [GET_ORDERS]: ({commit}) => {
    return new Promise((resolve, reject) => {
      axios.get('/api/order/all').then(res => {
        resolve(res)
        commit(GET_ORDERS, res.data)
      })
    })
  },
  [GET_ORDER]: ({commit, state}, id) => {
    return new Promise((resolve, reject) => {
      // if (!state.order) {
      axios.get(`/api/order/${id}`).then(res => {
        resolve(res)
        commit(GET_ORDER, res.data)
      })
      // } else {
      //   resolve(state.order)
      //   commit(GET_ORDER, state.order)
      // }
    })
  },
  [UPDATE_ORDER]: ({commit}, data) => {

  }
}

const mutations = {
  [GET_ORDERS]: (state, orders) => {
    state.items = orders
  },
  [GET_ORDER]: (state, orders) => {
    state.order = orders
  },
  [UPDATE_ORDER]: (state) => {

  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
