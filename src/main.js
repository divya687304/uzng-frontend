import { createAuth0 } from '@auth0/auth0-vue';
import getEnv from '@/utils/env';

import App from '@/App.vue';
import router from './router';
import TopBar from './components/Header/top-bar.vue';
import SideNav from './components/side-nav.vue';
import ApplicationSwitch from './components/application-switch.vue';

import { createAppWithDependency } from '@/app-config';

const app = createAppWithDependency(App);

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,  
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      audience: import.meta.env.VITE_AUTH0_AUDIENCE , // Ensure this 
      redirect_uri: window.location.origin,
      scope: 'openid profile email offline_access' // Ensure `offline_access` is included
    }
  })
);


app
  .use(router)
  .component('TopBar', TopBar)
  .component('ApplicationSwitch', ApplicationSwitch)
  .component('SideNav', SideNav);

app.mount('#app');
