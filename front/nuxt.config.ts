// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app:{
      head:{
          htmlAttrs:{
              dir:"rtl",
              lang:"fa",
          }
      }
    },
    css:["~/assets/css/main.css"],
    runtimeConfig:{
        public:{
            apiBase:"http://localhost:8000/api"
        }
    },
    build:{
      transpile:["vue-toastification"]
    }
})
