import Vue from 'vue'
// the component

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faColumns } from '@fortawesome/free-solid-svg-icons'

library.add(faColumns);

Vue.component(FontAwesomeIcon.name, FontAwesomeIcon);
