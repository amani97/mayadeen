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
            } else if (key == "ads" || key == "services") {
                for (let i = 0; i < data[key].length; i++) {
                    payload.append(`${key}[${i}]`, element[i]);
                }
            } else payload.append(key, element);
        }
    }
    return payload;
}
export const useAdInfoStore = defineStore("adInfo", {
    state: () => ({
        loading: false,
        filterData: [],
        section: [],
        cities: [],
        kinds: [],
        streets: [],
        updateData: {},
        flag: 0,
        data: {
            age: 0,
            location_text: null,
            images: [],
            lat: 24.7136,
            lang: 46.6753,
            ads: [],
            services: [],
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
        resetData() {
            this.data = {
                location_text: "any",
                images: [],
                lat: 0,
                lang: 0,
                extras: [],
            };
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
                this.data = {
                    age: 0,
                    location_text: "539, محافظة الرياض, منطقة الرياض, السعودية",
                    images: [],
                    lat: 24.7136,
                    lang: 46.6753,
                    extras: [],
                    estate_area_services: [],
                };
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
                const { status, data } = await axios.get(ep.GetCities);
                if (resHasError(status)) throw status;
                this.cities = data;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response.status}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        filtersOnSection(section) {
            console.log(section);
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
            console.log(section, this.filterData);
            return items;
        },
        async updateAD(id) {
            this.loading = true;
            try {
                const payload = mapFormData(this.updateData);
                const { status, data } = await axios.post(
                    ep.UpdateRealEstate + "/" + id,
                    payload
                );
                toast.success(i18nUtil.t("YourAdHasBeenUpdatedSuccessfully"));
                if (resHasError(status)) throw status;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(i18nUtil.t("sorryWeCantUpdateYourADRightNow"));
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
    },
});
