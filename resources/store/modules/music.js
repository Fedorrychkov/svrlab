import {
  GET_MUSIC,
  GET_MUSICS,
  ADD_MUSIC,
  UPDATE_MUSIC,
  PUSH_MUSIC_IMAGES,
  MUSIC_LOADING,
  MUSIC_ERROR
} from '../actions/music'
import axios from 'axios'

const state = () => ({
  loading: false,
  error: false,
  musics: [],
  music: []
})

const getters = {
  musics: (state, getters) => {
    return state.musics
  },
  music: (state, getters) => {
    return state.music
  }
}

const actions = {
  [ADD_MUSIC]: ({commit, dispatch}, data) => {
    const images = data.images.map(item => {
      return item.id
    })
    data.imageIDs = images
    data.type = 'MUSIC'
    data.images = JSON.stringify(images)
    commit(MUSIC_LOADING, true)
    commit(MUSIC_ERROR, false)
    return new Promise((resolve, reject) => {
      axios.post('/api/music', data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
        commit(MUSIC_ERROR, true)
      }).finally(() => {
        commit(MUSIC_LOADING, false)
      })
    })
  },
  [UPDATE_MUSIC]: ({commit, dispatch}, data) => {
    const images = data.images.map(item => {
      return item.id
    })
    data.imageIDs = images
    data.type = 'MUSIC'
    data.images = JSON.stringify(images)
    commit(MUSIC_LOADING, true)
    commit(MUSIC_ERROR, false)
    return new Promise((resolve, reject) => {
      axios.put('/api/music', data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
        commit(MUSIC_ERROR, true)
      }).finally(() => {
        commit(MUSIC_LOADING, false)
      })
    })
  },
  [GET_MUSICS]: ({commit, dispatch}) => {
    commit(MUSIC_LOADING, true)
    return new Promise((resolve, rej) => {
      axios.get('/api/music').then(res => {
        commit(GET_MUSICS, res.data)
        resolve(res)
      }).catch(err => {
        rej(err)
        commit(MUSIC_ERROR, true)
      }).finally(() => {
        commit(MUSIC_LOADING, false)
      })
    })
  },
  [GET_MUSIC]: ({commit, dispatch}, id) => {
    commit(MUSIC_LOADING, true)
    return new Promise((resolve, rej) => {
      axios.get(`/api/music/${id}`).then(res => {
        commit(GET_MUSIC, res.data)
        resolve(res)
      }).catch(err => {
        rej(err)
        commit(MUSIC_ERROR, true)
      }).finally(() => {
        commit(MUSIC_LOADING, false)
      })
    })
  },
  [PUSH_MUSIC_IMAGES]: ({commit, dispatch}, data) => {
    return Promise((resolve, reject) => {

    })
  }
}

const mutations = {
  [ADD_MUSIC]: (state, data) => {
    state.MUSICs.push(data)
  },
  [UPDATE_MUSIC]: (state, data) => {
    const musics = state.musics.map(item => {
      if (item.id === data.id) {
        item = data
      }
      return item
    })
  },
  [MUSIC_LOADING]: (state, status) => {
    state.loading = status
  },
  [MUSIC_ERROR]: (state, status) => {
    state.error = status
  },
  [GET_MUSICS]: (state, data) => {
    state.musics = data.map(item => {
      item.customFields = JSON.parse(item.customFields)
      return item
    })
  },
  [GET_MUSIC]: (state, data) => {
    data.customFields = JSON.parse(data.customFields)
    state.music = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
