<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container d-block">
      <div class="row align-items-center">
        <div
          class="col-md-4 offset-md-4 d-flex d-md-block justify-content-between py-3"
        >
          <RouterLink class="" to="/">
            <div class="nav-logo m-auto" alt="nav-logo"></div>
          </RouterLink>
          <button
            class="navbar-toggler align-self-center"
            type="button"
            aria-label="Toggle navigation"
            @click="toggleNavCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="col-md-4">
          <!-- 手機 下拉 -->
          <div class="collapse navbar-collapse" ref="collapse">
            <!-- mobile navbar-nav start-->
            <ul
              class="navbar-nav me-auto mb-2 mb-lg-0 border-bottom border-bottom-lg-0 d-md-none"
            >
              <li class="nav-item px-2">
                <RouterLink class="nav-link" to="/products"
                  >產品頁面</RouterLink
                >
              </li>
              <li class="nav-item px-2">
                <RouterLink class="nav-link" to="/OrderTracking"
                  >訂單查詢</RouterLink
                >
              </li>

              <li class="nav-item px-2">
                <RouterLink class="nav-link" to="/question"
                  >常見問題</RouterLink
                >
              </li>
              <li class="nav-item px-2">
                <RouterLink class="nav-link" to="/blog">部落格</RouterLink>
              </li>
            </ul>
            <!-- mobile navbar-nav end -->
            <ul
              class="navbar-nav ms-auto mb-2 mb-lg-0 flex-row justify-content-around lh-1"
            >
              <li class="nav-item px-2 my-auto">
                <RouterLink class="nav-link position-relative" to="/favorite">
                  <!-- <i class="bi bi-heart-fill icon-mypage icon-font"></i> -->
                  <i class="icon-favorite"></i>
                  <span
                    class="position-absolute translate-middle badge rounded-pill bg-primary"
                  >
                    {{ favoriteList?.length }}
                  </span>
                </RouterLink>
              </li>
              <li class="nav-item px-2 my-auto">
                <RouterLink class="nav-link" to="/login">
                  <i class="icon-mypage"></i>
                </RouterLink>
              </li>
              <li class="nav-item px-2 my-auto" @click="openOffcanvas">
                <div type="button" class="nav-link position-relative">
                  <i class="icon-cart"></i>
                  <span
                    class="position-absolute translate-middle badge rounded-pill bg-danger"
                  >
                    {{ carts.carts?.length }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 桌機顯示 手機隱藏 -->

        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0 border-bottom border-bottom-lg-0 d-none d-md-flex justify-content-center"
        >
          <li class="nav-item px-2 position-relative">
            <RouterLink class="nav-link" to="/products"
              ><span class="mb-3 d-block">Product</span>
              <span>產品</span></RouterLink
            >
          </li>
          <li class="nav-item px-2">
            <RouterLink class="nav-link" to="/OrderTracking"
              ><span class="mb-3 d-block">Order</span>
              <span>訂單查詢</span>
            </RouterLink>
          </li>
          <li class="nav-item px-2">
            <RouterLink class="nav-link" to="/question">
              <span class="mb-3 d-block">FAQ</span>
              <span>常見問題</span></RouterLink
            >
          </li>

          <li class="nav-item px-2">
            <RouterLink class="nav-link" to="/blog">
              <span class="mb-3 d-block">Blog</span>
              <span>部落格</span></RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <OffcanvasComponent ref="cartOffcanvas" />
</template>

<script>
import emitter from '@/libs/emitter'
import BootstrapCollapse from '@/libs/mixins/BootstrapCollapse'
import OffcanvasComponent from '@/components/front/OffcanvasComponent.vue'
export default {
  mixins: [BootstrapCollapse],
  components: { OffcanvasComponent },
  data () {
    return {
      carts: {},
      favoriteList: []
    }
  },
  watch: {
    $route (to) {
      this.closeNavCollapse()
    }
  },
  methods: {
    getCarts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/`
      this.$http
        .get(url)
        .then((res) => {
          this.carts = res.data.data
        })
        .catch((err) => {
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    getFavorite () {
      const favoriteList = localStorage.getItem('Favorite') || '[]'
      this.favoriteList = JSON.parse(favoriteList)
    },
    openOffcanvas () {
      this.$refs.cartOffcanvas.openOffcanvas()
    }
  },
  mounted () {
    this.getCarts()
    this.getFavorite()
    emitter.on('get-cart-num', () => {
      this.getCarts()
      // 同時更新offcanvas、checkout
      emitter.emit('get-offcanvas')
      emitter.emit('get-checkout-cart')
    })
    emitter.on('get-favorite-num', () => {
      this.getFavorite()
    })
  }
}
</script>

<style lang="scss">
.icon-font {
  font-size: 1.5rem;
}
.nav-logo {
  width: 255px;
  height: 60px;
  background-image: url(@/assets/img/ax4ij-cf1db.svg);
  // mask-image: url(@/assets/img/panda_850X200.png);
  // background-color: black;
  background-size: contain;
}
body {
  padding-top: 172px;
  @media only screen and (max-width: 600px) {
    padding-top: 60px;
  }
}
.toast-container {
  top: 40% !important;
  right: 40% !important;
  @media only screen and (max-width: 600px) {
    top: 80% !important;
    right: 0 !important;
  }
}
.offcanvas-end {
  width: 450px;
  @media only screen and (max-width: 600px) {
    width: 600px;
  }
}
.icon-mypage {
  background-image: url(@/assets/img/panda/icon_mypage.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 28px;
  height: 24px;
  display: inline-block;
}
.icon-favorite {
  background-image: url(@/assets/img/panda/icon_favorite.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 28px;
  height: 24px;
  display: inline-block;
}
.icon-cart {
  background-image: url(@/assets/img/panda/icon_cart.png);
  background-repeat: no-repeat;
  background-size: contain;
  width: 28px;
  height: 24px;
  display: inline-block;
}
.nav-breadcrumb {
  color: wheat;
  $breadcrumb-divider: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E");
  // $breadcrumb-divider:url(@/assets/img/panda/slash_02.png);
}
.nav-item::after {
  position: absolute;
}
</style>
