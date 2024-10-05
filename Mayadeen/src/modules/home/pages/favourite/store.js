import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "../ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
// import { i18nUtil } from "../../../../i18n";
const toast = useToast();
export const useFavouriteStore = defineStore("FavouriteStore", {
    state: () => ({
        loading: false,
        data: {},
    }),
    actions: {
        async getFavourite() {
            this.loading = true;
            try {
                const { status, data } = await axios.get(ep.GetFavourite);
                this.data = data.data;
                if (resHasError(status)) throw status;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(
                    `${
                        err.response.status == 401
                            ? "Unauthenticated"
                            : err.response.status
                    }`
                );
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
    },
});
