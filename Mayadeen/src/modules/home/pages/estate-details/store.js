import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "../ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
import { i18nUtil } from "../../../../i18n";
const toast = useToast();
export const useEstateDetails = defineStore("EstateDetailsStore", {
    state: () => ({
        loading: false,
        reportData: {
            real_estate_id: 0,
            comment: "",
        },
        rating: "",
        wishlist: "",
        data: {},
    }),
    actions: {
        async getRealEstateById(id) {
            this.loading = true;

            try {
                const { status, data } = await axios.get(
                    ep.RealEstateById + "/" + id
                );
                this.data = data.data[0];
                this.wishlist = data.wishlist;
                this.rating = data.rating;
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
        async addReport() {
            this.loading = true;

            try {
                const { status, data } = await axios.post(
                    ep.Reporting,
                    this.reportData
                );
                toast.success(data.message);
                if (resHasError(status)) throw status;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(
                    `${
                        err.response.status == 422
                            ? "you already reported this real estate"
                            : err.response.status == 401
                            ? "Unauthenticated"
                            : err.response.status
                    }`
                );
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async addToFavourite(id) {
            this.loading = true;

            try {
                const { status, data } = await axios.post(
                    ep.AddToFavourite + "/" + id,
                    ""
                );
                toast.success(
                    data == "like"
                        ? i18nUtil.t("addToFavourite")
                        : i18nUtil.t("removeFromFavourite")
                );
                if (resHasError(status)) throw status;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(i18nUtil.t("generalErrMessage"));
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },

        async rateEstate(payload) {
            this.loading = true;

            try {
                const { status, data } = await axios.post(
                    ep.Rate(payload.real_estate_id),
                    payload
                );
                toast.success(i18nUtil.t("ratedMessage"));
                if (resHasError(status)) throw status;
                return Promise.resolve(data);
            } catch (err) {
                if (err === 422) toast.error(i18nUtil.t("alreadyRatedMessage"));
                else toast.error(i18nUtil.t("generalErrMessage"));
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
    },
});
