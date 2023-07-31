<template>
    <div class="content-layout">
        <Router-tabs />
        <SubMenu style="float: left" />
        <div style="overflow: hidden">
            <router-view />
        </div>
    </div>
</template>

<script setup>
/**
 * @description 内容区布局
 * @author 林泽明
 * @version 0.0.1
 * @creatDate 2023/07/13
 */

import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const route = useRoute();

// 记录路由
watch(
    () => route.path,
    (newVal) => {
        userStore.updateRoutePaths({ path: newVal, ...route.meta, type: "add", name: route.name });
    },
    {
        immediate: true,
    },
);
</script>

<style lang="less" scoped>
.content-layout {
    height: calc(100% - @header-height);
    width: 100%;
    margin-top: @header-height;
}
</style>
