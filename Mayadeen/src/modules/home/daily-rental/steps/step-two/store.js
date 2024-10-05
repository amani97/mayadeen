import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "./ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useDailyRentalStore = defineStore("dailyRentalStore", {
    state: () => ({
        data: {
            rent_section_id: null,
            city_id: null,
            name: null,
            lat: null,
            long: null,
            location_text: null,
            space: null,
            street: null,
            bed_room: null,
            living_room: null,
            pools: null,
            kitchen: null,
            wc: null,
            image: null,
            room_number: null,
            bed_number: null,
            master_bed_number: null,
            main_room: null,
            main_room_num: null,
            extra_room: null,
            extra_room_num: null,
            out_room: null,
            out_room_num: null,
            out_extra: null,
            out_extra_num: null,
            num_of_chars: null,
            coffee_machine: null,
            cooking_plates: null,
            freezer: null,
            oven: null,
            fredg: null,
            microwave: null,
            cooker: null,
            pool_kind: null,
            depth: null,
            from: null,
            dimension: null,
            inner_pool: null,
            pool_barrier: null,
            pool_games: null,
            pool_heat: null,
            images: [],
            pool_water: null,
            cleanx: null,
            soap: null,
            sliper: null,
            shampoo: null,
            saona: null,
            num_of_wc: null,
            shower: null,
            shower_dress: null,
            shower_hand: null,
            jacozy: null,
        },
    }),
    actions: {
        // async getRealEstateWithFilter() {
        //     this.loading = true;
        //     try {
        //         const { status, data } = await axios.get(ep.RealEstate);
        //         if (resHasError(status)) throw status;
        //         this.realEstates = data.data.filter((e) => {
        //             return e.real_estate_section == this.activeFilter;
        //         });
        //         return Promise.resolve(data);
        //     } catch (err) {
        //         toast.error(`${err.response.status}`);
        //         return Promise.reject(err);
        //     } finally {
        //         this.loading = false;
        //     }
        // },
    },
});
