import './assets/styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import piniaPersist from 'pinia-plugin-persist'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)

app.use(pinia)
app.use(router)

app.mount('#app')

export { router }
