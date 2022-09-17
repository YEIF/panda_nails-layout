<template>
  <!-- <h2>購物車</h2> -->
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
<div class="position-relative">
  <div class="background-secondary position-absolute h-100 w-100" style="z-index:-1"></div>
    <div class="container mt-5">

      <StepStatusComponent :step-status="stepStatus" />
      <!-- step1 -->
      <div class="row mt-5" v-if="stepStatus.createOrder">
        <div class="col-lg-4">
          <ul class="list-unstyled">
            <li class="border-bottom h4 d-flex justify-content-between">
              <div>訂單明細</div>
              <button type="button" class="btn border-0" @click="openOffcanvas">
                <i class="far fa-edit"></i>
                修改
              </button>
            </li>

            <div
              v-if="carts.carts?.length > 0"
              style="max-height: 500px; overflow-y: auto"
            >
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
                      style="object-fit: contain"
                      alt="cart.product.title"
                    />
                  </div>
                  <div
                    class="col-8 col-md-9 col-lg-8 g-3 d-flex flex-column g-3 justify-content-between"
                  >
                    <div
                      class="card-body p-1 d-flex flex-column justify-content-between"
                    >
                      <div
                        class="fs-5 text-start d-flex justify-content-between"
                      >
                        <p>{{ cart.product.title }}</p>
                        <small class="text-end">X{{ cart.qty }}</small>
                      </div>
                      <p class="text-start mb-0">
                        <small class="text-muted"
                          >NT${{ toThousandths(cart.product.price) }} /
                          {{ cart.product.unit }}
                        </small>
                      </p>
                      <p class="mb-0 text-end fs-4">
                        NT${{ toThousandths(cart.qty * cart.product.price) }}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </div>

            <div v-else>
              <i class="bi bi-info-square fs-1"></i>
              <p class="fs-7" style="letter-spacing: 2px">購物車內沒有商品</p>
              <RouterLink to="/products" class="btn btn-primary py-2 px-4"
                >挑選商品
              </RouterLink>
            </div>
          </ul>
          <ul v-if="carts.carts?.length > 0" class="list-unstyled">
            <li class="input-group mb-3 pt-3 border-top">
              <input
                type="text"
                class="form-control p-2"
                placeholder="已套用優惠券"
                disabled
                v-if="isCoupon"
              />
              <input
                type="text"
                class="form-control p-2"
                placeholder="輸入優惠碼"
                v-model="code"
                v-else
              /><button
                type="button"
                class="btn btn-primary px-3"
                :disabled="isCoupon"
                @click="useCoupon(code)"
              >
                套用優惠券
                <div class="loading d-none fade"></div>
              </button>
            </li>
            <li
              class="border-0 d-flex justify-content-between fs-4"
              v-if="!isCoupon"
            >
              <p class="p-1">總計</p>
              <p class="p-1">NT${{ toThousandths(carts.final_total) }}</p>
            </li>
            <li class="border-0 fs-4" v-else>
              <small class="fs-5 d-flex justify-content-between">
                <p class="p-1">總計</p>
                <del class="p-1">NT${{ toThousandths(carts.total) }}</del>
              </small>
              <div class="d-flex justify-content-between">
                <p class="p-1">折扣後金額：</p>
                <span class="fs-4"
                  >$
                  {{ toThousandths(Math.round(carts.final_total)) }} NTD</span
                >
              </div>
            </li>
          </ul>
        </div>

        <div class="col-lg-8 justify-content-center text-start">
          <div class="text-start h2 border-bottom-0">訂購人資訊</div>
          <VForm ref="form" v-slot="{ errors }" @submit="checkOrder">
            <div class="mb-3">
              <label for="email" class="form-label"
                >Email <span class="text-danger">*</span></label
              >
              <VField
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="required|email"
                v-model="form.user.email"
                :disabled="carts.carts?.length === 0"
              />
              <ErrorMessage name="email" class="invalid-feedback" />
            </div>

            <div class="mb-3">
              <label for="name" class="form-label"
                >收件人姓名 <span class="text-danger">*</span></label
              >
              <VField
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="form.user.name"
                :disabled="carts.carts?.length === 0"
              />
              <ErrorMessage name="姓名" class="invalid-feedback" />
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label"
                >收件人電話 <span class="text-danger">*</span></label
              >
              <VField
                id="tel"
                name="手機"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['手機'] }"
                placeholder="請輸入手機"
                :rules="isPhone"
                v-model="form.user.tel"
                :disabled="carts.carts?.length === 0"
              />
              <ErrorMessage name="手機" class="invalid-feedback" />
            </div>

            <!-- <div class="mb-3">
            <label for="address" class="form-label"
              >收件人地址 <span class="text-danger">*</span></label
            >
            <VField
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
              :disabled="carts.carts?.length === 0"
            />
            <ErrorMessage name="地址" class="invalid-feedback" />
          </div> -->

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.user.message"
                :disabled="carts.carts?.length === 0"
              ></textarea>
            </div>
            <div class="text-end">
              <button
                type="submit"
                class="btn btn-primary mb-3"
                :disabled="
                  Object.keys(errors).length > 0 || carts.carts?.length === 0
                "
              >
                送出訂單
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
</div>

</template>

<script>
import emitter from '@/libs/emitter'
import LoadingComponent from '@/components/LoadingComponent.vue'
import StepStatusComponent from '@/components/front/StepStatusComponent.vue'
import { DateFn, toThousandths } from '@/libs/methods'

export default {
  components: {
    LoadingComponent,
    StepStatusComponent
  },
  data () {
    return {
      carts: {},
      isLoadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          message: ''
        }
      },
      isLoading: false,
      isCoupon: false,
      code: '',
      stepStatus: {
        createOrder: true,
        payCheck: false,
        success: false
      },
      order: {}
    }
  },
  watch: {
    carts (val) {
      if (val.final_total !== val.total) {
        this.isCoupon = true
      } else {
        this.isCoupon = false
      }
      if (this.carts.carts?.length === 0) {
        emitter.emit('push-message', {
          style: 'info',
          title: '購物車無商品',
          content: '購物車沒東西了～\n頁面即將跳轉回商店'
        })
        setTimeout(() => {
          emitter.emit('emit-close-offcanvas')
          this.$router.push('/products')
        }, 1500)
      }
    }
  },
  methods: {
    DateFn,
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
    useCoupon (code) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      const data = { code }
      this.$http
        .post(url, { data })
        .then((res) => {
          this.isLoading = false
          this.isCoupon = true
          this.code = code
          emitter.emit('push-message', {
            style: 'success',
            title: `${res.data.message}`
          })
          this.getCarts()
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    sendOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      this.form.user.address = '台北'
      console.log(this.form)
      const order = this.form
      this.$http
        .post(url, { data: order })
        .then((res) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'success',
            title: `${res.data.message}`
          })
          this.order = res.data
          emitter.emit('get-cart-num')
          this.$router.push(`/checkout/${this.order.orderId}`)
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'success',
            title: `${err.response.data.message}`
          })
        })
    },
    checkOrder () {
      this.stepStatus.createOrder = false
      this.stepStatus.payCheck = true
      this.sendOrder()
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value)
        ? true
        : '請輸入正確的電話號碼: ex:09XXXXXXXX'
    },
    openOffcanvas () {
      emitter.emit('emit-open-offcanvas')
    }
  },
  mounted () {
    this.getCarts()
    emitter.on('get-checkout-cart', this.getCarts)
  }
}
</script>
