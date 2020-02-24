import axios from 'axios'

export const AUTH_START = 'AUTH_START'
export const AUTH_CHECK = 'AUTH_CHECK'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_FINISH = 'AUTH_FINISH'

const state = () => ({
  profile: undefined,
  loading: false
})

const getters = {
  getProfile: state => state.profile,
  getLoading: state => state.loading
}

const actions = {
  [AUTH_START]: async ({state, dispatch, commit}, props) => {
    const { email, password, isRedirect, redirect, component } = props

    if (!email || !password) return

    return new Promise((resolve, reject) => {
      axios.post('/api/auth', { email, password })
        .then(async res => {
          commit(AUTH_REQUEST)
          await component.$apolloHelpers.onLogin('onlogin')
          await dispatch(AUTH_CHECK, {component: component, isRedirect: true})
          isRedirect && component.$router.push({path: redirect || props.isAdmin && '/admin' || '/profile'})
          commit(AUTH_START, res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        }).finally(() => {
          commit(AUTH_FINISH)
        })
    })
  },
  [AUTH_CHECK]: async ({state, dispatch, commit}, props) => {
    const {
      component,
      isRedirect
    } = props
    commit(AUTH_REQUEST)

    return new Promise((resolve, reject) => {
      axios.get('/api/auth')
        .then(async res => {
          commit(AUTH_START, res && res.data || undefined)
          resolve(res.data)
        }).catch(err => {
          dispatch(AUTH_LOGOUT, {component: component, isRedirect: isRedirect})
          reject(err)
        }).finally(() => {
          commit(AUTH_FINISH)
        })
    })
  },
  [AUTH_LOGOUT]: async ({state, commit, dispatch}, props) => {
    const {
      component,
      isRedirect
    } = props
    commit(AUTH_REQUEST)

    return new Promise((resolve, reject) => {
      axios.get('/api/auth/logout')
        .then(async res => {
          resolve(res.data)
          await component.$apolloHelpers.onLogout()
          isRedirect && component.$router.push({path: '/'})
          commit(AUTH_START, undefined)
          dispatch(AUTH_CHECK, {component: this, isRedirect: true})
        }).catch(err => {
          reject(err)
        }).finally(() => {
          commit(AUTH_FINISH)
        })
    })
  }
}

const mutations = {
  [AUTH_START]: (state, user) => {
    state.profile = user
  },
  [AUTH_CHECK]: (state, user) => {
    state.profile = user
  },
  [AUTH_REQUEST]: state => {
    state.loading = true
  },
  [AUTH_FINISH]: state => {
    state.loading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

