<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <!-- <HeaderBanner :msg="article.title" /> -->
  <div class="background-secondary">
    <div class="container">
      <ol class="breadcrumb mt-4">
        <li class="breadcrumb-item">
          <RouterLink to="/" class="text-decoration-none p-0">
            首頁
          </RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/blog" class="text-decoration-none p-0">
            部落格
          </RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
      <!-- 渲染完再載入，不然會看到Invalid-->
      <div
        class="row justify-content-center "
        v-if="Object.keys(article).length > 0"
      >
        <div
          class="text-center border position-relative py-5 mb-5 shadow-sm"
        >
          <p class="small">{{ DateFn(article.create_at) }}</p>
          <h3 class="fw-bold text-primary mb-3">
            {{ article.title }}
          </h3>
          <p class="small mb-4">作者 {{ article.author }}</p>
          <button
            type="button"
            class="btn btn-outline-primary small px-3 py-2 mx-2"
            v-for="tag in article.tag"
            :key="tag"
            @click.prevent="goToTag(tag)"
          >
            {{ tag }}
          </button>

          <div class="text-start w-md-75 mx-auto px-4 px-md-0 mt-5">
            <div class="text-center mb-5">
              <img class="w-100" :src="article.imageUrl" :alt="article.title" />
            </div>
            <div class="text-justify" ref="content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import HeaderBanner from '@/components/front/HeaderBanner.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import emitter from '@/libs/emitter'
import { DateFn } from '@/libs/methods'
export default {
  components: {
    // HeaderBanner,
    LoadingComponent
  },
  data () {
    return {
      isLoading: false,
      title: '周年慶',
      article: {}
    }
  },
  watch: {
    article () {
      this.$nextTick(() => {
        const { content } = this.$refs
        content.innerHTML = this.article.content
      })
    }
  },
  methods: {
    DateFn,
    getArticle () {
      const { id } = this.$route.params
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false
          const { article } = res.data
          this.article = article
          document.title = `${this.article.title} | Panda_Nails`
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    goToTag (tag) {
      this.$router.push({
        name: '部落格',
        params: {
          tag
        }
      })
    }
  },

  mounted () {
    this.getArticle()
  }
}
</script>
