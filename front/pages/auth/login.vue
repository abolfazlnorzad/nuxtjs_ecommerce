<template>
  <section class="auth_section book_section">
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
          <div class="card">
            <div class="card-body">
              <AuthCheckOtp v-if="showOtpForm"/>
              <AuthLogin v-else @change-form="showOtpForm = !showOtpForm"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const showOtpForm = ref(false)
</script>
