import {
  ADD_TO_BASKET,
  GET_BASKET,
  SET_BASKET,
  REMOVE_FROM_BASKET,
  PUSH_PRODUCT_TO_BASKET,
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  DECREMENT_PRODUCT_INVENTORY,
  SET_CHECKOUT_STATUS,
  SET_CHECKOUT
} from '../actions/cart';

const state = () => ({
  items: [],
  checkoutStatus: null,
});

const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items;
  },
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.cost * product.quantity;
    }, 0);
  },
  basketCount: (state, getters) => {
    return getters.cartProducts.reduce((count, product) => {
      return count + product.quantity;
    }, 0);
  }
};

const actions = {
  [ADD_TO_BASKET]: ({state, commit}, product) => {
    commit(SET_CHECKOUT_STATUS, null);
    // if (product.inventory > 0) {
    if (product) {
      const cartItem = state.items.find(item => item.id === product.id);
      if(!cartItem) {
        commit(PUSH_PRODUCT_TO_BASKET, product);
      } else {
        commit(INCREMENT_PRODUCT, {id: cartItem.id});
      }
    }
  },
  [GET_BASKET]: ({state, commit}) => {
    // getBasket().then( res => {
    //   if (res.data.products.length > 0) {
    //     commit(SET_BASKET, res.data.products);
    //   }
    // });
  },
  [REMOVE_FROM_BASKET]: ({state, commit}, {id}) => {
    commit(REMOVE_FROM_BASKET, {id});
  },
  [DECREMENT_PRODUCT]: ({state, commit}, {id}) => {
    commit(DECREMENT_PRODUCT, {id});
  },
  [INCREMENT_PRODUCT]: ({state, commit}, {id}) => {
    commit(INCREMENT_PRODUCT, {id});
  },
  [SET_CHECKOUT]: ({state, commit}) => {
    commit(SET_CHECKOUT);
  }
};

const mutations = {
  [PUSH_PRODUCT_TO_BASKET]: (state, product) => {
    // pushToBasket(product.id).then(res => {

    // });
    state.items.push({
      ...product,
      quantity: 1
    });
  },
  [SET_BASKET]: (state, products) => {
    state.items = products;
  },
  [INCREMENT_PRODUCT]: (state, {id}) => {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity++;
/*    quantity({id: cartItem.id, quantity: cartItem.quantity}).then(res => {

    });*/
    // pushToBasket(cartItem.id).then(res => {

    // });
  },
  [DECREMENT_PRODUCT]: (state, {id}) => {
    const cartItem = state.items.find(item => item.id === id);
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      // quantity({id: cartItem.id, quantity: cartItem.quantity}).then(res => {
      //    console.log(res, 'from quantity decrement');
      // });
    }
  },
  [SET_CHECKOUT_STATUS]: (state, status) => {
    state.checkoutStatus = status;
  },
  [REMOVE_FROM_BASKET]: (state, {id}) => {
    removeFromBasket(id).then(res => {

    });
    const items = state.items.filter(item => item.id !== id);
    state.items = items;
  },
  [SET_CHECKOUT]: (state) => {
    checkout().then(res => {
      console.log(res, 'set checkout');
    })
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
