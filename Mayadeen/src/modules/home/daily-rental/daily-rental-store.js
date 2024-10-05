import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "./endpoints";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
import { i18nUtil } from "../../../i18n/index";
const toast = useToast();
function mapFormData(data) {
    //    for test
    // var dataForTest = {
    //     name: "Property Name",
    //     description: "Property Description",
    //     lat: 123.456,
    //     long: 78.9,
    //     location_text: "Sample Location",
    //     space: "200",
    //     kind: "صالة",
    //     bed_room: 1,
    //     living_room: 1,
    //     pools: 1,
    //     kitchen: 1,
    //     isWc: 1,

    //     bed: {
    //         room_number: 2,
    //         bed_number: 4,
    //         master_bed_number: 1,
    //     },

    //     living: {
    //         main_room_details: "ميعن شرح",
    //         main_room_num: "2",
    //         extra_room_num: "1",
    //         out_room_num: "1",
    //         out_extra_num: "1",
    //     },

    //     pool: [
    //         {
    //             pool_kind: "Type AAA",
    //             depth: 5,
    //             from: "2",
    //             dimension: "10x20",
    //             inner_pool: 1,
    //             pool_barrier: 1,
    //             pool_games: 1,
    //             pool_heat: 1,
    //             pool_water: 0,
    //         },
    //         {
    //             pool_kind: "Type CAC",
    //             depth: 5,
    //             from: "2",
    //             dimension: "10x20",
    //             inner_pool: 1,
    //             pool_barrier: 1,
    //             pool_games: 1,
    //             pool_heat: 1,
    //             pool_water: 0,
    //         },
    //     ],

    //     day: [
    //         {
    //             days: "السبت",
    //             price: 1000,
    //             discount: "",
    //         },
    //         {
    //             days: "الاحد",
    //             price: 800,
    //             discount: "20%",
    //         },
    //     ],

    //     kit: {
    //         num_of_chars: "5",
    //         coffee_machine: "0",
    //         cooking_plates: "1",
    //         freezer: "1",
    //         oven: "0",
    //         fredg: "0",
    //         microwave: "0",
    //         cooker: "1",
    //     },

    //     wc: {
    //         num_of_wc: "3",
    //         shower: "1",
    //         jacozy: "0",
    //         shower_hand: "1",
    //         shower_dress: "1",
    //         saona: "1",
    //         shampoo: "1",
    //         sliper: "1",
    //         soap: "1",
    //         cleanx: "1",
    //     },

    //     ads: [
    //         {
    //             name: "مغسلة",
    //         },
    //         {
    //             name: "مسبح",
    //         },
    //     ],
    // };
    var payload = new FormData();

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (Array.isArray(element)) {
                for (let i = 0; i < element.length; i++) {
                    for (const innerKey in element[i]) {
                        if (Object.hasOwnProperty.call(element[i], innerKey)) {
                            const innerElement = element[i][innerKey];
                            payload.append(
                                `${key}[${i}][${innerKey}]`,
                                innerElement
                            );
                        }
                    }
                }
            } else if (
                typeof element === "object" &&
                (key == "bed" ||
                    key == "living" ||
                    key == "kit" ||
                    key == "wc" ||
                    key == "images")
            ) {
                for (const objectKey in element) {
                    if (Object.hasOwnProperty.call(element, objectKey)) {
                        const objectElement = element[objectKey];
                        payload.append(`${key}[${objectKey}]`, objectElement);
                    }
                }
            } else {
                payload.append(key, element);
            }
        }
    }
    console.log(data);
    console.log(payload);
    return payload;
}

export const useDailyRentalStore = defineStore("dailyRentalStore", {
    state: () => ({
        rentalDetails: null,
        rentals: [],
        rentalsList: [],
        filterdRentals: [],
        rentalSection: null,
        loading: false,
        requestData: {
            location_text: "539, محافظة الرياض, منطقة الرياض, السعودية",
            lat: 24.7136,
            long: 46.6753,
            day: [],
            bed_room: 0,
            living_room: 0,
            pools: 0,
            kitchen: 0,
            isWc: 0,
            images: [],
            ads: [],
        },
    }),
    actions: {
        async getRentals(params = {}) {
            this.loading = true;

            try {
                // TODO : fix ep issue
                const { status, data } = await axios.get("ep.RENTALS", {
                    params,
                });
                if (resHasError(status)) throw status;
                this.rentals = data.data;
                this.filterdRentals = this.rentals;
                return Promise.resolve(data.data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getRentalsList(params = { all: 1 }) {
            this.loading = true;

            try {
                const { status, data } = await axios.get(ep.RENTALS_LIST, {
                    params,
                });
                if (resHasError(status)) throw status;
                this.rentalsList = data.data;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response.status}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getRentalSection() {
            try {
                const { data, status } = await axios.get(ep.RENTAL_SECTION);
                if (resHasError(status)) throw status;
                this.rentalSection = data.data;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async showRentalById(id) {
            try {
                const { status, data } = await axios.get(
                    ep.SHOW_RENTAL_BY_ID(id)
                );
                if (resHasError(status)) throw status;
                this.rentalDetails = data.data;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async addRentalEstate() {
            try {
                this.loading = true;
                const { status, data } = await axios.post(
                    ep.ADD_RENTAL_ESTATE,
                    mapFormData(this.requestData)
                );
                if (resHasError(status)) throw status;
                this.rentalDetails = data.data;
                toast.success(i18nUtil.t("YourAdHasBeenAddedSuccessfully"));
                return Promise.resolve(data);
            } catch (err) {
                console.log(err);
                toast.error(i18nUtil.t("sorryWeCantAddYourADRightNow"));
                return Promise.reject(err);
            } finally {
                this.data = {
                    rentalDetails: null,
                    rentals: [],
                    rentalsList: [],
                    filterdRentals: [],
                    rentalSection: null,
                    loading: false,
                    requestData: {
                        day: [],
                        bed_room: 0,
                        living_room: 0,
                        pools: 0,
                        kitchen: 0,
                        isWc: 0,
                        images: [],
                    },
                };
                this.loading = false;
            }
        },
    },
});
