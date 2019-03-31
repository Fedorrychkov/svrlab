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
import axios from 'axios';

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
  amplifiers: (state, getters) => {
    return state.amplifiers;
  },
  amplifier: (state, getters) => {
    return state.amplifier;
  },
};

const actions = {
  [ADD_AMPLIFIER]: ({commit, dispatch}, data) => {
    const images = data.images.map(item => {
      return item.id;
    });
    data.images = JSON.stringify(images);
    commit(AMPLIFIER_LOADING, true);
    commit(AMPLIFIER_ERROR, false);
    return new Promise((resolve, reject) => {
      axios.post('/api/amplifier', data).then(res => {
        resolve(res);
      }).catch(err => {
        commit(AMPLIFIER_ERROR, true);
      }).finally(() => {
        commit(AMPLIFIER_LOADING, false);
      });
    });
  },
  [UPDATE_AMPLIFIER]: ({commit, dispatch}, data) => {
    const images = data.images.map(item => {
      return item.id;
    });
    data.images = JSON.stringify(images);
    commit(AMPLIFIER_LOADING, true);
    commit(AMPLIFIER_ERROR, false);
    return new Promise((resolve, reject) => {
      axios.put('/api/amplifier', data).then(res => {
        resolve(res);
      }).catch(err => {
        commit(AMPLIFIER_ERROR, true);
      }).finally(() => {
        commit(AMPLIFIER_LOADING, false);
      });
    });
  },
  [GET_AMPLIFIERS]: ({commit, dispatch}) => {
    commit(AMPLIFIER_LOADING, true);
    return new Promise((resolve, rej) => {
      axios.get('/api/amplifier').then(res => {
        commit(GET_AMPLIFIERS, res.data);
        resolve(res);
      }).catch(err => {
        rej(err);
        commit(AMPLIFIER_ERROR, true);
      }).finally( () => {
        commit(AMPLIFIER_LOADING, false);
      });
    });
  },
  [GET_AMPLIFIER]: ({commit, dispatch}, id) => {
    commit(AMPLIFIER_LOADING, true);
    return new Promise((resolve, rej) => {
      axios.get(`/api/amplifier/${id}`).then(res => {
        commit(GET_AMPLIFIER, res.data);
        console.log(res);
        resolve(res);
      }).catch(err => {
        rej(err);
        commit(AMPLIFIER_ERROR, true);
      }).finally( () => {
        commit(AMPLIFIER_LOADING, false);
      });
    });
  },
  [PUSH_AMPLIFIER_IMAGES]: ({commit, dispatch}, data) => {
    return Promise((resolve, reject) => {

    });
  }
};

const mutations = {
  [ADD_AMPLIFIER]: (state, data) => {
    state.amplifiers.push(data);
  },
  [UPDATE_AMPLIFIER]: (state, data) => {
    const amplifiers = state.amplifiers.map(item => {
      if (item.id === data.id) {
        item = data;
      }
      return item;
    });
  },
  [AMPLIFIER_LOADING]: (state, status) => {
    state.loading = status;
  },
  [AMPLIFIER_ERROR]: (state, status) => {
    state.error = status;
  },
  [GET_AMPLIFIERS]: (state, data) => {
    state.amplifiers = data.map(item => {
      item.customFields = JSON.parse(item.customFields);
      return item;
    });
  },
  [GET_AMPLIFIER]: (state, data) => {
    data.customFields = JSON.parse(data.customFields);
    state.amplifier = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};

