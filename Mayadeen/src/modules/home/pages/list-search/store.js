import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "../ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useListSearchStore = defineStore("listSearchStore", {
    state: () => ({
        loading: false,
        params: {},
        cities: [],
        streets: [],
        data: [],
        paginationData: {},
        isLocalFilter: true,
    }),
    actions: {
        async getRealEstate(paramsObject) {
            this.loading = true;

            try {
                const { status, data } = await axios.get(ep.RealEstateList, {
                    params: paramsObject,
                });
                if (resHasError(status)) throw status;
                this.data = data.data;
                this.paginationData = {
                    from: data.from,
                    to: data.to,
                    total: data.total,
                    per_page: data.per_page,
                    last_page: data.last_page,
                };
                return Promise.resolve(data);
            } catch (err) {
                toast.error(err.response ? err.response.status : "error");
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getRealEstateOptions() {
            this.loading = true;

            try {
                const dataCities = await axios.get(ep.GetCities);
                const dataStreets = await axios.get(ep.GetStreets);
                if (
                    resHasError(dataCities.status) ||
                    resHasError(dataStreets.status)
                )
                    throw dataCities.status;
                this.cities = dataCities.data;
                this.streets = dataStreets.data;
                return Promise.resolve(dataCities.data);
            } catch (err) {
                toast.error(err.response ? err.response.status : "error");
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
    },
});
