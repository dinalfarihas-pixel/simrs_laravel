 

// const mix = require('laravel-mix');

// mix.webpackConfig({
// output: {
//     chunkFilename: 'js/main/[name].js?id=[chunkhash]',
//   }
// }).js('resources/js/app.js', 'public/js').vue()
//     .postCss('resources/css/app.css', 'public/css', [
//     //
// ]).version(['public/js/app.js']);
 
 const mix = require('laravel-mix');
const webpack = require('webpack');
const path = require('path');

mix.webpackConfig({
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
        }),
    ],
    resolve: {
        extensions: ['.*', '.wasm', '.mjs', '.js', '.jsx', '.json', '.vue'],
        alias: {
            'primevue/api': path.resolve(__dirname, 'node_modules/@primevue/core/api/index.mjs'),
            // Deduplicate vue-demi: force vue-echarts to use the top-level Vue 3 compatible build
            'vue-demi': path.resolve(__dirname, 'node_modules/vue-demi'),
        },
    },
    ignoreWarnings: [
        // vue-demi compatibility shim probes for Vue 2 default export — harmless in Vue 3
        { module: /vue-demi/ },
    ],
    module: {
        rules: [
            {
                test: /\.mjs$/,
                resolve: { fullySpecified: false },
                include: /node_modules/,
                type: 'javascript/auto',
            },
        ],
    },
    output: {
        chunkFilename: 'js/main/[name].js?id=[contenthash]',
    },
    optimization: {
        splitChunks: {
            // ✅ Ganti 'all' → 'async'
            // 'all' memisahkan vendor dari initial chunk (app.js) sehingga
            // browser tidak tahu harus load file mana duluan.
            // 'async' hanya memisahkan lazy-loaded chunks — aman untuk setup
            // Laravel Mix tanpa konfigurasi script loader tambahan di Blade.
            chunks: 'async',
            maxAsyncRequests: 15,
            cacheGroups: {
                primevue: {
                    name: 'vendor-primevue',
                    test: /[\\/]node_modules[\\/](primevue|primeicons)[\\/]/,
                    chunks: 'async',
                    priority: 40,
                    enforce: true,
                },
                charts: {
                    name: 'vendor-charts',
                    test: /[\\/]node_modules[\\/](chart\.js|canvg|dompurify|@kurkle)[\\/]/,
                    chunks: 'async',
                    priority: 35,
                    enforce: true,
                },
                vue: {
                    name: 'vendor-vue',
                    test: /[\\/]node_modules[\\/](vue|vuex|vue-router|vue-toast-notification|vue-loading-overlay|vue2-datepicker|vue-suggestion|vue-picture-preview|vue-json-to-excel|vue-excel-export|vuejs-smart-table|vue-numeric-input)[\\/]/,
                    chunks: 'async',
                    priority: 30,
                    enforce: true,
                },
                vendor: {
                    name: 'vendor-common',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'async',
                    priority: 10,
                    minSize: 50000,
                },
            },
        },
    },
})
.js('resources/js/app.js', 'public/js')
.vue({
    version: 3,
    options: {
        compilerOptions: {
            isCustomElement: tag => tag.startsWith('ion-'),
        },
    },
})
.postCss('resources/css/app.css', 'public/css', [
    //
])
.version(['public/js/app.js']);