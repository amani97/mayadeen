import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],

    base: "",

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
            "@axios": fileURLToPath(new URL("./src/axios.js", import.meta.url)),
        },
    },

    server: {
        watch: {
            usePolling: true,
        },
    },
});
