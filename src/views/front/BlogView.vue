<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <!-- <HeaderBanner title="部落格 Blog" /> -->
  <div class="background-secondary">
    <div class="container">
      <ol class="breadcrumb pt-4">
        <li class="breadcrumb-item">
          <RouterLink to="/" class="nav-link active p-0"> 首頁 </RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">部落格</li>
      </ol>

      <nav style="--bs-breadcrumb-divider: ''" aria-label="breadcrumb">
        <ol class="breadcrumb pt-4 d-flex my-3 justify-content-center g-3">
          <li
            class="tag breadcrumb-item btn btn-outline-primary ms-2 px-2"
            :class="{ active: filterTags == '' }"
            @click="filterTags = ''"
          >
            全部
          </li>
          <li
            class="tag breadcrumb-item btn btn-outline-primary px-2 ms-2"
            :class="{ active: filterTags == tag }"
            v-for="tag in tags"
            :key="tag"
            @click="filterTags = tag"
          >
            {{ tag }}
          </li>
        </ol>
      </nav>

      <div class="row justify-content-center py-5">
        <div
          class="blog p-0 d-flex position-relative col-12 col-md-8 mb-5 text-start overflow-hidden"
          data-aos="fade-up"
          data-aos-offset="100"
          v-for="article in filterArticles"
          :key="article.id"
          @click="getArticle(article.id)"
        >
          <div class="blog_img overflow-hidden align-self-center">
            <img
              :src="article.imageUrl"
              :alt="article.title"
              class="flex-shrink-0 me-3"
            />
          </div>

          <div
            class="blog_content d-flex flex-column justify-content-between p-4 bg-light"
          >
            <div
              class="blog_header d-flex justify-content-between align-items-center"
            >
              <h3 class="blog_title fs-4 fw-bold text-nowrap w-100">
                {{ article.title }}
              </h3>

              <p class="text-secondary mb-2 mb-xs-0">
                {{ DateFn(article.create_at) }}
              </p>
            </div>
            <ul class="p-0">
              <li
                class="d-inline-block small mx-1"
                v-for="tag in article.tag"
                :key="tag"
              >
                # {{ tag }}
              </li>
            </ul>

            <p class="blog_description w-100">
              {{ article.description }}
            </p>

            <p class="w-100 text-end text-decoration-none border-end">
              作者:{{ article.author }}
            </p>
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
      articles: [],
      isLoading: false,
      tags: [],
      filterTags: ''
    }
  },
  computed: {
    filterArticles () {
      return this.articles.filter((item) => {
        if (this.filterTags) {
          return item.tag.includes(this.filterTags)
        }
        return this.articles // 呈現全部貼文
      })
    }
  },
  methods: {
    DateFn,
    getArticles () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles`
      this.$http
        .get(api)
        .then((res) => {
          const { articles } = res.data
          // 排序文章日期
          const articlesSort = [...articles].sort(
            (a, b) => b.create_at - a.create_at
          )
          // 抓出所有tag
          const tags = []
          articles.forEach((item) => {
            item.tag.forEach((element) => {
              if (tags.indexOf(element) === -1) {
                tags.push(element)
              }
            })
          })
          this.tags = tags
          this.articles = articlesSort
          this.isLoading = false
          //  從文章tag來的
          if (this.$route.params.tag) {
            const { tag } = this.$route.params
            this.filterTags = tag
          }
        })
        .catch((err) => {
          this.isLoading = false
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
        })
    },
    getArticle (id) {
      this.$router.push(`/article/${id}`)
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>
