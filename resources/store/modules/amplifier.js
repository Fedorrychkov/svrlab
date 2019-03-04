import {
  GET_AMPLIFIER,
  GET_AMPLIFIERS,
  ADD_AMPLIFIER,
  UPDATE_AMPLIFIER,
  GET_AMPLIFIER_IMAGES,
  PUSH_AMPLIFIER_IMAGES,
  AMPLIFIER_LOADING,
  AMPLIFIER_ERROR,
  AMPLIFIER_SUCCESS
} from "../actions/amplifier";
import gql from 'graphql-tag';

const amplifierMock = {
  id: 1,
  name: '',
  short: '',
  description: '',
  customFields: null,
  preview: null,
  withdrawn: false, // true значит сняты с продажи
  inventory: 10, // Если инвентори пуст, то можно сделать под заказ
  images: null
};

const state = () => ({
  loading: false,
  error: false,
  amplifiers: [],
  amplifier: []
});

const getters = {
  amplifiers: (state, getters, rootState) => {
    return state.amplifiers;
  },
};

const actions = {
  [ADD_AMPLIFIER]: ({commit, dispatch}, data) => {
    commit(AMPLIFIER_LOADING, true);
    commit(AMPLIFIER_ERROR, false);
    try {
      this.state.amplifiers.push(data);
      return;
    } catch(e) {
      commit(AMPLIFIER_ERROR, true);
    } finally {
      commit(AMPLIFIER_LOADING, false);
    }
  }
};

const mutations = {
  [AMPLIFIER_LOADING]: (state, status) => {
    this.state.loading = status;
  },
  [AMPLIFIER_ERROR]: (state, status) => {
    this.state.error = status;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};

