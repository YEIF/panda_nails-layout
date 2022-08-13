<template>
  <div class="bg-dark py-3 footer-letter-spacing position-relative mt-auto">
    <ul
      class="text-white mb-1 mb-md-0  w-100 list-unstyled d-grid justify-content-center text-start"
    >
      <li class="mb-1">
         <a href="tel:+886-970556501" class="link-light text-decoration-none">
        <i class="bi bi-telephone-fill me-2"></i>
       0970-556-501</a>
      </li>
      <li class="mb-1">
        <i class="bi bi-geo-alt-fill me-2"></i>
        台北市萬華區西寧南路192號10樓
      </li>
      <li class="mb-1">
        <i class="bi bi-clock-fill me-2"></i>
        營業時間 : 10:00-20:00
      </li>
      <li class="my-1 text-center">
        <a
          href="https://www.instagram.com/panda__57.nail/"
          target="_blank"
          class="text-white mx-3"
        >
          <i class="bi bi-instagram fs-3"></i>
        </a>
        <a
          href="https://github.com/YEIF/panda_nails"
          target="_blank"
          class="text-white mx-3"
        >
          <i class="bi bi-github fs-3"></i>
        </a>

      </li>
      <li class="mb-0">© 2022 Panada Nails 版權所有(非商業用) |<span type="button" @click="$router.push('/login')"> 後臺登入</span></li>
    </ul>
  </div>
</template>
<style lang="scss">
.footer-letter-spacing {
  letter-spacing: 0.25rem;
  @media (max-width: 768px) {
    letter-spacing: 0;
  }
}
</style>
