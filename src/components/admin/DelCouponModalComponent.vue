<template>
  <VLoading :active="isLoading" :z-index="1060"></VLoading>
  <div
    id="delCouponModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delCouponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delCouponModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempCoupon.title }}</strong>
          優惠卷(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="hideModal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="delCoupon()"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BootstrapModal from '@/libs/mixins/BootstrapModal'
import emitter from '@/libs/emitter'
export default {
  // props: ['tempCoupon'],
  props: {
    tempCoupon: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  emits: ['get-coupons'],
  mixins: [BootstrapModal],
  data () {
    return { isLoading: false }
  },
  methods: {
    delCoupon () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoading = false
          this.$emit('get-coupons')
          this.hideModal()
          emitter.emit('push-message', { style: 'success', title: `已刪除${this.tempCoupon.title}優惠卷` })
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    }
  }
}
</script>
