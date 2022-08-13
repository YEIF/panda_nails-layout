<template>
  <DashNavbar />
  <RouterView />
</template>

<script>
import DashNavbar from '@/components/admin/DashNavbar.vue'
import emitter from '@/libs/emitter'
export default {
  components: {
    DashNavbar
  },
  data () {
    return {
      status: false
    }
  },
  methods: {
    checkLogin () {
      const url = `${process.env.VUE_APP_API}/api/user/check`
      this.$http
        .post(url)
        .then((res) => {
          if (!res.data.success) {
            emitter.emit('push-message', { style: 'danger', title: '登入失敗' })
            this.$router.push('/login')
          } else {
            emitter.emit('push-message', {
              style: 'success',
              title: '登入成功'
            })
            this.status = true
          }
        })
        .catch((err) => {
          emitter.emit('push-message', {
            style: 'danger',
            title: `${err.response.data.message}`
          })
          this.$router.push('/login')
        })
    }
  },
  created () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = token
    this.checkLogin()
  }
}
</script>
