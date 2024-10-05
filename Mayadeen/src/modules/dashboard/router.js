export default [
    {
        path: "/controlpanel",
        component: () => import("../dashboard/layout.vue"),
        children: [
            {
                path: "",
                name: "controlpanel",
                component: () => import("./landing-page/index.vue"),
            },
            {
                path: "/dashboard/add-ad",
                name: "dashboard-add-ad",
                component: () => import("../home/pages/add-ad/index.vue"),
            },
            {
                path: "AD/:id",
                name: "AD",
                component: () => import("./show-ad/index.vue"),
            },
            {
                path: "requests",
                name: "controlepanelRequests",
                component: () => import("./order/index.vue"),
            },
            {
                path: "requests/:id",
                name: "controlepanelRequestDetail",
                component: () => import("./order-details/index.vue"),
            },
            {
                path: "identificationRequests",
                name: "identificationRequests",
                component: () => import("./identification-requests/index.vue"),
            },
            {
                path: "userRequests",
                name: "controlepanelUserRequests",
                component: () => import("./user-order/index.vue"),
            },
            {
                path: "/dashboard/ad-info",
                name: "controlepanelAdd",

                children: [
                    {
                        path: ":text/:id",
                        name: "add-info-step-controlepanel",
                        component: () =>
                            import("../home/pages/ad-info/index.vue"),
                    },
                ],
            },
            {
                path: "privacyPolicy",
                name: "controlepanelprivacyPolicyAqar",
                component: () => import("./privacy-Policy/index.vue"),
            },
        ],
    },
];
