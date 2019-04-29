import {
  DELETE_IMAGE
} from '../actions/images'
import axios from 'axios'

const state = () => ({
});

const getters = {
};

const actions = {
  [DELETE_IMAGE]: ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/images/${id}`)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          }
        }).catch(err => {
          reject(err);
        });
    });
  },
};

const mutations = {
};

export default {
  state,
  getters,
  actions,
  mutations
};

