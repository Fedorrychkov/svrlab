import Vue from 'vue'
// the component

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faColumns,
  faArchive,
  faMusic,
  faCog,
  faEdit,
  faShoppingBasket,
  faCamera,
  faTimes,
  faHome,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faColumns,
  faArchive,
  faMusic,
  faCog,
  faEdit,
  faShoppingBasket,
  faCamera,
  faTimes,
  faHome,
);

Vue.component(FontAwesomeIcon.name, FontAwesomeIcon);
