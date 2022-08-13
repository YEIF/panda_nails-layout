<template>
  <div class="container">
    <VLoading :active="isLoading" :z-index="1060"></VLoading>
    <div class="text-end mt-4">
      <button type="button" class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="100">原價</th>
          <th width="100">售價</th>
          <th width="140">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, key) in products" :key="product.id + key">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">{{ product.origin_price }}</td>
          <td class="text-end">{{ product.price }}</td>
          <td>
            <div class="form-check">
              <span class="text-success" v-if="product.is_enabled">啟用</span>
              <span class="text-danger" v-else>未啟用</span>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', product)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('del', product)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <!-- 內 pages,外 pagination -->
    <!-- 內 get-product, 外 getProduct -->
    <PaginationComponent :pages="pagination" @change-pages="getProducts" />
    <ProductModalComponent
      ref="productModal"
      :temp-product="tempProduct"
      :is-new="isNew"
      :current-page="pagination.current_page"
      @get-products="getProducts"
      @create-images-url="createImagesUrl"
    />
    <DelProductModalComponent
      :temp-product="tempProduct"
      :current-page="pagination.current_page"
      @get-products="getProducts"
      ref="delProductModal"
    />
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent'
import ProductModalComponent from '@/components/admin/ProductModalComponent.vue'
import DelProductModalComponent from '@/components/admin/DelProductModalComponent'
import emitter from '@/libs/emitter'
export default {
  components: {
    PaginationComponent,
    ProductModalComponent,
    DelProductModalComponent
  },
  data () {
    return {
      tempProduct: {
        imagesUrl: []
      },
      isNew: false,
      products: [],
      pagination: {},
      isLoading: false
    }
  },
  methods: {
    openModal (type, product) {
      if (type === 'new') {
        this.isNew = true
        this.modal = 'product'
        this.$refs.productModal.openModal()
        // productModal.show()
        this.tempProduct = {
          imagesUrl: []
        }
      } else if (type === 'del') {
        this.isNew = false
        this.modal = 'del'
        // delProductModal.show()
        this.tempProduct = JSON.parse(JSON.stringify(product))
        this.$refs.delProductModal.openModal()
      } else if (type === 'edit') {
        this.isNew = false
        this.modal = 'product'
        this.tempProduct = JSON.parse(JSON.stringify(product))
        this.$refs.productModal.openModal()
        // productModal.show()
      }
    },
    getProducts (page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
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
    createImagesUrl () {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
