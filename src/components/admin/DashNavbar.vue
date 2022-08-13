<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">後台</a> -->
      <RouterLink class="navbar-brand" to="/admin">後台</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/products"
              >產品列表</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/orders"
              >訂單頁面</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/coupon"
              >優惠卷</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/article"
              >文章列表</RouterLink
            >
          </li>
          <a href="#" @click.prevent="logout" class="nav-link">登出</a>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}/logout`
      this.$http
        .post(api)
        .then((response) => {
          alert('登出成功')

          if (response.data.success) {
            document.cookie = 'hexToken=;expires=;' // 登出並清除 token
            this.$router.push('/')
          }
        })
        .catch((error) => {
          alert(error.response)
          // this.$httpMessageState(error.response, '錯誤訊息')
        })
    }
  }
}
</script>

<style lang="scss">
body {
  padding-top: 56px;
}
.modal-content{
  text-align: left !important;
}
</style>
