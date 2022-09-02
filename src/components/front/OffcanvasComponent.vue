<template>
  <div
    class="offcanvas offcanvas-end background-secondary"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
    ref="offcanvas"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">購物車</h5>
      <button
        type="button"
        class="btn-close text-reset"
        @click="closeOffcanvas"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="list-unstyled">
        <li class="border-bottom h4 d-flex justify-content-between">
        </li>

        <div v-if="carts.carts?.length > 0">
          <li
            class="card border-0 p-3 background-secondary"
            v-for="cart in carts.carts"
            :key="cart.id + '123'"
          >
            <div class="row g-0">
              <div class="col-4 col-md-3 col-lg-4">
                <img
                  :src="cart.product.imageUrl"
                  class="img-fluid"
                  style="object-fit: cover; min-height:100% ;object-position: center;"
                  alt="cart.product.title"
                />
              </div>
              <div
                class="col-8 col-md-9 col-lg-8 g-3 d-flex flex-column g-3 justify-content-between"
              >
                <div class="card-body p-1">
                  <p class="card-title fs-5 text-start text-primaryDark">
                    {{ cart.product.title }}
                  </p>
                  <p class="text-start mb-0">
                    <small class="text-blackGray"
                      >NT${{ toThousandths(cart.product.price) }} /
                      {{ cart.product.unit }}
                    </small>
                  </p>
                  <p class="mb-0 text-end fs-4">
                    NT${{ toThousandths(cart.qty * cart.product.price) }}
                  </p>
                </div>
                <div class="row">
                  <div class="col-4">
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="delCart(cart.id, cart.product.title)"
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="isLoadingItem === cart.id"
                      ></i>
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <div class="col-8">
                    <div class="input-group input-group-sm">
                      <div class="input-group">
                        <button
                          type="button"
                          :disabled="cart.qty <= 1 || isLoadingItem === 'dash'"
                          class="btn btn-outline-primary"
                          @click="updateCart(cart, cart.qty - 1, 'dash')"
                        >
                          <i
                            class="fas fa-spinner fa-pulse"
                            v-if="isLoadingItem === 'dash'"
                          ></i>
                          <i class="bi bi-dash-lg"></i>
                        </button>

                        <input
                          v-model.number="cart.qty"
                          min="1"
                          type="text"
                          class="form-control text-center background-secondary"
                          readonly="readonly"
                        />
                        <!-- @blur="updateCart(cart)" -->
                        <button
                          type="button"
                          class="btn btn-outline-primary"
                          :disabled="
                            isLoadingItem == cart.id || isLoadingItem === 'add'
                          "
                          @click="updateCart(cart, cart.qty + 1, 'add')"
                        >
                          <i
                            class="fas fa-spinner fa-pulse"
                            v-if="isLoadingItem === 'add'"
                          ></i>
                          <i class="bi bi-plus-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </div>

        <div v-else>
          <i class="bi bi-info-square fs-1"></i>
          <p class="fs-7" style="letter-spacing: 2px">購物車內沒有商品</p>
          <button
            @click="changePage('products')"
            class="btn btn-primary py-2 px-4"
          >
            挑選商品
          </button>
        </div>
      </ul>
    </div>
    <div class="border-0 border-top" v-if="carts.carts?.length > 0">
      <div class="d-flex justify-content-end fs-5 mx-3">
        <p class="p-1">總計</p>
        <p class="p-1">NT${{ toThousandths(carts.final_total) }}</p>
      </div>

      <div class="d-flex mb-3">
        <button type="button" class="btn btn-outline-danger w-50 mx-3 py-3" @click="delAllCarts">
          清空購物車
        </button>
        <button
          type="button"
          class="btn btn-primary w-50 mx-3 py-3"
          @click="changePage('checkout')"
        >
          去結帳
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import BootstrapOffcanvas from '@/libs/mixins/BootstrapOffcanvas'
import { toThousandths } from '@/libs/methods'
import emitter from '@/libs/emitter'
export default {
  mixins: [BootstrapOffcanvas],
  data () {
    return {
      carts: [],
      isLoading: false,
      isLoadingItem: ''
    }
  },
  methods: {
    toThousandths,
    getCarts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/`
      this.isLoading = true
      this.$http
        .get(url)
        .then((res) => {
          this.carts = res.data.data
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
    delCart (id, title) {
      this.isLoadingItem = id
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoadingItem = ''
          this.isLoading = false
          this.getCarts()
          emitter.emit('get-cart-num')
          emitter.emit('push-message', {
            style: 'success',
            title: `${title}${res.data.message}`
          })
        })
        .catch((err) => {
          this.isLoadingItem = ''
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    delAllCarts () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoading = false
          this.getCarts()
          emitter.emit('push-message', {
            style: 'success',
            title: '已清空購物車'
          })
          emitter.emit('get-cart-num')
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    updateCart (cart, qty = 1, type) {
      this.isLoadingItem = 'update'
      this.isLoading = true
      type === 'add'
        ? (this.isLoadingItem = 'add')
        : (this.isLoadingItem = 'dash')
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${cart.id}`
      const data = {
        product_id: cart.product_id,
        qty
      }
      this.$http
        .put(url, { data })
        .then((res) => {
          this.isLoadingItem = ''
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'success',
            title: `${res.data.message}`
          })
          emitter.emit('get-checkout-cart')
          this.getCarts()
        })
        .catch((err) => {
          this.isLoadingItem = ''
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    changePage (type) {
      if (type === 'products') {
        this.$router.push('/products')
      } else if (type === 'checkout') {
        this.$router.push('/checkout')
      }
      this.closeOffcanvas()
    }
  },
  mounted () {
    emitter.on('get-offcanvas', () => {
      this.getCarts()
    })
    this.getCarts()
    emitter.on('emit-open-offcanvas', this.openOffcanvas)
    emitter.on('emit-close-offcanvas', this.closeOffcanvas)
  }
}
</script>
