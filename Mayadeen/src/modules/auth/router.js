export default [
    {
        path: "/auth",
        component: () => import("./layout.vue"),
        children: [
            {
                path: "login",
                name: "login",
                component: () => import("./pages/login/index.vue"),
                meta: {
                    title: "login",
                    redirectIfLoggedIn: true,
                    whiteListed: true,
                },
            },
            {
                path: "register",
                name: "register",
                component: () => import("./pages/register/index.vue"),
                meta: {
                    whiteListed: true,
                    title: "register",
                },
            },
            {
                path: "re-assign-password",
                name: "re-assign-password",
                component: () => import("./pages/re-assign-password/index.vue"),
                meta: {
                    title: "reAssignPassword",
                    whiteListed: true,
                },
            },
            {
                path: "re-assign-username",
                name: "re-assign-username",
                component: () => import("./pages/re-assign-username/index.vue"),
                meta: {
                    title: "reAssignUsername",
                    whiteListed: true,
                },
            },
            {
                path: "phone-number-verification",
                name: "phone-number-verification",
                component: () =>
                    import("./pages/phone-number-verification/index.vue"),
                meta: {
                    title: "phoneNumberVerification",
                    whiteListed: true,
                },
            },
        ],
    },
];
