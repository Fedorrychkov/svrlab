import {
  GET_AMPLIFIER,
  GET_AMPLIFIERS,
  ADD_AMPLIFIER,
  UPDATE_AMPLIFIER,
  PUSH_AMPLIFIER_IMAGES,
  AMPLIFIER_LOADING,
  AMPLIFIER_ERROR
} from '../actions/amplifier'
import axios from 'axios'

const state = () => ({
  loading: false,
  error: false,
  amplifiers: [],
  amplifier: []
})

const getters = {
  amplifiers: (state) => {
    return state.amplifiers
  },
  amplifier: (state) => {
    return state.amplifier
  }
}

const actions = {
  [ADD_AMPLIFIER]: ({commit, dispatch}, data) => {
    const images = data.images.map(item => {
      return item.id
    })
    data.imageIDs = images
    data.type = 'AMPLIFIER'
    data.images = JSON.stringify(images)
    commit(AMPLIFIER_LOADING, true)
    commit(AMPLIFIER_ERROR, false)
    return new Promise((resolve, reject) => {
      axios.post('/api/amplifier', data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
        commit(AMPLIFIER_ERROR, true)
      }).finally(() => {
        commit(AMPLIFIER_LOADING, false)
      })
    })
  },
  [UPDATE_AMPLIFIER]: ({commit, dispatch}, data) => {
    const images = data.images.map(item => {
      return item.id
    })
    data.imageIDs = images
    data.type = 'AMPLIFIER'
    data.images = JSON.stringify(images)
    commit(AMPLIFIER_LOADING, true)
    commit(AMPLIFIER_ERROR, false)
    return new Promise((resolve, reject) => {
      axios.put('/api/amplifier', data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
        commit(AMPLIFIER_ERROR, true)
      }).finally(() => {
        commit(AMPLIFIER_LOADING, false)
      })
    })
  },
  [GET_AMPLIFIERS]: ({commit, state}) => {
    commit(AMPLIFIER_LOADING, true)
    if (state.amplifiers.length) return
    return new Promise((resolve, rej) => {
      axios.get('/api/amplifier').then(res => {
        commit(GET_AMPLIFIERS, res.data)
        resolve(res)
      }).catch(err => {
        rej(err)
        commit(AMPLIFIER_ERROR, true)
      }).finally(() => {
        commit(AMPLIFIER_LOADING, false)
      })
    })
  },
  [GET_AMPLIFIER]: ({commit}, id) => {
    commit(AMPLIFIER_LOADING, true)
    return new Promise((resolve, rej) => {
      axios.get(`/api/amplifier/${id}`).then(res => {
        commit(GET_AMPLIFIER, res.data)
        resolve(res)
      }).catch(err => {
        rej(err)
        commit(AMPLIFIER_ERROR, true)
      }).finally(() => {
        commit(AMPLIFIER_LOADING, false)
      })
    })
  },
  [PUSH_AMPLIFIER_IMAGES]: ({commit, dispatch}, data) => {
    return Promise((resolve, reject) => {

    })
  }
}

const mutations = {
  [ADD_AMPLIFIER]: (state, data) => {
    state.amplifiers.push(data)
  },
  [UPDATE_AMPLIFIER]: (state, data) => {
    const amplifiers = state.amplifiers.map(item => {
      if (item.id === data.id) {
        item = data
      }
      return item
    })
  },
  [AMPLIFIER_LOADING]: (state, status) => {
    state.loading = status
  },
  [AMPLIFIER_ERROR]: (state, status) => {
    state.error = status
  },
  [GET_AMPLIFIERS]: (state, data) => {
    state.amplifiers = data.map(item => {
      item.customFields = JSON.parse(item.customFields)
      return item
    })
  },
  [GET_AMPLIFIER]: (state, data) => {
    data.customFields = JSON.parse(data.customFields)
    state.amplifier = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

