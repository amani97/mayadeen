import { defineStore } from "pinia";

export const useFacilitiesStore = defineStore("Facilities", {
    state: () => ({
        routes: [],
    }),

    getters: {
        getNextRoute(state) {
            return state.routes.length > 0
                ? state.routes[state.routes.length - 1]
                : "step5";
        },
    },

    actions: {
        clearCurrentRoute() {
            if (this.routes.length > 0) this.routes.pop();
        },
    },
});
