<template>
  <div class="form_container">
    <div class="alert alert-danger " v-if="errors.length > 0">
      <ul>
        <li v-for="err in errors" :key="err"> {{ err }}</li>
      </ul>
    </div>
    <form @submit.prevent="sendCode">
      <div class="mb-3">
        <label for="cellphone" class="form-label">شماره موبایل</label>
        <input v-model="cellphone" type="text" class="form-control" id="cellphone">
      </div>
      <button type="submit" class="btn btn-primary btn-auth">
        ورود
        <div v-if="loading" class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
    </form>
  </div>
</template>

<script setup>

import {useToast} from "vue-toastification";

const toast = useToast()
const cellphone = ref('')
const errors = ref([])
const loading = ref(false)
const emit = defineEmits(["changeForm"])

const sendCode = async () => {
  if (cellphone.value == '') {
    toast.error("شماره موبایل الزامی است")
    return
  }

  const cellPhonePattern = /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/
  if (!cellPhonePattern.test(cellphone.value)) {
    toast.error("فرمت شماره موبایل نامعتبر است")
    return
  }
  try {
    loading.value = true
    errors.value = []
    const data = await $fetch("/api/auth/login", {
      method: "POST",
      body: {cellphone: cellphone.value}
    })
    emit("changeForm")
    toast.success("پیامک ورود با موفقیت ارسال شد.")
  } catch (e) {
    errors.value = Object.values(e.data.data.message).flat()
  } finally {
    loading.value = false
  }


}

</script>