/// <reference types="vite/client" />

import 'primeflex/primeflex.scss';
import 'primeicons/primeicons.css';

import './theme/light.scss'
import './theme/typography/typography.scss'
import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import Tooltip from 'primevue/tooltip'
import Menu from 'primevue/menu'
import Sidebar from 'primevue/sidebar'
import OverlayPanel from 'primevue/overlaypanel'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'

import PrimeVue from 'primevue/config';
import PreferredLocal from './components/Header/preferred-local.vue'

import en from '@/i18n/locales/en.json';
import fr from '@/i18n/locales/fr.json';
import ja from '@/i18n/locales/ja.json';

// const pinia = createPinia();
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE || 'en',
  messages: {
    en,
    fr,
    ja
  }
});

function createAppWithDependency(rootComponent: any) {
  const app = createApp(rootComponent);
  app.use(PrimeVue)
  .use(i18n)
  .use(createPinia())
    .use(PrimeVue)
    .use(i18n)
    .component('Button', Button)
    .component('Toolbar', Toolbar)
    .component('Menu', Menu)
    .component('Sidebar', Sidebar)
    .component('OverlayPanel', OverlayPanel)
    .component('Dialog', Dialog)
    .component('Dropdown', Dropdown)
    .component('PreferredLocal', PreferredLocal)
    .directive('Tooltip', Tooltip)
  return app;
}

export { createAppWithDependency };