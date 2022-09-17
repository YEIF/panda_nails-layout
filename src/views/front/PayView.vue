<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <div class="position-relative">
    <div
      class="background-secondary position-absolute h-100 w-100"
      style="z-index: -1"
    ></div>
    <div class="container mt-5">
      <StepStatusComponent :step-status="stepStatus" />

      <!-- step2 -->
      <div
        class="row mt-5"
        v-if="stepStatus.payCheck && Object.keys(order).length > 0"
      >
        <div class="col-lg-4">
          <ul class="list-unstyled">
            <li class="border-bottom h4 text-start">
              <div>確認訂單明細</div>
            </li>
            <div style="max-height: 350px; overflow-y: auto">
              <li
                class="card border-0 p-3 background-secondary"
                v-for="cart in order.products"
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
                      class="card-body d-flex flex-column justify-content-between p-1"
                    >
                      <p class="card-title fs-5 text-start">
                        {{ cart.product.title }}
                      </p>
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
          </ul>
          <ul class="list-unstyled">
            <li class="input-group mb-3 pt-3 border-top">
              <input
                type="text"
                class="form-control p-2"
                placeholder="已套用優惠券"
                disabled
                v-if="isCoupon"
              /><button
                type="button"
                class="btn btn-primary px-3"
                :disabled="isCoupon"
                v-if="isCoupon"
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
              <p class="p-1">NT${{ toThousandths(order.total) }}</p>
            </li>
            <li class="border-0 fs-4" v-else>
              <small class="fs-5 d-flex justify-content-between">
                <p class="p-1">總計</p>
                <del class="p-1">NT${{ toThousandths(beforeOrderPrice) }}</del>
              </small>
              <div class="d-flex justify-content-between">
                <p class="p-1">折扣後金額：</p>
                <span class="fs-4"
                  >$ {{ toThousandths(Math.round(order.total)) }} NTD</span
                >
              </div>
            </li>
          </ul>
        </div>

        <div class="col-lg-8 justify-content-center text-start border">
          <div class="text-start h2 border-bottom-0">訂購人資訊</div>
          <div class="mb-3">
            <div class="mb-2">Email</div>
            <p class="h5">{{ order.user.email }}</p>
          </div>

          <div class="mb-3">
            <div class="mb-2">收件人姓名</div>
            <p class="h5">{{ order.user.name }}</p>
          </div>

          <div class="mb-3">
            <div class="mb-2">收件人電話</div>
            <p class="h5">{{ order.user.tel }}</p>
          </div>

          <!-- <div class="mb-3">
          <div class="mb-2">收件人地址</div>
          <p class="h5">{{ order.user.address }}</p>
        </div> -->

          <div class="mb-3">
            <div class="mb-2">留言</div>
            <p class="h5">{{ order.user.message }}</p>
          </div>
          <div class="text-center my-5">
            <button
              type="button"
              class="btn btn-primary fs-3"
              @click="payCheck"
            >
              確認付款
            </button>
          </div>
        </div>
      </div>

      <!-- step3 -->
      <div
        class="row mt-5"
        v-if="stepStatus.success && Object.keys(order).length > 0"
      >
        <div
          class="col-lg-8 justify-content-center text-center border mb-5 mx-auto"
        >
          <div class="row">
            <div class="col-md-9 col-xl-7 mx-auto">
              <div class="card-body bg-  text-center py-6 shadow-lg">
                <!-- <i class="fad fa-check-circle text-success mb-3"></i> -->
                <i class="bi bi-check-lg fa-4x text-success"></i>
                <h3 class="h3 mb-4">付款成功</h3>

                <div class="h5 mb-3">感謝您的訂購～</div>
                <div
                  class="d-flex justify-content-center align-items-center mb-3"
                >
                  請將此圖截下私訊IG小盒子
                  <a
                    href="https://www.instagram.com/panda__57.nail/"
                    target="_blank"
                    class="text-white mx-3"
                  >
                    <i class="bi bi-instagram fs-3 text-black"></i>
                  </a>
                </div>
                <div class="mb-4">可至訂單查詢詳細資料</div>
                <div class="mb-3">
                  <p class="h5">
                    訂單編號:{{ order.id }}
                    <span
                      class="ms-3"
                      type="button"
                      @click="copyOrderId(order.id)"
                    >
                      <i class="far fa-copy"></i>
                    </span>
                  </p>
                </div>
                <a href="#/OrderTracking" class="btn btn-outline-primary"
                  >前往查詢</a
                >
              </div>
            </div>
          </div>
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
      isLoading: false,
      isCoupon: { type: false },
      code: '',
      stepStatus: {
        createOrder: false,
        payCheck: true,
        success: false
      },
      order: {},
      beforeOrderPrice: 0
    }
  },
  methods: {
    DateFn,
    toThousandths,
    getOrder () {
      const { id } = this.$route.params
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`
      this.isLoading = true
      this.$http
        .get(url)
        .then((res) => {
          this.order = res.data.order
          // 判斷是否有優惠卷
          let beforeOrderPrice = 0
          Object.values(this.order.products).forEach((item) => {
            if (item.coupon === undefined) {
              this.isCoupon = false
            } else {
              const { coupon } = item
              beforeOrderPrice += item.total
              this.beforeOrderPrice = beforeOrderPrice
              this.isCoupon = coupon
              this.isCoupon.type = true
            }
          })
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
    payCheck () {
      this.stepStatus.payCheck = false
      this.stepStatus.success = true
      this.payOrder()
    },
    payOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.order.id}`
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false
            emitter.emit('push-message', {
              style: 'success',
              title: `${res.data.message}`
            })
          }
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'success',
            title: `${err.response.data.message}`
          })
        })
    },
    copyOrderId (id) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(id)
        emitter.emit('push-message', {
          style: 'success',
          title: `${id}\n已複製到剪貼簿`
        })
      }
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
