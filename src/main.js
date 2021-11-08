import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/routes.js'
import store from './store/store.js'

import './index.css'

// https://www.npmjs.com/package/@fortawesome/vue-fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faShoppingCart)




//Amplify 
import { 
    applyPolyfills,
    defineCustomElements
  } from '@aws-amplify/ui-components/loader';
  
  import Amplify from 'aws-amplify';
  import awsconfig from './aws-exports';
  Amplify.configure(awsconfig);

  applyPolyfills().then(() => {
    defineCustomElements(window);
  });

  
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router);
app.use(store);
app.use(Vuex);

// add more functionality to myV3App

// now we're ready to mount
app.mount('#app');
