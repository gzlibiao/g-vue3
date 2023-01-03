import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import '@/assets/styles/index.scss'

import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

const app = createApp(App)

app.use(mavonEditor);
app.use(router)
app.mount('#app')
