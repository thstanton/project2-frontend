import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/globalStyles.css'

//Auth
import vue3GoogleLogin from 'vue3-google-login'
import Vue3Cookies from "vue3-cookies"

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { VDatePicker } from 'vuetify/labs/VDatePicker'

const vuetify = createVuetify({
  components: {
    ...components, 
    VDatePicker
  },
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(vue3GoogleLogin, {clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID})
app.use(Vue3Cookies, {
    expireTimes: "1d", // How long the cookie will remain in our system
    path: '/', // Where the cookie will be saved (root)
    domain: '',
    secure: true, // Encrypted by default
    sameSite: 'None'
})
app.mount('#app')

export { app }