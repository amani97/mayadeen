export default [
    {
        path: "/h",
        component: () => import("./layout.vue"),
        children: [
            {
                path: "/landingPage",
                name: "landingPage",
                component: () => import("./pages/landing-page/index.vue"),
                meta: {
                    whiteListed: true,
                },
            },
            {
                path: "/list-search",
                name: "list-search",
                component: () => import("./pages/list-search/index.vue"),
            },
            {
                path: "profile-view",
                component: () => import("./pages/profile-view/index.vue"),
                meta: {
                    title: "profile-view",
                },
            },
        ],
    },
    {
        path: "/",
        component: () => import("@/components/layout-home.vue"),
        children: [
            {
                path: "/",
                name: "home",
                component: () => import("./pages/guest-home/index.vue"),
                meta: {
                    title: "",
                    whiteListed: true,
                },
            },
        ],
    },

    {
        path: "/estate-details/:id",
        name: "estate-details",
        component: () => import("./pages/estate-details/index.vue"),
        props: true,
        meta: {
            whiteListed: true,
        },
    },
    {
        path: "/my-estate-details/:id",
        name: "my-estate-details",
        component: () => import("./pages/my-estate-details/index.vue"),
        props: true,
    },
    {
        path: "/home",
        component: () => import("@/components/layout-home.vue"),
        children: [
            {
                path: "estates-sections",
                name: "estates-sections",
                component: () => import("./pages/estates-sections/index.vue"),
                meta: {
                    title: "logoCenter",
                },
            },
            // test image step
            {
                path: "test-map",
                name: "test-map",
                component: () => import("./components/add-your-ad/step3.vue"),
                meta: {
                    title: "favourite",
                },
            },
            {
                path: "favourite",
                name: "favourite",
                component: () => import("./pages/favourite/index.vue"),
                meta: {
                    title: "favourite",
                },
            },
            {
                path: "my-ad",
                name: "my-ad",
                component: () => import("./pages/my-ad/index.vue"),
                meta: {
                    title: "MyAds",
                },
            },
            {
                path: "add-ad",
                name: "add-ad",
                component: () => import("./pages/add-ad/index.vue"),
                meta: {
                    title: "chooseTheTypeOfMembership",
                },
            },
            {
                path: "privacy-policy/:id",
                name: "privacy-policy",
                component: () => import("./pages/privacy-policy/index.vue"),
            },
            {
                path: "ad-info",
                name: "add-info",
                meta: {
                    title: "addYourAD",
                },
                children: [
                    {
                        path: ":text/:id",
                        name: "add-info-step",
                        component: () => import("./pages/ad-info/index.vue"),
                    },
                ],
            },
            {
                path: "update",
                name: "update",
                meta: {
                    title: "updateYourAD",
                },
                children: [
                    {
                        path: ":realEstateId/:id",
                        name: "updateRealEstate",
                        component: () =>
                            import("./pages/ad-info/updateRealEstate.vue"),
                    },
                ],
            },
            {
                path: "my-order",
                name: "my-order",
                component: () => import("./pages/my-order/index.vue"),
                meta: {
                    title: "myOrder",
                },
            },
            {
                path: "verified-offers",
                name: "verified-offers",
                component: () => import("./pages/verified-offers/index.vue"),
                meta: {
                    title: "verifiedOffers",
                },
            },
            {
                path: "notification",
                name: "notification",
                component: () => import("./pages/notification/index.vue"),
                meta: {
                    title: "notifications",
                },
            },
            {
                path: "messages",
                name: "messages",
                component: () => import("./pages/messages/index.vue"),
                meta: {
                    title: "messages",
                },
            },
            {
                path: "add-order",
                name: "add-order",
                component: () => import("./pages/add-order/index.vue"),
                meta: {
                    title: "addOrder",
                },
            },
            {
                path: "similar-orders",
                name: "similar-orders",
                component: () => import("./pages/similar-order/index.vue"),
                meta: {
                    title: "similar-orders",
                },
            },
            {
                path: "custom-search",
                name: "custom-search",
                component: () => import("./pages/custom-search/index.vue"),
                meta: {
                    title: "customSearch",
                },
            },
            {
                path: "custom-search-result",
                name: "custom-search-result",
                component: () => import("./pages/custom-search-list/index.vue"),
                meta: {
                    title: "customSearch",
                },
            },
            {
                path: "id-verification",
                name: "id-verification",
                component: () => import("./pages/id-verification/index.vue"),
                meta: {
                    title: "identityDocumentation",
                },
            },
            {
                path: "office-verification",
                name: "office-verification",
                component: () =>
                    import("./pages/office-verification/index.vue"),
                meta: {
                    title: "officeDocumentation",
                },
            },
            {
                path: "test",
                name: "test",
                component: () => import("./pages/test.vue"),
                meta: {
                    title: "test",
                },
            },
            {
                path: "subscripation",
                name: "subscripation",
                component: () =>
                    import("./pages/reliable-subscripation/index.vue"),
                meta: {
                    title: "trustedSubscriptions",
                },
            },
            {
                path: "realEstateFinancingApplication",
                name: "realEstateFinancingApplication",
                component: () =>
                    import("./pages/realestate-financing/index.vue"),
                meta: {
                    title: "realEstateFinancingApplication",
                },
            },
            {
                path: "offersAndDiscounts",
                name: "offersAndDiscounts",
                component: () =>
                    import("./pages/offersand-discounts/index.vue"),
                meta: {
                    title: "offersAndDiscounts",
                },
            },
        ],
    },
];
