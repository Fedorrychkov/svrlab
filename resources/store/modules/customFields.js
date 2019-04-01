import {
  GET_FIELDS,
  GET_FIELDS_BY_TYPE,
  ADD_FIELD
} from '../actions/customFields';

const state = () => ({
  items: [],
});

const getters = {
  fields: state => state.items,
};

const actions = {
};

const mutations = {
};

export default {
  state,
  getters,
  actions,
  mutations
};
