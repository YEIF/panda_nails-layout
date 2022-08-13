<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <HeaderBanner msg="產品頁面" />

  <div class="container">
    <ol class="breadcrumb mt-4">
      <li class="breadcrumb-item">
        <RouterLink to="/" class="nav-link active p-0"> 首頁 </RouterLink>
      </li>
      <li class="breadcrumb-item active" aria-current="page">產品頁面</li>
    </ol>

    <div class="row">
      <!-- 手機板 -->
      <div class="btn-group d-md-none" role="group">
        <button
          id="btnGroupDrop1"
          type="button"
          class="btn btn-primary dropdown-toggle mb-3"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ isActive ? isActive : '所有產品' }}
        </button>
        <ul
          class="dropdown-menu p-3 text-center w-100 border-0"
          aria-labelledby="btnGroupDrop1"
        >
          <li
            class="list-group-item list-group-item-action"
            aria-current="true"
            @click="filterProducts()"
            :class="{ active: isActive == '' }"
          >
            所有產品
          </li>
          <li
            class="list-group-item list-group-item-action"
            v-for="(Category, index) in MenuCategory"
            :key="index"
            @click="filterProducts(1, Category)"
            :class="{ active: isActive == Category }"
          >
            {{ Category }}
          </li>
        </ul>
      </div>
      <!-- 桌面板 -->
      <div class="col-md-3" role="button">
        <ul class="list-group d-none d-md-block sticky-md-top">
          <li
            class="list-group-item list-group-item-action"
            aria-current="true"
            @click="filterProducts()"
            :class="{ active: isActive == '' }"
          >
            所有產品
          </li>
          <li
            class="list-group-item list-group-item-action"
            v-for="(Category, index) in MenuCategory"
            :key="index"
            @click="filterProducts(1, Category)"
            :class="{ active: isActive == Category }"
          >
            {{ Category }}
          </li>
        </ul>
      </div>

      <div class="col-md-9">
        <ul class="row list-unstyled row-cols-1 row-cols-md-2 row-cols-lg-3">
          <li
            class="col"
            v-for="product in products"
            :key="product.id"
            data-aos="fade-up"
          >
            <div class="card mb-4">
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
                  <span
                    type="button"
                    class="badge rounded-pill bg-success fs-7"
                    @click="filterProducts(1, product.category)"
                  >
                    {{ product.category }}
                  </span>
                </div>

                <div
                  class="card-text d-flex justify-content-between align-items-center"
                >
                  <div>
                    <del class="m-start fs-6 small text-muted">
                      {{ toThousandths(product.origin_price) }} 元</del
                    >
                    <p class="fw-bold card-text text-danger fs-5 my-1 d-block">
                      NT ${{ toThousandths(product.price) }} 元
                    </p>
                  </div>
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
      </div>
    </div>

    <div class="text-center">
      <PaginationComponent :pages="pagination" @change-pages="filterProducts" />
    </div>
  </div>
</template>

<script>
import HeaderBanner from '@/components/front/HeaderBanner.vue'
import emitter from '@/libs/emitter'
import PaginationComponent from '@/components/PaginationComponent.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import { toThousandths } from '@/libs/methods'
import Favorite from '@/libs/mixins/Favorite'
export default {
  mixins: [Favorite],
  data () {
    return {
      products: [],
      pagination: {},
      isLoadingItem: false,
      loadingStatus: {
        loadingItem: ''
      },
      // VLoading
      isLoading: false,
      favoriteList: [],
      MenuCategory: [],
      isActive: ''
    }
  },
  components: {
    PaginationComponent,
    LoadingComponent,
    HeaderBanner
  },
  methods: {
    toThousandths,
    getProducts () {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
        )
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
          this.products.forEach((item) => {
            if (this.MenuCategory.indexOf(item.category) === -1) {
              this.MenuCategory.push(item.category)
            }
          })
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    filterProducts (page = 1, category = '') {
      this.isLoading = true
      if (category === 'all') {
        this.isActive = 'all'
      } else {
        this.isActive = category
      }
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}&category=${category}`
        )
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
          // 點擊列表 or 換頁回到最上方
          window.scrollTo(0, 0)
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
  watch: {
    favoriteList: {
      handler () {
        localStorage.setItem('Favorite', JSON.stringify(this.favoriteList))
        emitter.emit('get-favorite-num')
      },
      deep: true
    }
  },
  mounted () {
    this.getProducts()
    //  從商品tag來的
    if (this.$route.params.category) {
      const { category } = this.$route.params
      this.filterProducts(1, category)
    }
    this.getFavorite()
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
.sticky-md-top {
  top: 106px;
}
</style>
