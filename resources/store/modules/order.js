import {
  GET_ORDERS,
  UPDATE_ORDER
} from '../actions/order'
import axios from 'axios'

const state = () => ({
  items: null
})

const getters = {
  orders: state => state.items
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
  [UPDATE_ORDER]: ({commit}, data) => {

  }
}

const mutations = {
  [GET_ORDERS]: (state, orders) => {
    state.items = orders
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
