/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xs:'280px',
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        colors: {
            primary: "#FBB52E",
            secondary: "#444444",
            accent: "#EEEFF4",
            info: "#00C4FF",
            success: "#1eb854",
            warning: "#f59e0b",
            error: "#F50A58",
            white: "#FFFFFF",
        },
        extend: {},
    },
    plugins: [],
};
//xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl