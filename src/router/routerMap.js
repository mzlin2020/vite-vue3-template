import Main from "@/views/main.vue";
// 默认静态路由表
const constantRouter = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        meta: {
            title: "404",
        },
        component: () => import(/* webpackChunkName: "notFound"*/ "@/components/ResultPage/404.vue"),
    },
];

// 前端路由组件表
const constantRouterComponents = {
    dashboard: () => import(/* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"),
    workOrder: () => import(/* webpackChunkName: "workOrder" */ "@/views/workOrder/index.vue"),
    CRM: () => import(/* webpackChunkName: "CRM" */ "@/views/CRM/index.vue"),
    management: () => import(/* webpackChunkName: "management" */ "@/views/management/index.vue"),
};

// 页面根级菜单
const rootRouter = {
    path: "/",
    name: "main",
    component: Main,
    redirect: "/dashboard",
    meta: {
        title: "首页",
    },
    children: [],
};
export { constantRouter, constantRouterComponents, rootRouter };
