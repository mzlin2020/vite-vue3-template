import { defineStore } from "pinia";
import { logout } from "@/api/login/login";
import { cache, generatorAsyncRouter } from "@/utils/index";
import router from "@/router/index";
import menusData from "@/router/routerData";
import { resetAllStore } from "@/store/resetStore";

export const useLoginStore = defineStore("login", {
    state: () => {
        return {
            stopAjax: false,
            menus: null,
        };
    },
    actions: {
        // 登录
        async loginAction() {
            this.menus = menusData;
            // 添加动态路由
            const rootRouter = generatorAsyncRouter(menusData);
            router.addRoute(rootRouter);
            router.push("/");
        },

        // 退出登录
        async logoutAction() {
            console.log("退出登录");
            // 清除缓存
            cache.clear();
            cache.clear("session");

            // 重置pinia
            resetAllStore(this);

            router.push({ name: "login" });
        },
    },
    persist: {
        paths: ["menus"],
    },
});
