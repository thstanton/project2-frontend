import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/globalStyles.css'

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
app.mount('#app')
