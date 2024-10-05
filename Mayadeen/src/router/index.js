import { createRouter, createWebHashHistory } from "vue-router";

import { START_LOCATION } from "vue-router";
import authRoutes from "@/modules/auth/router.js";
import controlpanel from "@/modules/dashboard/router.js";
import homeRoutes from "@/modules/home/router.js";
import { isLoggedIn } from "../utils/auth-helpers";
import rentalRoutes from "@/modules/home/daily-rental/route.js";

const routes = [
    ...authRoutes,
    ...homeRoutes,
    ...rentalRoutes,
    ...controlpanel
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
   
    if (isLoggedIn() && to.meta.redirectIfLoggedIn)
        return next({ name: "landingPage" });

    if (!isLoggedIn() && !to.meta.whiteListed) return next({ name: "login" });
    if (to.name === "add-info-step" && from === START_LOCATION) {
        const nextRoute = to.path.includes("dashboard")
            ? "dashboard-add-ad"
            : "add-ad";
        return next({ name: nextRoute });
    }
    if (
        to.matched[0].name === "rental-add-estate" &&
        to.name !== "step1" &&
        from === START_LOCATION
    ) {
        return next({ name: "step1" });
    }

    return next();
});
