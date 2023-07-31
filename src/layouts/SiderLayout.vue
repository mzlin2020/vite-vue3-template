<template>
    <div class="sider-layout" id="sider-container">
        <div class="logo flex-center">
            <img src="@/assets/images/logo.png" alt="" />
        </div>
        <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            theme="light"
            :inline-collapsed="collapsed"
            :inlineIndent="32"
        >
            <a-menu-item v-for="item in showMenus" :key="item.name" @click="selectmenu(item)">
                <template #icon>
                    <span class="iconfont" v-html="item.meta.icon"></span>
                </template>
                <span>{{ item.meta.title }}</span>
            </a-menu-item>
        </a-menu>

        <div class="other-options">
            <div v-for="item in otherOptions" :key="item.key" class="item flex-center">
                <a-tooltip placement="right" :getPopupContainer="(triggerNode) => triggerNode.parentNode">
                    <template #title>{{ item.label }}</template>
                    <span class="iconfont" v-html="item.icon"></span>
                </a-tooltip>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * @description 侧边栏布局
 * @author 林泽明
 * @version 0.0.1
 * @creatDate 2023/07/13
 */
import _ from "lodash";
import { useLoginStore } from "@/store/modules/login";
import { useUserStore } from "@/store/modules/user";
const { menus } = useLoginStore();
const userStore = useUserStore();
const { collapsed, selectedKeys } = storeToRefs(userStore);
const router = useRouter();

// ===================== 一级菜单 ==============================
const cloneMenus = _.cloneDeep(menus);
// 筛选menus
const filterMenus = (menus) => {
    const result = [];
    for (let menu of menus) {
        // 排除没有name或者不展示的路由
        if (!menu.name || !menu.meta.isMenuShow) continue;
        delete menu.children;
        result.push({ ...menu });
    }
    return result;
};

const showMenus = filterMenus(cloneMenus);

// 选择菜单
const selectmenu = ({ name }) => {
    if (name === selectedKeys.value[0]) return;
    router.push({ name });

    // 切换菜单清空routePaths
    userStore.updateRoutePaths({ type: "clear" });
};

// =================== other =================================
const otherOptions = [
    {
        key: "message",
        icon: "&#xe842;",
        label: "消息中心",
    },
    {
        key: "tasks",
        icon: "&#xe826;",
        label: "任务中心",
    },
];
</script>

<style lang="less" scoped>
.sider-layout {
    box-sizing: border-box;
    user-select: none;
    position: relative;
    height: 100%;
    border-right: 1px solid #f0f0f0;
    background: @sider-bg;

    display: flex;
    flex-direction: column;
    // ============================== logo ======================================
    .logo {
        height: 58px;
        margin-bottom: 10px;
        img {
            width: 34px;
            height: 34px;
            display: inline-block;
        }
    }

    //========================== 菜单自定义样式 ===============================

    // 收缩时宽度
    :deep(.ant-menu-inline-collapsed) {
        width: @sider-width-fold;
    }

    :deep(.ant-menu) {
        flex: 1;
        background: @sider-bg;
        transition-duration: 0.2s;
        transition-property: width;
        overflow-y: auto;
        overflow-x: hidden;
        .ant-menu-item {
            padding-right: 32px;
            .iconfont {
                opacity: 0.9;
                font-size: 22px;
            }
        }

        // 滚动条样式
        &::-webkit-scrollbar {
            width: @sider-scrollbar-width;
        }
        &::-webkit-scrollbar-thumb {
            background-color: @sider-scroll-color;
        }
    }
    // 取消右侧默认border
    :deep(.ant-menu-inline),
    :deep(.ant-menu-vertical) {
        border: none;
    }

    // ============================== other ====================================
    .other-options {
        padding-bottom: 20px;
        .item {
            width: 60px;
            height: 60px;
            cursor: pointer;
            user-select: none;
        }
        .iconfont {
            opacity: 0.7;
            font-size: 24px;
        }
    }
}
</style>
