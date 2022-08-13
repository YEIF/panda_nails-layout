<template>
  <!-- <h2>產品列表</h2> -->
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <HeaderBanner msg="收藏頁面" />

  <div class="container">
    <ol class="breadcrumb mt-4">
      <li class="breadcrumb-item">
        <RouterLink to="/" class="nav-link active p-0"> 首頁 </RouterLink>
      </li>
      <li class="breadcrumb-item active" aria-current="page">我的最愛</li>
    </ol>

    <ul
      class="row list-unstyled row-cols-1 row-cols-md-3 row-cols-lg-4 mt-4"
      v-if="favoriteList?.length > 0"
    >
      <li
        class="col"
        v-for="product in filterProducts"
        :key="product.id"
        data-aos="fade-up"
      >
        <div class="card mb-4">
          <!-- <img :src="product.imageUrl" class="card-img-top card-img-scale" alt="..." /> -->
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
            <div class="card-text d-flex justify-content-between">
              <p
                class="fw-bold card-text text-danger fs-5 my-1 align-self-center"
              >
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
                ></i
                ><i class="bi bi-cart-plus fs-3"></i>
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div v-else class="mb-4">
      <i class="bi bi-info-square fs-1"></i>
      <p class="fs-4" style="letter-spacing: 2px">目前沒有喜愛的商品</p>
      <RouterLink to="/products" class="btn btn-primary py-2 px-4"
        >收藏商品
      </RouterLink>
    </div>
  </div>
</template>

<script>
import HeaderBanner from '@/components/front/HeaderBanner.vue'
import emitter from '@/libs/emitter'
import LoadingComponent from '@/components/LoadingComponent.vue'
import Favorite from '@/libs/mixins/Favorite'
export default {
  mixins: [Favorite],
  data () {
    return {
      products: [],
      isLoadingItem: false,
      loadingStatus: {
        loadingItem: ''
      },
      // VLoading
      isLoading: false,
      category: '流水畫',
      favoriteList: []
    }
  },
  components: {
    LoadingComponent,
    HeaderBanner
  },
  methods: {
    getProducts () {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
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
  computed: {
    filterProducts () {
      return this.products.filter((item) => this.favoriteList.includes(item.id))
    }
  },
  mounted () {
    this.getFavorite()
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.card-img-scale:hover {
  transform: scale(1.2);
}
.card-img-scale {
  transform: scale(1);
  transition: all 0.5s ease-out;
}
.start-85 {
  left: 85% !important;
}
</style>
