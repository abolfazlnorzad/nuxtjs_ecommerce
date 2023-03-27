<template>
  <!-- contact section -->
  <section class="book_section layout_padding">
    <div class="container">
      <div class="heading_container">
        <h2>
          تماس با ما
        </h2>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form_container">
            <div class="alert alert-danger " v-if="errors.length > 0">
              <ul>
                <li v-for="err in errors" :key="err"> {{ err }}</li>
              </ul>
            </div>
            <form @submit.prevent="sendMsg">
              <div>
                <input v-model="info.name" type="text" class="form-control" placeholder="نام و نام خانوادگی"/>
              </div>
              <div>
                <input v-model="info.email" class="form-control" placeholder="ایمیل"/>
              </div>
              <div>
                <input v-model="info.subject" type="text" class="form-control" placeholder="موضوع پیام"/>
              </div>
              <div>
                                <textarea v-model="info.text" rows="10" style="height: 100px" class="form-control"
                                          placeholder="متن پیام"></textarea>
              </div>
              <div class="btn_box">
                <button type="submit">

                  ارسال پیام
                  <div v-if="loading" class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6">
          <div class="map_container ">
            <div id="map" style="height: 345px;"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end contact section -->
</template>

<script setup>

import {useToast} from "vue-toastification";
const {$leaflet} = useNuxtApp()
const {public: {apiBase}} = useRuntimeConfig()
const toast = useToast()
const info = reactive({
  name: null,
  email: null,
  subject: null,
  text: null,
})
const loading = ref(false)
const errors = reactive([])

const sendMsg = async () => {
  if (info.name == '' || info.name == null || info.email == '' || info.email == null || info.subject == '' || info.subject == null
      || info.text == '' || info.text == null) {
    toast.error("پر کردن همه ی فیلد ها الزامی است")
    return
  }
  try {
    errors.length = 0
    loading.value = true
    const data = await $fetch(`${apiBase}/contact-us`, {
      method: "POST",
      body: info
    })
    toast.success("پیغام با موفقیت ثبت شد")
  } catch (error) {
    toast.error("لطفا فیلد ها را با دقت پر کتید")
    errors.push(...Object.values(error.data.message).flat())
  } finally {
    loading.value = false
  }
}


onMounted(() => {
  let map = $leaflet.map('map').setView([35.700105, 51.400394], 14);
  let tiles = $leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(map);
  let marker = $leaflet.marker([35.700105, 51.400394], {
    icon: $leaflet.icon({
      popupAnchor: [12, 6],
      iconUrl: 'images/map/marker-icon.png',
      shadowUrl: 'images/map/marker-shadow.png'
    })
  }).addTo(map)
      .bindPopup('<b>Hello world!</b><br />I am a popup').openPopup();
})
</script>

<style scoped>

</style>