import axios from "axios";
import { router } from "@/router/index";
const instance = axios.create({
    baseURL: "https://www.1-tech-masters.com/RealEstates/public/api/",
    headers: {
        "access-control-allow-origin": "*",
        Authorization: sessionStorage.getItem("token")
            ? `Bearer ${sessionStorage.getItem("token")}`
            : null,
    },
});
instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            sessionStorage.removeItem("token");
            router.push({ name: "login" });
        }
        return Promise.reject(error);
    }
);

export default instance;
