<template>
  <!-- <h2>產品列表</h2> -->
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <HeaderBanner title="收藏頁面" />
<div class="background-secondary">
  <div class="container">
    <ol class="breadcrumb pt-4">
      <li class="breadcrumb-item">
        <RouterLink to="/" class="nav-link active p-0"> 首頁 </RouterLink>
      </li>
      <li class="breadcrumb-item active" aria-current="page">我的最愛</li>
    </ol>

    <ul
      class="row list-unstyled row-cols-1 row-cols-md-2 row-cols-xl-4 mt-4 g-3 mb-0 pb-4"
      v-if="favoriteList?.length > 0"
    >
      <li
        class="col"
        v-for="product in filterProducts"
        :key="product.id"
        data-aos="fade-up"
      >
        <div class="products-card position-relative">
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
      </li>
    </ul>

    <div v-else class="pb-4">
      <i class="bi bi-info-square fs-1"></i>
      <p class="fs-4" style="letter-spacing: 2px">目前沒有喜愛的商品</p>
      <RouterLink to="/products" class="btn btn-primary py-2 px-4"
        >收藏商品
      </RouterLink>
    </div>
  </div>
</div>

</template>

<script>
import HeaderBanner from '@/components/front/HeaderBanner.vue'
import emitter from '@/libs/emitter'
import LoadingComponent from '@/components/LoadingComponent.vue'
import Favorite from '@/libs/mixins/Favorite'
import { toThousandths } from '@/libs/methods'
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
    toThousandths,
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
