import { createRouter, createWebHistory } from "vue-router";
import { constantRouter } from "./routerMap";
import { generatorAsyncRouter, cache, userGuard } from "@/utils/index";
import { loadGuards } from "./guards";
import { useLoginStore } from "@/store/modules/login";
import { createPinia } from "pinia";

const pinia = createPinia();
const store = useLoginStore(pinia);

// 不需要登录拦截的路由配置
const loginIgnore = {
    names: ["login"], //根据路由名称匹配,可为空
    paths: ["/404"], //根据路由fullPath匹配
    /**
     * 判断路由是否包含在该配置中
     * @param route vue-router 的 route 对象
     * @returns {boolean}
     */
    includes(route) {
        return this.names.includes(route.name) || this.paths.includes(route.path);
    },
};

const router = createRouter({
    history: createWebHistory(),
    routes: constantRouter,
});

if (cache.getCache("login")?.menus) {
    const rootRouter = generatorAsyncRouter(cache.getCache("login").menus);
    router.addRoute(rootRouter);
}

export default router;

const allGuards = {
    beforeEach: [userGuard],
    afterEach: [],
};
loadGuards(allGuards, { router, loginIgnore, store });
