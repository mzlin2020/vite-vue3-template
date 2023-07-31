import { defineStore } from "pinia";
import router from "@/router/index";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            collapsed: true, // 菜单折叠
            selectedKeys: ["dashboard"], // 顶层菜单选中项
            activeKey: "", //当前选中二级菜单
            routePaths: [], //当前选中的path
        };
    },
    getters: {
        // 缓存组件
        includeComps() {
            return this.routePaths.map((item) => item.name);
        },
    },
    actions: {
        // 变更路由访问记录
        updateRoutePaths(payload) {
            const { type, path, title, name } = payload;
            let index = this.routePaths.findIndex((item) => item.path === path);
            switch (type) {
                case "clear":
                    this.routePaths = [];
                    break;
                case "add":
                    index === -1 && this.routePaths.push({ path, title, name });
                    this.activeKey = path;
                    break;
                case "remove":
                    index !== -1 && this.routePaths.splice(index, 1);
                    if (this.routePaths.length === 0) {
                        router.push({ path: "/" });
                        this.activeKey = "";
                        this.selectedKeys = ["dashboard"];
                    }
                    // 如果删除当前路由，跳转至routePaths最后一个路由地址
                    if (this.routePaths.length && this.activeKey === path) {
                        this.activeKey = this.routePaths[this.routePaths.length - 1].path;
                        router.push({ path: this.activeKey });
                    }
                    break;
                default:
                    break;
            }
        },
    },
    //持久化的数据
    persist: {
        paths: ["collapsed", "selectedKeys", "routePaths"],
    },
});
