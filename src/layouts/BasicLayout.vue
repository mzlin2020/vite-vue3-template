<template>
    <div class="basic-layout">
        <div class="layout-left">
            <SiderLayout />
        </div>
        <div class="layout-right">
            <HeaderLayout />
            <ContentLayout />
        </div>
        <!-- 移动端弹窗提示 -->
        <ScreenTip />
    </div>
</template>

<script setup>
/**
 * @description 基础布局
 * @author 林泽明
 * @version 0.0.1
 * @creatDate 2023/07/11
 */
import HeaderLayout from "./HeaderLayout.vue";
import SiderLayout from "./SiderLayout.vue";
import ContentLayout from "./ContentLayout.vue";
</script>

<style lang="less" scoped>
.basic-layout {
    .layout-left,
    .layout-right {
        height: 100vh;
    }
    .layout-left {
        float: left;
    }

    .layout-right {
        overflow: hidden; /*开启BFC*/
        background: #fff;
        position: relative;
    }
}
</style>
