<template>
  <ToastMessageComponent />
  <router-view />
</template>

<script>
import ToastMessageComponent from '@/components/ToastMessageComponent.vue'
export default {
  components: {
    ToastMessageComponent
  }
}
</script>

<style lang="scss">
@import '@fortawesome/fontawesome-free/css/all.min.css';
@import 'bootstrap-icons/font/bootstrap-icons.css';
@import "assets/stylesheets/all.scss";

#app {
  font-family: 微軟正黑體,Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // display: flex;
  // flex-direction: column;
  // min-height: 100vh;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
