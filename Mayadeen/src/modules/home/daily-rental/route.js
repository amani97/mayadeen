export default [
    {
        path: "/daily-rental",
        component: () => import("./layout.vue"),
        children: [
            {
                path: "",
                name: "daily-rental-landing",
                component: () =>
                    import("../daily-rental/landing-page/index.vue"),
            },
            {
                path: "list-search",
                name: "daily-rental-list-search",
                component: () => import("./list-search/index.vue"),
            },
            {
                path: "daily-profile",
                component: () => import("../pages/profile-view/index.vue"),
                meta: {
                    title: "profile-view",
                },
            },
        ],
    },
    {
        path: "/daily-rental/add-estate",
        name: "rental-add-estate",
        component: () => import("@/components/layout-home.vue"),
        children: [
            {
                path: "step1",
                name: "step1",
                component: () =>
                    import("../daily-rental/steps/step-one/index.vue"),
                meta: {
                    title: "addEstate",
                },
            },
            {
                path: "step2",
                name: "step2",
                component: () =>
                    import("../daily-rental/steps/step-two/index.vue"),
                meta: {
                    title: "addEstate",
                },
            },
            {
                path: "step3",
                name: "step3",
                component: () =>
                    import("../daily-rental/steps/step-three/index.vue"),
                meta: {
                    title: "addEstate",
                },
            },
            {
                path: "step4",
                name: "step4",
                component: () =>
                    import("../daily-rental/steps/step-four/index.vue"),
                meta: {
                    title: "addEstate",
                },
            },
            {
                path: "step5",
                name: "step5",
                component: () =>
                    import("../daily-rental/steps/step-five/index.vue"),
                meta: {
                    title: "addEstate",
                },
            },
            {
                path: "bedroom",
                name: "bedroom",
                component: () =>
                    import("../daily-rental/steps/extra/BedRoom.vue"),
                meta: {
                    title: "addEstate",
                },
            },
            {
                path: "Mg",
                name: "Mg",
                component: () => import("./steps/extra/Mg.vue"),
                meta: {
                    title: "addEstate",
                },
            },
            {
                path: "pools",
                name: "pools",
                component: () => import("./steps/extra/Pools.vue"),
                meta: {
                    title: "addEstate",
                },
            },
            {
                path: "kitchen",
                name: "kitchen",
                component: () => import("./steps/extra/Kitchen.vue"),
                meta: {
                    title: "addEstate",
                },
            },
            {
                path: "WC",
                name: "WC",
                component: () => import("./steps/extra/WC.vue"),
                meta: {
                    title: "addEstate",
                },
            },
            {
                path: "step6",
                name: "step6",
                component: () =>
                    import("../daily-rental/steps/step-six/index.vue"),
                meta: {
                    title: "addEstate",
                },
            },
            {
                path: "step7",
                name: "step7",
                component: () =>
                    import("../daily-rental/steps/step-seven/index.vue"),
                meta: {
                    title: "addEstate",
                },
            },
        ],
    },
];
