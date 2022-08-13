import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        meta: { title: 'Panda_Nails' },
        // component: HomeView
        component: () => import('../views/front/HomeView')
      },
      {
        path: 'products',
        name: '產品頁面',
        meta: { title: '產品頁面 | Panda_Nails' },
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'OrderTracking',
        meta: { title: '訂單查詢 | Panda_Nails' },
        component: () => import('../views/front/OrderTrackingView.vue')
      },
      {
        path: 'blog',
        name: '部落格',
        meta: { title: '部落格 | Panda_Nails' },
        component: () => import('../views/front/BlogView.vue')
      },
      {
        path: 'article/:id',
        component: () => import('../views/front/ArticleView.vue')
      },
      {
        path: 'checkout',
        meta: { title: '結帳頁面 | Panda_Nails' },
        component: () => import('../views/front/CheckoutView.vue')
      },
      {
        path: 'checkout/:id',
        meta: { title: '付款頁面 | Panda_Nails' },
        component: () => import('../views/front/PayView.vue')
      },
      {
        path: 'question',
        meta: { title: '常見問題 | Panda_Nails' },
        component: () => import('../views/front/QuestionView.vue')
      },
      {
        path: 'favorite',
        meta: { title: '收藏頁面 | Panda_Nails' },
        component: () => import('../views/front/FavoriteView.vue')
      },
      {
        path: '/login',
        name: 'Login',
        meta: { title: '後台登入 | Panda_Nails' },
        component: () => import('../views/LoginView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: '',
        // component: HomeView
        component: () => import('../views/admin/AdminView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/admin/AdminProducts.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/admin/AdminCoupon.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/OrderView.vue')
      },
      {
        path: 'article',
        component: () => import('../views/admin/ArticleView.vue')
      }
    ]
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
  // {
  //   path: '/admin/:pathMatch(.*)*',
  //   redirect: { name: 'Login' }
  // }

  // 重新導向
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: {
  //     name: HomeView
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active' // bootstrap
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
