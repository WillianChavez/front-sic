export default [
    {
        path: "/servicios",
        name: "servicios",
        component: () =>
            import(
                /* webpackChunkName: "servicios" */ "./index.vue"
            ),
    },
    {
        path: "/servicios/form",
        name: "servicios-form",
        component: () =>
            import(
                /* webpackChunkName: "servicios" */ "./ServicioForm.vue"
            ),
    },
]