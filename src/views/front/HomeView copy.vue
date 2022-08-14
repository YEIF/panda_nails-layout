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
      <div class="container">
        <div class="row g-3 g-md-5">
          <div class="col-md-4">
            <div class="card p-3">
              <img
                src="@/assets/img/panda/Mask_Group2.png"
                class="card-img-top"
                alt=""
              />
              <div class="card-body px-0">
                <h5 class="card-title text-start">
                  聖誕美甲
                  <span
                    type="button"
                    class="badge rounded-pill bg-primary fs-6 ms-4"
                    >裝飾</span
                  >
                </h5>
                <p class="card-text d-flex mt-5 text-danger">
                  <del class="me-4 text-dark"> NT $1,390 元</del> NT $1,199
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3">
              <img
                src="@/assets/img/panda/Mask_Group2.png"
                class="card-img-top"
                alt=""
              />
              <div class="card-body px-0">
                <h5 class="card-title text-start">
                  紅白格子美甲
                  <span
                    type="button"
                    class="badge rounded-pill bg-primary fs-6 ms-4"
                    >格子</span
                  >
                </h5>
                <p class="card-text d-flex mt-5 text-danger">
                  <del class="me-4 text-dark"> NT $1,390 元</del> NT $1,299
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3">
              <img
                src="@/assets/img/panda/Mask_Group3.png"
                class="card-img-top"
                alt=""
              />
              <div class="card-body px-0">
                <h5 class="card-title text-start">
                  雙色流水畫美甲
                  <span
                    type="button"
                    class="badge rounded-pill bg-primary fs-6 ms-4"
                    >流水畫</span
                  >
                </h5>
                <p class="card-text d-flex mt-5 text-danger">
                  <del class="me-4 text-dark"> NT $1,390 元</del> NT $1,199
                </p>
              </div>
            </div>
          </div>
        </div>
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
        <div class="row">
          <div
            class="col-4 p-0  d-flex flex-column"
          >
            <div><img class="img-fluid" src="@/assets/img/panda/Panoramic-view-of-Chefchaouen.png" alt=""></div>
            <div class="mt-auto"><img class="img-fluid" src="@/assets/img/panda/Panoramic-view-of-Chefchaouen.png" alt=""></div>
          </div>
          <div class="col-4 p-0">
            <img class="img-fluid" src="@/assets/img/panda/3683b7cc43bb2620b09c58d45df4a3f2.png" alt="">
          </div>
          <div
            class="col-4 p-0  d-flex flex-column"
          >
            <div ><img class="img-fluid" src="@/assets/img/panda/3017ITBlueCrush.png" alt=""></div>
            <div class="mt-auto"><img class="img-fluid" src="@/assets/img/panda/3017ITBlueCrush.png" alt=""></div>
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
// import { Swiper, SwiperSlide } from 'swiper/vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { toThousandths } from '@/libs/methods'
import SubscriptionComponent from '@/components/front/SubscriptionComponent.vue'
import Favorite from '@/libs/mixins/Favorite'
export default {
  // components: { LoadingComponent, Swiper, SwiperSlide, HeaderBanner, SubscriptionComponent },
  components: { LoadingComponent, HeaderBanner, SubscriptionComponent },
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
    }
  },
  mounted () {
    this.getProducts()
    this.getFavorite()
  }
}
</script>
