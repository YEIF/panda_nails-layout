import { createApp } from 'vue'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import ZhTw from '@vee-validate/i18n/dist/locale/zh_TW.json'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import CKEditor from '@ckeditor/ckeditor5-vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

// aos
AOS.init({
  offset: 350,
  duration: 500,
  easing: 'ease-in-out',
  anchorPlacement: 'top-bottom'
  // once: true,
})

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: ZhTw }),
  validateOnInput: false
})
setLocale('zh_TW')

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.use(CKEditor)
app.component('VLoading', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')

// 換頁後回到頁面的最頂端
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
