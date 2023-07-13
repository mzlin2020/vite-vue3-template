<template>
    <div class="basic-layout">
        <div class="layout-left">
            <SiderLayout />
        </div>
        <div class="layout-right">
            <HeaderLayout />
            <ContentLayout />
        </div>
    </div>
</template>

<script setup>
/**
 * @description 基础布局
 * @author 
 * @version 0.0.1
 * @creatDate 2023/07/11
 */
import HeaderLayout from "./HeaderLayout.vue";
import SiderLayout from "./SiderLayout.vue";
import ContentLayout from "./ContentLayout.vue";
</script>

<style lang="less" scoped>
.basic-layout {
    display: flex;
    width: 100%;
    height: 100%;

    .layout-left {
        width: 60px;
        height: 100vh;
        background: #ebedf0;
    }

    .layout-right {
        width: calc(100vw - 60px);
        height: 100vh;
        background: #fff;
        position: relative;
    }
}
</style>
