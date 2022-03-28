import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/routes.js'
import store from './store/store.js'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import BadgeDirective from 'primevue/badgedirective';
import amplify from './amplify'
import 'primevue/resources/primevue.min.css'                //core css
import 'primeicons/primeicons.css'                           //icons
import 'primevue/resources/themes/tailwind-light/theme.css'  //tailwind theme
import './index.css'
import '/node_modules/primeflex/primeflex.css'



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
  Amplify.configure({
    aws_cognito_region: amplify.aws_cognito_region ,// (required) - Region where Amazon Cognito project was created
    aws_user_pools_id: amplify.aws_user_pools_id ,// (optional) -  Amazon Cognito User Pool ID
    aws_user_pools_web_client_id: amplify.aws_user_pools_web_client_id
  });

  applyPolyfills().then(() => {
    defineCustomElements(window);
  });



  
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router);
app.use(store);
app.use(Vuex);
app.use(PrimeVue)
app.use(ToastService)

app.directive('badge', BadgeDirective);
// add more functionality to myV3App

// now we're ready to mount
app.mount('#app');
