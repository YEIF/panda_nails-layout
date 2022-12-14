<template>
  <VLoading :active="isLoading" :z-index="1060" />
  <div
    class="modal fade"
    id="articleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h3 class="modal-title" id="articleModalLabel">
            <span v-if="isNew">新增貼文</span>
            <span v-else>編輯貼文</span>
          </h3>
          <button type="button" class="btn-close" @click="hideModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="localArticle.title"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="localArticle.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input
                  type="text"
                  class="form-control"
                  id="author"
                  v-model="localArticle.author"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="create_at">文章建立日期</label>
                <input
                  type="date"
                  class="form-control"
                  id="create_at"
                  v-model="create_at"
                />
              </div>
            </div>
            <div class="col-sm-8">
              <label for="tag" class="form-label">標籤</label>
              <div class="row gx-1 mb-3">
                <div
                  class="col-md-2 mb-1"
                  v-for="(label, key) in localArticle.tag"
                  :key="key"
                >
                  <div class="input-group input-group-sm">
                    <input
                      type="text"
                      class="form-control form-control"
                      id="tag"
                      v-model="localArticle.tag[key]"
                      placeholder="請輸入標籤"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="localArticle.tag.splice(key, 1)"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <div
                  class="col-md-2 mb-1"
                  v-if="
                    localArticle.tag[localArticle.tag.length - 1] ||
                    !localArticle.tag.length
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="localArticle.tag.push('')"
                  >
                    新增標籤
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="localArticle.description"
                  placeholder="請輸入文章描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-control">文章內容</div>
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="localArticle.content"
                ></ckeditor>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="localArticle.isPublic"
                    id="isPublic"
                  />
                  <label class="form-check-label" for="isPublic">
                    是否公開
                  </label>
                </div>
              </div>
            </div>
          </div>
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
            class="btn btn-primary"
            @click="updateArticles(localArticle)"
          >
            {{ isNew ? '新增文章' : '更新' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BootstrapModal from '@/libs/mixins/BootstrapModal'
import emitter from '@/libs/emitter'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  mixins: [BootstrapModal],
  // props: ['localArticle', 'isNew'],
  props: {
    tempArticle: {
      type: Object,
      default () {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  emits: ['get-articles'],
  data () {
    return {
      status: {},
      modal: '',
      isLoading: false,
      localArticle: {
        tag: ['']
      },
      create_at: '',
      // 參考：https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html#editor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'typing', 'bold', 'italic', '|', 'link']
      }
    }
  },
  watch: {
    tempArticle () {
      this.localArticle = {
        ...this.tempArticle,
        tag: this.tempArticle.tag || []
        // isPublic: this.tempArticle.isPublic || false
      }
      ;[this.create_at] = new Date(this.tempArticle.create_at * 1000)
        .toISOString()
        .split('T')
    },
    create_at () {
      this.localArticle.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  },
  methods: {
    updateArticles () {
      this.isLoading = true
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`
      let methods = 'post'
      let typeMessage = '新增貼文'
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.localArticle.id}`
        methods = 'put'
        typeMessage = '更新貼文'
      }
      this.$http[methods](url, { data: this.localArticle })
        .then((res) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'success',
            title: `${typeMessage}${this.localArticle.title}`
          })
          this.$emit('get-articles')
          this.hideModal()
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${typeMessage}${this.localArticle.title}優惠卷`,
            content: `${err.response.data.message}`
          })
        })
    }
  }
}
</script>

<style>
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>
