<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <HeaderBanner title="產品頁面" />
<div class="background-secondary">
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
        <ul class="row list-unstyled row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
          <li
            class="col"
            v-for="product in products"
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
      </div>
    </div>

    <div class="text-center">
      <PaginationComponent :pages="pagination" @change-pages="filterProducts" />
    </div>
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

.sticky-md-top {
  top: 190px;
}
</style>
