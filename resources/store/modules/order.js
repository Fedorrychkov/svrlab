import {
  GET_ORDERS,
  GET_ORDER,
  GET_ORDER_STATUSES,
  SET_STATUS
} from '../actions/order'
import axios from 'axios'

const state = () => ({
  items: null,
  order: null,
  statuses: null
})

const getters = {
  orders: state => state.items,
  order: state => state.order,
  statuses: state => state.statuses
}

const actions = {
  [GET_ORDERS]: ({commit}) => {
    return new Promise((resolve, reject) => {
      axios.get('/api/order/all').then(res => {
        resolve(res)
        commit(GET_ORDERS, res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  [GET_ORDER]: ({commit, state}, id) => {
    return new Promise((resolve, reject) => {
      // if (!state.order) {
      axios.get(`/api/order/${id}`).then(res => {
        resolve(res)
        commit(GET_ORDER, res.data)
      }).catch(err => {
        reject(err)
      })
      // } else {
      //   resolve(state.order)
      //   commit(GET_ORDER, state.order)
      // }
    })
  },
  [GET_ORDER_STATUSES]: ({commit}) => {
    return new Promise((resolve, reject) => {
      axios.get('/api/order/statuses').then(res => {
        resolve(res)
        commit(GET_ORDER_STATUSES, res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  [SET_STATUS]: ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      axios.put('/api/order/setstatus', data).then(res => {
        resolve(res)
        commit(SET_STATUS, data)
        dispatch(GET_ORDERS)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

const mutations = {
  [GET_ORDERS]: (state, orders) => {
    state.items = orders
  },
  [GET_ORDER]: (state, orders) => {
    state.order = orders
  },
  [GET_ORDER_STATUSES]: (state, statuses) => {
    state.statuses = statuses
  },
  [SET_STATUS]: (state, data) => {
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
