<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h3 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h3>
          <button
            type="button"
            class="btn-close"
            @click="hideModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="localOrder.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ localOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ localOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ localOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ localOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>
                      {{ localOrder.id }}
                      <span
                        class="ms-3"
                        type="button"
                        @click="copyOrderId(localOrder.id)"
                      >
                        <i class="far fa-copy"></i>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ DateFn(localOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="localOrder.paid_date">
                        {{ DateFn(localOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="localOrder.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ Math.round(localOrder.total) }}
                      <!-- {{ $filters.currency(localOrder.total) }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="order in localOrder.products" :key="order.id">
                    <th>
                      {{ order.product.title }}
                    </th>
                    <td>{{ order.qty }} / {{ order.product.unit }}</td>
                    <td class="text-end">
                      {{ Math.round(order.final_total) }}
                      <!-- {{ $filters.currency(order.final_total) }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="localOrder.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="localOrder.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="hideModal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-paid', localOrder, currentPage)"
          >
            <!-- @click="updatePaid(localOrder)" -->
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateFn } from '@/libs/methods'
import BootstrapModal from '@/libs/mixins/BootstrapModal'
import emitter from '@/libs/emitter'
export default {
  props: {
    tempOrder: {
      type: Object,
      default () {
        return {}
      }
    },
    currentPage: {
      type: Number
    }
  },
  emits: ['update-paid'],
  mixins: [BootstrapModal],
  data () {
    return {
      localOrder: {}
    }
  },
  watch: {
    tempOrder () {
      this.localOrder = this.tempOrder
    }
  },
  methods: {
    DateFn,
    copyOrderId (id) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(id)
        emitter.emit('push-message', {
          style: 'success',
          title: `${id}\n已複製到剪貼簿`
        })
      }
    }
  }
}
</script>
