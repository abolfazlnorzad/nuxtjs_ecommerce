import VueCountdown from '@chenfengyuan/vue-countdown';
export default defineNuxtPlugin(nuxtApp=>{
    nuxtApp.vueApp.component("vue-countdown",VueCountdown)
})