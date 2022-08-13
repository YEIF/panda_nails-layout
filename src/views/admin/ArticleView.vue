<template>
  <div class="container">
    <VLoading :active="isLoading" :z-index="1060"></VLoading>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="openArticleModal('new')"
      >
        建立新的文章
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>標題</th>
          <th>作者</th>
          <th>描述</th>
          <th>建立時間</th>
          <th>是否公開</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td class="text-truncate" style="max-width:100px">{{ article.description }}</td>
          <td>{{ DateFn(article.create_at) }}</td>
          <td>
            <span v-if="article.isPublic" class="text-success">已上架</span>
            <span v-else class="text-danger">未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openArticleModal('edit', article)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openArticleModal('del', article)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ArticleModalComponent
      ref="articleModal"
      :temp-article="tempArticle"
      :is-new="isNew"
      @get-articles="getArticles"
    />
    <DelArticleModalComponent
      ref="delArticleModal"
      :temp-article="tempArticle"
      @get-articles="getArticles"
    />

  </div>
</template>

<script>
import emitter from '@/libs/emitter'
import { DateFn } from '@/libs/methods'
import ArticleModalComponent from '@/components/admin/ArticleModalComponent.vue'
import DelArticleModalComponent from '@/components/admin/DelArticleModalComponents.vue'
export default {
  components: { ArticleModalComponent, DelArticleModalComponent },
  data () {
    return {
      articles: [],
      tempArticle: [],
      pagination: [],
      isLoading: false,
      isNew: false
    }
  },
  methods: {
    DateFn,
    getArticles (page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`
      this.isLoading = true
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false
          this.articles = res.data.articles
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    openArticleModal (type, article) {
      if (type === 'new') {
        this.isNew = true
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: []
        }
        this.isNew = true
        this.$refs.articleModal.openModal()
      } else if (type === 'edit') {
        this.isNew = false
        this.getArticle(article.id)
      } else if (type === 'del') {
        this.isNew = false
        this.tempArticle = JSON.parse(JSON.stringify(article))
        this.$refs.delArticleModal.openModal()
      }
    },
    getArticle (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false
          const { article } = res.data
          this.tempArticle = JSON.parse(JSON.stringify(article))
          this.$refs.articleModal.openModal()
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
  mounted () {
    this.getArticles()
  }
}
</script>
