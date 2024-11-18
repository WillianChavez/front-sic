export default [
  {
    path: '/clientes',
    name: 'clientes',
    component: () => import(/* webpackChunkName: "compras" */ './index.vue'),
  },
  {
    path: '/clientes/form',
    name: 'clientes-form',
    component: () => import(/* webpackChunkName: "compras" */ './ClienteForm.vue'),
  }
]
