import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/routes.js'

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
app.use(router)
// add more functionality to myV3App

// now we're ready to mount
app.mount('#app')
