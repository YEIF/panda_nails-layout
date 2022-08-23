<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <HeaderBanner msg="" />
  <div class="container-fluid px-0">
    <div class="swiper-product d-flex flex-wrap justify-content-center">
      <div class="swiper-top_bg"></div>
      <h2
        class="d-flex justify-content-center align-items-center mt-5 text-primary w-100"
      >
        <i class="flower-icon me-4"></i>提供給各位小仙女不同選擇
      </h2>
      <h3 class="text-primary w-100 mt-5">New Design</h3>
      <p class="text-secondary w-100 mt-1">最新潮流</p>
      <div class="container new-trend position-relative">
        <Swiper
          :modules="modules"
          :navigation="true"
          :pagination="{ clickable: true }"
          :loop="true"
          :breakpoints="{
            '640': {
              slidesPerView: 1,
              spaceBetween: 0
            },
            '768': {
              slidesPerView: 2,
              spaceBetween: 30
            },
            '1024': {
              slidesPerView: 3,
              spaceBetween: 84
            }
          }"
          :autoplay="{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }"
        >
          <SwiperSlide v-for="product in products" :key="product.id">
            <div class="card p-3">
              <div class="card-img position-relative">
                <!-- <a href="" class="product-img"> -->
                <RouterLink
                  :to="`/product/${product.id}`"
                  class="product-img"
                  style=""
                  :style="{ backgroundImage: `url(${product.imageUrl})` }"
                >
                  <div class="img-pseudo">
                    <button
                      type="button"
                      @click.prevent="addToCart(product.id, product.title)"
                      :disabled="isLoadingItem === product.id"
                      class="btn btn-dark w-100 py-3 pseudo-text d-block"
                    >
                      加入購物車
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="isLoadingItem === product.id"
                      ></i>
                      <i class="bi bi-cart-plus fs-3"></i>
                    </button>
                  </div>
                  <button
                    type="button"
                    class="btn text-danger position-absolute fs-4 p-1"
                    style="right: 8%; top: 5%"
                    @click.prevent="toggleFavorite(product.id, product.title)"
                  >
                    <i
                      :class="
                        favoriteList.includes(product.id)
                          ? 'bi-heart-fill'
                          : 'bi-heart'
                      "
                    ></i>
                  </button>
                  <!-- </a> -->
                </RouterLink>
              </div>

              <div class="card-body px-0">
                <h5 class="card-title text-start">
                  {{ product.title }}
                  <span
                    type="button"
                    class="badge rounded-pill bg-primary fs-6 ms-4"
                    @click.prevent="goToCategory(product.category)"
                    >{{ product.category }}</span
                  >
                </h5>
                <p class="card-text d-flex mt-5 text-danger">
                  <del class="me-4 text-dark">
                    NT ${{ product.origin_price }} 元</del
                  >
                  NT ${{ product.price }} 元
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <button type="button" class="btn btn-outline-primary py-3 px-4 my-5">
          SHOW ALL
        </button>
      </div>
    </div>
  </div>

  <div class="container-fluid px-0">
    <div class="recommend-product d-flex flex-wrap justify-content-center">
      <div class="recommend-top_bg"></div>
      <h2 class="mt-5 text-primary">recommend</h2>
      <p class="text-secondary w-100 mt-1">最新潮流</p>
      <div class="container">
        <div class="row g-4">
          <div class="col-4 d-flex flex-column">
            <div class="recommend-img">
              <a
                type="button"
                class="position-relative d-block"
                @click="goToCategory('漸層')"
              >
                <div class="img-pseudo">
                  <div class="pseudo-text text-white border-bottom">
                    漸層 Gradient
                  </div>
                </div>
                <img
                  class="img-fluid"
                  src="@/assets/img/panda/gradient.png"
                  alt="gradient"
                />
              </a>
            </div>
            <div class="mt-auto recommend-img">
              <a
                type="button"
                class="position-relative d-block"
                @click="goToCategory('晶石貓眼')"
              >
                <div class="img-pseudo">
                  <div class="pseudo-text text-white border-bottom">
                    晶石貓眼 Spar-CatEye
                  </div>
                </div>
                <img
                  class="img-fluid"
                  src="@/assets/img/panda/spar-cat-eye.png"
                  alt="spar-cat-eye"
                />
              </a>
            </div>
          </div>
          <div class="col-4 p-0">
            <div class="recommend-img">
              <a
                type="button"
                class="position-relative d-block"
                @click="goToCategory('暈染')"
              >
                <div class="img-pseudo">
                  <div class="pseudo-text text-white border-bottom">
                    暈染 bloom
                  </div>
                </div>
                <img
                  class="img-fluid"
                  src="@/assets/img/panda/bloom.png"
                  alt="bloom"
                />
              </a>
            </div>
          </div>
          <div class="col-4 d-flex flex-column">
            <div class="recommend-img">
              <a
                type="button"
                class="position-relative d-block"
                @click="goToCategory('流水畫')"
              >
                <div class="img-pseudo">
                  <div class="pseudo-text text-white border-bottom">
                    流水畫 Flowing-Water
                  </div>
                </div>
                <img
                  class="img-fluid"
                  src="@/assets/img/panda/flowing-water.png"
                  alt="flowing-water"
                />
              </a>
            </div>
            <div class="mt-auto recommend-img">
              <a
                type="button"
                class="position-relative d-block"
                @click="goToCategory('裝飾')"
              >
                <div class="img-pseudo">
                  <div class="pseudo-text text-white border-bottom">
                    裝飾 Decorate
                  </div>
                </div>
                <img
                  class="img-fluid"
                  src="@/assets/img/panda/decorate.png"
                  alt="decorate"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom_bg"></div>
    </div>
  </div>
  <SubscriptionComponent />
</template>

<script>
import HeaderBanner from '@/components/front/HeaderBanner.vue'
import emitter from '@/libs/emitter'
import { Swiper, SwiperSlide } from 'swiper/vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
// import 'swiper/css/navigation'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { toThousandths } from '@/libs/methods'
import SubscriptionComponent from '@/components/front/SubscriptionComponent.vue'
import Favorite from '@/libs/mixins/Favorite'
export default {
  components: {
    LoadingComponent,
    Swiper,
    SwiperSlide,
    HeaderBanner,
    SubscriptionComponent
  },
  // components: { LoadingComponent, HeaderBanner, SubscriptionComponent },
  mixins: [Favorite],
  data () {
    return {
      products: [],
      isLoading: false,
      isLoadingItem: false,
      modules: [Navigation, Pagination, Autoplay],
      favoriteList: []
    }
  },
  watch: {
    favoriteList: {
      handler () {
        localStorage.setItem('Favorite', JSON.stringify(this.favoriteList))
        emitter.emit('get-favorite-num')
      },
      deep: true
    }
  },
  methods: {
    toThousandths,
    getProducts () {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products
          this.isLoading = false
        })
        .catch((err) => {
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    addToCart (id, title, qty = 1) {
      const data = {
        product_id: id,
        qty: qty
      }
      this.isLoadingItem = id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/`
      this.$http
        .post(url, { data })
        .then((res) => {
          this.isLoadingItem = ''
          emitter.emit('push-message', {
            style: 'success',
            title: `${title}${res.data.message}`
          })
          // get cart
          emitter.emit('get-cart-num')
        })
        .catch((err) => {
          this.isLoadingItem = ''
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    goToCategory (category) {
      this.$router.push({
        name: '產品頁面',
        params: {
          category
        }
      })
    }
  },
  mounted () {
    this.getProducts()
    this.getFavorite()
  }
}
</script>
