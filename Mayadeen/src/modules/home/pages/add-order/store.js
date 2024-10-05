import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "../ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useOrdersStore = defineStore("addOrder", {
    state: () => ({
        loading: false,
        SimilarOrders: [],
    }),
    actions: {
        async addOrder(orderData) {
            this.loading = true;
            try {
                const { status, data } = await axios.post(
                    ep.AddOrder,
                    orderData
                );
                if (data.message == "done") {
                    this.SimilarOrders = data;
                    toast.success("done");
                } else {
                    this.SimilarOrders = data;
                    toast.success("order sent to control panel");
                }
                if (resHasError(status)) throw status;
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
