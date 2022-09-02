<template>
  <div
    class="position-relative d-flex align-items-center justify-content-center flex-column"
    style="height: calc(100vh - 172px)"
  >
    <div
      class="position-absolute header-banner"
      style="
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-position: center center;
        background-size: cover;
      "
    ></div>
    <!-- <h1 class="fw-bold text-white">{{msg}}</h1> -->
    <h1 class="fw-bold text-white fs-1 fs-md-80" style="z-index: 1;"> {{ title }} </h1>
    <h1 class="fw-bold text-white fs-lg fs-md-1" style="z-index: 1"> {{ msg }} </h1>
  </div>
</template>
<script>
import BannerImage from '@/assets/img/panda/banner.png'
export default {
  props: {
    msg: String,
    title: String
  },
  data () {
    return {
      BannerImage: BannerImage
    }
  }
}
</script>
<style lang="scss"></style>
