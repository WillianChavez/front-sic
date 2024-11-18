export default [
  {
    path: '/ventas',
    name: 'ventas',
    component: () => import(/* webpackChunkName: "ventas" */ './index.vue'),
  },
  {
    path: '/ventas/form',
    name: 'ventas-form',
    component: () =>
      import(/* webpackChunkName: "ventas" */ './VentasForm.vue'),
  },
]
