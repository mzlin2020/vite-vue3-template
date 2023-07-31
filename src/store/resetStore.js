import { useUserStore } from "./modules/user";

const storeLists = [useUserStore];

// 重置所有store
export const resetAllStore = (loginstore) => {
    if (!storeLists.length) return;
    storeLists.forEach((store) => {
        store().$reset();
    });
    loginstore && loginstore.$reset();
};
