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

const gigManagerTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#3F51B5',
    secondary: '#304FFE',
    error: '#EC407A',
    info: '#283593',
    success: '#4CAF50',
    warning: '#FF9800',
  },
}


const vuetify = createVuetify({
  components: {
    ...components, 
    VDatePicker
  },
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'gigManagerTheme',
    themes: {
      gigManagerTheme,
    }
  },
  defaults: {
    VTextField: {
      variant: 'underlined',
    },
    Vbtn: {
      color: 'primary',
      variant: 'flat'
    },
    VAutocomplete: {
      variant: 'underlined'
    },
    VCombobox: {
      variant: 'underlined'
    },
    VTextarea: {
      variant: 'underlined'
    },
    VCard: {
      variant: 'elevated'
    },
    VAvatar: {
      color: 'secondary'
    }
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