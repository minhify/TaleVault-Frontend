import { createApp } from 'vue';
import router from './routers'

import App from './App.vue';

import { VueQueryPlugin } from '@tanstack/vue-query';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

createApp(App).use(router).use(VueQueryPlugin).mount('#app');

        
