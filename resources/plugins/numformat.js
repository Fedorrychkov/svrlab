import Vue from 'vue';

Vue.filter('numFormat', (value) => {
  const newNumber = (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace('.', ',');
  return newNumber;
});
