<template>
  <VLoading :active="isLoading" :z-index="1060"></VLoading>
  <div
    id="delOrderModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delOrderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delOrderModalLabel" class="modal-title">
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
          <strong class="text-danger">{{ tempOrder.id }}</strong>
          訂單(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="hideModal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delOrder">
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
  // props: ['tempOrder', 'currentPage'],
  props: {
    tempOrder: {
      type: Object,
      default () {
        return {}
      }
    },
    currentPage: {
      type: Number
    }
  },
  emits: ['get-orders'],
  mixins: [BootstrapModal],
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    delOrder () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'success',
            title: this.tempOrder.id + '訂單' + res.data.message
          })
          this.$emit('get-orders', this.currentPage)
          this.hideModal()
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
