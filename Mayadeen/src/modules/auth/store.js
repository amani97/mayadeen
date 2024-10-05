import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "./ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useAuthStore = defineStore("Auth", {
    state: () => ({
        loading: false,
        user: localStorage.getItem("user") || null,
    }),
    actions: {
        async login(userData) {
            this.loading = true;
            try {
                const { status, data } = await axios.post(ep.LOGIN, userData);
                if (resHasError(status)) throw status;
                sessionStorage.setItem("token", data.token);
                localStorage.setItem(
                    "trusted",
                    data.status == "not trusted" ? false : true
                );
                axios.defaults.headers.authorization = `Bearer ${data.token}`;
                return Promise.resolve(data);
            } catch (err) {
                if (err && err.response)
                    toast.error(`${err.response.data.message}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async register(userData) {
            this.loading = true;
            try {
                const { status, data } = await axios.post(
                    ep.REGISTER,
                    userData
                );
                if (resHasError(status)) throw status;
                localStorage.setItem("token", data.token);
                axios.defaults.headers.authorization = `Bearer ${data.token}`;
                return Promise.resolve(data);
            } catch (err) {
                if (err && err.response)
                    toast.error(`${err.response.data.message}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
    },
});
