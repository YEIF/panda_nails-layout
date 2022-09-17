<template>
  <VLoading :active="isLoading" :z-index="1060">
    <LoadingComponent />
  </VLoading>
  <HeaderBanner title="管理員登入" />
  <div class="container mt-5 mb-5">
    <div class="row">
      <img
        class="col-6 d-none d-md-block login-img px-0 shadow-lg rounded"
        src="@/assets/img/login1.jpg"
        alt="login-img"
        style="height: 700px; object-fit: cover"
      />
      <div class="col-md-6 d-flex flex-column align-items-center">
        <!-- 登入元件 -->
        <div class="w-100 my-auto">
          <div class="fs-1">LOG IN</div>
          <VForm
            ref="form"
            id="form"
            class="form-signin"
            v-slot="{ errors }"
            @submit="login"
          >
            <div class="form-floating mb-3">
              <VField
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                rules="required|email"
                v-model="form.user.email"
                placeholder="name@example.com"
                required
                autofocus
                autocomplete="off"
              />
              <label for="email">Email address</label>
              <ErrorMessage name="email" class="invalid-feedback" />
            </div>
            <div class="form-floating">
              <VField
                id="password"
                name="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': errors['password'] }"
                rules="required"
                v-model="form.user.password"
                placeholder="Password"
                required
                autofocus
                autocomplete
              />
              <label for="password">Password</label>
              <ErrorMessage name="password" class="invalid-feedback" />
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'
import LoadingComponent from '@/components/LoadingComponent.vue'
import HeaderBanner from '@/components/front/HeaderBanner.vue'
export default {
  components: { LoadingComponent, HeaderBanner },
  data () {
    return {
      form: {
        user: {
          email: '',
          password: ''
        }
      },
      isLoading: false
    }
  },
  methods: {
    login () {
      const url = `${process.env.VUE_APP_API}/admin/signin`
      this.isLoading = true
      const data = {
        username: this.form.user.email,
        password: this.form.user.password
      }
      this.$http
        .post(url, data)
        .then((response) => {
          const { token, expired } = response.data
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(
            expired
          )}; path=/`
          this.isLoading = false
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
          this.isLoading = false
        })
    }
  }
}
</script>
