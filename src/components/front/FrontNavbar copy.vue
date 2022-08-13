<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">
        <div class="nav-logo" alt="nav-logo"></div>
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
        @click="toggleNavCollapse"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" ref="collapse">
        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0 border-bottom border-bottom-lg-0"
        >
          <li class="nav-item px-2">
            <RouterLink class="nav-link" to="/products">產品頁面</RouterLink>
          </li>
          <li class="nav-item px-2">
            <RouterLink class="nav-link" to="/blog">部落格</RouterLink>
          </li>
          <li class="nav-item px-2">
            <RouterLink class="nav-link" to="/question">常見問題</RouterLink>
          </li>
          <li class="nav-item px-2">
            <RouterLink class="nav-link" to="/OrderTracking"
              >訂單查詢</RouterLink
            >
          </li>
        </ul>
        <ul
          class="navbar-nav ms-auto mb-2 mb-lg-0 flex-row justify-content-around"
        >
          <li class="nav-item px-2">
            <RouterLink class="nav-link position-relative" to="/favorite">
              <i class="bi bi-heart-fill icon-font"></i>
              <span
                class="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-primary"
              >
                {{ favoriteList?.length }}
              </span>
            </RouterLink>
          </li>
          <!-- <li class="nav-item px-2">
            <RouterLink class="nav-link" to="/login">
              <i class="bi bi-person-circle icon-font"></i>
            </RouterLink>
          </li> -->
          <li class="nav-item px-2" @click="openOffcanvas">
            <div type="button" class="nav-link position-relative">
              <i class="bi bi-cart icon-font"></i>
              <span
                class="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-danger"
              >
                {{ carts.carts?.length }}
              </span>
            </div>
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
  mask-image: url(@/assets/img/ax4ij-cf1db.svg);
  // mask-image: url(@/assets/img/panda_850X200.png);
  background-color: black;
  background-size: contain;
  mask-size: contain;
}
body {
  padding-top: 86px;
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
</style>
