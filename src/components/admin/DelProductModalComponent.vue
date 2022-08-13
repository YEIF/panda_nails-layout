<template>
  <VLoading :active="isLoading" :z-index="1060"></VLoading>
  <div
    id="delProductModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
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
          <strong class="text-danger">{{ tempProduct.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="hideModal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delProduct">
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
  props: {
    tempProduct: {
      type: Object,
      default () {
        return {}
      }
    },
    currentPage: {
      type: Number
    }
  },
  mixins: [BootstrapModal],
  emits: ['get-products'],
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    delProduct () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.$emit('get-products', this.currentPage)
          this.isLoading = false
          this.hideModal()
          emitter.emit('push-message', { style: 'success', title: '刪除商品成功' })
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
