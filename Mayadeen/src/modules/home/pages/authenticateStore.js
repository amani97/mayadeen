import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "./ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useAuthenticateStore = defineStore("authenticateStore ", {
    state: () => ({
        loading: false,
    }),
    actions: {
        async authenticateAccount(body) {
            this.loading = true;

            try {
                const { status, data } = await axios.post(
                    ep.Authenticate,
                    body
                );
                localStorage.setItem("trusted", true);
                if (resHasError(status)) throw status;
                toast.success(data.message);
                return Promise.resolve();
            } catch (err) {
                toast.error(
                    err.response.status == 422
                        ? err.response.data
                        : err.response.status
                );
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
    },
});
