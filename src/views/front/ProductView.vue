<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <!-- <HeaderBanner :title="product.title" /> -->
  <!-- 資料確定進來後才顯示，否則 toThousandths  會 undefined -->
  <div class="background-primary">
      <div
    class="container py-5"
    v-if="Object.keys(product).length > 0"
    data-aos="fade-up"
    data-aos-offset="100"
  >
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col">
        <div
          class="h-100 product-img"
          :style="{ backgroundImage: `url(${product.imagesUrl})` }"
          style="
            background-size: cover;
            position: relative;
            background-repeat: no-repeat;
            background-position: center 50%;
          "
        ></div>
      </div>

      <div class="col">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb pt-3">
            <li class="breadcrumb-item">
              <RouterLink to="/products" class="text-decoration-none"
                >產品頁面</RouterLink
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ product.title }}
            </li>
          </ol>
        </nav>
        <div>
          <div class="text-start fs-2 d-flex align-items-center">
            <h3 class="fw-bold mb-0 me-2 text-primaryDark">
              {{ product.title }}
            </h3>
            <small
              type="button"
              class="badge rounded-pill bg-primary fs-7"
              @click="goToCategory(product.category)"
            >
              {{ product.category }}</small
            >
          </div>
          <div class="text-start my-2"></div>

          <div class="product-description text-coffeeDark text-start fs-5 mt-3">
            {{ product.description }}
          </div>
          <div class="product-content text-coffeeDark text-start fs-5 mt-3">
            {{ product.content }}
          </div>
          <div class="fw-bold text-end text-danger fs-3 mt-4">
            <del class="text-end fs-6 small text-blackGray d-block">
              原價 : {{ toThousandths(product.origin_price) }} 元</del
            >
            NT ${{ toThousandths(product.price) }} 元
          </div>
          <div class="input-group mt-4">
            <button
              type="button"
              class="btn btn-primary fs-4 p-1 me-2"
              style=""
              @click="toggleFavorite(product.id, product.title)"
            >
              <i
                :class="
                  favoriteList.includes(product.id)
                    ? 'bi-heart-fill'
                    : 'bi-heart'
                "
              ></i>
            </button>
            <input
              type="number"
              class="form-control"
              v-model.number="qty"
              min="1"
            />

            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, product.title, qty)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>

  <div class="background-secondary">
    <div class="primary-top_bg"></div>
    <div class="container py-5">
      <div v-if="products.length > 0">
        <h2 class="my-5" data-aos="fade-up" data-aos-offset="100">為您推薦</h2>
        <Swiper
          :modules="modules"
          Navigation
          :pagination="{ clickable: false }"
          :loop="false"
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
              spaceBetween: 30
            }
          }"
          :autoplay="{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }"
        >
          <SwiperSlide v-for="product in products" :key="product.id">
            <div class="products-card position-relative " data-aos="fade-up">
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
                        class="btn btn-dark w-100 py-2 pseudo-text d-block"
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
                  <h5 class="card-title text-start text-primaryDark text-nowrap">
                    {{ product.title }}
                    <span
                      type="button"
                      class="badge rounded-pill bg-primary fs-6 ms-4"
                      @click.prevent="goToCategory(product.category)"
                      >{{ product.category }}</span
                    >
                  </h5>
                  <p class="card-text d-flex mt-5 text-danger">
                    <del class="me-4 text-blackGray">
                      NT ${{ toThousandths(product.origin_price) }} 元</del
                    >
                    NT ${{ toThousandths(product.price) }} 元
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent.vue'
// import HeaderBanner from '@/components/front/HeaderBanner.vue'
import emitter from '@/libs/emitter'
import BannerImage from '@/assets/img/banner3.jpg'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { toThousandths } from '@/libs/methods'
import Favorite from '@/libs/mixins/Favorite'
export default {
  mixins: [Favorite],
  // components: { LoadingComponent, Swiper, SwiperSlide, HeaderBanner },
  components: { LoadingComponent, Swiper, SwiperSlide },
  data () {
    return {
      product: {},
      products: {},
      qty: 1,
      isLoading: false,
      BannerImage: BannerImage,
      modules: [Navigation, Pagination, Autoplay],
      favoriteList: []
    }
  },
  watch: {
    qty (n, o) {
      if (n <= 0 || String(n).indexOf('.') !== -1) {
        this.qty = o
      }
    },
    $route (to) {
      if (to.path.includes('/product/')) {
        this.getProduct()
      }
    },
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
    getProducts (page = 1) {
      this.isLoading = true
      const category = this.product.category
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}&category=${category}`
        )
        .then((res) => {
          this.products = res.data.products
          // 過濾本身產品
          const { id } = this.product
          this.products = Object.values(this.products).filter(
            (item) => item.id !== id
          )
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    getProduct () {
      const { id } = this.$route.params
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.product = res.data.product
          document.title = `${this.product.title} | Panda_Nails`
          this.getProducts()
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
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
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/`
      this.$http
        .post(url, { data })
        .then((res) => {
          this.qty = 1
          emitter.emit('get-cart-num')
          emitter.emit('push-message', {
            style: 'success',
            title: `${title}${res.data.message}`
          })
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    toggleFavorite (id, title) {
      const favoriteId = this.favoriteList.findIndex((item) => item === id)
      if (favoriteId === -1) {
        this.favoriteList.push(id)
        emitter.emit('push-message', {
          style: 'success',
          title: `${title}已 加入我的最愛`
        })
      } else {
        this.favoriteList.splice(favoriteId, 1)
        emitter.emit('push-message', {
          style: 'danger',
          title: `${title}已 取消我的最愛`
        })
      }
    },
    getFavorite () {
      const favoriteList = localStorage.getItem('Favorite') || '[]'
      this.favoriteList = JSON.parse(favoriteList)
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
    this.getProduct()
    this.getFavorite()
  }
}
</script>
