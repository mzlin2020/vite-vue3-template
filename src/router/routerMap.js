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
        component: () => import("@/components/ResultPage/404.vue"),
    },
];

// 前端路由组件表
const constantRouterComponents = {
    dashboard: () => import("@/views/dashboard/index.vue"),

    //============= workOrder ====================
    workOrder: () => import("@/views/workOrder/index.vue"),
    overview: () => import("@/views/workOrder/statistics/overview.vue"),
    workload: () => import("@/views/workOrder/statistics/workload.vue"),
    customSearch: () => import("@/views/workOrder/searching/customSearch.vue"),

    //============== crm =============================
    CRM: () => import("@/views/CRM/index.vue"),
    firstConsultCustom: () => import("@/views/CRM/customer/firstConsultCustom.vue"),
    toBeDistributedCustom: () => import("@/views/CRM/customer/toBeDistributedCustom.vue"),

    //====================== management ============================
    management: () => import("@/views/management/index.vue"),
    serviceList: () => import("@/views/management/service/serviceList.vue"),
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
