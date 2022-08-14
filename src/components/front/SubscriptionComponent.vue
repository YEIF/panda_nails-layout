<template>
  <!-- 訂閱 -->
  <div
    class="d-grid position-relative"
    style="
      background-color:#f9f5e8;
    "
  >
  <div class="subscript-top_bg"></div>
      <div class="container pb-5" data-aos="fade-up">
      <h2
        class="d-flex justify-content-center align-items-center mt-5 text-primary w-100"
      >
        <i class="flower-icon me-4"></i>好康情報不錯過！
      </h2>
        <VForm
          ref="Form"
          @submit="Subscription"
          v-slot="{ errors }"
          class="input-group w-md-50 mx-auto mt-5"
        >
          <VField
            type="email"
            class="form-control py-2 text-primary"
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
