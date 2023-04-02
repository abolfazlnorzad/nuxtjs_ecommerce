<template>
  <section class="food_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-lg-3">
          <div>
            <label class="form-label">جستجو</label>
            <div class="input-group mb-3">
              <input v-model.lazy="search" type="text" class="form-control" placeholder="نام محصول ..."
                     aria-label="Recipient's username" aria-describedby="basic-addon2">
              <a href="#" class="input-group-text" id="basic-addon2">
                <i class="bi bi-search"></i>
              </a>
            </div>
          </div>
          <hr>
          <div class="filter-list">
            <div class="form-label">
              دسته بندی
            </div>
            <ul>
              <li v-for="category in categories.data"
                  @click="handleFilter({
                  category:category.id
                  })"
                  :class="{ 'filter-list-active': $route.query.hasOwnProperty('category') &&$route.query.category ==category.id  }"
                  :key="category.id" class="my-2 cursor-pointer">
                {{ category.name }}
              </li>
            </ul>
          </div>
          <hr>
          <div>
            <label class="form-label">مرتب سازی</label>
            <div class="form-check my-2">
              <input
                  @click="handleFilter({ sortBy: 'max' })"
                  :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'max'"
                  class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
              <label
                  class="form-check-label cursor-pointer" for="flexRadioDefault1">
                بیشترین قیمت
              </label>
            </div>
            <div class="form-check my-2">
              <input
                  @click="handleFilter({ sortBy: 'min' })"
                  :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'min'"
                  class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                     >
              <label class="form-check-label cursor-pointer" for="flexRadioDefault2">
                کمترین قیمت
              </label>
            </div>
            <div class="form-check my-2">
              <input
                  @click="handleFilter({ sortBy: 'bestseller' })"
                  :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'bestseller'"
                  class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"
                     >
              <label class="form-check-label cursor-pointer" for="flexRadioDefault3">
                پرفروش ترین
              </label>
            </div>
            <div class="form-check my-2">
              <input
                  @click="handleFilter({ sortBy: 'sale' })"
                  :checked="route.query.hasOwnProperty('sortBy') && route.query.sortBy == 'sale'"
                  class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"
                     >
              <label class="form-check-label cursor-pointer" for="flexRadioDefault4">
                با تخفیف
              </label>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-lg-9">
          <div class="row gx-3">

            <template v-for="product in data.data.products" :key="product.id">
              <product-card :product="product"/>
            </template>

          </div>
          <nav class="d-flex justify-content-center mt-5">
            <ul class="pagination">
              <li v-for="(link, index) in data.data.meta.links.slice(1, -1)" :key="index"
                  @click="handleFilter({
                    page:link.label
                  })"
                  class="page-item" :class="{ active: link.active }">
                <button class="page-link">{{
                    link.label
                  }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const search = ref('')
const query = reactive({});

const {public: {apiBase}} = useRuntimeConfig()
const {data, error, pending, refresh: refreshMenu} = await useFetch(`${apiBase}/menu`, {
  query
})
const {data: categories} = await useFetch(`${apiBase}/categories`)

watch(route, () => {
  if (Object.keys(route.query).length == 0) {
    query.length = 0
    refreshMenu()
  }
})

const handleFilter = async (params) => {
  Object.assign(query , {...route.query , ...params})
  if (!params.hasOwnProperty('page')) {
    delete query.page
  }
  router.push({name:'menu' , query})
}

watch(search , ()=>{
  query.search = search.value
  router.push({name:'menu' , query})
})

</script>
