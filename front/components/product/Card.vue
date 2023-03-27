<template>
  <div class="col-sm-6 col-lg-4">
    <div class="box">
      <div>
        <div class="img-box">
          <img :src="product.primary_image" alt="">
        </div>
        <div class="detail-box">
          <h5>
            {{product.name}}
          </h5>
          <p>
            {{product.description}}
          </p>
          <div class="options">
            <h6 v-if="product.is_sale">
              <del>{{formatNumber(product.price)}}</del>
              {{formatNumber(product.sale_price)}}
              <span>تومان</span>
            </h6>
            <h6 v-else>
              {{formatNumber(product.price)}}
              <span>تومان</span>
            </h6>
            <a href="">
              <i class="bi bi-cart-fill text-white fs-5"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  product:{
    type:Object,
    required:true
  }
})

</script>

<style scoped>

</style>