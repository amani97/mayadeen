import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "../ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useProfileStore = defineStore("profileStore", {
    state: () => ({
        loading: false,
        userData: [],
        orderData:[]
    }),
    actions: {
        async getProfile() {
            this.loading = true;

            try {
                const { status, data } = await axios.get(ep.Profile);
                if (resHasError(status)) throw status;
                this.userData = data.data[0];
                this.orderData = data.data[0].order_data;
                //console.log(this.orderData);
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response.status}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
    },
});
