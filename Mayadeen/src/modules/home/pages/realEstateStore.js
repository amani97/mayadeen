import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "./ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useRealEstateStore = defineStore("realEstateStore", {
    state: () => ({
        saleOrRent: null,
        realEstates: [],
        activeFilter: null,
        customFilterData: null,
        loading: false,
        rantRealEstate: null,
    }),
    actions: {
        async getRealEstate() {
            this.loading = true;

            try {
                const { status, data } = await axios.get(ep.RealEstate);
                if (resHasError(status)) throw status;
                if (this.customFilterData == null) {
                    this.realEstates = data.data;
                } else {
                    this.activeFilter = "true";
                    this.realEstates = this.customFilterData;
                }
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getRentRealEstate() {
            this.loading = true;

            try {
                const { status, data } = await axios.get(ep.RentRealEstate);
                if (resHasError(status)) throw status;
                this.rantRealEstate = data.data;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getRealEstateWithFilter() {
            this.loading = true;

            try {
                const { status, data } = await axios.get(ep.RealEstate);
                if (resHasError(status)) throw status;
                this.realEstates = data.data.filter((e) => {
                    console.log(this.activeFilter);
                    const kind =
                        this.saleOrRent === "forSale" ? "بيع" : "ايجار";
                    return (
                        e.real_estate_section === this.activeFilter &&
                        e.real_estate_kind === kind
                    );
                });
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response.status}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getRentRealEstateWithFilter() {
            this.loading = true;

            try {
                const { status, data } = await axios.get(ep.RentRealEstate);
                if (resHasError(status)) throw status;
                this.rantRealEstate = data.data.filter((e) => {
                    console.log(this.activeFilter);
                    return e.rent_kind == this.activeFilter;
                });
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response.status}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        clearFilters() {
            console.log("cleared");
            this.activeFilter = null;
            this.saleOrRent = null;
        },
    },
});
