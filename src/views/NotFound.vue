<template>
  <FrontNavbar />
  <h2>404頁面</h2>
  <div>
    <img src="@/assets/img/panda_circle400.png" alt="404圖片" />
    <div>
      <RouterLink to="/" class="btn btn-primary">點此返回首頁</RouterLink>
    </div>
  </div>

  <FooterComponent />
</template>
<script>
import FrontNavbar from '@/components/front/FrontNavbar.vue'
import FooterComponent from '@/components/front/FooterComponent.vue'
export default {
  components: {
    FrontNavbar,
    FooterComponent
  }
}
</script>
