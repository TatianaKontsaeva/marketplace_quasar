
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/catalog', component: () => import('pages/Catalog.vue') },
      { path: '/help', component: () => import('pages/Help.vue') },
      { path: '/about', component: () => import('pages/About.vue') },
      { path: '/cart', component: () => import('pages/Cart.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes