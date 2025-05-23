import tailwindcss from "@tailwindcss/vite";
import {process} from "std-env";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    css: [
        '~/assets/css/main.css',
        '~/assets/fonts/yekanFa.css',
        '~/assets/css/typography.css',
        // '~/assets/css/responsive-typography.css',
        '~/assets/css/transitions.css',
        '~/assets/css/animations.css'
    ],

    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        }
    },


    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    runtimeConfig: {
        public: {
            baseURL: process.env.BASE_URL || 'https://api.irsm.div.team',
            apiPath: process.env.API_PATH || '/api/',
        }
    },

    modules: [
        '@nuxt/eslint',
        '@nuxt/icon',
        '@nuxt/image',
        'shadcn-nuxt',
        '@pinia/nuxt'
    ],
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui'
    }
})