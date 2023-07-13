import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { createStyleImportPlugin, AndDesignVueResolve } from "vite-plugin-style-import";
import AutoImport from "unplugin-auto-import/vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({ resolvers: [AntDesignVueResolver({ importStyle: "less" })] }), //按需导入antdVue
        createStyleImportPlugin({
            resolvers: [AndDesignVueResolve()], //按需导入antdVue样式
            libs: [
                //解决message等部分组件样式失效bug
                {
                    libraryName: "ant-design-vue",
                    esModule: true,
                    resolveStyle: (name) => {
                        return `ant-design-vue/es/${name}/style/index`;
                    },
                },
            ],
        }),
        AutoImport({
            imports: ["vue", "vue-router", "pinia"],
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve("./src"),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: '@import "@/assets/styles/index.less";',
                javascriptEnabled: true,
                modifyVars: {
                    "primary-color": "#0daeaf", // 全局主色
                    "primary-color-hover": "#2bbdb8;",
                    "primary-color-active": "#03858a",
                    "link-color": "#0daeaf",
                },
            },
        },
    },

    server: {
        proxy: {
            "/storeApi": {
                target: "http://192.168.1.119/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/storeApi/, ""),
            },
        },
    },
});
