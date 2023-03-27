<template>
  <!-- food section -->
  <section class="food_section layout_padding-bottom">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
          منو محصولات
        </h2>
      </div>

      <Tabs nav-class="filters_menu" nav-item-active-class="active" :options="{ disableScrollBehavior: true }">

        <Tab  v-for="(tab ,index) in products.data.tabList" :key="index" :name="tab">
          <div class="filters_content">
            <div class="row grid">
              <template v-for="(item , i) in products.data.tabPanel[index]" :key="i">
                <product-card :product="item" />
              </template>
            </div>
          </div>
        </Tab>

      </Tabs>

      <div class="btn-box">
        <a href="">
          مشاهده بیشتر
        </a>
      </div>

    </div>
  </section>
  <!-- end food section -->
</template>

<script setup>
import {Tabs, Tab} from 'vue3-tabs-component';


const {public: {apiBase}} = useRuntimeConfig()
const {data: products, error} = useFetch(`${apiBase}/products/products-tabs`)


</script>

