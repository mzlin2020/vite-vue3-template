<template>
    <router-view v-if="isBlank" />
    <BasicLayout v-else />
</template>

<script setup>
/**
 * @description 主页面
 * @author 林泽明
 * @version 0.0.1
 * @creatDate 2023/07/10
 */
import BasicLayout from "@/layouts/BasicLayout.vue";
const route = useRoute();
const isBlank = computed(() => route?.meta?.isBlank); //是否显示空白页
</script>

<style lang="less" scoped></style>
