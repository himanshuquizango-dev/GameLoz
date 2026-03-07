/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                header: "#ff6b35",
                sidebar: "#2a2a2a",
                accent: "#ffd700",
            },
        },
    },
    plugins: [],
}
