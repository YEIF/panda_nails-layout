<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <HeaderBanner msg="客戶訂單查詢" />
  <div class="container">
    <ol class="breadcrumb mt-4">
      <li class="breadcrumb-item">
        <RouterLink to="/" class="nav-link active p-0"> 首頁 </RouterLink>
      </li>
      <li class="breadcrumb-item active" aria-current="page">訂單查詢</li>
    </ol>
    <div class="row justify-content-center my-5">
      <div class="col-md-9">
        <!-- <h2 class="h1 py-3">訂單查詢</h2> -->
        <div class="form-label text-start">
          <label class="mb-2 fs-5" for="orderId">訂單編號</label>
          <VForm
            class="input-group"
            ref="form"
            v-slot="{ errors }"
            @submit="searchOrder"
          >
            <VField
              id="orderId"
              type="search"
              class="form-control"
              placeholder="請輸入 訂單編號"
              name="訂單編號"
              :disabled="searchType"
              v-model="orderId"
              :class="{ 'is-invalid': errors['訂單編號'] }"
              rules="required"
            >
            </VField>
            <button
              type="submit"
              class="input-group-text btn btn-primary"
              :disabled="Object.keys(errors).length > 0 || searchType || orderId===''"
              id="search-button"
            >
              <i class="bi bi-search"></i>
            </button>
            <ErrorMessage
              name="訂單編號"
              class="invalid-feedback"
            ></ErrorMessage>
          </VForm>
        </div>
      </div>
      <!-- 訂單資訊 -->
      <div class="col-md-9 mt-5" v-if="order" data-aos="fade-up" data-aos-offset="100">
        <div class="card">
          <div class="card-header" ref="order">訂單資訊</div>

          <div class="card-body">
            <p class="small text-end">
              訂單成立時間:{{ DateTimeFn(order.create_at) }}
            </p>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  type="button"
                  class="accordion-button fw-bold collapsed"
                  aria-expanded="false"
                  style="font-size: 15px"
                  ref="accordionButton"
                  @click="toggleAccordionCollapse"
                >
                  商品清單
                </button>
              </h2>
              <div
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                ref="accordionCollapse"
              >
                <ul class="accordion-body list-unstyled" ref="collapseUl">
                  <li
                    class="border-0"
                    v-for="(products, index) in order.products"
                    :key="index"
                  >
                    <div class="row g-0">
                      <div class="col-4 col-md-3 col-lg-4 mt-3">
                        <img
                          :src="products.product.imageUrl"
                          class=""
                          alt="products.product.title"
                          style="object-fit: contain; height: 150px"
                        />
                      </div>
                      <div
                        class="col-8 col-md-9 col-lg-8 g-3 d-flex flex-column g-3 justify-content-between"
                      >
                        <div
                          class="fs-5 text-start d-flex justify-content-between"
                        >
                          <p>{{ products.product.title }}</p>
                          <small class="text-end">X{{ products.qty }}</small>
                        </div>
                        <p class="text-start mb-0">
                          <small class="text-muted"
                            >NT${{ products.product.price }} /
                            {{ products.product.unit }}</small
                          >
                        </p>
                        <p class="mb-0 text-end fs-4">
                          NT${{ products.total }}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <table class="table table-hover mt-5" >
              <tbody>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">訂單編號</td>
                  <td>{{ order.id }}</td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">確認付款</td>
                  <td v-if="order.is_paid" class="text-success">已付款</td>
                  <td v-else class="text-danger">未付款</td>
                </tr>
                <tr v-if="order.is_paid">
                  <td scope="row" class="fw-bold" width="30%">付款時間</td>
                  <td class="text-success">{{ DateTimeFn(order.paid_date) }}</td>
                </tr>
                <template v-if="isCoupon.type">
                  <tr>
                    <td scope="row" class="fw-bold" width="30%">優惠卷代碼</td>
                    <td class="text-success">{{ isCoupon.code }}</td>
                  </tr>
                  <tr>
                    <td scope="row" class="fw-bold" width="30%">折扣百分比</td>
                    <td class="text-danger">{{ isCoupon.percent }}%</td>
                  </tr>
                </template>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">姓名</td>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">手機</td>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">E-mail</td>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">收件地址</td>
                  <td>{{order.user.address}}</td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">備註</td>
                  <td>{{ order.user.message }}</td>
                </tr>
                <template v-if="isCoupon.type">
                  <tr>
                    <td scope="row" class="fw-bold align-middle">訂單金額</td>
                    <td class="text-decoration-line-through">
                      NT$ {{ beforeOrderPrice }}
                    </td>
                  </tr>
                  <tr>
                    <td scope="row" class="fw-bold align-middle">折扣後金額</td>
                    <td class="text-danger">NT$ {{ Math.round(order.total) }}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td scope="row" class="fw-bold align-middle">訂單金額</td>
                    <td class="text-danger">NT$ {{ order.total }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBanner from '@/components/front/HeaderBanner.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import Collapse from 'bootstrap/js/dist/collapse'
import emitter from '@/libs/emitter'
import { DateTimeFn } from '@/libs/methods'
export default {
  data () {
    return {
      // VLoading
      isLoading: false,
      searchType: false,
      orderId: '',
      order: '',
      isCoupon: { type: false },
      beforeOrderPrice: 0
    }
  },
  components: {
    LoadingComponent,
    HeaderBanner
  },
  methods: {
    DateTimeFn,
    toggleAccordionCollapse () {
      this.accordionCollapse.toggle()
      if (
        this.accordionButton.getAttribute('class').split(' ').pop() ===
        'collapsed'
      ) {
        this.accordionButton.classList.remove('collapsed')
      } else {
        this.accordionButton.classList.add('collapsed')
      }
    },
    searchOrder () {
      this.isLoading = true
      this.searchType = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http
        .get(url)
        .then((res) => {
          const { order } = res.data
          if (order === null) {
            emitter.emit('push-message', {
              style: 'danger',
              title: '請輸入正確的訂單編號'
            })
          } else {
            this.order = order
            // 判斷是否有優惠卷
            let beforeOrderPrice = 0
            Object.values(this.order.products).forEach((item) => {
              if (item.coupon === undefined) {
                this.isCoupon.type = false
              } else {
                const { coupon } = item
                beforeOrderPrice += item.total
                this.beforeOrderPrice = beforeOrderPrice
                this.isCoupon = coupon
                this.isCoupon.type = true
              }
            })
            emitter.emit('push-message', {
              style: 'success',
              title: '訂單查詢成功'
            })
            this.$refs.form.resetForm()
          }
          this.isLoading = false
          this.searchType = false
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    }
  },
  watch: {
    order () {
      this.$nextTick(() => {
        // 當畫面渲染完才註冊 Collapse元件
        if (this.$refs.accordionCollapse !== undefined) {
          const { accordionButton, accordionCollapse } = this.$refs
          this.accordionButton = accordionButton
          this.accordionCollapse = new Collapse(accordionCollapse, {
            toggle: false
          })
        }
      })
    }
  },
  mounted () {}
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
