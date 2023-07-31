<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="userStore.includeComps">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<script setup>
/**
 * @description
 * @author
 * @version 0.0.1
 * @creatDate 2023/07/10
 */
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
</script>

<style lang="less" scoped></style>
