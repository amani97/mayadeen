import { defineStore } from "pinia";
import axios from "@axios";
import * as ep from "../ep";
import { resHasError } from "@/utils/utils-functions";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useMessages = defineStore("Messages", {
    state: () => ({
        loading: false,
        messages: [],
        users: [],
        activeUser: {},
    }),
    actions: {
        setActiveUser(user) {
            this.activeUser = user;
        },
        async getMessages(userId) {
            this.loading = true;
            try {
                const { status, data } = await axios.get(ep.GetMessage(userId));
                if (resHasError(status)) throw status;
                this.messages = data.messages;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async sendMessage(messageData) {
            this.loading = true;
            try {
                const { status, data } = await axios.post(
                    ep.SendMessage,
                    messageData
                );
                if (resHasError(status)) throw status;
                console.log(data.message.receiver_id);
                this.getMessages(data.message.receiver_id);
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
        async getUserForChat() {
            this.loading = true;
            try {
                const { status, data } = await axios.get(ep.GetUserForChat);
                if (resHasError(status)) throw status;
                this.users = data.users;
                return Promise.resolve(data);
            } catch (err) {
                toast.error(`${err.response ? err.response.status : "error"}`);
                return Promise.reject(err);
            } finally {
                this.loading = false;
            }
        },
    },
});
