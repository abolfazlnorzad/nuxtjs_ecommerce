import  leaflet from "leaflet/dist/leaflet"
import "leaflet/dist/leaflet.css"

export default defineNuxtPlugin(nuxtApp=>{
    nuxtApp.provide("leaflet" , leaflet)
})