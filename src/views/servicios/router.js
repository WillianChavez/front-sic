export default [
    {
        path: "/compras",
        name: "compras",
        component: () =>
            import(
                /* webpackChunkName: "compras" */ "./index.vue"
                ),
    },
]