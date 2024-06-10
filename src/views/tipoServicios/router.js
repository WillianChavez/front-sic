export default [
    {
        path: "/tipo-servicios",
        name: "tipo-servicios",
        component: () =>
            import(
                /* webpackChunkName: "cuentas" */ "./index.vue"
                ),
    },
]