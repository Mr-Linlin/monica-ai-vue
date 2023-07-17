import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './index.css'
import * as echarts from 'echarts'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'


const app = createApp(App)
app.use(createPinia())
app.config.globalProperties.$echarts = echarts;
app.use(router)
app.mount('#app')
