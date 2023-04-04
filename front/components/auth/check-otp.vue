<template>
    <div class="form_container">
        <div class="alert alert-danger " v-if="errors.length > 0">
            <ul>
                <li v-for="err in errors" :key="err"> {{ err }}</li>
            </ul>
        </div>
            <div class="mb-3">
                <label for="cellphone" class="form-label">کد ورود</label>
                <input v-model="otp" type="text" class="form-control" id="cellphone">
            </div>
            <div class="d-flex align-items-center justify-content-between">
                <button @click="checkOtp" :disabled="loading" type="submit" class="btn btn-primary btn-auth">
                    تایید
                    <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
                </button>
                <AuthResendOtp @resend-otp-errors="(err) => errors = err" />
            </div>
    </div>
</template>

<script setup>

import {useToast} from "vue-toastification";

const toast = useToast()
const otp = ref('')
const errors = ref([])
const loading = ref(false)
const  { authUser } = useAuth()

const checkOtp = async () => {
    if (cellphone.value == '') {
        toast.error(" کد ورود الزامی است")
        return
    }

    try {
        loading.value = true
        errors.value = []
        const data = await $fetch("/api/auth/checkOtp", {
            method: "POST",
            body: {otp: otp.value},
        })
        authUser.value = data
        toast.success("شما با موفقیت وارد سایت شدید")
    } catch (e) {
        errors.value = Object.values(e.data.data.message).flat()
    } finally {
        loading.value = false
    }


}

</script>