<template>
  <VLoading :active="isLoading" :z-index="1060"></VLoading>
  <div
    id="delArticleModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delArticleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delArticleModalLabel" class="modal-title">
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
          <strong class="text-danger">{{ tempArticle.title }}</strong>
          文章(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="hideModal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delArticle()">
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
  // props: ['tempArticle'],
  props: {
    tempArticle: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  emits: ['get-articles'],
  mixins: [BootstrapModal],
  data () {
    return { isLoading: false }
  },
  methods: {
    delArticle () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoading = false
          this.$emit('get-articles')
          this.hideModal()
          emitter.emit('push-message', {
            style: 'success',
            title: `已刪除${this.tempArticle.title}文章`
          })
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
