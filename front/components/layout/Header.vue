<template>
  <div  class="sub_page">
    <div class="hero_area">
      <!-- header section strats -->
      <header class="header_section">
        <div class="container">
          <nav class="navbar navbar-expand-lg custom_nav-container">
            <nuxt-link class="navbar-brand" :to="{name:'index'}">
                            <span>
                                webprog.io
                            </span>
            </nuxt-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mx-auto">
                <li class="nav-item "
                    :class="{active : $route.name == 'index'}"
                >
                  <nuxt-link

                      class="nav-link" :to="{name:'index'}">صفحه اصلی</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link class="nav-link" :to="{name:'menu'}">منو</nuxt-link>
                </li>
                <li class="nav-item"
                    :class="{active : $route.name == 'about-us'}"
                >
                  <nuxt-link

                      class="nav-link" :to="{name:'about-us'}" >درباره ما</nuxt-link>
                </li>
                <li class="nav-item"
                    :class="{active : $route.name == 'contact-us'}"
                >
                  <nuxt-link

                      class="nav-link" :to="{name:'contact-us'}">تماس باما</nuxt-link>
                </li>
              </ul>
              <div class="user_option">
                <a class="cart_link position-relative" href="cart.html">
                  <i class="bi bi-cart-fill text-white fs-5"></i>
                  <span class="position-absolute top-0 translate-middle badge rounded-pill">
                                        3
                                    </span>
                </a>
                <a href="login.html" class="btn-auth">
                  ورود
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <!-- end header section -->
    </div>
  </div>
</template>

<script setup>

</script>

