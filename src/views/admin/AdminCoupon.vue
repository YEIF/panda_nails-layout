<template>
  <div class="container">
    <VLoading :active="isLoading" :z-index="1060"></VLoading>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="openCouponModal('new')"
      >
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coupon, key) in coupons" :key="key">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }}%</td>
          <td>{{ DateFn(coupon.due_date) }}</td>
          <td>
            <span v-if="coupon.is_enabled === 1" class="text-success"
              >啟用</span
            >
            <span v-else class="text-muted text-danger">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal('edit', coupon)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openCouponModal('del', coupon)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModalComponent
      ref="couponModal"
      :temp-coupon="tempCoupon"
      :is-new="isNew"
      @get-coupons="getCoupons"
    />
    <DelCouponModalComponent
      ref="delCouponModal"
      :temp-coupon="tempCoupon"
      @get-coupons="getCoupons"
    />
  </div>
</template>
<script>
import { DateFn } from '@/libs/methods'
import CouponModalComponent from '@/components/admin/CouponModalComponent.vue'
import DelCouponModalComponent from '@/components/admin/DelCouponModalComponent.vue'
import emitter from '@/libs/emitter'
export default {
  components: {
    CouponModalComponent,
    DelCouponModalComponent
  },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isLoading: false,
      isNew: false
    }
  },
  methods: {
    getCoupons () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http
        .get(url)
        .then((res) => {
          this.coupons = res.data.coupons
          this.isLoading = false
        })
        .catch((err) => {
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    DateFn,
    openCouponModal (type, coupon) {
      if (type === 'new') {
        this.isNew = true
        // this.tempCoupon = {}
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0
        }
        this.$refs.couponModal.openModal()
      } else if (type === 'edit') {
        this.isNew = false
        this.tempCoupon = JSON.parse(JSON.stringify(coupon))
        this.$refs.couponModal.openModal()
      } else if (type === 'del') {
        this.isNew = false
        this.tempCoupon = JSON.parse(JSON.stringify(coupon))
        this.$refs.delCouponModal.openModal()
      }
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
