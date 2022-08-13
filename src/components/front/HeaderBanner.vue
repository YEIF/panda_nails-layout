<template>
  <div
    class="position-relative d-flex align-items-center justify-content-center"
    style="min-height: 300px"
  >
    <div
      class="position-absolute"
      style="
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-position: center center;
        opacity: 0.3;
      "
      :style="{ backgroundImage: `url(${BannerImage})` }"
    ></div>
    <h1 class="fw-bold">{{ msg }}</h1>
  </div>
</template>
<script>
import BannerImage from '@/assets/img/banner3.jpg'
export default {
  props: {
    msg: String
  },
  data () {
    return {
      BannerImage: BannerImage
    }
  }
}

</script>
