<template>
    <div class="d-flex align-items-center">
        <div v-if="!showResendOtp" class="mt-3 me-3" style="direction: ltr;">
            <vue-countdown :time="10 * 1000" v-slot="{ minutes, seconds }" @end="onCountdownEnd"
                           :transform="transformSlotProps">
                {{ minutes }} : {{ seconds }}
            </vue-countdown>
        </div>

        <button @click="resend" v-else :disabled="loading" class="btn btn-dark">
            ارسال دوباره
            <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
        </button>
    </div>
</template>

<script setup>
import {useToast} from "vue-toastification";

const showResendOtp = ref(false)
const loading = ref(false)
const toast = useToast()
const resend = async () => {
    showResendOtp.value = true

    try {
         const data = await $fetch("/api/auth/resendOtp",{
             method:"POST",
         })
        toast.success("کد ورود دوباره برای شما ارسال شد");
        showResendOtp.value = false;
    } catch (error) {
        console.log(error)
    }

}

const onCountdownEnd = () => {
    showResendOtp.value = true
}

function transformSlotProps(props) {
    const formattedProps = {};

    Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
    });

    return formattedProps;
}

</script>

