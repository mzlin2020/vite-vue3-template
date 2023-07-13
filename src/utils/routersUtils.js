import { constantRouterComponents, rootRouter } from "@/router/routerMap";
import { checkAuthorization } from "./request";

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
const generator = (routerMap, parent) => {
    return routerMap.map((item) => {
        const { title, isMenuShow, icon, key, isBlank } = item.meta || {};
        const currentRouter = {
            // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/shop
            path: item.path || `${(parent && parent.path) || ""}/${item.name}`,
            // 唯一路由名称
            name: item.name || "",
            // 该路由对应页面的组件 (动态加载)
            component: constantRouterComponents[item.name] || (() => import(`@/views/${item.name}.vue`)),

            // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
            meta: {
                key: key,
                title: title,
                icon: icon || undefined,
                isMenuShow: isMenuShow,
                isBlank: isBlank,
                permission: item.name,
                layout: item.layout,
            },
        };
        // 是否设置了隐藏菜单
        if (isMenuShow === false) {
            currentRouter.hidden = true;
        }
        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        if (!currentRouter.path.startsWith("http")) {
            currentRouter.path = currentRouter.path.replace("//", "/");
        }
        // 重定向
        item.redirect && (currentRouter.redirect = item.redirect);
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // Recursion
            currentRouter.children = generator(item.children, currentRouter);
        }
        return currentRouter;
    });
};

/**
 * 生成动态路由表
 *
 * @param asyncRouter
 * @returns {*}
 */
const generatorAsyncRouter = (asyncRouter) => {
    if (Object.prototype.toString.call(asyncRouter) !== "[object Array]") return {};
    rootRouter.children = generator(asyncRouter);
    return rootRouter;
};

/**
 * 前置路由守卫——验证用户信息
 * @param {*} to
 * @param {*} from
 * @param {*} next
 * @param {*} options
 */
const userGuard = (to, from, next, options) => {
    const { loginIgnore, store } = options;
    // // 判断是否登录
    // if (!checkAuthorization() && !loginIgnore.includes(to)) {
    //     // 没有回调钩子方法可以执行，退出登陆
    //     store.logoutAction();
    // } else {
    //     next();
    // }

    next();
};

export { generator, generatorAsyncRouter, userGuard };
