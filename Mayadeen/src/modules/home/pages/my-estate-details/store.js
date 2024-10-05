import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "../ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
import { i18nUtil } from "../../../../i18n/index.js";
const toast = useToast();
export const useMyRealEstateStore = defineStore("myRealEstateStore", {
    state: () => ({
        loading: false,
    }),
    actions: {
        async removeRealEstate(id) {
            this.loading = true;

            try {
                const { status, data } = await axios.get(
                    ep.DeleteRealEstate + "/" + id
                );
                if (resHasError(status)) throw status;
                toast.success(i18nUtil.t("realEstateDeleleted"));
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },

        async RefreshRealEstate(id) {
            this.loading = true;

            try {
                const { status, data } = await axios.get(
                    ep.RefreshRealEstate(id)
                );
                if (resHasError(status)) throw status;
                toast.success(i18nUtil.t("realEstateHasRefreashed"));
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
    },
});
