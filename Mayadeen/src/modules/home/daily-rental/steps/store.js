import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "../ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
import { i18nUtil } from "../../../../i18n/index.js";
const toast = useToast();
function mapFormData(data) {
    var payload = new FormData();
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (key == "images") {
                for (let i = 0; i < data[key].length; i++) {
                    payload.append("images[]", element[i]);
                }
            } else if (key == "extras") {
                for (let i = 0; i < data[key].length; i++) {
                    payload.append("extras[]", element[i]);
                }
            } else payload.append(key, element);
        }
    }
    return payload;
}
export const useRentalStipStore = defineStore("RentalStipStore", {
    state: () => ({
        loading: false,
        filterData: [],
        section: [],
        cities: [],
        kinds: [],
        streets: [],
        
        data: {
            location_text: "any",
            images: [],
            lat: 0,
            lang: 0,
        },
    }),
    actions: {
        async getStreets() {
            this.loading = true;

            try {
                const { data, status } = await axios.get(ep.GetStreets, {
                    Headers: {
                        "Content-Type":
                            "multipart/form-data; boundary=<calculated when request is sent>",
                    },
                });
                this.streets = data;
                if (resHasError(status)) throw status;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response.status}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async addAD() {
            this.loading = true;
            try {
                const payload = mapFormData(this.data);

                const { status, data } = await axios.post(ep.AddAD, payload);
                console.log(data);
                toast.success(i18nUtil.t("YourAdHasBeenAddedSuccessfully"));
                if (resHasError(status)) throw status;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(i18nUtil.t("sorryWeCantAddYourADRightNow"));
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getSection() {
            this.loading = true;

            try {
                const { status, data } = await axios.get(ep.GetSection);
                this.section = data;
                if (resHasError(status)) throw status;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getKinds() {
            this.loading = true;

            try {
                const { status, data } = await axios.get(ep.GetAllKind);
                this.kinds = data;
                if (resHasError(status)) throw status;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response.status}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getCities() {
            this.loading = true;

            try {
                const { status } = await axios.get(ep.GetCities);
                const GetCities = await axios.get(ep.GetCities);
                if (resHasError(status)) throw status;
                this.cities = GetCities.data;
                return Promise.resolve(GetCities);
            } catch (err) {
                toast.error(`${err.response.status}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },

    },
});
