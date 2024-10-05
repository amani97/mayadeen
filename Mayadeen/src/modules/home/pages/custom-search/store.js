import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "../ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useCustomSearchStore = defineStore("customSearchStore", {
    state: () => ({
        loading: false,
        section: [],
        cities: [],
        kinds: [],
        realEstateData: [],
        requestData: {},
        responseData: [],
        filterData: [],
        // test: {
        //     min_price: 400,
        //     max_price: 1600,
        //     min_age: 1,
        //     max_age: 15,
        //     space_of_place: 100,
        //     space_of_land: 222,
        //     the_front: "شمالي شرقي",
        //     real_estate_kind_id: 1,
        //     real_estate_section_id: 1,
        //     city_id: 1,
        //     street_id: 1,
        //     kind_of_street: "شرع عام",
        //     floor_number: 2,
        //     num_of_rooms: 4,
        //     num_of_big_rooms: 2,
        //     num_of_wc: 2,
        // },
    }),
    actions: {
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
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getCities() {
            this.loading = true;

            try {
                const { status, data } = await axios.get(ep.GetCities);
                if (resHasError(status)) throw status;
                this.cities = data;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getFilterdDataFromApi() {
            this.loading = true;

            try {
                const { status, data } = await axios.get(ep.Search, {
                    params: this.requestData,
                });
                if (resHasError(status)) throw status;
                this.responseData = data;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        filtersOnSection(section) {
            if (section == "فلل" || section == "أدوار") {
                var items = [
                    { value: true, label: "space_of_land" },
                    { value: true, label: "space_of_place" },
                    { value: true, label: "the_front" },
                    { value: true, label: "kind_of_street" },
                    { value: true, label: "number_of_floors" },
                    { value: false, label: "floor_number" },
                    { value: true, label: "num_of_rooms" },
                    { value: true, label: "num_of_big_rooms" },
                    { value: true, label: "num_of_wc" },
                    { value: true, label: "extras" },
                ];

                return items;
            }
            if (section == "شقق" || section == "شقق دوبليكس") {
                var items = [
                    { value: false, label: "space_of_land" },
                    { value: true, label: "space_of_place" },
                    { value: true, label: "the_front" },
                    { value: true, label: "kind_of_street" },
                    { value: true, label: "number_of_floors" },
                    { value: true, label: "floor_number" },
                    { value: true, label: "num_of_rooms" },
                    { value: true, label: "num_of_big_rooms" },
                    { value: true, label: "num_of_wc" },
                    { value: true, label: "extras" },
                ];

                return items;
            }
            if (section == "فيلا وشقق" || section == "عماير") {
                var items = [
                    { value: true, label: "space_of_land" },
                    { value: false, label: "space_of_place" },
                    { value: true, label: "the_front" },
                    { value: true, label: "kind_of_street" },
                    { value: true, label: "number_of_floors" },
                    { value: false, label: "floor_number" },
                    { value: false, label: "num_of_rooms" },
                    { value: false, label: "num_of_big_rooms" },
                    { value: false, label: "num_of_wc" },
                    { value: false, label: "extras" },
                ];

                return items;
            }
            if (section == "أراضي") {
                var items = [
                    { value: true, label: "space_of_land" },
                    { value: false, label: "space_of_place" },
                    { value: true, label: "the_front" },
                    { value: true, label: "kind_of_street" },
                    { value: false, label: "number_of_floors" },
                    { value: false, label: "floor_number" },
                    { value: false, label: "num_of_rooms" },
                    { value: false, label: "num_of_big_rooms" },
                    { value: false, label: "num_of_wc" },
                    { value: false, label: "extras" },
                ];

                return items;
            }
            if (section == "مكاتب") {
                var items = [
                    { value: false, label: "space_of_land" },
                    { value: true, label: "space_of_place" },
                    { value: false, label: "the_front" },
                    { value: false, label: "kind_of_street" },
                    { value: false, label: "number_of_floors" },
                    { value: true, label: "floor_number" },
                    { value: true, label: "num_of_rooms" },
                    { value: true, label: "num_of_big_rooms" },
                    { value: true, label: "num_of_wc" },
                    { value: false, label: "extras" },
                ];

                return items;
            }
            if (section == "محلات") {
                var items = [
                    { value: false, label: "space_of_land" },
                    { value: true, label: "space_of_place" },
                    { value: false, label: "the_front" },
                    { value: false, label: "kind_of_street" },
                    { value: false, label: "number_of_floors" },
                    { value: false, label: "floor_number" },
                    { value: false, label: "num_of_rooms" },
                    { value: false, label: "num_of_big_rooms" },
                    { value: true, label: "num_of_wc" },
                    { value: false, label: "extras" },
                ];

                return items;
            }
            if (section == "مزارع") {
                var items = [
                    { value: true, label: "space_of_land" },
                    { value: false, label: "space_of_place" },
                    { value: false, label: "the_front" },
                    { value: false, label: "kind_of_street" },
                    { value: false, label: "number_of_floors" },
                    { value: false, label: "floor_number" },
                    { value: false, label: "num_of_rooms" },
                    { value: false, label: "num_of_big_rooms" },
                    { value: false, label: "num_of_wc" },
                    { value: false, label: "extras" },
                ];

                return items;
            }
            if (section == "استراحات") {
                var items = [
                    { value: true, label: "space_of_land" },
                    { value: true, label: "space_of_place" },
                    { value: false, label: "the_front" },
                    { value: false, label: "kind_of_street" },
                    { value: false, label: "number_of_floors" },
                    { value: false, label: "floor_number" },
                    { value: false, label: "num_of_rooms" },
                    { value: false, label: "num_of_big_rooms" },
                    { value: false, label: "num_of_wc" },
                    { value: false, label: "extras" },
                ];

                return items;
            }
            if (
                section == "مخيمات" ||
                section == "غرف" ||
                section == "مستودعات" ||
                section == "ورش" ||
                section == "استراحات مناسبات" ||
                section == "صالات مناسبات"
            ) {
                var items = [
                    { value: false, label: "space_of_land" },
                    { value: true, label: "space_of_place" },
                    { value: false, label: "the_front" },
                    { value: false, label: "kind_of_street" },
                    { value: false, label: "number_of_floors" },
                    { value: false, label: "floor_number" },
                    { value: false, label: "num_of_rooms" },
                    { value: false, label: "num_of_big_rooms" },
                    { value: false, label: "num_of_wc" },
                    { value: false, label: "extras" },
                ];

                return items;
            }
            var items = [
                { value: true, label: "space_of_land" },
                { value: true, label: "space_of_place" },
                { value: true, label: "the_front" },
                { value: true, label: "kind_of_street" },
                { value: true, label: "number_of_floors" },
                { value: true, label: "floor_number" },
                { value: true, label: "num_of_rooms" },
                { value: true, label: "num_of_big_rooms" },
                { value: true, label: "num_of_wc" },
                { value: true, label: "extras" },
            ];

            return items;
        },
    },
});
