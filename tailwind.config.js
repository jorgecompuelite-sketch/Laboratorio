/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                medical: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    500: '#64748b', // Base grey
                },
                primary: {
                    DEFAULT: '#0284c7', // Sky 600 - Dental Blue
                    dark: '#0369a1',
                    light: '#38bdf8',
                },
                accent: {
                    DEFAULT: '#94a3b8', // Metallic
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
