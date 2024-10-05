import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { i18n } from "./i18n";
const options = {
    transition: "Vue-Toastification__slideBlurred",
    hideProgressBar: true,
};
import "dayjs/locale/ar-sa";
import dayjs from "dayjs";
dayjs.locale(localStorage.getItem("locale") == "en" ? "en" : "ar-sa");
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const pinia = createPinia();
createApp(App)
    .use(pinia)
    .use(i18n)
    .use(Toast, options)
    .use(router)
    .mount("#app");
