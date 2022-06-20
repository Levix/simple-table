import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/components/table/store/'

import './assets/bootstrap.css'

const app = createApp(App)
// 挂载store
setupStore(app)
app.mount('#app')
