import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            userInfo: {
                name: "zhangsan",
                age: 23,
            },
            token: "S1",
        };
    },
    getters: {
        newName: (state) => state.userInfo.name + "vip",
    },
    actions: {
        //更新整个对象
        updateUserInfo(userInfo) {
            this.userInfo = userInfo;
        },
    },
    persist: {
        storage: window.localStorage, // 默认存储位置
        paths: ["userInfo.name"], //指定需要持久化的数据
    },
});
