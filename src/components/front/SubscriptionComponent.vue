<template>
  <!-- 訂閱 -->
  <div
    class="bg-cover d-grid position-relative"
    style="
      background-image: url('https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
      height: 300px;
    "
  >
    <div
      class="text-start text-white d-flex flex-column justify-content-center background-white-opacity"
    >
      <div class="container" data-aos="fade-up">
        <label for="subscribe" class="fs-2 fw-bolder mb-2">訂閱我們</label>
        <p class="fs-5">好康情報不錯過！</p>
        <VForm
          ref="Form"
          @submit="Subscription"
          v-slot="{ errors }"
          class="input-group w-md-50"
        >
          <VField
            type="email"
            class="form-control py-2"
            id="subscribeMail"
            rules="email"
            name="E-mail"
            placeholder="請輸入您的 E-mail"
            :class="{ 'is-invalid': errors['E-mail'] }"
            v-model="subscribeMail"
          />
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="subscribeMail === '' || Object.keys(errors).length > 0"
          >
            訂閱
          </button>
          <ErrorMessage class="invalid-feedback" name="E-mail" />
        </VForm>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      subscribeMail: ''
    }
  },
  methods: {
    Subscription () {
      emitter.emit('push-message', {
        style: 'success',
        title: ` ${this.subscribeMail} 訂閱成功`,
        content: '有最新消息會寄到信箱中，可前往信箱查看唷~'
      })
      this.subscribeMail = ''
    }
  }
}
</script>

<style lang="scss">
.bg-cover {
  background-position: center;
  background-size: cover;
}
.background-white-opacity{
  background-color: rgb(33 36 36 / 40%);
}
</style>
