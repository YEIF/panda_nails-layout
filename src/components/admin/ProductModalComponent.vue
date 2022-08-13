<template>
  <VLoading :active="isLoading" :z-index="1060"></VLoading>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ isNew ? '新增產品' : '編輯產品' }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    id="imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="localProduct.imageUrl"
                  />
                  <img class="img-fluid" :src="localProduct.imageUrl" />
                </div>

                <div class="mb-3">
                  <label for="customFile" class="form-label"
                    >或 上傳圖片
                    <span
                      id="customFile"
                      class="spinner-border"
                      style="width: 1rem; height: 1rem"
                      role="status"
                      v-if="status.fileUploading"
                    >
                    </span>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="fileInput"
                    @change="uploadFile"
                  />
                </div>

                <h3 class="mb-3">多圖新增</h3>
                <!-- 判斷是不是一個陣列 ，並且有沒有值-->
                <div v-if="Array.isArray(localProduct.imagesUrl)">
                  <!-- 陣列有值就顯示 -->
                  <div
                    class="mb-1"
                    v-for="(image, key) in localProduct.imagesUrl"
                    :key="key"
                  >
                    <div class="mb-3">
                      <label for="imageUrlArray" class="form-label"
                        >圖片網址</label
                      >
                      <input
                        id="imageUrlArray"
                        v-model="localProduct.imagesUrl[key]"
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                      />
                    </div>
                    <img class="img-fluid" :src="image" />
                  </div>
                  <div
                    v-if="
                      !localProduct.imagesUrl.length ||
                      localProduct.imagesUrl[localProduct.imagesUrl.length - 1]
                    "
                  >
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="localProduct.imagesUrl.push('')"
                    >
                      新增圖片
                    </button>
                  </div>
                  <div v-else>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm d-block w-100"
                      @click="localProduct.imagesUrl.pop()"
                    >
                      刪除圖片
                    </button>
                  </div>
                </div>
                <!-- localProduct.imagesUrl 沒有值的時候 -->
                <div v-else>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="createImagesUrl"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="localProduct.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="localProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="localProduct.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model="localProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="localProduct.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="localProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="localProduct.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="localProduct.id"
                    v-model="localProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" :for="tempProduct.id"></label>
                  <span class="text-success" v-if="tempProduct.is_enabled"
                    >啟用</span
                  >
                  <span class="text-danger" v-else>未啟用</span>
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
          <button type="button" class="btn btn-primary" @click="updateProduct">
            {{ isNew ? '新增' : '更新' }}
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
  // props: ['tempProduct', 'isNew', 'currentPage'],
  props: {
    tempProduct: {
      type: Object,
      default () {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number
    }
  },
  emits: ['get-products', 'create-images-url'],
  mixins: [BootstrapModal],
  data () {
    return {
      localProduct: {},
      status: {},
      isLoading: false
    }
  },
  watch: {
    tempProduct () {
      this.localProduct = this.tempProduct
    }
  },
  methods: {
    updateProduct () {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/`
      let method = 'post'
      let typeMessage = '新增產品'
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
        typeMessage = '更新產品'
      }
      this.isLoading = true
      this.$http[method](url, { data: this.localProduct })
        .then((res) => {
          // this.getProducts()
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'success',
            title: `${typeMessage}成功`
          })
          this.$emit('get-products', method === 'put' ? this.currentPage : 1)
          this.hideModal()
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${typeMessage}失敗`,
            content: `${err.response.data.message}`
          })
        })
    },
    createImagesUrl () {
      this.$emit('create-images-url')
    },
    uploadFile () {
      const uploadedFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`
      this.status.fileUploading = true
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          this.status.fileUploading = false
          if (res.data.success) {
            this.localProduct.imageUrl = res.data.imageUrl
            this.$refs.fileInput.value = ''

            emitter.emit('push-message', {
              style: 'success',
              title: '圖片上傳成功'
            })
          } else {
            this.$refs.fileInput.value = ''
            emitter.emit('push-message', {
              style: 'danger',
              title: '圖片上傳失敗',
              content: res.data.message
            })
          }
        })
        .catch((err) => {
          console.dir(err)
          emitter.emit('push-message', {
            style: 'danger',
            title: '圖片上傳失敗'
          })
        })
    }
  }
}
</script>
