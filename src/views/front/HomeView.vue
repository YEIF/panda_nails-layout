<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <HeaderBanner msg="美麗雙手，自信人生" />
  <div class="container overflow-hidden">
    <h2 class="mt-5">所有款式</h2>
    <Swiper
      :modules="modules"
      Navigation
      :pagination="{ clickable: false }"
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
        <div class="overflow-hidden">
          <button
            type="button"
            class="btn btn-primary position-absolute fs-4 p-1"
            style="left: 20px; z-index: 1"
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
          <RouterLink :to="`/product/${product.id}`" class="">
            <div
              class="card-img-top card-img-scale"
              style="
                height: 300px;
                background-size: cover;
                background-position: center;
              "
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
            ></div>
          </RouterLink>
        </div>

        <div class="card-body text-start">
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="card-title fs-4 fw-bold text-nowrap my-1">
              {{ product.title }}
            </h3>
            <span class="badge rounded-pill bg-success fs-7">
              {{ product.category }}
            </span>
          </div>
          <div
            class="card-text d-flex justify-content-between align-items-center"
          >
            <p class="fw-bold card-text text-danger fs-5 my-1">
              NT ${{ product.price }} 元
              <del class="m-start fs-6 small text-muted">
                {{ product.origin_price }} 元</del
              >
            </p>
            <button
              type="button"
              @click.prevent="addToCart(product.id, product.title)"
              :disabled="isLoadingItem === product.id"
              class="btn btn-outline-primary card-link text-decoration-none"
            >
              <i
                class="fas fa-spinner fa-pulse"
                v-if="isLoadingItem === product.id"
              ></i>
              <i class="bi bi-cart-plus fs-3"></i>
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <!-- 迷思、預約 -->
    <div class="row row-cols-1 row-cols-md-2 mt-5"  data-aos="fade-right" data-aos-offset="500">
      <div class="col">
        <img
          class="img-fluid"
          src="@/assets/img/index_img.jpg"
          alt="迷思、預約"
        />
      </div>

      <div
        class="col d-flex flex-column justify-content-center"
        style="line-height: 1.5; letter-spacing: 0.15rem"
      >
        <div class="fs-5 text-secondary">凝膠指甲迷失</div>
        <ul class="list-unstyled d-grid text-start">
          <li class="fw-bold">迷失1 ：指甲泛黃是因為缺氧?</li>
          <li>
            NO!!
            卸除光療指甲、指甲油後，若發現指甲泛黃，原因並不是因為缺氧，而是因為指甲油色素所致。
          </li>
          <li>解：塗上護甲隔離油，可以防止指甲油色素沉澱。</li>
        </ul>
        <ul class="list-unstyled d-grid text-start">
          <li class="fw-bold">迷失2 ：指甲需要呼吸嗎?</li>
          <li>
            指甲跟頭髮一樣，表面並沒有氣孔，也沒有新陳代謝的功能，所以不需要呼吸新鮮的空氣。
          </li>
        </ul>
        <ul class="list-unstyled d-grid text-start">
          <li class="fw-bold">迷失3 ：美甲維持越久品質越好?</li>
          <li>
            不是維持越久越好，指甲過久未卸除，反而會容易造成指甲斷裂或繼續滋長。
          </li>
          <li>
            建議：當出現裂縫或缺角時，就可以去卸除指甲，避免發炎或甲面龜裂。
          </li>
        </ul>
        <ul class="list-unstyled d-grid text-start">
          <li>
            溫馨提醒：凝膠施做完1周內，為熊貓指甲保固期，若因非人為因素可回來補，3-4周的凝膠就可以回來卸除換新，因每個人生活習慣工作的不同，維持度的時間難免會不同，不是每個人都可以超過5周，甚至一個月半才來換甲，且常常得指甲會形成翹翹板的樣子，這樣本甲支撐的壓力很大，更可能會直接斷到肉肉那邊噢。
          </li>
        </ul>
        <br />
      </div>

      <div
        class="col d-flex flex-column justify-content-center"
        style="line-height: 1.5; letter-spacing: 0.15rem"
      >
        <div class="fs-5 text-secondary">預約注意事項</div>
        <ul class="list-unstyled d-grid">
          <li>到達時請發訊息+按電鈴</li>

          <li>提前到最多10分鐘</li>

          <li>會提前超過10分鐘以上請一個小時告知</li>
          <li>若時間能配會主動發訊息通知</li>
          <li>若沒發訊息通知就無法讓預約提前就照原定的時間</li>

          <li>遲到10分鐘改單色</li>
          <li>遲到15分鐘取消預約</li>

          <li>以上壓線就執行 請各位準時抵達</li>
          <li>若不讀不回直接黑名單</li>
        </ul>
        <br />
      </div>

      <div class="col mb-5" data-aos="fade-left">
        <img
          class="img-fluid"
          src="@/assets/img/index_img2.jpg"
          alt="預約注意事項"
        />
      </div>
    </div>
  </div>
  <SubscriptionComponent/>
</template>

<script>
import HeaderBanner from '@/components/front/HeaderBanner.vue'
import emitter from '@/libs/emitter'
import { Swiper, SwiperSlide } from 'swiper/vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { toThousandths } from '@/libs/methods'
import SubscriptionComponent from '@/components/front/SubscriptionComponent.vue'
import Favorite from '@/libs/mixins/Favorite'
export default {
  components: { LoadingComponent, Swiper, SwiperSlide, HeaderBanner, SubscriptionComponent },
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
