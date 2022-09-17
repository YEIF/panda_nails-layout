<template>
  <ul class="list d-flex justify-content-center list-unstyled">
    <li
      class="rounded-circle d-flex flex-column justify-content-center text-nowrap"
      :class="{ active: stepStatus.createOrder }"
    >
      <i class="bi bi-card-checklist fs-2"></i>
      <p class="mb-0 mb-lg-3">Step 1 .</p>
      <p>填寫資訊</p>
    </li>
    <li
      class="rounded-circle d-flex flex-column justify-content-center text-nowrap"
      :class="{ active: stepStatus.payCheck }"
    >
      <i class="bi bi-credit-card fs-2"></i>
      <p class="mb-0 mb-lg-3">Step 2 .</p>
      <p>確認付款</p>
    </li>
    <li
      class="rounded-circle d-flex flex-column justify-content-center text-nowrap"
      :class="{ active: stepStatus.success }"
    >
      <i class="bi bi-cart-check fs-2"></i>
      <p class="mb-0 mb-lg-3">Step 3 .</p>
      <p>訂單完成</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    stepStatus: {
      type: Object
    }
  }
}
</script>
