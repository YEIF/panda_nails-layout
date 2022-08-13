<template>
  <!-- <h1 class="text-danger">現在是前台</h1> -->
    <FrontNavbar />
    <RouterView />
    <FooterComponent/>
</template>
<script>
import FrontNavbar from '@/components/front/FrontNavbar.vue'
import FooterComponent from '@/components/front/FooterComponent.vue'
export default {
  components: {
    FrontNavbar, FooterComponent
  }
}
</script>
