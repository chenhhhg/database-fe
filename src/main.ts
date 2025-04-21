import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$apiBaseUrl = 'http://localhost:8001'
app.use(router)

app.mount('#app')
