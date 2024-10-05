import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "../ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useControlPanelHome = defineStore("controlePanelHome", {
    state: () => ({
        loading: false,
        cities: [],
        streets: [],
    }),
    actions: {
        async GetCities() {
            this.loading = true;
            try {
                const { status, data } = await axios.get(ep.GetCities);
                this.cities = data;
                if (resHasError(status)) throw status;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(err.response ? err.response.status : "error");
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        // async addCities(name) {
        //     this.loading = true;
        //     try {
        //         const { status, data } = await axios.post(ep.AddCity, {
        //             name: name,
        //         });
        //         this.cities = data;
        //         if (resHasError(status)) throw status;
        //         return Promise.resolve(data);
        //     } catch (err) {
        //         toast.error(err.response ? err.response.status : "error");
        //         return Promise.reject(err);
        //     } finally {
        //         this.loading = false;
        //     }
        // },
        async GetStreets() {
            this.loading = true;
            try {
                const { status, data } = await axios.get(ep.GetStreets);
                this.streets = data;
                if (resHasError(status)) throw status;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(err.response ? err.response.status : "error");
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
    },
});
